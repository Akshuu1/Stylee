import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const CoquetteCore = () => {
    useEffect(() => { window.scrollTo(0, 0); }, []);
    return (
        <div style={{ fontFamily: "Sephora Sans" }} className="w-full min-h-screen bg-zinc-950 text-white pt-24 pb-20">
            <div className="px-8 md:px-20 mb-16">
                <h1 style={{ fontFamily: "Beikho" }} className="text-8xl text-zinc-100 leading-none">COQUETTE<br />CORE 2.0</h1>
            </div>

            <div className="px-8 md:px-20 grid grid-cols-1 md:grid-cols-2 gap-20">
                <div>
                    <h2 className="text-4xl mb-6 text-[#CDEA68] uppercase tracking-tighter">Theory: Dark Femininity</h2>
                    <p className="text-xl leading-relaxed text-zinc-300 mb-8 font-light">
                        The evolution of 'girlhood' aesthetics has taken a sharp turn. It is no longer about innocence; it is about performance.
                        Coquette 2.0 subverts the traditional symbols of fragility—bows, lace, pearls—and weaponizes them.
                    </p>
                    <p className="text-lg text-zinc-400 font-light mb-10">
                        The bows are bigger, almost suffocating. The lace is torn. The pearls are spikes. It is a visual commentary on the expectations of femininity in the digital age—a "Hyper-Girl" aesthetic that borders on the uncanny.
                    </p>

                    <div className="w-full h-[50vh] bg-zinc-800 rounded-lg overflow-hidden relative">
                        <img src="/photos/img7.jpg" className="w-full h-full object-cover" alt="Dark Coquette" />
                    </div>
                </div>

                <div className="space-y-12">
                    <div className="border-t border-zinc-800 pt-8">
                        <h3 className="text-2xl text-white mb-4 uppercase tracking-tighter">Case Study: The Hyper-Bow</h3>
                        <p className="text-zinc-400 leading-relaxed font-light">
                            <strong>Designer Reference:</strong> Simone Rocha, Sandy Liang<br />
                            Bows are appearing not just as accessories, but as structural elements. Bows replacing buttons, bows forming the entire bodice, bows as makeup. The suppression of function for pure ornamentation. It creates a silhouette that is both childlike and restrictive.
                        </p>
                    </div>
                    <div className="border-t border-zinc-800 pt-8">
                        <h3 className="text-2xl text-white mb-4 uppercase tracking-tighter">Sub-Trend: Bloquette</h3>
                        <p className="text-zinc-400 leading-relaxed font-light">
                            <strong>The Mix:</strong> British Lad Culture x Rococo.<br />
                            Combining vintage oversized soccer jerseys with tiered lace maxi skirts and ballet flats. The clash of the hyper-masculine sporting world with hyper-feminine historical dress creates a tension that defines the 2025 street style.
                        </p>
                        <div className="mt-6 flex gap-4">
                            <span className="px-4 py-2 border border-zinc-700 rounded-full text-xs text-zinc-500 hover:border-[#CDEA68] hover:text-[#CDEA68] transition-colors cursor-pointer">#SportyRich</span>
                            <span className="px-4 py-2 border border-zinc-700 rounded-full text-xs text-zinc-500 hover:border-[#CDEA68] hover:text-[#CDEA68] transition-colors cursor-pointer">#LaceHeavy</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default CoquetteCore;
