import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const StreetStyle = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div style={{ fontFamily: "Sephora Sans" }} className="w-full min-h-screen bg-zinc-950 text-white pt-24 pb-20">
            <div className="px-8 md:px-20 mb-10">
                <motion.h1
                    initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 1 }}
                    style={{ fontFamily: "Beikho" }}
                    className="text-7xl md:text-9xl uppercase leading-none text-zinc-100"
                >
                    Street<br />Style
                </motion.h1>
            </div>

            <div className="w-full border-t border-b border-zinc-800 py-10 px-8 md:px-20 flex flex-col md:flex-row gap-10">
                <div className="md:w-1/2">
                    <img src="/photos/img3.jpg" className="w-full h-auto rounded-lg grayscale hover:grayscale-0 transition-all duration-500" alt="Street Style" />
                </div>
                <div className="md:w-1/2 flex flex-col justify-center space-y-8">
                    <div>
                        <h2 className="text-4xl text-[#CDEA68] uppercase tracking-tighter ">The Urban Dystopia</h2>
                        <p className="text-xl text-zinc-300 font-light leading-relaxed mt-4">
                            Street style in 2025 has radically shifted from the performative vanity of the Instagram era to a rugged, utilitarian focus on survival. We call this "Urban Dystopia." It is an aesthetic response to growing climate anxiety and the harsh realities of modern city living. The goal is no longer to stand out for beauty, but to demonstrate preparedness. The "cool" factor is now determined by how functional, durable, and adaptable one's outfit is in the face of an unpredictable environment.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="p-6 bg-zinc-900 rounded-lg">
                            <h3 className="text-2xl text-white mb-2 uppercase tracking-tighter">Case Study: Nomad-Core</h3>
                            <p className="text-zinc-400 font-light leading-relaxed">
                                "Nomad-Core" imagines the modern city dweller as a traveler in a hostile wasteland. This look is defined by extreme functionality and modularity. We are seeing multi-functional garments that can physically transform to meet the wearer's needs: oversized parkas that unzip into tents, pants with detachable cargo modules that double as satchels, and boots reinforced with industrial-grade rubber.
                                <br /><br />
                                Layering is key—not for style, but for thermal regulation. The silhouette is heavy, bottom-weighted, and obscured. It utilizes technical fabrics like Gore-Tex, Tyvek, and ripstop nylon that offer protection against acid rain, smog, and UV radiation. It is the uniform of the apocalypse survivor, worn to pick up coffee on a Tuesday morning.
                            </p>
                        </div>
                        <div className="p-6 bg-zinc-900 rounded-lg">
                            <h3 className="text-2xl text-white mb-2 uppercase tracking-tighter">Theory: Digital Camouflage</h3>
                            <p className="text-zinc-400 font-light leading-relaxed">
                                In an era of constant surveillance, privacy is the new rebellion. "Digital Camouflage" or "CV Dazzle" is a street trend that uses bold, high-contrast patterning to confuse computer vision algorithms.
                                <br /><br />
                                Unlike traditional camo which blends you into nature, this camo is designed to make you highly visible to the human eye but invisible to the machine. Asymmetrical makeup, hair hung over the face in geometric blocks, and scarves printed with "adversarial images" break up the facial symmetry that cameras look for. It is a way of reclaiming identity in public spaces, turning the act of getting dressed into an act of political protest against the data state.
                            </p>
                        </div>
                    </div>

                    <div className="pt-10 border-t border-zinc-800 mt-10">
                        <h3 className="text-2xl text-zinc-200 mb-6 uppercase tracking-tighter">Trend Anatomy</h3>
                        <ul className="space-y-4">
                            <li className="flex items-center justify-between border-b border-zinc-800 pb-2">
                                <span className="text-zinc-400">Survival Layering</span>
                                <span className="text-[#CDEA68]">Maximal</span>
                            </li>
                            <li className="flex items-center justify-between border-b border-zinc-800 pb-2">
                                <span className="text-zinc-400">Pattern Type</span>
                                <span className="text-[#CDEA68]">Dazzle / Glitch</span>
                            </li>
                            <li className="flex items-center justify-between border-b border-zinc-800 pb-2">
                                <span className="text-zinc-400">Key Material</span>
                                <span className="text-[#CDEA68]">Gore-Tex / Tyvek</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StreetStyle;
