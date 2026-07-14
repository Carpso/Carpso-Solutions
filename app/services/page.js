"use client";

import Link from 'next/link';
import { Layers, Smartphone, Code, Server, Building, Database } from 'lucide-react';

export default function ServicesPage() {
    return (
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 text-white">

            <div className="text-center max-w-3xl mx-auto mb-20">
                <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">Enterprise Services <br /><span className="text-[#58a6ff]">By Carpso Solutions</span></h1>
                <p className="text-[#8b949e] text-lg leading-relaxed">
                    We engineer high-fidelity digital infrastructure. From massive scalable databases to polished mobile applications, our architecture powers modern Zambian institutions.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">

                <div className="bg-[#1c2128]/50 border border-[#30363d] p-8 rounded-3xl hover:bg-[#1c2128] transition-colors group">
                    <div className="w-14 h-14 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <Smartphone className="w-7 h-7 text-[#58a6ff]" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Mobile App Development</h3>
                    <p className="text-[#8b949e] leading-relaxed text-sm mb-6">
                        Custom high-performance native and cross-platform mobile apps for iOS and Android. Built with fluid animations and secure logic.
                    </p>
                    <Link href="/store" className="text-[#58a6ff] text-sm font-bold flex items-center gap-1 hover:underline">
                        View App Store →
                    </Link>
                </div>

                <div className="bg-[#1c2128]/50 border border-[#30363d] p-8 rounded-3xl hover:bg-[#1c2128] transition-colors group">
                    <div className="w-14 h-14 bg-green-500/10 border border-green-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <Database className="w-7 h-7 text-[#3fb950]" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Enterprise Databases</h3>
                    <p className="text-[#8b949e] leading-relaxed text-sm mb-6">
                        Automated, secure data warehousing using Supabase & PostgreSQL. We build intelligence clusters that manage millions of rows seamlessly.
                    </p>
                    <Link href="/contact" className="text-[#3fb950] text-sm font-bold flex items-center gap-1 hover:underline">
                        Talk to an Architect →
                    </Link>
                </div>

                <div className="bg-[#1c2128]/50 border border-[#30363d] p-8 rounded-3xl hover:bg-[#1c2128] transition-colors group">
                    <div className="w-14 h-14 bg-purple-500/10 border border-purple-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <Building className="w-7 h-7 text-[#bc8cff]" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">B2B Management Portals</h3>
                    <p className="text-[#8b949e] leading-relaxed text-sm mb-6">
                        Institutional dashboards tailored for logistics, clinics, schools, and real estate. Secure authentication and real-time syncing.
                    </p>
                    <Link href="/contact" className="text-[#bc8cff] text-sm font-bold flex items-center gap-1 hover:underline">
                        Request a Demo →
                    </Link>
                </div>

                <div className="bg-[#1c2128]/50 border border-[#30363d] p-8 rounded-3xl hover:bg-[#1c2128] transition-colors group">
                    <div className="w-14 h-14 bg-orange-500/10 border border-orange-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <Code className="w-7 h-7 text-orange-400" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Custom Web Frameworks</h3>
                    <p className="text-[#8b949e] leading-relaxed text-sm mb-6">
                        Ultra-fast Next.js and React enterprise sites designed for heavy traffic and responsive B2C engagement.
                    </p>
                    <Link href="/contact" className="text-orange-400 text-sm font-bold flex items-center gap-1 hover:underline">
                        Start Web Project →
                    </Link>
                </div>

                <div className="bg-[#1c2128]/50 border border-[#30363d] p-8 rounded-3xl hover:bg-[#1c2128] transition-colors group lg:col-span-2">
                    <div className="w-14 h-14 bg-pink-500/10 border border-pink-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <Server className="w-7 h-7 text-pink-400" />
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <h3 className="text-xl font-bold mb-3">White-Label Product Licensing</h3>
                            <p className="text-[#8b949e] leading-relaxed text-sm md:max-w-md">
                                Don't want to build from scratch? License our complete "Ziba" product ecosystem. Buy out logistics engines, FinTech architectures, or e-commerce servers with fully rebranded code ready in 24 hours.
                            </p>
                        </div>
                        <Link href="/store" className="bg-white text-black hover:bg-gray-200 px-6 py-3 rounded-full font-bold whitespace-nowrap shadow-lg transition-transform hover:scale-105 active:scale-95 text-sm text-center">
                            Browse Ziba Store
                        </Link>
                    </div>
                </div>

            </div>

            {/* Final CTA */}
            <div className="mt-20 border-t border-white/5 pt-16 text-center">
                <h2 className="text-3xl font-bold mb-6">Ready to scale your corporate infrastructure?</h2>
                <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
                    <Link href="/contact" className="w-full bg-[#3fb950] hover:bg-[#2ea043] text-white px-8 py-4 rounded-xl font-bold shadow-lg transition-transform hover:scale-105">
                        Schedule Consultation
                    </Link>
                </div>
            </div>

        </div>
    );
}
