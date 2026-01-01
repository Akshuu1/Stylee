import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, Check, Sparkles, User, Shirt, Crown, Mic2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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

const BodyShapeCard = ({ title, content, imagePlaceholder,image, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        viewport={{ once: true }}
        className="group relative overflow-hidden bg-zinc-800 rounded-3xl h-[500px] border border-zinc-700 hover:border-[#CDEA68] transition-all duration-500"
    >
        <div className="absolute inset-0 bg-zinc-900">
            <div className="w-full h-1/2 bg-zinc-800 flex items-center justify-center border-b border-zinc-700 group-hover:bg-zinc-700 transition-colors">
                <img src={image} alt={imagePlaceholder}  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="p-8 h-1/2 flex flex-col justify-between">
                <div>
                    <h3 style={{ fontFamily: "Sephora Sans" }} className="text-3xl font-bold mb-4 text-[#CDEA68]">{title}</h3>
                    <p className="text-zinc-400 leading-relaxed text-sm lg:text-base" style={{ fontFamily: "Gilroy-Light" }}>{content}</p>
                </div>
                <div className="w-12 h-12 rounded-full border border-zinc-600 flex items-center justify-center mt-4 group-hover:bg-[#CDEA68] group-hover:text-black group-hover:border-[#CDEA68] transition-all">
                    <User size={20} />
                </div>
            </div>
        </div>
    </motion.div>
);

const ArchetypeCard = ({ title, description, items, icon,image, imagePlaceholder }) => (
    <div data-scroll data-scroll-speed="0.1" className="bg-zinc-800/50 backdrop-blur-sm rounded-3xl p-8 border border-zinc-700/50 hover:bg-zinc-800 transition-colors duration-500">
        <div className="flex justify-between items-start mb-6">
            <div className="w-16 h-16 rounded-2xl bg-[#CDEA68]/20 flex items-center justify-center text-[#CDEA68]">
                {icon}
            </div>
            <span className="font-mono text-xs text-zinc-500 border border-zinc-700 px-2 py-1 rounded-full uppercase">Archetype</span>
        </div>
        <h3 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: "Sephora Sans" }}>{title}</h3>
        <p className="text-zinc-400 mb-6 leading-relaxed" style={{ fontFamily: "Gilroy-Light" }}>{description}</p>

        <div className="mb-6 h-48 bg-zinc-900 rounded-xl overflow-hidden relative group">

            <div className="absolute inset-0 flex items-center justify-center text-zinc-600 font-mono text-sm">
                <img src={image} alt={imagePlaceholder} className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-700' />
            </div>
        </div>

        <div>
            <h4 className="text-sm font-bold text-[#CDEA68] uppercase tracking-wider mb-3" style={{ fontFamily: "Gilroy-Light" }}>Key Pieces</h4>
            <ul className="grid grid-cols-2 gap-2">
                {items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-zinc-400 text-sm" style={{ fontFamily: "Gilroy-Light" }}>
                        <div className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    </div>
);

