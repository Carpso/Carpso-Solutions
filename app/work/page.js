import Link from 'next/link';
import { ArrowLeft, PlayCircle } from 'lucide-react';

export const metadata = {
    title: "Our Work | Carpso Solutions",
};

export default function Work() {

    const videos = [
        {
            title: "Sell On App Launch Trailer",
            category: "FinTech App",
            src: "/videos/sellonapp.mp4"
        },
        {
            title: "Fashion Boutique Commercial",
            category: "Retail Ecommerce",
            src: "/videos/fashion.mp4"
        },
        {
            title: "Intelligent Wedding Planner",
            category: "Lifestyle Utility",
            src: "/videos/wedding.mp4"
        },
        {
            title: "Predictions Engine Deployment",
            category: "Data Analytics",
            src: "/videos/predictions.mp4"
        },
        {
            title: "Premium Barbershop System",
            category: "Service Bookings",
            src: "/videos/barbershop.mp4"
        },
        {
            title: "Ready To Use Enterprise Solutions",
            category: "Ziba General Software",
            src: "/videos/ready.mp4"
        }
    ];

    return (
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32 relative">

            <Link href="/" className="inline-flex items-center gap-2 text-[#8b949e] hover:text-[#58a6ff] transition-colors mb-12 font-bold text-sm">
                <ArrowLeft className="w-4 h-4" /> Back to Base
            </Link>

            <div className="text-center mb-20 max-w-3xl mx-auto">
                <span className="text-[#58a6ff] font-bold tracking-wider uppercase text-sm mb-4 block">Our Work Archive</span>
                <h1 className="text-4xl font-extrabold text-white tracking-tight sm:text-6xl mb-6">See It In Motion</h1>
                <p className="text-xl text-[#8b949e]">
                    Scroll through our production clips to visualize the fluidity and modern architecture of Carpso Solution deployments.
                </p>
            </div>

            <div className="space-y-32">
                {videos.map((vid, idx) => (
                    <div key={idx} className={`flex flex-col ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-16`}>

                        <div className="w-full lg:w-1/2 flex justify-center rounded-[2rem] overflow-hidden shadow-2xl bg-black border border-white/10 p-2 relative group max-w-[360px] mx-auto">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none z-10"></div>
                            <video
                                controls
                                preload="metadata"
                                className="w-full h-auto aspect-[9/16] object-cover rounded-[1.5rem] relative z-20 group-hover:scale-[1.02] transition-transform duration-500"
                                poster=""
                            >
                                <source src={vid.src} type="video/mp4" />
                                Your browser does not support HTML5 video.
                            </video>
                        </div>

                        <div className="w-full lg:w-1/2 text-left">
                            <div className="flex items-center gap-2 text-[#58a6ff] font-bold uppercase tracking-widest text-xs mb-3">
                                <PlayCircle className="w-4 h-4" /> {vid.category}
                            </div>
                            <h2 className="text-3xl font-extrabold text-white mb-6 leading-tight">{vid.title}</h2>
                            <p className="text-[#8b949e] text-lg leading-relaxed mb-8">
                                Exceptional performance backed by institutional scale design logic. This showcase reflects a fraction of the high-fidelity UI integrations provided exclusively by Carpso & Ziba.
                            </p>
                            <Link href="/contact" className="px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 rounded-full font-bold text-white transition-all">
                                Request Similar Build
                            </Link>
                        </div>

                    </div>
                ))}
            </div>

        </div>
    );
}
