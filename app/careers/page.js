import Link from 'next/link';

export default function Careers() {
    return (
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-32 text-center h-[70vh] flex flex-col items-center justify-center">

            <span className="text-[#58a6ff] font-bold tracking-wider uppercase text-sm mb-4 block">Venture Execution</span>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight mb-8">Join the Vanguard</h1>
            <p className="text-[#8b949e] max-w-2xl mx-auto mb-12 text-lg leading-relaxed">
                Carpso Solutions operates at the bleeding edge of business architecture. We deploy technology built to run economies.
            </p>

            <div className="glass-panel p-10 border border-[#30363d] rounded-3xl max-w-3xl mx-auto mb-8 bg-[#0d1117]/50 backdrop-blur-xl">
                <h2 className="text-2xl font-bold text-white mb-4">We will soon be publishing vacancies.</h2>
                <p className="text-[#8b949e] mb-6">
                    Our deployment teams consist of full-stack engineers, digital architects, graphic designers, UI/UX perfectionists, and scale operators. We are finalizing our upcoming quarters' team expansion slots.
                </p>
                <div className="inline-block px-6 py-2 bg-white/5 border border-white/10 rounded-full font-medium text-white shadow-inner animate-pulse">
                    Keep on the lookout.
                </div>
            </div>

            <Link href="/" className="text-[#e8eaed] flex items-center gap-2 mx-auto w-fit hover:text-[#58a6ff] font-medium transition-colors">
                <span>&larr; Return to Core</span>
            </Link>
        </div>
    );
}
