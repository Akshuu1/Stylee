import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const RunwayTrends = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div style={{ fontFamily: "Sephora Sans" }} className="w-full min-h-screen bg-zinc-950 text-white pt-24 pb-20">
            {/* Header */}
            <div className="px-8 md:px-20 mb-20 text-center">
                <div className="overflow-hidden flex justify-center">
                    <motion.h1
                        initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                        style={{ fontFamily: "Beikho" }}
                        className="text-6xl md:text-9xl uppercase leading-[0.9] text-zinc-100"
                    >
                        Runway<br />Trends
                    </motion.h1>
                </div>
            </div>

            {/* Content */}
            <div className="px-8 md:px-20 grid grid-cols-1 md:grid-cols-3 gap-10">
                <div className="md:col-span-3 space-y-12">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
                        className="text-xl md:text-2xl font-light leading-relaxed text-zinc-300"
                    >
                        The 2025 runways are dominated by a return to "Hyper-Structure"—a design philosophy that rejects the slouchy comfort of the post-pandemic era in favor of rigid, architectural shapes that redefine the human form. This is fashion as armor, a protective shell against a chaotic world. We are seeing silhouettes that extend far beyond the natural body line, utilizing internal corsetry, wire framing, and 3D-printed sub-structures to create volumes that defy gravity. It is a visual language of power, dominance, and unyielding strength.
                    </motion.p>

                    <div className="w-full h-[60vh] bg-zinc-800 rounded-lg overflow-hidden relative">
                        {/* Replace with actual image in production */}
                        <img src="/photos/img2.jpg" className="w-full h-full object-cover opacity-80" alt="Runway Trend" />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent opacity-60"></div>
                        <div className="absolute bottom-4 left-4">
                            <h3 className="text-4xl text-white font-bold uppercase tracking-tighter">THE NEW SILHOUETTE</h3>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-3xl text-[#CDEA68] uppercase tracking-tighter">Liquid Metal Fabrics</h3>
                        <p className="text-lg text-zinc-400 font-light leading-relaxed">
                            A major material innovation this season is the development of "Liquid Metal" textiles. Unlike traditional metallics which can be stiff or scratchy, these new smart-fabrics behave like molten mercury. They are micro-pleated at a nanoscopic level to reflect light in a continuous, fluid wave rather than a sparkle.
                            <br /><br />
                            Designers are utilizing this to create the illusion that the wearer has been dipped in chrome. The fabric pools around the body, heavy and cold to the touch, yet moves with the fluidity of silk. It speaks to a futuristic transhumanism—the merging of the biological body with the machine aesthetic. The color palette is strictly industrial: polished chrome, oxidized silver, iridescent oil-slick blacks, and surgical steel. There is no warmth here, only the blinding reflection of the future.
                        </p>
                    </div>

                    <div className="space-y-6 border-t border-zinc-800 pt-6">
                        <h3 className="text-3xl text-white uppercase tracking-tighter">Case Study: Architectural Shoulders</h3>
                        <p className="text-lg text-zinc-400 font-light leading-relaxed">
                            <strong>Reference:</strong> Saint Laurent, Rick Owens, Balenciaga<br /><br />
                            The shoulder line has become the horizon of the outfit, the definitive line that sets the tone for the entire silhouette. We are witnessing exaggerated, razor-sharp padding that extends inches beyond the natural deltoid, creating a T-shape that evokes the wide-shouldered power suits of the 1980s but pushed to a sci-fi extreme.
                            <br /><br />
                            This isn't just padding; it is structural engineering. Some garments feature cantilevered shoulders that hold their shape without internal foam, using rigid wools and bonded seams. The effect is to reduce the head size relative to the body, making the wearer appear larger, more imposing, and monument-like. In a time of uncertainty, fashion is offering a way to physically take up more space, to become a fortress unto oneself.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                        <div className="p-6 border-t border-zinc-800">
                            <h4 className="font-bold text-zinc-100 mb-2 text-xl">Key Designers</h4>
                            <p className="text-sm text-zinc-400">Balenciaga, Iris van Herpen, Dion Lee</p>
                        </div>
                        <div className="p-6 border-t border-zinc-800">
                            <h4 className="font-bold text-zinc-100 mb-2 text-xl">Must Have</h4>
                            <p className="text-sm text-zinc-400">Chrome breastplates and liquid-silk slips.</p>
                        </div>
                    </div>

                    <div className="border-t-2 border-zinc-800 pt-10">
                        <h3 className="text-2xl text-white mb-8 uppercase tracking-tighter">Key Signifiers</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="bg-zinc-900 p-4 rounded text-center">
                                <div className="text-[#CDEA68] mb-2 font-bold text-lg">01</div>
                                <div className="text-zinc-300 text-sm uppercase tracking-wide">Sculptural Shoulders</div>
                            </div>
                            <div className="bg-zinc-900 p-4 rounded text-center">
                                <div className="text-[#CDEA68] mb-2 font-bold text-lg">02</div>
                                <div className="text-zinc-300 text-sm uppercase tracking-wide">Liquid Fabrics</div>
                            </div>
                            <div className="bg-zinc-900 p-4 rounded text-center">
                                <div className="text-[#CDEA68] mb-2 font-bold text-lg">03</div>
                                <div className="text-zinc-300 text-sm uppercase tracking-wide">Zero-Gravity Hems</div>
                            </div>
                            <div className="bg-zinc-900 p-4 rounded text-center">
                                <div className="text-[#CDEA68] mb-2 font-bold text-lg">04</div>
                                <div className="text-zinc-300 text-sm uppercase tracking-wide">Chrome Hardware</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RunwayTrends;
