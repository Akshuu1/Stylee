import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Palette, Sun, Moon, Sparkles, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ColorBlock = ({ color, name, hex }) => (
    <div className="flex flex-col items-center gap-2 group cursor-pointer">
        <motion.div
            whileHover={{ scale: 1.1, borderRadius: "50%" }}
            className={`w-24 h-24 rounded-2xl shadow-lg transition-all duration-300 relative overflow-hidden`}
            style={{ backgroundColor: hex }}
        >
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
        </motion.div>
        <p className="text-zinc-400 font-medium group-hover:text-white transition-colors">{name}</p>
        <p className="text-zinc-600 text-xs uppercase">{hex}</p>
    </div>
);

const Section = ({ title, children, className = "" }) => (
    <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, margin: "-100px" }}
        className={`mb-32 ${className}`}
    >
        <h2 style={{ fontFamily: "Sephora Sans" }} className="text-5xl md:text-7xl mb-12 text-[#CDEA68] uppercase tracking-tighter">{title}</h2>
        {children}
    </motion.div>
);

const SeasonCard = ({ title, characteristics, colors,image, imagePlaceholder }) => (
    <div className="bg-zinc-800 rounded-3xl overflow-hidden border border-zinc-700 hover:border-[#CDEA68] transition-all duration-500 group">
        <div className="h-48 bg-zinc-700 relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center text-zinc-500 font-mono">
                <img src={image} alt={imagePlaceholder} className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-700' />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-800 to-transparent" />
            <h3 style={{ fontFamily: "Sephora Sans" }} className="absolute bottom-4 left-6 text-3xl font-bold text-white group-hover:text-[#CDEA68] transition-colors">{title}</h3>
        </div>
        <div className="p-8">
            <p className="text-zinc-400 mb-6 leading-relaxed" style={{ fontFamily: "Gilroy-Light" }}>{characteristics}</p>
            <div className="flex gap-2">
                {colors.map((c, i) => (
                    <div key={i} className="w-8 h-8 rounded-full border border-white/10" style={{ backgroundColor: c }} title={c} />
                ))}
            </div>
        </div>
    </div>
);

