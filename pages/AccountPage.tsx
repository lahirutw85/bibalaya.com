import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, User, setPersistence, browserSessionPersistence, sendEmailVerification } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, db, storage } from '../src/firebase';
import { useUser } from '../src/contexts/UserContext';
import { Captcha } from '../components/Captcha';
import { COUNTRIES } from '../constants';

interface ProfileData {
    username: string;
    receiveNews: boolean;
    dob: string;
    showDobDayMonth: boolean;
    showDobYear: boolean;
    location: string;
    website: string;
    gender: 'male' | 'female' | 'none';
    avatarUrl?: string; // Add avatarUrl to interface
}

export const AccountPage: React.FC = () => {
    const { user, profile, loading: contextLoading, refreshProfile, updateProfileLocally } = useUser();
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState('');
    // Removed local user state, use context user

    // We can use local loading state for internal actions, but initial load comes from context
    const [captchaInput, setCaptchaInput] = useState('');
    const [generatedCaptcha, setGeneratedCaptcha] = useState('');
    const [showLoginCaptcha, setShowLoginCaptcha] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    // Profile State
    const [loadingProfile, setLoadingProfile] = useState(false);
    const [profileData, setProfileData] = useState<ProfileData>({
        username: '',
        receiveNews: false,
        dob: '',
        showDobDayMonth: true,
        showDobYear: false,
        location: '',
        website: '',
        gender: 'none'
    });

    // Populate form when context profile changes
    useEffect(() => {
        if (profile) {
            setProfileData(prev => ({
                ...prev,
                username: profile.username || '',
                avatarUrl: profile.avatarUrl,
                // We might need to fetch the FULL profile if context only has basic info
                // But for now let's assume context or the page should handle it.
                // Wait, UserContext ONLY fetches 'username' and 'avatarUrl' (see UserContext.tsx)
                // We NEED the full profile for this page (dob, location, etc).
            }));

            // Since UserContext is lightweight, we STILL need to fetch the full details
            // BUT we can do it more efficiently.
        }
    }, [profile]);

    // Security check helper
    const checkSecurityStatus = () => {
        const stored = localStorage.getItem('auth_security');
        if (stored) {
            const { attempts, timestamp } = JSON.parse(stored);
            const oneHour = 60 * 60 * 1000;
            if (Date.now() - timestamp < oneHour) {
                if (attempts >= 3) {
                    setShowLoginCaptcha(true);
                }
            } else {
                // Expired, clear it
                localStorage.removeItem('auth_security');
                setShowLoginCaptcha(false);
            }
        }
    };

    const recordFailedAttempt = () => {
        const stored = localStorage.getItem('auth_security');
        let attempts = 0;
        if (stored) {
            const data = JSON.parse(stored);
            attempts = data.attempts;
        }
        attempts++;
        localStorage.setItem('auth_security', JSON.stringify({
            attempts,
            timestamp: Date.now()
        }));

        if (attempts >= 3) {
            setShowLoginCaptcha(true);
        }
    };

    const clearSecurityCheck = () => {
        localStorage.removeItem('auth_security');
        setShowLoginCaptcha(false);
    };

    const isValidEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    // We still need to fetch full details because UserContext is 'lite'
    useEffect(() => {
        checkSecurityStatus();

        const loadFullProfile = async () => {
            if (user) {
                setLoadingProfile(true);
                try {
                    const docRef = doc(db, 'users', user.uid);
                    // Enable offline caching source
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        setProfileData(docSnap.data() as ProfileData);
                    } else {
                        const emailPrefix = user.email?.split('@')[0] || '';
                        setProfileData(prev => ({ ...prev, username: emailPrefix }));
                    }
                } catch (err) {
                    console.error("Error fetching full profile:", err);
                } finally {
                    setLoadingProfile(false);
                }
            }
        };

        if (user && !contextLoading) {
            loadFullProfile();
        }
    }, [user, contextLoading]);

    const handleSaveProfile = async () => {
        if (!user) {
            console.error("handleSaveProfile: No user logged in.");
            return;
        }
        console.log("handleSaveProfile: Starting save for user", user.uid, profileData);
        setSuccessMessage('');
        setError('');
        try {
            const userRef = doc(db, 'users', user.uid);
            console.log("handleSaveProfile: Writing to Firestore path", userRef.path);

            // Optimistic Update
            updateProfileLocally({
                username: profileData.username,
                avatarUrl: profileData.avatarUrl
            });

            await setDoc(userRef, profileData, { merge: true });
            console.log("handleSaveProfile: Firestore write complete.");

            refreshProfile().catch(console.error); // Background refresh

            setSuccessMessage('Profile details saved successfully.');
            // Auto hide success message after 3 seconds
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (err: any) {
            console.error("handleSaveProfile: ERROR", err);
            setError('Failed to save profile: ' + err.message + " (Check console for details)");
        }
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !user) return;

        // Check file size (2MB limit)
        if (file.size > 2 * 1024 * 1024) {
            setError('Image size must be less than 2MB.');
            return;
        }

        try {
            setLoadingProfile(true);
            // Optimistic UI
            const objectUrl = URL.createObjectURL(file);
            setProfileData({ ...profileData, avatarUrl: objectUrl });
            // @ts-ignore
            if (typeof updateProfileLocally === 'function') updateProfileLocally({ ...profileData, avatarUrl: objectUrl });
            const storageRef = ref(storage, `avatars/${user.uid}`);
            await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(storageRef);

            // Update local state and Firestore
            const updatedProfile = { ...profileData, avatarUrl: downloadURL };
            setProfileData(updatedProfile);
            await setDoc(doc(db, 'users', user.uid), { avatarUrl: downloadURL }, { merge: true });
            await refreshProfile(); // Update sidebar immediately

            setSuccessMessage('Avatar updated successfully!');
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (err: any) {
            setError('Failed to upload avatar: ' + err.message);
        } finally {
            setLoadingProfile(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        try {
            // Email Format Validation
            if (!isValidEmail(email)) {
                setError('Please enter a valid email address.');
                return;
            }

            // Security Check
            if (isLogin && showLoginCaptcha) {
                if (captchaInput !== generatedCaptcha) {
                    setError('Incorrect CAPTCHA code. Security check required.');
                    return;
                }
            }
            if (!isLogin) {
                if (captchaInput !== generatedCaptcha) {
                    setError('Incorrect CAPTCHA code. Please try again.');
                    return;
                }
            }

            await setPersistence(auth, browserSessionPersistence);

            if (isLogin) {
                await signInWithEmailAndPassword(auth, email, password);
                // Login Success!
                clearSecurityCheck();
            } else {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                await sendEmailVerification(userCredential.user);
                setSuccessMessage(`Account created! A verification email has been sent to ${email}. Please check your inbox.`);
                clearSecurityCheck();
            }

            setEmail('');
            setPassword('');
            setCaptchaInput('');
        } catch (err: any) {
            setError(err.message);
            if (isLogin) {
                recordFailedAttempt();
            }
        }
    };

    const handleLogout = async () => {
        await signOut(auth);
    };

    if (contextLoading) return <div className="min-h-screen bg-neutral-900 flex items-center justify-center text-white">Loading...</div>;

    if (user) {
        if (loadingProfile) return <div className="min-h-screen bg-neutral-900 flex items-center justify-center text-white">Loading Profile...</div>;

        return (
            <div className="min-h-screen bg-neutral-900 text-white p-8 flex flex-col items-center overflow-y-auto">
                <div className="max-w-4xl w-full">

                    {/* Header */}
                    <div className="flex justify-between items-center mb-8 border-b border-gray-700 pb-4">
                        <h1 className="text-3xl font-bold uppercase tracking-wide">Account Settings</h1>
                        <button onClick={handleLogout} className="text-gray-400 hover:text-white text-sm uppercase font-bold tracking-wider">Log Out</button>
                    </div>

                    {successMessage && <div className="mb-6 bg-green-900/50 border border-green-600 text-green-200 p-4 rounded shadow-lg animate-fade-in">{successMessage}</div>}
                    {error && <div className="mb-6 bg-red-900/50 border border-red-600 text-red-200 p-4 rounded shadow-lg animate-fade-in">{error}</div>}

                    <div className="bg-neutral-800/50 rounded-lg p-6 md:p-10 shadow-xl border border-neutral-700">

                        {/* Username */}
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8 items-center">
                            <div className="md:col-span-3 md:text-right text-gray-400 font-semibold text-sm">Username:</div>
                            <div className="md:col-span-9">
                                <input
                                    type="text"
                                    value={profileData.username}
                                    onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
                                    className="w-full bg-neutral-900 border border-gray-700 rounded p-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8 items-center">
                            <div className="md:col-span-3 md:text-right text-gray-400 font-semibold text-sm">Email:</div>
                            <div className="md:col-span-9 flex items-center space-x-4">
                                <input
                                    type="text"
                                    value={user.email || ''}
                                    readOnly
                                    className="flex-grow bg-neutral-900 border border-gray-700 rounded p-3 text-gray-400 cursor-not-allowed"
                                />
                                <button type="button" className="px-4 py-3 bg-neutral-700 hover:bg-neutral-600 rounded border border-gray-600 text-sm font-medium transition-colors">Change</button>
                            </div>
                        </div>

                        {/* Email Options */}
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8 items-start">
                            <div className="md:col-span-3 md:text-right text-gray-400 font-semibold text-sm pt-1">Email options:</div>
                            <div className="md:col-span-9">
                                <label className="flex items-center space-x-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={profileData.receiveNews}
                                        onChange={(e) => setProfileData({ ...profileData, receiveNews: e.target.checked })}
                                        className="form-checkbox h-5 w-5 text-blue-600 rounded bg-neutral-900 border-gray-700"
                                    />
                                    <span className="text-gray-300">Receive news and update emails</span>
                                </label>
                                <p className="mt-2 text-xs text-gray-500">You may find additional email options under Preferences.</p>
                            </div>
                        </div>

                        {/* Avatar */}
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8 items-center">
                            <div className="md:col-span-3 md:text-right text-gray-400 font-semibold text-sm">Avatar:</div>
                            <div className="md:col-span-9">
                                <div className="flex items-center space-x-4">
                                    <div
                                        className="h-24 w-24 rounded-full bg-indigo-600 flex items-center justify-center text-4xl font-bold text-white shadow-lg uppercase overflow-hidden cursor-pointer hover:opacity-80 transition-opacity relative group"
                                        onClick={() => fileInputRef.current?.click()}
                                    >
                                        {profileData.avatarUrl ? (
                                            <img src={profileData.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                                        ) : (
                                            <span>{profileData.username.charAt(0) || user.email?.charAt(0) || 'U'}</span>
                                        )}
                                        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <span className="text-xs">Change</span>
                                        </div>
                                    </div>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleFileChange}
                                        accept="image/*"
                                        className="hidden"
                                    />
                                    <span className="text-sm text-gray-500 italic">Click the image to change your avatar (Max 2MB)</span>
                                </div>
                            </div>
                        </div>

                        {/* Date of Birth */}
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8 items-start">
                            <div className="md:col-span-3 md:text-right text-gray-400 font-semibold text-sm pt-3">Date of birth:</div>
                            <div className="md:col-span-9 space-y-3">
                                <input
                                    type="date"
                                    value={profileData.dob}
                                    onChange={(e) => setProfileData({ ...profileData, dob: e.target.value })}
                                    className="w-full md:w-1/2 bg-neutral-900 border border-gray-700 rounded p-3 text-white focus:border-blue-500 outline-none"
                                />
                                <p className="text-xs text-gray-500">Once your birthday has been entered, it cannot be changed. Please contact an administrator if it is incorrect.</p>

                                <div className="space-y-2 pt-2">
                                    <label className="flex items-center space-x-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={profileData.showDobDayMonth}
                                            onChange={(e) => setProfileData({ ...profileData, showDobDayMonth: e.target.checked })}
                                            className="bg-neutral-900 border-gray-700 text-blue-600 rounded"
                                        />
                                        <span className="text-sm text-gray-300">Show day and month of birth</span>
                                    </label>
                                    <div className="pl-6">
                                        <label className="flex items-center space-x-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={profileData.showDobYear}
                                                onChange={(e) => setProfileData({ ...profileData, showDobYear: e.target.checked })}
                                                disabled={!profileData.showDobDayMonth}
                                                className="bg-neutral-900 border-gray-700 text-blue-600 rounded disabled:opacity-50"
                                            />
                                            <span className={`text-sm ${!profileData.showDobDayMonth ? 'text-gray-600' : 'text-gray-300'}`}>Show year of birth</span>
                                        </label>
                                        <p className="text-xs text-gray-600 mt-1 ml-6">This will allow people to see your age.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Location */}
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8 items-center">
                            <div className="md:col-span-3 md:text-right text-gray-400 font-semibold text-sm">
                                Location:<br />
                                <span className="text-xs font-normal text-gray-600">Required</span>
                            </div>
                            <div className="md:col-span-9">
                                <select
                                    value={profileData.location}
                                    onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                                    className="w-full bg-neutral-900 border border-gray-700 rounded p-3 text-white focus:border-blue-500 outline-none"
                                >
                                    <option value="">Select Country</option>
                                    {COUNTRIES.map(country => (
                                        <option key={country} value={country}>{country}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Website */}
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8 items-center">
                            <div className="md:col-span-3 md:text-right text-gray-400 font-semibold text-sm">Website:</div>
                            <div className="md:col-span-9">
                                <input
                                    type="text"
                                    value={profileData.website}
                                    onChange={(e) => setProfileData({ ...profileData, website: e.target.value })}
                                    placeholder="https://"
                                    className="w-full bg-neutral-900 border border-gray-700 rounded p-3 text-white focus:border-blue-500 outline-none"
                                />
                            </div>
                        </div>

                        {/* Gender */}
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8 items-start">
                            <div className="md:col-span-3 md:text-right text-gray-400 font-semibold text-sm pt-1">Gender:</div>
                            <div className="md:col-span-9 space-y-2">
                                <label className="flex items-center space-x-3 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="none"
                                        checked={profileData.gender === 'none'}
                                        onChange={() => setProfileData({ ...profileData, gender: 'none' })}
                                        className="bg-neutral-900 border-gray-700 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="text-gray-300">No selection</span>
                                </label>
                                <label className="flex items-center space-x-3 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="male"
                                        checked={profileData.gender === 'male'}
                                        onChange={() => setProfileData({ ...profileData, gender: 'male' })}
                                        className="bg-neutral-900 border-gray-700 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="text-gray-300">Male</span>
                                </label>
                                <label className="flex items-center space-x-3 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="female"
                                        checked={profileData.gender === 'female'}
                                        onChange={() => setProfileData({ ...profileData, gender: 'female' })}
                                        className="bg-neutral-900 border-gray-700 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="text-gray-300">Female</span>
                                </label>
                            </div>
                        </div>

                        {/* Submit Row */}
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-6 border-t border-gray-700">
                            <div className="md:col-span-3"></div>
                            <div className="md:col-span-9">
                                <button
                                    onClick={handleSaveProfile}
                                    disabled={loadingProfile}
                                    className="bg-sky-600 hover:bg-sky-500 text-white font-bold py-3 px-8 rounded text-sm uppercase tracking-wider transition-all shadow-lg text-center min-w-[150px]"
                                >
                                    {loadingProfile ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-neutral-900 text-white flex flex-col items-center py-12 px-4">
            {/* Header */}
            <h1 className="text-4xl md:text-5xl font-black mb-4 uppercase tracking-tight text-center">Your Account</h1>
            <p className="max-w-2xl text-center text-gray-300 mb-8 leading-relaxed">
                Bibalaya.com is a Bible teaching website that provides a sound and well organized method of Bible study using video classes, sermons, devos, books and articles all free to view and download for today's online seeker.
            </p>

            {/* Info Box */}
            <div className="bg-sky-100 text-gray-800 p-6 rounded-lg max-w-5xl w-full grid grid-cols-1 md:grid-cols-3 gap-6 text-center text-sm shadow-md mb-8">
                <div className="flex flex-col items-center">
                    <h3 className="font-bold mb-2">With your <span className="underline decoration-yellow-500 decoration-4">free</span> Bibalaya account you can:</h3>
                    <p>Bookmark your favorite lessons and series, synced automatically on all your devices.</p>
                </div>
                <div className="flex flex-col items-center pt-6 md:pt-0 border-t md:border-t-0 md:border-l border-gray-300 px-2">
                    <p>Track your progress through study plans, individual series and the entire Bible.</p>
                </div>
                <div className="flex flex-col items-center pt-6 md:pt-0 border-t md:border-t-0 md:border-l border-gray-300 px-2">
                    <p>Learn the Bible with video classes, quizzes, guided study plans, and earn a certificate when you finish.</p>
                </div>
            </div>

            {/* Login/Signup Toggle */}
            <div className="w-full max-w-5xl flex justify-start mb-2">
                {isLogin ? (
                    <div className="text-gray-400 text-sm">
                        <button onClick={() => setIsLogin(false)} className="hover:text-white transition-colors">Create an Account</button>
                        <span className="mx-2">Or</span>
                    </div>
                ) : (
                    <div className="text-gray-400 text-sm">
                        <button onClick={() => setIsLogin(true)} className="hover:text-white transition-colors">Log In</button>
                        <span className="mx-2">instead</span>
                    </div>
                )}
            </div>

            {/* Form Container */}
            <div className="w-full max-w-5xl bg-neutral-800 rounded-lg overflow-hidden shadow-2xl">
                {/* Form Header */}
                <div className="bg-gray-600 p-4">
                    <h2 className="text-xl font-bold uppercase tracking-wider text-black/70">
                        {isLogin ? 'Log In' : 'Create Account'}
                    </h2>
                </div>

                {/* Form Body */}
                <div className="p-8 md:p-12 bg-neutral-700/50">
                    <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
                        {error && <div className="bg-red-500/20 border border-red-500 text-red-100 p-3 rounded">{error}</div>}
                        {successMessage && <div className="bg-green-500/20 border border-green-500 text-green-100 p-3 rounded">{successMessage}</div>}

                        <div>
                            <label className="block text-xs font-bold uppercase mb-2 text-gray-300">Email</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-3 rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase mb-2 text-gray-300">
                                {isLogin ? 'Password (or Login Code)' : 'Password'}
                            </label>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-3 rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {(!isLogin || (isLogin && showLoginCaptcha)) && (
                            <div>
                                <label className="block text-xs font-bold uppercase mb-2 text-gray-300">
                                    {isLogin ? 'Security Check (Too many failed attempts)' : 'Security Check'}
                                </label>
                                <div className="space-y-3">
                                    <Captcha onCaptchaChange={setGeneratedCaptcha} />
                                    <input
                                        type="text"
                                        placeholder="Type the characters above"
                                        required
                                        value={captchaInput}
                                        onChange={(e) => setCaptchaInput(e.target.value)}
                                        className="w-full p-3 rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>
                        )}

                        <div>
                            <button
                                type="submit"
                                className="bg-sky-600 hover:bg-sky-500 text-white font-bold py-3 px-8 rounded-full text-sm uppercase tracking-wider transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Footer Links */}
            <div className="w-full max-w-5xl mt-4 text-xs text-gray-400">
                <p className="cursor-pointer hover:text-white">Forgot your password?</p>
                <p className="mt-1">Help: contact@bibalaya.com</p>
            </div>

        </div>
    );
};
