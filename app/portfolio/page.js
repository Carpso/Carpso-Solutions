import Link from 'next/link';

export default function Page() {
    return (
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 text-center">
            <h1 className="text-4xl font-bold text-white mb-6 uppercase tracking-wider">Page Under Construction</h1>
            <p className="text-[#c9d1d9] max-w-2xl mx-auto mb-10 text-lg">We are currently crafting this section to ensure it meets our high-fidelity enterprise standards.</p>
            <Link href="/" className="text-[#58a6ff] hover:text-white border border-[#58a6ff] hover:bg-[#58a6ff] transition-all px-8 py-3 rounded-full font-bold">Return Home</Link>
        </div>
    );
}