const Basics = () => {
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
    const navigate = useNavigate();

    return (
        <div className="w-full min-h-screen bg-zinc-900 text-white pt-24 px-5 md:px-20 pb-20 overflow-hidden">
            <div className="relative min-h-[80vh] flex flex-col justify-center mb-32">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#CDEA68] rounded-full blur-[150px] opacity-10 pointer-events-none" />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="max-w-5xl z-10"
                >
                    <h6 className="text-[#CDEA68] font-mono mb-6 uppercase tracking-widest">Stylee Academy • Module 01</h6>
                    <h1 style={{ fontFamily: "Sephora Sans" }} className="text-7xl md:text-[10vw] leading-[0.9] mb-8">
                        Basics of <br /><span className="text-zinc-800 text-stroke-white text-stroke-2">Styling</span>
                    </h1>
                    <p style={{ fontFamily: "Gilroy-Light" }} className="text-xl md:text-3xl text-zinc-400 max-w-2xl leading-relaxed">
                        Style is not just about clothes. It’s about self-expression, proportion, and confidence. Welcome to your foundation.
                    </p>
                </motion.div>
            </div>

            <Section title="Know Your Shape">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <BodyShapeCard
                        title="Hourglass"
                        content="Balanced bust and hips with a defined waist. Your goal is to follow your natural curves without hiding them."
                        delay={0}
                        image="https://cdn.prod.website-files.com/5eca30fd2b50b671e2107b06/60f12a025285e1675eb6871b_Hourglass%20Body%20Shape%20Title%20Image.webp"
                    />
                    <BodyShapeCard
                        title="Pear"
                        content="Hips visually wider than the bust. Your goal is to add volume to your upper body to balance the silhouette."
                        delay={0.1}
                        image="https://cdn.prod.website-files.com/5eca30fd2b50b671e2107b06/60efde82ce0dc256c05142f2_Pear%20Body%20Shape%20Title%20Image.webp"
                    />
                    <BodyShapeCard
                        title="Apple"
                        content="Carries weight around the midsection with fantastic legs. Your goal is to elongate the torso and show off your legs."
                        delay={0.2}
                        image="https://cdn.prod.website-files.com/5eca30fd2b50b671e2107b06/60f12ec55285e1aca7b6a437_Apple%20Body%20Shape%20Title%20Image.webp"
                    />
                    <BodyShapeCard
                        title="Rectangle"
                        content="Shoulders, waist, and hips are similar in width. Your goal is to create the illusion of curves through structured pieces."
                        delay={0.3}
                        image="https://cdn.prod.website-files.com/5eca30fd2b50b671e2107b06/60ee8f387785b9eb58eb0ea8_Rectangle%20Body%20Shape%20Title%20Image.webp"
                    />
                    <BodyShapeCard
                        title="Inverted Triangle"
                        content="Broad shoulders narrowing to the hips. Your goal is to soften the shoulder line and add volume to the hips."
                        delay={0.4}
                        image="https://cdn.prod.website-files.com/5eca30fd2b50b671e2107b06/60efe4a9ce19af708fe6e3dc_Inverted%20Triangle%20Body%20Shape%20Title%20Image.webp"
                    />
                </div>
            </Section>

            <Section title="The Golden Ratio">
                <div className="bg-zinc-800 rounded-[3rem] p-10 md:p-20 overflow-hidden relative">
                    <div className="flex flex-col lg:flex-row gap-20 items-center relative z-10">
                        <div className="lg:w-1/2">
                            <h3 className="text-4xl font-bold mb-8" style={{ fontFamily: "Sephora Sans" }}>The Rule of Thirds</h3>
                            <p className="text-xl text-zinc-400 leading-relaxed mb-10" style={{ fontFamily: "Gilroy-Light" }}>
                                Humans find the 1/3 to 2/3 ratio visually most pleasing. In fashion, this means avoiding cutting your body in exact halves.
                            </p>
                            <div className="space-y-6">
                                <div className="bg-zinc-900/50 p-6 rounded-2xl border border-zinc-700/50">
                                    <div className="flex justify-between mb-2">
                                        <span className="font-bold text-white" style={{ fontFamily: "Sephora Sans" }}>The "Half & Half" Mistake</span>
                                        <span className="text-red-400">Avoid</span>
                                    </div>
                                    <div className="h-2 w-full bg-zinc-700 rounded-full overflow-hidden">
                                        <div className="h-full w-1/2 bg-red-400/50" />
                                    </div>
                                    <p className="text-xs text-zinc-500 mt-2" style={{ fontFamily: "Gilroy-Light" }}>Makes the torso look boxy and legs shorter.</p>
                                </div>

                                <div className="bg-zinc-900/50 p-6 rounded-2xl border border-[#CDEA68]/30">
                                    <div className="flex justify-between mb-2">
                                        <span className="font-bold text-[#CDEA68]" style={{ fontFamily: "Sephora Sans" }}>The Golden Ratio</span>
                                        <span className="text-[#CDEA68]">Goal</span>
                                    </div>
                                    <div className="h-2 w-full bg-zinc-700 rounded-full overflow-hidden flex">
                                        <div className="h-full w-1/3 bg-[#CDEA68]" />
                                        <div className="h-full w-2/3 bg-[#CDEA68]/50" />
                                    </div>
                                    <p className="text-xs text-zinc-500 mt-2" style={{ fontFamily: "Gilroy-Light" }}>1/3 Top + 2/3 Bottom = Elongated Silhouette.</p>
                                </div>
                            </div>
                        </div>

                        <div className="lg:w-1/2 relative">
                            <div className="relative h-[600px] w-full flex justify-center items-end">
                                <div className="w-1 bg-[#CDEA68]/20 h-full absolute left-1/2 -translate-x-1/2" />
                                <div className="w-[300px] h-[500px] bg-zinc-700 rounded-full relative flex flex-col items-center justify-center text-center p-4">
                                    <img src="/photos/golden ratio.png" alt="" className='w-full h-full rounded-full object-cover hover:scale-105 transition-transform duration-700' />
                                    <div className="w-full border-t border-dashed border-[#CDEA68] absolute top-1/3">
                                        <span className="bg-[#CDEA68] text-black text-xs px-2 py-1 rounded absolute right-0 -translate-y-1/2 translate-x-1/2" style={{ fontFamily: "Gilroy-Light" }}>Waist Definition</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Section>

            <Section title="Find Your Archetype">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <ArchetypeCard
                        title="The Classic"
                        description="Timeless, polished, and structured. You prefer clean lines, neutral colors, and high-quality fabrics."
                        items={["Trench Coat", "Tailored Blazer", "Loafers", "Pearl Earrings"]}
                        icon={<Crown size={32} />}
                        image='/photos/the classic.jpg'
                    />
                    <ArchetypeCard
                        title="The Bohemian"
                        description="Free-spirited, relaxed, and artistic. You love flowy silhouettes, earthy tones, and intricate patterns."
                        items={["Maxi Dresses", "Fringe Details", "Wide-brim Hats", "Layered Jewelry"]}
                        icon={<Sparkles size={32} />}
                        image='/photos/the bohemia.jpg'
                    />
                    <ArchetypeCard
                        title="The Minimalist"
                        description="Less is more. You focus on shape, silhouette, and function. Your palette is restricted and impactful."
                        items={["Oversized Shirt", "Wide-leg Trousers", "Monochrome Sets", "Sleek Boots"]}
                        icon={<Shirt size={32} />}
                        image='/photos/the minimalist.jpg'
                    />
                    <ArchetypeCard
                        title="Street Style"
                        description="Bold, trend-driven, and expressive. You mix high fashion with casual staples and aren't afraid of volume."
                        items={["Statement Sneakers", "Graphic Tees", "Oversized Hoodies", "Cargo Pants"]}
                        icon={<Mic2 size={32} />}
                        image='/photos/street style.jpg'
                    />
                </div>
            </Section>

            <Section title="Styling Masterclass">
                <div className="space-y-4">
                    {[
                        { num: "01", title: "The Sandwich Method", desc: "Balance your outfit by matching your top clothing item color `to your shoes. This creates a cohesive bookends effect." },
                        { num: "02", title: "The 3-Color Rule", desc: "Limit your outfit to three main colors. This keeps the look cohesive without being boring. Neutrals don't count!" },
                        { num: "03", title: "Texture Mixing", desc: "An all-black outfit pops when you mix leather, wool, and silk. It adds depth where color is absent." },
                    ].map((rule, i) => (
                        <div key={i} className="group flex flex-col md:flex-row gap-10 p-10 border-t border-zinc-800 hover:bg-zinc-800/30 transition-colors">
                            <span className="text-6xl font-black text-zinc-800 group-hover:text-[#CDEA68] transition-colors">{rule.num}</span>
                            <div>
                                <h3 className="text-3xl font-bold mb-4" style={{ fontFamily: "Sephora Sans" }}>{rule.title}</h3>
                                <p className="text-zinc-400 text-lg max-w-2xl" style={{ fontFamily: "Gilroy-Light" }}>{rule.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </Section>
        </div>
    );
};

export default Basics;
