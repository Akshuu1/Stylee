import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, Heart, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AboutPage = () => {
    const navigate = useNavigate();

    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white pt-24 pb-12 px-4 sm:px-8 relative overflow-hidden font-['Gilroy']">

            {/* Background Blobs */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[20%] w-96 h-96 bg-[#CDEA68] rounded-full mix-blend-multiply filter blur-[128px] opacity-10 animate-blob"></div>
                <div className="absolute bottom-[10%] right-[10%] w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-10 animate-blob animation-delay-2000"></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">

                {/* Back Button */}
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 text-gray-400 hover:text-[#CDEA68] transition-colors mb-8 group"
                >
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Back to Home
                </button>

                {/* Header */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                    className="mb-20 text-center"
                >
                    <h1 className="text-5xl md:text-8xl font-bold mb-6">
                        We Are <span className="text-[#CDEA68] font-['Sephora_Sans']">Stylee</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                        Redefining the intersection of luxury fashion and digital innovation. We don't just follow trends; we set the rhythm for the future of style.
                    </p>
                </motion.div>

                {/* Content Sections */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center mb-32">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <img
                            src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80"
                            alt="Fashion Design Studio"
                            className="rounded-3xl shadow-2xl grayscale hover:grayscale-0 transition-all duration-500"
                        />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="space-y-8"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold">Our <span className="text-[#CDEA68]">Philosophy</span></h2>
                        <p className="text-gray-300 text-lg leading-relaxed">
                            Stylee was born from a simple yet ambitious idea: that fashion should be as dynamic as the people who wear it. We believe in the power of self-expression through fabric, cut, and color.
                        </p>
                        <p className="text-gray-300 text-lg leading-relaxed">
                            Our team of designers and curators works tirelessly to bridge the gap between high-end runway aesthetics and everyday streetwear. Every piece in our collection tells a story—your story.
                        </p>

                        <div className="grid grid-cols-2 gap-6 mt-8">
                            <div className="p-6 bg-white/5 rounded-2xl border border-white/10 hover:border-[#CDEA68]/50 transition-colors">
                                <Star className="text-[#CDEA68] mb-4" size={32} />
                                <h3 className="text-xl font-bold mb-2">Premium Quality</h3>
                                <p className="text-sm text-gray-400">Handpicked materials that stand the test of time.</p>
                            </div>
                            <div className="p-6 bg-white/5 rounded-2xl border border-white/10 hover:border-[#CDEA68]/50 transition-colors">
                                <Zap className="text-[#CDEA68] mb-4" size={32} />
                                <h3 className="text-xl font-bold mb-2">Trend Setting</h3>
                                <p className="text-sm text-gray-400">Always ahead of the curve with fresh drops.</p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Values Section */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="bg-[#CDEA68] text-black rounded-3xl p-12 md:p-20 text-center relative overflow-hidden"
                >
                    <div className="relative z-10 max-w-4xl mx-auto space-y-8">
                        <Heart className="mx-auto w-16 h-16 animate-pulse" />
                        <h2 className="text-4xl md:text-6xl font-bold font-['Sephora_Sans']">Crafted with Passion.</h2>
                        <p className="text-xl md:text-2xl font-medium">
                            "Fashion is not something that exists in dresses only. Fashion is in the sky, in the street, fashion has to do with ideas, the way we live, what is happening."
                        </p>
                        <p className="text-lg opacity-70">- Coco Chanel (Adapted for Stylee)</p>
                    </div>
                    {/* Decorative Circles */}
                    <div className="absolute -top-20 -left-20 w-64 h-64 bg-white/20 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-black/10 rounded-full blur-3xl"></div>
                </motion.div>

            </div>
        </div>
    );
};

export default AboutPage;
