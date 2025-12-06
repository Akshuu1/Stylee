import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Instagram, Twitter, Linkedin } from 'lucide-react';

const Contact = () => {
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSent, setIsSent] = useState(false);

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
        <div className="min-h-screen bg-[#0a0a0a] text-white pt-24 pb-12 px-4 sm:px-8 relative overflow-hidden font-['Gilroy']">

            {/* Background Blobs */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-[#CDEA68] rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob"></div>
                <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-teal-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-2000"></div>
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
                                <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-[#CDEA68]/20 transition-colors duration-300">
                                    <Mail className="w-6 h-6 text-[#CDEA68]" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-1">Email Us</h3>
                                    <p className="text-gray-400">support@stylee.com</p>
                                    <p className="text-gray-400">partnerships@stylee.com</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 group">
                                <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-[#CDEA68]/20 transition-colors duration-300">
                                    <Phone className="w-6 h-6 text-[#CDEA68]" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-1">Call Us</h3>
                                    <p className="text-gray-400">+1 (555) 123-4567</p>
                                    <p className="text-gray-400">Mon - Fri, 9am - 6pm EST</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 group">
                                <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-[#CDEA68]/20 transition-colors duration-300">
                                    <MapPin className="w-6 h-6 text-[#CDEA68]" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-1">Visit Us</h3>
                                    <p className="text-gray-400">123 Fashion Avenue</p>
                                    <p className="text-gray-400">New York, NY 10010</p>
                                </div>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div>
                            <h3 className="text-2xl font-semibold mb-6">Follow Us</h3>
                            <div className="flex gap-4">
                                {[
                                    { icon: Instagram, href: "#" },
                                    { icon: Twitter, href: "#" },
                                    { icon: Linkedin, href: "#" }
                                ].map((social, index) => (
                                    <a
                                        key={index}
                                        href={social.href}
                                        className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center hover:bg-[#CDEA68] hover:text-black transition-all duration-300 transform hover:scale-110 border border-white/10"
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
                        <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden">
                            {/* Decorative Gradient Line */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#CDEA68] to-transparent opacity-50"></div>

                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400 ml-1">Your Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formState.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#CDEA68]/50 focus:ring-1 focus:ring-[#CDEA68]/50 transition-all placeholder-gray-600"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400 ml-1">Your Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formState.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#CDEA68]/50 focus:ring-1 focus:ring-[#CDEA68]/50 transition-all placeholder-gray-600"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400 ml-1">Subject</label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formState.subject}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#CDEA68]/50 focus:ring-1 focus:ring-[#CDEA68]/50 transition-all placeholder-gray-600"
                                        placeholder="Collaboration, Support, etc."
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400 ml-1">Message</label>
                                    <textarea
                                        name="message"
                                        value={formState.message}
                                        onChange={handleChange}
                                        required
                                        rows="5"
                                        className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#CDEA68]/50 focus:ring-1 focus:ring-[#CDEA68]/50 transition-all placeholder-gray-600 resize-none"
                                        placeholder="Write your message here..."
                                    ></textarea>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    className="w-full bg-[#CDEA68] text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#b5d152] transition-colors"
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
