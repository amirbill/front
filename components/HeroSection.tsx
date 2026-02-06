import React from 'react';
import { Star, MoveUpRight } from 'lucide-react';
import Link from 'next/link';
import { SearchBar } from './SearchBar';

const HeroSection = () => {
    return (
        <section className="relative overflow-hidden p-8 md:p-16 min-h-[500px] flex items-center group">
            {/* Hand-drawn Star Decoration */}
            <div className="absolute top-12 left-[55%] z-30">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="text-amber-400 drop-shadow-sm">
                    <path d="M20 0L24 16L40 20L24 24L20 40L16 24L0 20L16 16L20 0Z" fill="currentColor" />
                </svg>
            </div>

            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
                {/* Left Content */}
                <div className="flex flex-col gap-6">
                    <div className="space-y-1">
                        <span className="text-base font-bold text-[#111827] tracking-tight">
                            Comparateur de Prix intelligent
                        </span>
                        <h2 className="flex flex-col leading-[0.95] tracking-tighter">
                            <span className="text-4xl md:text-5xl font-black text-[#111827]">
                                Détecte les
                            </span>
                            <span className="text-4xl md:text-5xl font-black text-[#111827]">
                                les fausses promotions
                            </span>
                        </h2>
                        <h2 className="flex flex-col leading-[0.9] tracking-tighter mt-1">
                            <span className="text-5xl md:text-7xl font-black text-[#2563EB] italic uppercase">
                                PAYEZ MOINS,
                            </span>
                            <span className="text-5xl md:text-7xl font-black text-[#2563EB] italic uppercase">
                                SOURIEZ PLUS
                            </span>
                        </h2>
                    </div>

                    <div className="relative max-w-md">
                        <p className="text-base md:text-lg font-bold text-[#111827]/60 leading-snug">
                            On compare les vrais prix. On dévoile les mensonges.<br />
                            Gratuitement, pour toi.
                        </p>

                        {/* Hand-drawn Swirl Scribble */}
                        <div className="absolute -right-16 -bottom-4 hidden md:block">
                            <svg width="80" height="60" viewBox="0 0 80 60" fill="none" className="text-[#111827] rotate-[-10deg]">
                                <path d="M10 50C20 40 50 45 40 30C30 15 0 25 10 10C20 -5 60 5 70 20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M70 20L75 15" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                                <path d="M70 20L65 15" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                            </svg>
                        </div>
                    </div>

                    {/* Search Bar & Action Button */}
                    <div className="flex flex-col gap-6 mt-4 w-full max-w-xl">
                        {/* Search Bar */}
                        <SearchBar variant="hero" searchBoth={true} placeholder="Rechercher un produit (électronique, parapharmacie...)" />

                        {/* Découvrir Button - Always visible */}
                        <div className="flex relative z-10">
                            <Link href="/products" className="flex items-center gap-4 bg-white rounded-full py-2 pl-8 pr-2 shadow-lg shadow-purple-500/10 border border-slate-200 group/btn transition-all hover:shadow-xl hover:translate-y-[-2px] hover:border-purple-300">
                                <span className="text-lg font-bold text-[#111827]">Découvrir</span>
                                <div className="size-10 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#0D9488] flex items-center justify-center text-white transition-transform group-hover/btn:rotate-12">
                                    <MoveUpRight className="size-5 stroke-[2.5px]" />
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Right Visual Section (Blobs) */}
                <div className="relative h-[450px] md:h-[580px] w-full mt-10 lg:mt-0 flex items-center justify-center">
                    {/* Top Right Circle Blob */}
                    <div className="absolute -top-8 -right-8 size-48 md:size-64 rounded-full bg-[#A855F7] overflow-hidden border-[5px] border-white shadow-[0_15px_45px_rgba(0,0,0,0.12)] z-10 hover:scale-105 transition-transform duration-500">
                        <img
                            src="https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2670&auto=format&fit=crop"
                            alt="Abstraction 1"
                            className="w-full h-full object-cover opacity-90"
                        />
                        <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 to-transparent" />
                    </div>

                    {/* Central Large Oval Blob */}
                    <div className="absolute top-1/2 left-0 -translate-y-1/2 w-48 md:w-60 h-[340px] md:h-[420px] rounded-[10rem] bg-[#FFD700] overflow-hidden border-[6px] border-white shadow-[0_20px_50px_rgba(255,189,18,0.25)] z-20 hover:scale-[1.02] transition-transform duration-500">
                        <img
                            src="https://images.unsplash.com/photo-1616348436168-de43ad0db179?q=80&w=1681&auto=format&fit=crop"
                            alt="Product 1"
                            className="w-full h-full object-cover mix-blend-multiply opacity-80"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-[#FFBD12]/40 to-transparent" />
                    </div>

                    {/* Bottom Right Arch Blob */}
                    <div className="absolute -bottom-10 -right-6 w-40 md:size-68 rounded-t-[8rem] rounded-b-[1.5rem] bg-[#F97316] overflow-hidden border-[5px] border-white shadow-[0_15px_40px_rgba(0,0,0,0.12)] z-10 hover:scale-105 transition-transform duration-500">
                        <img
                            src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1587&auto=format&fit=crop"
                            alt="Lifestyle 1"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-orange/40 to-transparent" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
