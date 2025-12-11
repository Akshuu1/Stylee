import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Instagram, Twitter, Linkedin } from 'lucide-react';

const Contact = () => {
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSent, setIsSent] = useState(false);
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 300], [0, -50]);
    const y2 = useTransform(scrollY, [0, 300], [0, 50]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate sending
        setTimeout(() => {
            setIsSent(true);
            setFormState({ name: '', email: '', subject: '', message: '' });
            setTimeout(() => setIsSent(false), 3000);
        }, 1000);
    };

    const handleChange = (e) => {
        setFormState({ ...formState, [e.target.name]: e.target.value });
    };

    return (
        <div style={{ fontFamily: "Gilroy-Light" }} className="min-h-screen bg-gradient-to-br from-[#004D54] via-[#00383D] to-[#001F22] text-white pt-24 pb-12 px-4 sm:px-8 relative overflow-hidden">

            {/* Background Blobs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    style={{ y: y1 }}
                    className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-[#CDEA68] rounded-full blur-3xl opacity-[0.05]"
                />
                <motion.div
                    style={{ y: y2 }}
                    className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-[#CDEA68] rounded-full blur-3xl opacity-[0.05]"
                />
                {/* Geometric patterns */}
                <div className="absolute top-40 right-1/4 w-48 h-48 sm:w-64 sm:h-64 border border-[#CDEA68]/10 rotate-45 rounded-3xl" />
                <div className="absolute bottom-40 left-1/4 w-32 h-32 sm:w-48 sm:h-48 border border-[#CDEA68]/10 -rotate-12 rounded-2xl" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">

                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-16 text-center lg:text-left"
                >
                    <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 mb-4">
                        Get in <span className="text-[#CDEA68]">Touch</span>
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl max-w-2xl">
                        Have a question or just want to verify our authenticity? We're here to help. Reach out to us and we'll respond as soon as possible.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">

                    {/* Info Panel */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="space-y-12"
                    >
                        {/* Contact Details */}
                        <div className="space-y-8">
                            <div className="flex items-start gap-4 group">
                                <div className="p-3 bg-[#CDEA68]/10 rounded-2xl group-hover:bg-[#CDEA68]/20 transition-colors duration-300 border border-[#CDEA68]/20">
                                    <Mail className="w-6 h-6 text-[#CDEA68]" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-1 text-[#CDEA68]">Email Us</h3>
                                    <p className="text-gray-400">support@stylee.com</p>
                                    <p className="text-gray-400">partnerships@stylee.com</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 group">
                                <div className="p-3 bg-[#CDEA68]/10 rounded-2xl group-hover:bg-[#CDEA68]/20 transition-colors duration-300 border border-[#CDEA68]/20">
                                    <Phone className="w-6 h-6 text-[#CDEA68]" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-1 text-[#CDEA68]">Call Us</h3>
                                    <p className="text-gray-400">+1 (555) 123-4567</p>
                                    <p className="text-gray-400">Mon - Fri, 9am - 6pm EST</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 group">
                                <div className="p-3 bg-[#CDEA68]/10 rounded-2xl group-hover:bg-[#CDEA68]/20 transition-colors duration-300 border border-[#CDEA68]/20">
                                    <MapPin className="w-6 h-6 text-[#CDEA68]" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-1 text-[#CDEA68]">Visit Us</h3>
                                    <p className="text-gray-400">123 Fashion Avenue</p>
                                    <p className="text-gray-400">New York, NY 10010</p>
                                </div>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div>
                            <h3 className="text-2xl font-semibold mb-6 text-white">Follow Us</h3>
                            <div className="flex gap-4">
                                {[
                                    { icon: Instagram, href: "#" },
                                    { icon: Twitter, href: "#" },
                                    { icon: Linkedin, href: "#" }
                                ].map((social, index) => (
                                    <a
                                        key={index}
                                        href={social.href}
                                        className="w-12 h-12 bg-zinc-900/60 rounded-full flex items-center justify-center hover:bg-[#CDEA68] hover:text-[#004D54] transition-all duration-300 transform hover:scale-110 border border-[#CDEA68]/20 hover:border-[#CDEA68]"
                                    >
                                        <social.icon className="w-5 h-5" />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Form Panel */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <form onSubmit={handleSubmit} className="bg-zinc-900/60 backdrop-blur-xl border border-[#CDEA68]/20 rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden">
                            {/* Decorative Gradient Line */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#CDEA68] to-transparent opacity-50"></div>

                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm text-[#CDEA68] font-semibold ml-1">Your Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formState.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full bg-zinc-800/80 border border-zinc-700/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#CDEA68] focus:ring-1 focus:ring-[#CDEA68] transition-all placeholder-zinc-500"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm text-[#CDEA68] font-semibold ml-1">Your Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formState.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full bg-zinc-800/80 border border-zinc-700/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#CDEA68] focus:ring-1 focus:ring-[#CDEA68] transition-all placeholder-zinc-500"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm text-[#CDEA68] font-semibold ml-1">Subject</label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formState.subject}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-zinc-800/80 border border-zinc-700/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#CDEA68] focus:ring-1 focus:ring-[#CDEA68] transition-all placeholder-zinc-500"
                                        placeholder="Collaboration, Support, etc."
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm text-[#CDEA68] font-semibold ml-1">Message</label>
                                    <textarea
                                        name="message"
                                        value={formState.message}
                                        onChange={handleChange}
                                        required
                                        rows="5"
                                        className="w-full bg-zinc-800/80 border border-zinc-700/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#CDEA68] focus:ring-1 focus:ring-[#CDEA68] transition-all placeholder-zinc-500 resize-none"
                                        placeholder="Write your message here..."
                                    ></textarea>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    className="w-full bg-[#CDEA68] text-[#004D54] font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#dfff7a] transition-colors shadow-lg shadow-[#CDEA68]/10"
                                >
                                    {isSent ? (
                                        <span className="flex items-center gap-2">Sent Successfully!</span>
                                    ) : (
                                        <>
                                            Send Message <Send className="w-5 h-5" />
                                        </>
                                    )}
                                </motion.button>
                            </div>
                        </form>
                    </motion.div>

                </div>
            </div>
        </div>
    );
};

export default Contact;
