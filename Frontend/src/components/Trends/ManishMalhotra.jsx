import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const ManishMalhotra = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div style={{ fontFamily: "Sephora Sans" }} className="w-full min-h-screen bg-zinc-950 text-white pt-24 pb-20">
            <div className="px-8 md:px-20 mb-20 text-center">
                <div className="overflow-hidden flex justify-center">
                    <motion.h1
                        initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                        style={{ fontFamily: "Beikho" }}
                        className="text-6xl md:text-9xl uppercase leading-[0.9] text-zinc-100">
                        Manish<br />Malhotra
                    </motion.h1>
                </div>
            </div>
            <div className="px-8 md:px-20 grid grid-cols-1 md:grid-cols-12 gap-10">
                <div className="md:col-span-8 md:col-start-3 space-y-12">
                    <motion.p
                        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8 }}
                        className="text-xl md:text-4xl text-center font-light leading-tight text-zinc-200">
                        "Couture is not just about clothes, it's about the emotion they evoke."
                    </motion.p>

                    <div className="w-full h-[70vh] bg-zinc-800 rounded-lg overflow-hidden relative group">
                        <img src="https://assets.vogue.in/photos/681e15ffbb42168a5a797ca9/3:4/w_2240,c_limit/SnapInsta.to_495333609_18513974965007581_8504780726696481033_n.jpg" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Manish Malhotra Design" />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-zinc-950 opacity-80"></div>
                        <div className="absolute bottom-10 left-0 w-full text-center">
                            <h3 className="text-3xl text-white mb-2 uppercase tracking-tighter">The Velvet Revival</h3>
                        </div>
                    </div>

                    <div className="space-y-8 text-center max-w-2xl mx-auto">
                        <p className="text-lg text-zinc-400 font-light leading-relaxed">
                            Manish Malhotra's 2025 vision brings a dark, romantic edge to traditional Indian couture.
                            We see a shift away from heavy sequins to intricate threadwork on deep velvet bases.
                            Midnight blues, oxblood reds, and forest greens define the palette.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left mt-10 border-t border-zinc-800 pt-8">
                            <div>
                                <h4 className="text-[#CDEA68] font-bold mb-2 text-sm uppercase">Theory: The Dark Romance</h4>
                                <p className="text-xs text-zinc-500">
                                    Moving away from pastels into a Gothic-Indian aesthetic. Inspired by Victorian mourning attire mixed with Mughal grandeur.
                                </p>
                            </div>
                            <div>
                                <h4 className="text-[#CDEA68] font-bold mb-2 text-sm uppercase">Fabric: Liquid Velvet</h4>
                                <p className="text-xs text-zinc-500">
                                    A custom-developed ultra-lightweight velvet that drapes like chiffon but retains the light-absorbing depth of traditional velvet.
                                </p>
                            </div>
                            <div>
                                <h4 className="text-[#CDEA68] font-bold mb-2 text-sm uppercase">Structure: The New Drape</h4>
                                <p className="text-xs text-zinc-500">
                                    Sarees with pre-constructed corset bodices, eliminating the need for a separate petticoat and blouse, fusing western structure with eastern drape.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManishMalhotra;
