import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const Jacquemus = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div style={{ fontFamily: "Sephora Sans" }} className="w-full min-h-screen bg-zinc-950 text-white pt-24 pb-20">
            <div className="px-8 md:px-20 mb-20 text-center">
                <motion.h1
                    initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1 }}
                    style={{ fontFamily: "Beikho" }}
                    className="text-6xl md:text-9xl uppercase leading-none text-zinc-100"
                >
                    JACQUEMUS
                </motion.h1>
            </div>

            <div className="px-8 md:px-20 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                <div className="space-y-12">
                    <div>
                        <h2 className="text-4xl text-[#CDEA68] uppercase tracking-tighter">Minimalist Surrealism</h2>
                        <p className="text-xl leading-relaxed text-zinc-300 mt-6 font-light">
                            It is a dream of the south of France, but distorted. The proportions are wrong, the colors are too vivid. It is memory made physical—a blend of severe geometry and soft nostalgia.
                        </p>
                    </div>

                    <div className="space-y-8 border-t border-zinc-800 pt-8">
                        <div>
                            <h3 className="text-2xl text-white mb-2 uppercase tracking-tighter">Theory: The Objectified Body</h3>
                            <p className="text-zinc-400 font-light leading-relaxed">
                                Clothing that turns the body into geometric shapes. Spherical shoulders, triangular waists. The human form becomes a canvas for sculptural experimentation rather than just a hanger for clothes.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-2xl text-white mb-2 uppercase tracking-tighter">Case Study: Le Provençal 2.0</h3>
                            <p className="text-zinc-400 font-light leading-relaxed">
                                Taking the rustic textures of raffia and linen and applying them to ultra-modern, sharp tailoring. The contradiction between the humble material and the high-fashion silhouette creates a new kind of luxury.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-8">
                        <div className="bg-zinc-900/50 p-4 rounded border border-zinc-800">
                            <h4 className="text-[#CDEA68] uppercase text-xs font-bold mb-1">Texture</h4>
                            <p className="text-zinc-300 text-sm">Raffia, Raw Linen</p>
                        </div>
                        <div className="bg-zinc-900/50 p-4 rounded border border-zinc-800">
                            <h4 className="text-[#CDEA68] uppercase text-xs font-bold mb-1">Color</h4>
                            <p className="text-zinc-300 text-sm">Hyper-Vivid Red, Sand</p>
                        </div>
                        <div className="bg-zinc-900/50 p-4 rounded border border-zinc-800">
                            <h4 className="text-[#CDEA68] uppercase text-xs font-bold mb-1">Form</h4>
                            <p className="text-zinc-300 text-sm">Geometric, Spherical</p>
                        </div>
                        <div className="bg-zinc-900/50 p-4 rounded border border-zinc-800">
                            <h4 className="text-[#CDEA68] uppercase text-xs font-bold mb-1">Detail</h4>
                            <p className="text-zinc-300 text-sm">Surrealist Accessories</p>
                        </div>
                    </div>
                </div>

                <div className="h-[70vh] overflow-hidden rounded-lg relative">
                    <img src="https://assets.vogue.com/photos/67967d46b8b9c6acdf8f6532/master/w_960,c_limit/00001-jacquemus-spring-2025-ready-to-wear-credit-gorunway.jpg" className="w-full h-full object-cover opacity-90" alt="Jacquemus" />
                </div>
            </div>
        </div>
    );
};

export default Jacquemus;
