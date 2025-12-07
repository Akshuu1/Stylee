import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const FutureFashion = () => {
    useEffect(() => { window.scrollTo(0, 0); }, []);
    return (
        <div style={{ fontFamily: "Sephora Sans" }} className="w-full min-h-screen bg-zinc-950 text-white pt-24 pb-20">
            <div className="px-8 md:px-20 mb-20">
                <h1 style={{ fontFamily: "Beikho" }} className="text-8xl text-white leading-none">FUTURE<br />FASHION</h1>
            </div>

            <div className="px-8 md:px-20 grid grid-cols-1 md:grid-cols-2 gap-20">
                <div className="space-y-12">
                    <div>
                        <p className="text-2xl text-zinc-100 font-light leading-relaxed mb-6">
                            "In 2025, we don't wear devices; we wear <span className="text-[#CDEA68]">interfaces</span>."
                        </p>
                        <p className="text-lg text-zinc-400 font-light leading-relaxed">
                            This marks the end of the "screen era" and the beginning of <strong className="text-white">Ambient Computing</strong>. Digital interaction is woven directly into the warp and weft of our daily existence.
                            <br /><br />
                            We are seeing a move away from the clunky aesthetics of early tech-wear towards <span className="text-white border-b border-[#CDEA68]">Invisible Tech</span>—advanced capabilities hidden within fabrics that feel as soft as silk but perform like a supercomputer.
                        </p>
                    </div>

                    <div className="w-full h-[50vh] bg-zinc-800 rounded-lg overflow-hidden relative">
                        <img src="/photos/img4.jpg" className="w-full h-full object-cover" alt="Future Fashion" />
                    </div>

                    <div className="pt-8 border-t border-zinc-800">
                        <h3 className="text-3xl text-white mb-6 uppercase tracking-tighter">Theory: <span className="text-[#CDEA68]">Neuro-Weave</span></h3>
                        <p className="text-zinc-400 font-light leading-relaxed mb-6">
                            Textiles embedded with thousands of microscopic neural sensors. These garments don't just monitor you; they <span className="italic text-zinc-200">react</span> to you.
                        </p>
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <span className="text-[#CDEA68] mr-4 text-xl">01</span>
                                <div>
                                    <h4 className="text-white font-bold uppercase text-sm">Haptic Therapy</h4>
                                    <p className="text-zinc-500 text-sm">Detects cortisol spikes and activates rhythmic vibrations to soothe the nervous system.</p>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <span className="text-[#CDEA68] mr-4 text-xl">02</span>
                                <div>
                                    <h4 className="text-white font-bold uppercase text-sm">Thermal Regulation</h4>
                                    <p className="text-zinc-500 text-sm">Senses body temp drops and contracts weave to trap heat instantly.</p>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <span className="text-[#CDEA68] mr-4 text-xl">03</span>
                                <div>
                                    <h4 className="text-white font-bold uppercase text-sm">Bio-Luminescence</h4>
                                    <p className="text-zinc-500 text-sm">Fabric changes color based on emotional state: Red for stress, Blue for calm.</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="space-y-12">
                    <div className="border-l-2 border-zinc-800 pl-8">
                        <h3 className="text-2xl text-white mb-4 uppercase tracking-tighter">Case Study: <span className="text-[#CDEA68]">Solar-Skin</span></h3>
                        <p className="text-zinc-400 font-light leading-relaxed mb-6">
                            Creating a <strong className="text-zinc-200">Nomadic Energy Ecosystem</strong>. Translucent photovoltaic threads woven into everyday jackets.
                        </p>
                        <div className="bg-zinc-900/50 p-4 rounded border border-zinc-800 mb-4 inline-block">
                            <p className="text-[#CDEA68] font-mono text-xs mb-1">PERFORMANCE METRIC</p>
                            <p className="text-zinc-300 text-sm">30 mins sunlight = 100% Smartphone Charge</p>
                        </div>
                        <p className="text-zinc-500 text-sm leading-relaxed">
                            This effectively untethers the urban nomad from the power grid, allowing for true autonomy. It is the ultimate fusion of utility and couture.
                        </p>
                    </div>

                    <div className="border-l-2 border-zinc-800 pl-8">
                        <h3 className="text-2xl text-white mb-4 uppercase tracking-tighter">Case Study: <span className="text-[#CDEA68]">Data Cloaking</span></h3>
                        <p className="text-zinc-400 font-light leading-relaxed mb-6">
                            Privacy as the ultimate luxury. "Anti-Algo" fashion utilizes silver-plated fibers to blind facial recognition cameras.
                        </p>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="p-3 rounded text-center border border-zinc-800 bg-zinc-900/30">
                                <span className="block text-[#CDEA68] text-xl mb-1">IR</span>
                                <span className="text-xs text-zinc-500 uppercase">Reflective</span>
                            </div>
                            <div className="p-3 rounded text-center border border-zinc-800 bg-zinc-900/30">
                                <span className="block text-[#CDEA68] text-xl mb-1">AI</span>
                                <span className="text-xs text-zinc-500 uppercase">Adversarial</span>
                            </div>
                        </div>
                        <p className="text-zinc-500 text-sm leading-relaxed">
                            To the naked eye, it's streetwear. To a camera, it's a blinding white flare. A way of reclaiming identity in the data state.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default FutureFashion;
