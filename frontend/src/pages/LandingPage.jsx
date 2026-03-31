import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, FileSearch, Target, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

const LandingPage = () => {
    // Animation variants
    const fadeUpVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    return (
        <div className="min-h-screen bg-[#FAFAFA] text-slate-900 font-sans selection:bg-purple-200">
            {/* Navigation */}
            <motion.nav
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="fixed top-0 left-0 right-0 py-4 px-6 md:px-12 bg-white/80 backdrop-blur-md z-50 border-b border-gray-100 flex items-center justify-between"
            >
                <div className="flex items-center gap-2">
                    {/* Logo */}
                    <div className="w-8 h-8 rounded bg-purple-600 flex items-center justify-center text-white font-bold text-sm">
                        CV
                    </div>
                    <span className="font-bold text-xl tracking-tight text-slate-900">ResuMatch</span>
                </div>
                <div className="flex items-center gap-6">
                    <Link to="/login" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
                        Sign In
                    </Link>
                    <Link
                        to="/login"
                        className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition-colors"
                    >
                        Get Started
                    </Link>
                </div>
            </motion.nav>

            {/* Hero Section */}
            <section className="pt-40 pb-20 px-6 max-w-5xl mx-auto flex flex-col items-center text-center">
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-col items-center"
                >
                    {/* Badge */}
                    <motion.div variants={fadeUpVariants} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-sm font-medium mb-8">
                        <Sparkles className="w-4 h-4" />
                        AI-Powered Resume Analysis
                    </motion.div>

                    {/* Heading */}
                    <motion.h1 variants={fadeUpVariants} className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 leading-[1.1]">
                        Match Your CV to <br className="hidden md:block" />
                        <span className="text-purple-600 relative">
                            Any Job
                            <motion.span
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
                                className="absolute bottom-1 left-0 w-full h-3 bg-purple-200/50 -z-10 rounded origin-left"
                            ></motion.span>
                        </span> Instantly
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p variants={fadeUpVariants} className="max-w-2xl text-lg md:text-xl text-slate-500 mb-10 leading-relaxed">
                        Upload your resume and job description. Get instant match rates, skill gap analysis, and personalized course recommendations.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div variants={fadeUpVariants} className="flex flex-col sm:flex-row items-center gap-4">
                        <Link
                            to="/login"
                            className="px-8 py-3.5 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-xl transition-all shadow-lg shadow-purple-600/20 flex items-center gap-2 text-base w-full sm:w-auto justify-center group"
                        >
                            Start Free Analysis
                            <motion.div
                                className="inline-block"
                                whileHover={{ x: 4 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                                <ArrowRight className="w-4 h-4" />
                            </motion.div>
                        </Link>
                        <Link
                            to="/login"
                            className="px-8 py-3.5 bg-white border border-gray-200 hover:bg-gray-50 text-slate-700 font-medium rounded-xl transition-all flex items-center gap-2 text-base w-full sm:w-auto justify-center"
                        >
                            Sign In
                        </Link>
                    </motion.div>
                </motion.div>
            </section>

            {/* Decorative background nodes (simulated with CSS circles for the faint background effect) */}
            <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
                <motion.div
                    animate={{ scale: [1, 1.05, 1], opacity: [0.4, 0.5, 0.4] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[20%] left-[10%] w-96 h-96 bg-purple-100/40 rounded-full blur-[100px]"
                />
                <motion.div
                    animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.6, 0.5] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute top-[30%] right-[5%] w-[30rem] h-[30rem] bg-indigo-50/50 rounded-full blur-[100px]"
                />
            </div>

            {/* How It Works Section */}
            <section className="py-24 px-6 bg-white/50">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={fadeUpVariants}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">How It Works</h2>
                        <p className="text-slate-500 text-lg">Four simple steps to optimize your job applications</p>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                        {/* Card 1 */}
                        <motion.div variants={fadeUpVariants} whileHover={{ y: -5 }} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600 mb-6 border border-purple-100">
                                <FileSearch className="w-6 h-6" />
                            </div>
                            <h3 className="font-semibold text-lg text-slate-900 mb-3">Smart CV Parsing</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">
                                Upload your resume and we extract key skills, experience, and qualifications automatically.
                            </p>
                        </motion.div>

                        {/* Card 2 */}
                        <motion.div variants={fadeUpVariants} whileHover={{ y: -5 }} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600 mb-6 border border-purple-100">
                                <Target className="w-6 h-6" />
                            </div>
                            <h3 className="font-semibold text-lg text-slate-900 mb-3">Match Rate Analysis</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">
                                See how well your CV matches any job description with a detailed percentage breakdown.
                            </p>
                        </motion.div>

                        {/* Card 3 */}
                        <motion.div variants={fadeUpVariants} whileHover={{ y: -5 }} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600 mb-6 border border-purple-100">
                                <BookOpen className="w-6 h-6" />
                            </div>
                            <h3 className="font-semibold text-lg text-slate-900 mb-3">Course Recommendations</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">
                                Get personalized course suggestions to fill skill gaps and boost your profile.
                            </p>
                        </motion.div>

                        {/* Card 4 */}
                        <motion.div variants={fadeUpVariants} whileHover={{ y: -5 }} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600 mb-6 border border-purple-100">
                                <Sparkles className="w-6 h-6" />
                            </div>
                            <h3 className="font-semibold text-lg text-slate-900 mb-3">Improvement Tips</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">
                                Receive actionable suggestions to make your resume stand out to recruiters.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 px-6 max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="bg-purple-600 rounded-[2rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-purple-600/20"
                >
                    <div className="relative z-10 flex flex-col items-center">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to Land Your Dream Job?</h2>
                        <p className="text-purple-100 text-lg md:text-xl max-w-2xl mb-10">
                            Join thousands of professionals who improved their resumes and found better career opportunities.
                        </p>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Link
                                to="/login"
                                className="px-8 py-3.5 bg-white text-slate-900 font-semibold rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-2"
                            >
                                Get Started Free <ArrowRight className="w-4 h-4" />
                            </Link>
                        </motion.div>
                    </div>

                    {/* Background circles for CTA */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl origin-bottom-right"
                    />
                    <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                        className="absolute bottom-0 right-0 w-80 h-80 bg-purple-900/20 rounded-full blur-3xl origin-top-left"
                    />
                </motion.div>
            </section>

            {/* Footer */}
            <footer className="py-8 text-center text-slate-500 border-t border-gray-100 bg-white">
                <p className="text-sm">© 2026 ResuMatch. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default LandingPage;
