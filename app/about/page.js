import Link from 'next/link';
import { Target, Users, Server, Briefcase } from 'lucide-react';

export default function About() {
    return (
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32 relative">

            <div className="text-center mb-16 max-w-3xl mx-auto">
                <span className="text-[#34a853] font-bold tracking-wider uppercase text-sm mb-4 block">About Us</span>
                <h1 className="text-5xl font-extrabold text-white tracking-tight sm:text-6xl mb-6">Building the Future of African IT.</h1>
                <p className="text-xl text-[#8b949e]">
                    Carpso Solutions, formally registered since 2020, has grown into a premiere full-service Zambian agency focused on institutional digital deployments.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
                <div className="glass-panel p-2 rounded-[2rem]">
                    <img className="rounded-[1.5rem] w-full object-cover shadow-2xl h-[500px]" src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3" alt="Carpso Solutions Team" />
                </div>
                <div className="space-y-8">
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-4">Our Elite Engineering Division</h2>
                        <p className="text-[#8b949e] leading-relaxed">
                            We deploy high fidelity applications. Period. But that takes more than just coding. The engine fueling our architecture consists of leading backend architects, world-class UI/UX graphic designers, and specialized app developers who operate using the latest in React, Next.js, Flutter, and sophisticated AI integrations.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="glass-panel p-6 rounded-2xl flex flex-col border-t-2 border-[#58a6ff]">
                            <Briefcase className="w-8 h-8 text-[#58a6ff] mb-4" />
                            <h4 className="font-bold text-white mb-2">Registered Entity</h4>
                            <p className="text-xs text-[#8b949e]">Legally compliant since 2020 driving pure commercial solutions.</p>
                        </div>
                        <div className="glass-panel p-6 rounded-2xl flex flex-col border-t-2 border-[#ea4335]">
                            <Users className="w-8 h-8 text-[#ea4335] mb-4" />
                            <h4 className="font-bold text-white mb-2">Graphic Experts</h4>
                            <p className="text-xs text-[#8b949e]">Premium visual artists crafting modern aesthetics.</p>
                        </div>
                        <div className="glass-panel p-6 rounded-2xl flex flex-col border-t-2 border-[#fbbc05]">
                            <Server className="w-8 h-8 text-[#fbbc05] mb-4" />
                            <h4 className="font-bold text-white mb-2">App Engineers</h4>
                            <p className="text-xs text-[#8b949e]">Native processing cross-platform iOS & Android.</p>
                        </div>
                        <div className="glass-panel p-6 rounded-2xl flex flex-col border-t-2 border-[#34a853]">
                            <Target className="w-8 h-8 text-[#34a853] mb-4" />
                            <h4 className="font-bold text-white mb-2">Ziba Software</h4>
                            <p className="text-xs text-[#8b949e]">Proprietary ecosystem of core business management tools.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="glass-panel p-12 text-center rounded-[3rem] border border-white/10 bg-gradient-to-br from-[#0d1117] to-[#161b22]">
                <h2 className="text-3xl font-bold text-white mb-6">Partner With Us</h2>
                <p className="text-[#c9d1d9] max-w-3xl mx-auto mb-10 text-lg">
                    Whether you require a dedicated landing page or an enterprise-scale logistics multi-application system with embedded payment gateways and real-time mapping, Carpso Solutions is equipped, funded, and prepared to execute.
                </p>
                <Link href="/contact" className="inline-block px-10 py-4 bg-[#58a6ff] hover:bg-[#1f6feb] transition-colors rounded-full text-white font-bold text-lg shadow-[0_0_20px_rgba(88,166,255,0.4)]">
                    Initiate Deployment
                </Link>
            </div>

        </div>
    );
}
