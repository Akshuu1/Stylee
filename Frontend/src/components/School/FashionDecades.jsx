import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, Calendar, TrendingUp, Sparkles, Crown, Music, Zap, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { image } from 'framer-motion/client';

const DecadeCard = ({ decade, title, description, keyTrends, icon, image,colorAccent, delay = 0 }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay }}
            viewport={{ once: true, margin: "-50px" }}
            className="group relative"
        >
            <div className="relative overflow-hidden bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-[2.5rem] p-8 md:p-10 border border-zinc-700 hover:border-[#CDEA68] transition-all duration-700 h-full">
                <div className="flex justify-between items-start mb-6">
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${colorAccent} flex items-center justify-center text-white shadow-lg`}>
                        {icon}
                    </div>
                    <span className="font-mono text-sm text-zinc-500 border border-zinc-700 px-3 py-1 rounded-full uppercase tracking-wider">
                        {decade}
                    </span>
                </div>
                <h3 className="text-4xl md:text-5xl font-bold text-white mb-4 group-hover:text-[#CDEA68] transition-colors" style={{ fontFamily: "Sephora Sans" }}>
                    {title}
                </h3>
                <p className="text-zinc-400 text-base md:text-lg leading-relaxed mb-6" style={{ fontFamily: "Gilroy-Light" }}>
                    {description}
                </p>
                <div className="mb-6 h-64 bg-zinc-800/50 rounded-2xl overflow-hidden relative group-hover:bg-zinc-800 transition-colors">
                    <div className="absolute inset-0 flex items-center justify-center text-zinc-600 font-mono text-sm">
                        <img src={image} alt={`${decade} Fashion`} className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-700' />
                    </div>
                    <div className="absolute inset-0 opacity-10">
                        <div className="grid grid-cols-8 grid-rows-8 h-full w-full">
                            {[...Array(64)].map((_, i) => (
                                <div key={i} className="border border-zinc-700" />
                            ))}
                        </div>
                    </div>
                </div>

                <div>
                    <h4 className="text-sm font-bold text-[#CDEA68] uppercase tracking-wider mb-4" style={{ fontFamily: "Gilroy-Light" }}>
                        Signature Trends
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                        {keyTrends.map((trend, i) => (
                            <div key={i} className="flex items-center gap-2 text-zinc-400 text-sm bg-zinc-800/50 rounded-lg p-2" style={{ fontFamily: "Gilroy-Light" }}>
                                <div className="w-2 h-2 rounded-full bg-[#CDEA68]" />
                                {trend}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#CDEA68]/0 via-[#CDEA68]/0 to-[#CDEA68]/0 group-hover:from-[#CDEA68]/5 group-hover:via-transparent group-hover:to-transparent transition-all duration-700 rounded-[2.5rem] pointer-events-none" />
            </div>
        </motion.div>
    );
};

const TimelineConnector = ({ index }) => (
    <div className="hidden lg:flex items-center justify-center my-8">
        <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="h-0.5 w-full bg-gradient-to-r from-zinc-800 via-[#CDEA68] to-zinc-800"
        />
    </div>
);

const FashionDecades = () => {
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
    const navigate = useNavigate();
    const containerRef = useRef(null);

    const decades = [
        {
            decade: "1920s",
            title: "The Roaring Twenties",
            description: "The era of liberation and jazz. Flapper dresses, drop waists, and Art Deco glamour defined this revolutionary decade.",
            keyTrends: ["Flapper Dresses", "Cloche Hats", "Drop Waists", "Pearls & Fringe"],
            icon: <Music size={36} />,
            colorAccent: "from-amber-600 to-amber-800",
            image:'/photos/the roaring twenties.jpg'
        },
        {
            decade: "1950s",
            title: "The Golden Age",
            description: "Post-war elegance brought feminine silhouettes back. Think Dior's New Look with cinched waists and full skirts.",
            keyTrends: ["Circle Skirts", "Cat-Eye Glasses", "Pencil Dresses", "Red Lipstick"],
            icon: <Crown size={36} />,
            colorAccent: "from-rose-500 to-pink-700",
            image:'/photos/the golden age.jpg'
        },
        {
            decade: "1960s",
            title: "The Swinging Sixties",
            description: "Youth culture exploded with mod fashion, mini skirts, and bold geometric patterns. Fashion became rebellious and fun.",
            keyTrends: ["Mini Skirts", "Go-Go Boots", "Mod Patterns", "Shift Dresses"],
            icon: <Sparkles size={36} />,
            colorAccent: "from-blue-500 to-indigo-700",
            image:'/photos/the swinging sixties.jpg'
        },
        {
            decade: "1970s",
            title: "Disco & Bohemia",
            description: "A decade of contradictions: disco glam met bohemian freedom. Bell bottoms, platforms, and psychedelic prints ruled.",
            keyTrends: ["Bell Bottoms", "Platform Shoes", "Halter Tops", "Disco Glitter"],
            icon: <Zap size={36} />,
            colorAccent: "from-orange-500 to-red-700",
            image:'/photos/disco & bohemia.jpg'
        },
        {
            decade: "1980s",
            title: "Power & Excess",
            description: "Bold shoulders, neon colors, and maximalist attitude. The era of power dressing and MTV fashion influence.",
            keyTrends: ["Shoulder Pads", "Neon Colors", "Leg Warmers", "Bold Accessories"],
            icon: <TrendingUp size={36} />,
            colorAccent: "from-purple-500 to-fuchsia-700",
            image:'/photos/power & excess.jpg'
        },
        {
            decade: "1990s",
            title: "Grunge & Minimalism",
            description: "The decade that rejected excess. Grunge met minimalism, and fashion became about anti-fashion and individuality.",
            keyTrends: ["Slip Dresses", "Chokers", "Combat Boots", "Flannel Shirts"],
            icon: <Heart size={36} />,
            colorAccent: "from-slate-500 to-zinc-700",
            image:'/photos/grunge & minimalism.jpg'
        },
        {
            decade: "2000s",
            title: "Y2K Revival",
            description: "Low-rise jeans, velour tracksuits, and bling culture. Technology met fashion with futuristic metallics.",
            keyTrends: ["Low-Rise Jeans", "Velour Sets", "Butterfly Clips", "Metallic Fabrics"],
            icon: <Sparkles size={36} />,
            colorAccent: "from-cyan-500 to-blue-700",
            image:'/photos/y2k revival.jpg'
        },
        {
            decade: "2020s",
            title: "Digital Age Fashion",
            description: "Sustainability meets technology. Gender-fluid, inclusive fashion with a focus on conscious consumption and digital expression.",
            keyTrends: ["Oversized Fits", "Sustainable Fashion", "Gender Fluidity", "Digital Fashion"],
            icon: <Calendar size={36} />,
            colorAccent: "from-emerald-500 to-teal-700",
            image:'/photos/digital age fashion.jpg'
        }
    ];

    return (
        <div ref={containerRef} className="w-full min-h-screen bg-zinc-900 text-white pt-24 px-5 md:px-20 pb-20 overflow-hidden">
            <div className="relative min-h-[80vh] flex flex-col justify-center mb-32">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.05, 0.15, 0.05]
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#CDEA68] rounded-full blur-[200px] pointer-events-none"
                />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="max-w-6xl z-10">
                    <h1 style={{ fontFamily: "Sephora Sans" }} className="text-7xl md:text-[10vw] leading-[0.9] mb-8">
                        Fashion Through <br />
                        <span className="text-zinc-800 text-stroke-white text-stroke-2">The Decades</span>
                    </h1>
                    <p style={{ fontFamily: "Gilroy-Light" }} className="text-xl md:text-3xl text-zinc-400 max-w-3xl leading-relaxed">
                        A journey through 100 years of style evolution. From the roaring twenties to the digital age, explore how fashion shaped culture and identity.
                    </p>
                </motion.div>
            </div>

            {/* Introduction Section */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="mb-32"
            >
                <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-[3rem] p-10 md:p-16 border border-zinc-700 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#CDEA68]/10 rounded-full blur-[100px]" />
                    <h2 className="text-4xl md:text-6xl font-bold mb-8 text-[#CDEA68]" style={{ fontFamily: "Sephora Sans" }}>
                        Why Study Fashion History?
                    </h2>
                    <p className="text-xl md:text-2xl text-zinc-400 leading-relaxed max-w-4xl relative z-10" style={{ fontFamily: "Gilroy-Light" }}>
                        Fashion is a mirror of society. Each decade tells a story of social change, technological advancement, and cultural revolution.
                        Understanding these trends helps you create timeless style while staying ahead of the curve.
                    </p>
                </div>
            </motion.div>

            {/* Timeline Title */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className="mb-20 text-center"
            >
                <h2 className="text-5xl md:text-7xl font-bold text-[#CDEA68] mb-4" style={{ fontFamily: "Sephora Sans" }}>
                    THE TIMELINE
                </h2>
                <p className="text-zinc-500 font-mono text-sm uppercase tracking-widest">Scroll through a century of style</p>
            </motion.div>

            {/* Decades Grid */}
            <div className="space-y-8">
                {decades.map((decade, index) => (
                    <React.Fragment key={decade.decade}>
                        <DecadeCard
                            {...decade}
                            delay={index * 0.05}
                        />
                        {index < decades.length - 1 && <TimelineConnector index={index} />}
                    </React.Fragment>
                ))}
            </div>

            {/* Call to Action */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="mt-32 text-center"
            >
                <div className="bg-gradient-to-br from-[#CDEA68]/20 to-[#CDEA68]/5 rounded-[3rem] p-16 border border-[#CDEA68]/30 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzQ0NDA0NCIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-10" />
                    <h3 className="text-4xl md:text-6xl font-bold mb-6 relative z-10" style={{ fontFamily: "Sephora Sans" }}>
                        Your Style, Your Story
                    </h3>
                    <p className="text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto relative z-10" style={{ fontFamily: "Gilroy-Light" }}>
                        Now that you've traveled through time, it's time to create your own fashion legacy. Mix, match, and make it yours.
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default FashionDecades;
