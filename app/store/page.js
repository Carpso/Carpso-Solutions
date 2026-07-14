"use client";

import { useState } from 'react';
import Link from "next/link";
import { apps } from "../../data/apps";
import { Share2, Search } from 'lucide-react';

export default function StoreContent() {
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const featuredApps = apps.filter(a => a.featured);

    let filteredApps = activeCategory === 'All' ? apps : apps.filter(a => a.category === activeCategory);
    if (searchQuery) {
        const q = searchQuery.toLowerCase();
        filteredApps = filteredApps.filter(a =>
            a.name.toLowerCase().includes(q) ||
            a.category.toLowerCase().includes(q) ||
            a.description.toLowerCase().includes(q)
        );
    }

    const categories = ['All', 'FinTech', 'PropTech', 'EdTech', 'GovTech', 'Logistics', 'Lifestyle', 'Security', 'Sports', 'Personal'];

    const performShare = async (e, id, name) => {
        e.preventDefault();
        e.stopPropagation();
        const url = `${process.env.NEXT_PUBLIC_SITE_URL}/store/${id}`;
        if (navigator.share) {
            try {
                await navigator.share({
                    title: `Check out ${name} on Ziba App Store`,
                    text: `Official high-fidelity software from Carpso Solutions.`,
                    url: url
                });
            } catch (e) { }
        } else {
            navigator.clipboard.writeText(url);
            alert("Link copied to clipboard!");
        }
    };

    return (
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-10">

            {/* Search Header Area */}
            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-6">
                <div className="flex items-center gap-3">
                    <img src="/ziba_logo.png" className="w-10 h-10 rounded-lg shadow-md" alt="Ziba" />
                    <h1 className="text-2xl font-bold text-white tracking-tight"><b>Ziba</b> App Store</h1>
                </div>
                <div className="relative w-full md:max-w-xl">
                    <Search className="absolute left-4 top-3 text-[#8b949e] w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search apps by name or category..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-[#1c2128] border border-[#30363d] rounded-xl py-3 pl-12 pr-4 text-[#e8eaed] focus:outline-none focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff] transition-all"
                    />
                </div>
            </div>

            {/* Corporate Bundle Banner */}
            <div className="bg-gradient-to-br from-[rgba(26,115,232,0.2)] to-[rgba(13,71,161,0.4)] border border-white/5 p-10 rounded-3xl mb-12 flex flex-col md:flex-row items-center justify-between gap-8 backdrop-blur-md shadow-2xl">
                <div className="max-w-2xl">
                    <h2 className="text-3xl font-bold text-white mb-3">Ziba Enterprise Bundle</h2>
                    <p className="text-[#c9d1d9] text-lg leading-relaxed">
                        Institutional Digital Transformation Hub. Deploy the full productivity suite to your entire organization in one click. Integrated management for Zambian industry leaders.
                    </p>
                </div>
                <a href="https://wa.me/260968551110?text=Hi%20Carpso,%20I'm%20interested%20in%20the%20Complete%20Enterprise%20Bundle." target="_blank" rel="noreferrer" className="bg-white text-[#1a73e8] px-8 py-3.5 rounded-xl font-bold whitespace-nowrap hover:scale-105 transition-transform shadow-lg">
                    Get Corporate Suite
                </a>
            </div>

            {/* Featured Apps Scroller */}
            {!searchQuery && (
                <div className="mb-14">
                    <h2 className="text-xl font-bold text-white tracking-wide mb-6">Featured Apps</h2>
                    <div className="flex gap-6 overflow-x-auto pb-4 snap-x">
                        {featuredApps.map(app => (
                            <Link href={`/store/${app.id}`} key={app.id} className="min-w-[320px] h-[180px] rounded-[20px] p-6 relative flex flex-col justify-end text-white overflow-hidden snap-center hover:-translate-y-1 transition-transform cursor-pointer group shadow-[0_4px_12px_rgba(0,0,0,0.5)]" style={{ background: app.bg }}>
                                <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-black/80 to-transparent z-0 pointer-events-none"></div>
                                <div className="relative z-10 w-full">
                                    <div className="flex items-center gap-3 mb-2">
                                        <img src={app.logo} className="w-12 h-12 rounded-xl object-cover bg-white shadow-sm" alt={app.name} />
                                        <span className="font-bold text-lg">{app.name}</span>
                                    </div>
                                    <div className="text-xs font-bold uppercase tracking-wider text-[#58a6ff] mb-1">{app.category}</div>
                                    <div className="text-sm text-gray-200 line-clamp-1 opacity-90">{app.description}</div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            {/* Category Pills */}
            <div className="flex gap-2.5 overflow-x-auto pb-6 mb-8 border-b border-[#30363d] scroll-smooth">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-6 py-2 rounded-full text-sm font-medium border transition-colors whitespace-nowrap
               ${activeCategory === cat
                                ? 'bg-[#4285f4] border-[#4285f4] text-white'
                                : 'bg-white/5 border-white/10 hover:bg-white/10 text-[#e8eaed]'}`
                        }
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* App Grid */}
            <h2 className="text-2xl font-bold text-white mb-8">
                {searchQuery ? 'Search Results' : (activeCategory === 'All' ? 'All Productivity Tools' : `${activeCategory} Solutions`)}
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-6 gap-y-10 mb-20">
                {filteredApps.map(app => (
                    <Link href={`/store/${app.id}`} key={app.id} className="group flex flex-col relative transition-transform hover:-translate-y-1.5 cursor-pointer">
                        <button
                            onClick={(e) => performShare(e, app.id, app.name)}
                            className="absolute top-2 right-2 z-20 bg-black/60 backdrop-blur-sm border border-white/10 w-8 h-8 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 hover:scale-110 hover:bg-[#58a6ff] hover:border-[#58a6ff] transition-all"
                        >
                            <Share2 className="w-3.5 h-3.5" />
                        </button>

                        <div className="w-full aspect-square rounded-[22%] bg-white p-0 overflow-hidden shadow-[0_4px_15px_rgba(0,0,0,0.4)] mb-3 relative group-hover:shadow-[0_8px_25px_rgba(0,0,0,0.6)] transition-shadow" style={{ background: app.bg }}>
                            <img src={app.logo} className="w-full h-full object-cover" alt={app.name} />
                        </div>

                        <div className="font-semibold text-[#f0f6fc] text-sm mb-0.5 line-clamp-1">{app.name}</div>
                        <div className="text-xs text-[#8b949e] flex justify-between items-center pr-1">
                            <span>5.0 <span className="text-[#eab308]">★</span></span>
                            <span className="font-medium flex items-center gap-1.5 text-green-400">
                                {app.price === 500 && (
                                    <span className="bg-red-500/20 text-red-500 font-bold uppercase text-[9px] px-1.5 py-0.5 rounded border border-red-500/30">Promo</span>
                                )}
                                K{app.price.toLocaleString('en-US')}
                            </span>
                        </div>
                    </Link>
                ))}
            </div>

        </div>
    );
}
