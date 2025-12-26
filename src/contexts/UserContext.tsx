import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

export interface UserProfile {
    username: string;
    avatarUrl?: string; // Optional avatar URL
}

interface UserContextType {
    user: User | null;
    profile: UserProfile | null;
    loading: boolean;
    refreshProfile: () => Promise<void>;
    updateProfileLocally: (newProfile: UserProfile) => void;
}

const UserContext = createContext<UserContextType>({
    user: null,
    profile: null,
    loading: true,
    refreshProfile: async () => { },
    updateProfileLocally: () => { },
});

export const useUser = () => useContext(UserContext);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchProfile = async (uid: string) => {
        try {
            const docRef = doc(db, 'users', uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                setProfile({
                    username: data.username || '',
                    avatarUrl: data.avatarUrl
                });
            } else {
                setProfile(null);
            }
        } catch (error) {
            console.error("Error fetching profile context:", error);
        }
    };

    const refreshProfile = async () => {
        if (user) {
            await fetchProfile(user.uid);
        }
    };

    const updateProfileLocally = (newProfile: UserProfile) => {
        setProfile(newProfile);
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                await fetchProfile(currentUser.uid);
            } else {
                setProfile(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <UserContext.Provider value={{ user, profile, loading, refreshProfile, updateProfileLocally }}>
            {children}
        </UserContext.Provider>
    );
};
