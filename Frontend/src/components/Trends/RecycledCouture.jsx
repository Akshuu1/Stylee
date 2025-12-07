import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const RecycledCouture = () => {
    useEffect(() => { window.scrollTo(0, 0); }, []);
    return (
        <div style={{ fontFamily: "Sephora Sans" }} className="w-full min-h-screen bg-zinc-950 text-white pt-24 pb-20">
            <div className="px-8 md:px-20 mb-20">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[#CDEA68] font-mono mb-4">THE ENDLESS LOOP</motion.div>
                <h1 style={{ fontFamily: "Beikho" }} className="text-8xl text-white leading-none">RECYCLED<br />COUTURE</h1>
            </div>

            <div className="px-8 md:px-20 grid grid-cols-1 gap-10">
                <div className="col-span-1">
                    <p className="text-3xl text-zinc-300 font-light leading-relaxed mb-10 w-full md:w-3/4">
                        Luxury is redefining itself. It is no longer about the newness of material, but the story of its resurrection. We are entering an era of "Archival Reconstruction."
                    </p>

                    <div className="w-full h-[60vh] bg-zinc-800 rounded-lg overflow-hidden relative mb-16">
                        <img src="/photos/img6.jpg" className="w-full h-full object-cover" alt="Recycled Couture" />
                        <div className="absolute bottom-4 left-4">
                            <h3 className="text-4xl text-[#CDEA68] font-bold uppercase tracking-tighter">From Waste to Worth</h3>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32">
                        <div className="border-t border-zinc-800 pt-8">
                            <h3 className="text-3xl text-[#CDEA68] mb-6 uppercase tracking-tighter">Case Study: Ocean Archive</h3>
                            <p className="text-lg text-zinc-300 font-light leading-relaxed">
                                High-end couture gowns constructed entirely from nylon fishing nets recovered from the Pacific Garbage Patch. The material is chemically broken down and re-spun into a silk-like filament that rivals traditional organza in sheen and drape.
                            </p>
                        </div>
                        <div className="border-t border-zinc-800 pt-8">
                            <h3 className="text-3xl text--[#CDEA68] mb-6 uppercase tracking-tighter">Theory: Zero-Waste Pattern</h3>
                            <p className="text-lg text-zinc-300 font-light leading-relaxed">
                                Using AI to generate puzzle-like clothing patterns that use 100% of the fabric roll, leaving absolutely no scraps on the cutting room floor. Design follows efficiency, creating unexpected geometric drapes that would be impossible to conceive manually.
                            </p>
                        </div>
                    </div>

                    <div className="mt-20 border-t border-zinc-800 pt-10">
                        <h3 className="text-3xl text-white mb-8 uppercase tracking-tighter">Material Innovation</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            <div>
                                <h4 className="text-[#CDEA68] font-bold">Piñatex</h4>
                                <p className="text-zinc-400 text-sm mt-2">Pineapple Leaf Fiber replacing leather.</p>
                            </div>
                            <div>
                                <h4 className="text-[#CDEA68] font-bold">Mylo</h4>
                                <p className="text-zinc-400 text-sm mt-2">Mushroom root structures.</p>
                            </div>
                            <div>
                                <h4 className="text-[#CDEA68] font-bold">Parley Ocean</h4>
                                <p className="text-zinc-400 text-sm mt-2">Reclaimed marine plastic.</p>
                            </div>
                            <div>
                                <h4 className="text-[#CDEA68] font-bold">Qmonos</h4>
                                <p className="text-zinc-400 text-sm mt-2">Synthetic spider silk.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default RecycledCouture;
