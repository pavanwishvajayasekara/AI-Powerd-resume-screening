import React, { useState, useEffect } from 'react';

export default function ClientSettings() {
    const [darkMode, setDarkMode] = useState(false);
    const [emailNotifs, setEmailNotifs] = useState(false);
    const [courseUpdates, setCourseUpdates] = useState(false);
    const [weeklySummary, setWeeklySummary] = useState(false);
    const [autoDelete, setAutoDelete] = useState(true);
    const [analyticsSharing, setAnalyticsSharing] = useState(false);

    useEffect(() => {
        // Initialize dark mode based on global class
        setDarkMode(document.documentElement.classList.contains('dark'));
    }, []);

    const toggleDarkMode = () => {
        const isDark = !darkMode;
        setDarkMode(isDark);
        if (isDark) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    };

    return (
        <div className="max-w-3xl mx-auto px-6 py-8 animate-fade-in text-slate-900 dark:text-slate-100 transition-colors duration-300">
            <div className="mb-10 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-violet-100 dark:bg-violet-900/40 flex items-center justify-center text-violet-600 dark:text-violet-400">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                </div>
                <div>
                    <h2 className="text-2xl font-black tracking-tight">Settings</h2>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">Manage your account and preferences</p>
                </div>
            </div>

            <div className="space-y-6">
                {/* Appearance Section */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-8 transition-colors duration-300">
                    <h3 className="font-bold mb-1 flex items-center gap-2">
                        <svg className="w-5 h-5 text-violet-600 dark:text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        Appearance
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">Customize the look and feel of the app</p>

                    <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 flex items-center justify-between border border-transparent dark:border-slate-700/50">
                        <div className="flex items-center gap-3">
                            <svg className="w-5 h-5 text-slate-600 dark:text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                            </svg>
                            <div>
                                <p className="font-semibold text-sm">Dark Mode</p>
                                <p className="text-slate-500 dark:text-slate-400 text-xs">Switch to a darker color scheme</p>
                            </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" checked={darkMode} onChange={toggleDarkMode} />
                            <div className="w-11 h-6 bg-slate-200 dark:bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-600"></div>
                        </label>
                    </div>
                </div>

                {/* Profile Section */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-8 transition-colors duration-300">
                    <h3 className="font-bold mb-1 flex items-center gap-2">
                        <svg className="w-5 h-5 text-violet-600 dark:text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Profile
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">Update your personal information</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Full Name</label>
                            <input type="text" defaultValue="John Doe" className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Email</label>
                            <input type="email" defaultValue="john@example.com" className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all" />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Job Title</label>
                            <input type="text" defaultValue="Software Engineer" className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all" />
                        </div>
                    </div>

                    <button className="bg-violet-600 hover:bg-violet-700 text-white font-bold py-2.5 px-6 rounded-xl text-sm transition-all active:scale-95 shadow-md shadow-violet-200 dark:shadow-none">
                        Save Changes
                    </button>
                </div>

                {/* Notifications Section */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-8 transition-colors duration-300">
                    <h3 className="font-bold mb-1 flex items-center gap-2">
                        <svg className="w-5 h-5 text-violet-600 dark:text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                        Notifications
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">Choose what updates you receive</p>

                    <div className="space-y-3">
                        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 flex items-center justify-between border border-transparent dark:border-slate-700/50">
                            <div>
                                <p className="font-semibold text-sm">Email Notifications</p>
                                <p className="text-slate-500 dark:text-slate-400 text-xs">Receive analysis results via email</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" checked={emailNotifs} onChange={() => setEmailNotifs(!emailNotifs)} />
                                <div className="w-11 h-6 bg-slate-200 dark:bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-600"></div>
                            </label>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 flex items-center justify-between border border-transparent dark:border-slate-700/50">
                            <div>
                                <p className="font-semibold text-sm">Course Updates</p>
                                <p className="text-slate-500 dark:text-slate-400 text-xs">Get notified about new course recommendations</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" checked={courseUpdates} onChange={() => setCourseUpdates(!courseUpdates)} />
                                <div className="w-11 h-6 bg-slate-200 dark:bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-600"></div>
                            </label>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 flex items-center justify-between border border-transparent dark:border-slate-700/50">
                            <div>
                                <p className="font-semibold text-sm">Weekly Summary</p>
                                <p className="text-slate-500 dark:text-slate-400 text-xs">Receive a weekly report of your progress</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" checked={weeklySummary} onChange={() => setWeeklySummary(!weeklySummary)} />
                                <div className="w-11 h-6 bg-slate-200 dark:bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-600"></div>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Privacy & Security Section */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-8 transition-colors duration-300">
                    <h3 className="font-bold mb-1 flex items-center gap-2">
                        <svg className="w-5 h-5 text-violet-600 dark:text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        Privacy & Security
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">Manage your data and security preferences</p>

                    <div className="space-y-3 mb-8">
                        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 flex items-center justify-between border border-transparent dark:border-slate-700/50">
                            <div>
                                <p className="font-semibold text-sm">Auto-delete CV data</p>
                                <p className="text-slate-500 dark:text-slate-400 text-xs">Automatically delete uploaded CVs after 30 days</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" checked={autoDelete} onChange={() => setAutoDelete(!autoDelete)} />
                                <div className="w-11 h-6 bg-slate-200 dark:bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-600"></div>
                            </label>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 flex items-center justify-between border border-transparent dark:border-slate-700/50">
                            <div>
                                <p className="font-semibold text-sm">Analytics sharing</p>
                                <p className="text-slate-500 dark:text-slate-400 text-xs">Help improve ResuMatch by sharing anonymous usage data</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" checked={analyticsSharing} onChange={() => setAnalyticsSharing(!analyticsSharing)} />
                                <div className="w-11 h-6 bg-slate-200 dark:bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-600"></div>
                            </label>
                        </div>
                    </div>

                    <button className="bg-rose-600 hover:bg-rose-700 text-white font-bold py-2.5 px-6 rounded-xl text-sm transition-all active:scale-95 shadow-md shadow-rose-200 dark:shadow-none">
                        Delete Account
                    </button>
                </div>
            </div>
        </div>
    );
}
