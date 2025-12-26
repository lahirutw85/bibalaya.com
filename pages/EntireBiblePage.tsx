import React from 'react';

interface CourseData {
    id: string;
    title: string;
    lessonsCount: number;
    progress: number;
    color: string;
}

const COURSES: CourseData[] = [
    { id: 'genesis', title: 'Genesis', lessonsCount: 50, progress: 0, color: 'bg-sky-700' },
    { id: 'exodus', title: 'Exodus for Beginners', lessonsCount: 13, progress: 0, color: 'bg-purple-700' },
    { id: 'leviticus', title: 'Leviticus for Beginners', lessonsCount: 13, progress: 0, color: 'bg-amber-700' },
    { id: 'numbers-deuteronomy', title: 'Numbers / Deuteronomy for Beginners', lessonsCount: 10, progress: 0, color: 'bg-green-700' },
    { id: 'joshua-judges', title: 'Joshua / Judges for Beginners', lessonsCount: 12, progress: 0, color: 'bg-yellow-700' },
    { id: 'ruth-esther', title: 'Ruth/Esther for Beginners', lessonsCount: 2, progress: 0, color: 'bg-fuchsia-600' },
    { id: 'samuel', title: 'I & II Samuel for Beginners', lessonsCount: 4, progress: 0, color: 'bg-blue-600' },
    { id: 'kings', title: 'I & II Kings for Beginners', lessonsCount: 4, progress: 0, color: 'bg-indigo-700' },
];

export const EntireBiblePage: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen bg-neutral-900 text-white">
            {/* Header Section */}
            <div className="bg-neutral-800 p-8 md:p-12 text-center shadow-lg">
                {/* Total Progress Bar (Mock) */}
                <div className="max-w-4xl mx-auto mb-8 flex items-center gap-4 text-xs font-bold text-gray-400">
                    <div className="flex flex-col items-center">
                        <span className="text-2xl text-blue-500">0%</span>
                        <span>TOTAL PROGRESS</span>
                    </div>
                    <div className="flex-1 h-3 bg-gray-700 rounded-full relative overflow-hidden">
                        <div
                            className="absolute top-0 left-0 h-full bg-blue-500 w-0"
                            style={{ width: '0%', backgroundImage: 'linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent)', backgroundSize: '1rem 1rem' }}
                        ></div>
                    </div>
                    <span className="hover:text-white cursor-pointer transition-colors">Sign Up</span>
                </div>

                <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight uppercase">
                    Study the Entire Bible
                </h1>
                <p className="max-w-2xl mx-auto text-gray-300 text-lg leading-relaxed">
                    Join Mike Mazzalongo in an in-depth study of every book of the Bible.
                    Strengthen your faith and understanding with clear, insightful lessons.
                </p>
                <p className="mt-2 text-gray-400 font-medium">435 lessons</p>
            </div>

            {/* Courses List */}
            <div className="flex-1 w-full bg-neutral-900">
                {COURSES.map((course) => (
                    <div
                        key={course.id}
                        className={`relative group h-20 md:h-24 w-full flex items-end overflow-hidden border-b border-gray-800 transition-all hover:brightness-110 ${course.color}`}
                    >
                        {/* Background/Pattern Overlay - Simulating the geometric patterns in the screenshot roughly with gradients/opacity */}
                        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent"></div>

                        {/* Content Container */}
                        <div className="absolute inset-0 flex flex-col justify-between p-2 md:p-3 z-10">
                            {/* Top Row: % */}
                            <span className="text-xs font-bold text-white/50 bg-black/20 px-2 py-0.5 rounded-full w-fit">{course.progress}%</span>

                            {/* Bottom Row: Title & Lessons */}
                            <div className="flex justify-between items-end w-full">
                                <h2 className="text-lg md:text-xl font-bold text-white drop-shadow-md truncate pr-4">
                                    {course.title}
                                </h2>
                                <span className="text-xs md:text-sm font-medium text-white/80 whitespace-nowrap">
                                    {course.lessonsCount} lessons
                                </span>
                            </div>
                        </div>

                        {/* Progress Bar Background (Empty State) */}
                        <div className="absolute bottom-0 left-0 w-full h-1.5 bg-black/20">
                            {/* Actual Progress Bar */}
                            <div
                                className="h-full bg-white/50"
                                style={{ width: `${course.progress}%` }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