const ColorTheory = () => {
    const [activePsych, setActivePsych] = useState(null);
    const navigate = useNavigate();

    return (
        <div className="w-full min-h-screen bg-zinc-900 text-white pt-24 px-5 md:px-20 pb-20 overflow-hidden">
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-purple-500/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-blue-500/10 rounded-full blur-[120px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="mb-32 relative z-10"
            >
                <h1 style={{ fontFamily: "Sephora Sans" }} className="text-7xl md:text-[10vw] leading-[0.9] mb-8">
                    Color <br /><span className="text-zinc-800 text-stroke-white text-stroke-2">Mastery</span>
                </h1>
                <p style={{ fontFamily: "Gilroy-Light" }} className="text-xl md:text-3xl text-zinc-400 max-w-2xl leading-relaxed">
                    Color is the first thing people notice. Learn to wield it to influence mood, perception, and personal radiance.
                </p>
            </motion.div>
            <Section title="Psychology of Color">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {[
                        { color: "Red", mood: "Passion, Power", hex: "#ef4444" },
                        { color: "Blue", mood: "Trust, Calm", hex: "#3b82f6" },
                        { color: "Yellow", mood: "Optimism, Energy", hex: "#eab308" },
                        { color: "Green", mood: "Growth, Balance", hex: "#22c55e" },
                        { color: "Purple", mood: "Luxury, Wisdom", hex: "#a855f7" },
                        { color: "Black", mood: "Mystery, Elegance", hex: "#000000" },
                    ].map((item, idx) => (
                        <motion.div
                            key={idx}
                            onHoverStart={() => setActivePsych(idx)}
                            onHoverEnd={() => setActivePsych(null)}
                            className={`h-[400px] rounded-full border border-zinc-700 flex flex-col items-center justify-end pb-10 transition-all duration-500 cursor-pointer ${activePsych === idx ? 'bg-zinc-800 scale-105 border-transparent' : 'bg-transparent'}`}
                        >
                            <div className={`w-4 h-4 rounded-full mb-8 transition-all duration-500 ${activePsych === idx ? 'scale-[5]' : 'scale-100'}`} style={{ backgroundColor: item.hex }} />
                            <h3 className="text-lg font-bold text-white -rotate-90 origin-center translate-y-[-50px]" style={{ fontFamily: "Sephora Sans" }}>{item.color}</h3>
                            <p className={`absolute top-20 text-center px-4 text-sm text-zinc-300 transition-opacity duration-300 ${activePsych === idx ? 'opacity-100' : 'opacity-0'}`} style={{ fontFamily: "Gilroy-Light" }}>
                                {item.mood}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </Section>

            <Section title="The Science of Color">
                <div className="flex flex-col lg:flex-row items-center gap-20 relative z-10">
                    <div className="lg:w-1/2 relative flex justify-center">
                        <div className="relative w-[400px] h-[400px]">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 rounded-full border-[20px] border-zinc-800 border-l-[#CDEA68] border-r-blue-500 border-t-red-500 border-b-yellow-500 blur-3xl opacity-30"
                            />
                            <div className="absolute inset-0 rounded-full border border-zinc-700 flex items-center justify-center">
                                <div className="text-center">
                                    <h3 className="text-2xl font-bold mb-2 text-[#CDEA68]" style={{ fontFamily: "Sephora Sans" }}>The Wheel</h3>
                                    <p className="text-sm text-zinc-500 max-w-[150px]" style={{ fontFamily: "Gilroy-Light" }}>Isaac Newton's spectrum organized into a circle.</p>
                                </div>
                            </div>
                            {/* Orbiting Planets */}
                            <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute inset-0">
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-red-500 rounded-full blur-md" />
                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-16 h-16 bg-green-500 rounded-full blur-md" />
                            </motion.div>
                        </div>
                    </div>
                    <div className="lg:w-1/2 space-y-8">
                        <div className="bg-zinc-800/50 p-6 rounded-2xl border-l-4 border-red-500 hover:bg-zinc-800 transition-colors">
                            <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "Sephora Sans" }}>Primary</h3>
                            <p className="text-zinc-400" style={{ fontFamily: "Gilroy-Light" }}>The roots. Red, Yellow, Blue. All other colors are derived from these three parents.</p>
                        </div>
                        <div className="bg-zinc-800/50 p-6 rounded-2xl border-l-4 border-purple-500 hover:bg-zinc-800 transition-colors">
                            <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "Sephora Sans" }}>Secondary</h3>
                            <p className="text-zinc-400" style={{ fontFamily: "Gilroy-Light" }}>The children. Green, Orange, Purple. Created by mixing two primaries equally.</p>
                        </div>
                        <div className="bg-zinc-800/50 p-6 rounded-2xl border-l-4 border-teal-500 hover:bg-zinc-800 transition-colors">
                            <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "Sephora Sans" }}>Tertiary</h3>
                            <p className="text-zinc-400" style={{ fontFamily: "Gilroy-Light" }}>The nuances. Red-Orange, Blue-Green, etc. Where the real complexity lies.</p>
                        </div>
                    </div>
                </div>
            </Section>

            <Section title="Seasonal Analysis">
                <div className="mb-12">
                    <p className="text-xl text-zinc-400 max-w-3xl" style={{ fontFamily: "Gilroy-Light" }}>
                        Seasonal color analysis groups coloring into four broad categories based on the undertaking of your skin (cool or warm) and the depth of your features (light or dark).
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <SeasonCard
                        title="Spring"
                        characteristics="Warm undertones + Light/Bright features. You glow in clear, warm colors like coral, peach, and golden yellow."
                        colors={["#fbbf24", "#f87171", "#a3e635", "#f472b6"]}
                        image='/public/photos/spring.jpg'
                    />

                    <SeasonCard
                        title="Summer"
                        characteristics="Cool undertones + Light/Soft features. You look best in delicate, cool colors like lavender, powder blue, and soft rose."
                        colors={["#93c5fd", "#d8b4fe", "#fda4af", "#cbd5e1"]}
                        image='/public/photos/summer.jpg'
                    />
                    <SeasonCard
                        title="Autumn"
                        characteristics="Warm undertones + Dark/Muted features. Earth tones like olive, rust, mustard, and chocolate brown are your friends."
                        colors={["#9a3412", "#ca8a04", "#3f6212", "#78350f"]}
                        image='/public/photos/autumn.jpg'
                    />
                    <SeasonCard
                        title="Winter"
                        characteristics="Cool undertones + Dark/Bright features. You shine in high contrast colors: vivid jewel tones, black, and pure white."
                        colors={["#000000", "#1d4ed8", "#be123c", "#ffffff"]}
                        image='/public/photos/winter.jpg'
                    />
                </div>
            </Section>
        </div>
    );
};

export default ColorTheory;
