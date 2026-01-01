import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Feather, Droplets, Leaf, Scissors, Sparkles, Shirt, Trash2, Recycle, Wind } from 'lucide-react';
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

const FabricCard = ({ name, type, description, icon,image, imagePlaceholder }) => (
    <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-zinc-800 rounded-3xl overflow-hidden border border-zinc-700 hover:border-[#CDEA68] transition-all duration-300 group"
    >
        <div className="h-40 bg-zinc-700 relative">
            <div className="absolute inset-0 flex items-center justify-center text-zinc-500 font-mono text-sm">
                <img src={image} alt={imagePlaceholder} className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-700' />
            </div>
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
            <div className="absolute top-4 right-4 bg-zinc-900/80 backdrop-blur px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-[#CDEA68] border border-[#CDEA68]/20">
                {type}
            </div>
        </div>
        <div className="p-8">
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-[#CDEA68]/10 rounded-lg text-[#CDEA68]">{icon}</div>
                <h3 className="text-2xl font-bold text-white" style={{ fontFamily: "Sephora Sans" }}>{name}</h3>
            </div>
            <p className="text-zinc-400 leading-relaxed mb-6 border-b border-zinc-700 pb-6" style={{ fontFamily: "Gilroy-Light" }}>{description}</p>
            <div className="flex items-center gap-2 text-zinc-500 text-sm font-medium">
                <Wind size={14} />
                <span>Breathability: High</span>
            </div>
        </div>
    </motion.div>
);

const CareGuideItem = ({ symbol, title, desc }) => (
    <div className="flex items-start gap-6 p-6 rounded-2xl hover:bg-zinc-800 transition-colors border border-transparent hover:border-zinc-700">
        <div className="w-16 h-16 bg-zinc-700 rounded-xl flex items-center justify-center text-2xl font-bold text-white border border-zinc-600">
            {symbol}
        </div>
        <div>
            <h4 className="text-xl font-bold text-white mb-2" style={{ fontFamily: "Sephora Sans" }}>{title}</h4>
            <p className="text-zinc-400" style={{ fontFamily: "Gilroy-Light" }}>{desc}</p>
        </div>
    </div>
);

const Textiles = () => {
    const navigate = useNavigate();

    return (
        <div className="w-full min-h-screen bg-zinc-900 text-white pt-24 px-5 md:px-20 pb-20 overflow-hidden">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="mb-32"
            >
                <h1 style={{ fontFamily: "Sephora Sans" }} className="text-7xl md:text-[10vw] leading-[0.9] mb-8">
                    Material <br /><span className="text-zinc-800 text-stroke-white text-stroke-2">World</span>
                </h1>
                <p style={{ fontFamily: "Gilroy-Light" }} className="text-xl md:text-3xl text-zinc-400 max-w-2xl leading-relaxed">
                    Fabric dictates the drape, the feel, and the longevity of your garment. Become an expert in what you wear.
                </p>
            </motion.div>

            <Section title="Fiber Families">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="bg-zinc-800 rounded-[3rem] p-10 md:p-14 relative overflow-hidden group border border-zinc-700 hover:border-[#CDEA68] transition-all">
                        <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-20 transition-opacity rotate-12">
                            <Leaf size={200} />
                        </div>
                        <div className="relative z-10">
                            <div className="w-16 h-16 bg-[#CDEA68] rounded-2xl flex items-center justify-center mb-8 text-black">
                                <Leaf size={32} />
                            </div>
                            <h3 className="text-4xl font-bold mb-6 text-white" style={{ fontFamily: "Sephora Sans" }}>Natural Fibers</h3>
                            <p className="text-zinc-300 text-lg mb-8 leading-relaxed" style={{ fontFamily: "Gilroy-Light" }}>Derived from plants (cellulose) or animals (protein). They breathe, age beautifully, and are generally biodegradable.</p>
                            <ul className="space-y-4">
                                {["Cotton (Plant)", "Linen (Plant)", "Wool (Animal)", "Silk (Animal)"].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-zinc-400" style={{ fontFamily: "Gilroy-Light" }}>
                                        <div className="w-2 h-2 bg-[#CDEA68] rounded-full" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="bg-zinc-800 rounded-[3rem] p-10 md:p-14 relative overflow-hidden group border border-zinc-700 hover:border-blue-400 transition-all">
                        <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-20 transition-opacity rotate-12">
                            <Droplets size={200} />
                        </div>
                        <div className="relative z-10">
                            <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mb-8 text-white">
                                <Droplets size={32} />
                            </div>
                            <h3 className="text-4xl font-bold mb-6 text-white" style={{ fontFamily: "Sephora Sans" }}>Synthetic Fibers</h3>
                            <p className="text-zinc-300 text-lg mb-8 leading-relaxed" style={{ fontFamily: "Gilroy-Light" }}>Man-made fibers created through chemical processes. Champions of durability, stretch, and resistance.</p>
                            <ul className="space-y-4">
                                {["Polyester (Petroleum)", "Nylon (Polyamide)", "Acrylic (Wool alternative)", "Spandex (Elastane)"].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-zinc-400" style={{ fontFamily: "Gilroy-Light" }}>
                                        <div className="w-2 h-2 bg-blue-500 rounded-full" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </Section>

            <Section title="Fabric Dictionary">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <FabricCard
                        name="Cotton"
                        type="Natural"
                        description="The workhorse of fashion. Soft, breathable, and absorbent. Used in everything from denim to jersey."
                        icon={<Feather size={16} />}
                        image='/public/photos/cotton.jpg'
                    />
                    <FabricCard
                        name="Silk"
                        type="Natural"
                        description="The queen of fibers. Luxurious, smooth, and lustrous. Has excellent drape but requires fragile care."
                        icon={<Sparkles className="w-4 h-4" />}
                        image='/public/photos/silk.jpg' 
                    />
                    <FabricCard
                        name="Wool"
                        type="Natural"
                        description="Nature's insulator. Warm, wrinkle-resistant, and moisture-wicking. range from scratchy to cashmere-soft."
                        icon={<Feather size={16} />}
                        image='/public/photos/wool.jpg'
                    />
                    <FabricCard
                        name="Polyester"
                        type="Synthetic"
                        description="The durable contender. Quick-drying and wrinkle-free. Often blended to add strength to natural fibers."
                        icon={<Droplets size={16} />}
                        image='/public/photos/polyadster.jpg'
                    />
                    <FabricCard
                        name="Linen"
                        type="Natural"
                        description="The summer staple. Stronger than cotton and highly breathable. Known for its effortless wrinkles."
                        icon={<Leaf size={16} />}
                        image='/public/photos/linen.jpg'
                    />
                    <FabricCard
                        name="Leather"
                        type="Animal"
                        description="Durable, flexible material created by tanning animal rawhide and skin. Ages with character."
                        icon={<Scissors size={16} />}
                        image='/public/photos/leather.jpg'
                    />
                </div>
            </Section>

            <Section title="Fabric Care Guide">
                <div className="bg-zinc-800/50 rounded-3xl p-8 md:p-12 border border-zinc-700/50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                        <CareGuideItem symbol="HW" title="Hand Wash" desc="Gentle agitation by hand. Best for silk, wool, and delicate synthetics." />
                        <CareGuideItem symbol="30°" title="Cold Wash" desc="Saves energy and prevents shrinking/fading. Good for most darks and denim." />
                        <CareGuideItem symbol="☉" title="Tumble Dry Low" desc="High heat destroys elasticity (spandex) and shrinks natural fibers." />
                        <CareGuideItem symbol="▧" title="Dry Flat" desc="Essential for knits to prevent stretching out of shape while wet." />
                    </div>
                </div>
            </Section>

            <Section title="Sustainability">
                <div className="flex flex-col md:flex-row gap-10 items-center bg-[#CDEA68]/10 p-10 rounded-3xl border border-[#CDEA68]/20">
                    <div className="md:w-2/3">
                        <div className="flex items-center gap-3 mb-6">
                            <Recycle className="text-[#CDEA68]" size={32} />
                            <h3 className="text-3xl font-bold text-white" style={{ fontFamily: "Sephora Sans" }}>Fashion's Footprint</h3>
                        </div>
                        <p className="text-zinc-300 text-lg leading-relaxed mb-6" style={{ fontFamily: "Gilroy-Light" }}>
                            The textile industry is one of the largest polluters. Choosing better materials makes a difference.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="bg-zinc-900/50 p-4 rounded-xl">
                                <span className="text-[#CDEA68] font-bold block mb-1" style={{ fontFamily: "Sephora Sans" }}>Choose</span>
                                <span className="text-zinc-400 text-sm" style={{ fontFamily: "Gilroy-Light" }}>Organic Cotton, Tencel (Lyocell), Recycled Polyester, Vintage</span>
                            </div>
                            <div className="bg-zinc-900/50 p-4 rounded-xl">
                                <span className="text-red-400 font-bold block mb-1" style={{ fontFamily: "Sephora Sans" }}>Avoid</span>
                                <span className="text-zinc-400 text-sm" style={{ fontFamily: "Gilroy-Light" }}>Virgin Polyester, Conventional Cotton (high water use), Acrylic</span>
                            </div>
                        </div>
                    </div>
                    <div className="md:w-1/3 flex justify-center">
                        <div className="relative w-40 h-40">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 border-2 border-dashed border-[#CDEA68] rounded-full"
                            />
                            <div className="absolute inset-0 flex items-center justify-center flex-col text-center">
                                <span className="text-3xl font-bold text-white">100%</span>
                                <span className="text-xs text-[#CDEA68] uppercase tracking-widest">Conscious</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Section>
        </div>
    );
};

export default Textiles;
