"use client";

import { useState, use } from 'react';
import { notFound } from 'next/navigation';
import { apps } from '../../../data/apps';
import { Share2, Lock, ShieldCheck, Download, MessageCircle, Star, ArrowLeft, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Head from 'next/head';

export default function AppDetailPage({ params }) {
    const { id } = use(params);
    const router = useRouter();
    const appData = apps.find(a => a.id === id);

    if (!appData) {
        notFound();
    }

    const appUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://carpsosolutions.store'}/store/${id}`;

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: `Buy ${appData.name} on Ziba App Store`,
                    text: appData.description,
                    url: appUrl,
                });
            } catch (err) { }
        } else {
            await navigator.clipboard.writeText(appUrl);
            alert("Link copied to clipboard!");
        }
    };

    const [showBuyModal, setShowBuyModal] = useState(false);
    const [payerName, setPayerName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [message, setMessage] = useState('');

    const openBuyModal = () => {
        setMessage('');
        setShowBuyModal(true);
    };

    const handleBuySubmit = async (e) => {
        e.preventDefault();
        if (!payerName || !email || !phone) {
            setMessage('Please enter your name, a valid email, and mobile money number.');
            return;
        }

        setIsProcessing(true);
        setMessage('');

        try {
            const res = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ appId: id, payerName, email, phone })
            });

            const data = await res.json();
            if (data.url || data.reference) {
                setMessage("Payment request sent! Please check your phone for the USSD PIN prompt...");
                // Generate a fallback ref if empty
                const ref = data.reference || Date.now().toString(36);

                // Keep modal open so user sees the message, wait 4 seconds, then redirect to invoice block
                setTimeout(() => {
                    const invoiceUrl = `/store/${id}/invoice?ref=${ref}&name=${encodeURIComponent(payerName)}&email=${encodeURIComponent(email)}&phone=${encodeURIComponent(phone)}&amount=${appData.price * 1.05}`;

                    // If desktop, Lipila might still need the user to visit the URL if it wasn't a direct STK push.
                    // But user specifically asked for SIMULATING/doing a USSD prompt, then giving a professional invoice.
                    // We route to invoice immediately. 
                    router.push(invoiceUrl);
                }, 4000);
            } else {
                setMessage("Failed to initialize payment. Please try again.");
                setIsProcessing(false);
            }
        } catch (err) {
            setMessage("An error occurred during checkout.");
            setIsProcessing(false);
        }
    };

    // WhatsApp Franchise URL
    const whatsappMsg = `Hi Carpso Solutions, I'm interested in a franchise for ${appData.name}.\n\nApp preview link: ${appUrl}`;
    const whatsappUrl = `https://wa.me/260968551110?text=${encodeURIComponent(whatsappMsg)}`;

    return (
        <>
            <Head>
                <title>{appData.name} | Ziba App Store</title>
            </Head>

            <div className="py-10 max-w-7xl mx-auto px-6 lg:px-8">

                <Link href="/store" className="inline-flex items-center gap-2 text-[#8b949e] hover:text-white transition-colors mb-8 font-medium">
                    <ArrowLeft className="w-5 h-5" /> Back to Store
                </Link>

                {/* Detail Hero */}
                <div className="flex flex-col md:flex-row gap-8 mb-12 items-start md:items-center">

                    <div className="w-[160px] h-[160px] flex-shrink-0 rounded-[22%] bg-white overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.5)] transform hover:scale-105 transition-all">
                        <img src={appData.logo} alt={appData.name} className="w-full h-full object-cover" />
                    </div>

                    <div className="flex-1 min-w-0">
                        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-2 leading-tight">
                            {appData.name}
                        </h1>
                        <span className="text-sm font-medium text-[#c9d1d9] block mb-2 opacity-80">Verified by <b>Carpso Solutions</b></span>
                        <Link href="/store" className="text-[#58a6ff] hover:underline cursor-pointer block mb-6 font-medium">
                            {appData.category}
                        </Link>

                        <div className="flex flex-wrap items-center gap-4 mt-6">
                            <button
                                onClick={openBuyModal}
                                className="bg-[#34a853] hover:bg-[#2e9348] text-white px-8 py-3.5 rounded-xl font-bold flex items-center gap-2 w-full sm:w-auto shadow-lg transition-transform hover:scale-105"
                            >
                                {appData.price === 500 && (
                                    <span className="bg-red-500/20 text-red-500 text-[10px] px-2 py-0.5 rounded border border-red-500/30 uppercase tracking-wider mr-1">Promo</span>
                                )}
                                Buy App for K{appData.price.toLocaleString('en-US')}
                            </button>
                            <a
                                href={whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-transparent border border-white/20 hover:border-white/50 text-[#58a6ff] px-6 py-3.5 rounded-xl font-medium flex items-center gap-2 w-full sm:w-auto justify-center transition-colors"
                            >
                                <MessageCircle className="w-5 h-5" /> Buy Franchise
                            </a>
                            <button
                                onClick={handleShare}
                                className="p-3.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-white w-full sm:w-auto flex justify-center"
                                title="Share App"
                            >
                                <Share2 className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    <div className="hidden md:flex flex-col items-end border-l border-[#30363d] pl-8 h-full min-h-[120px] justify-center text-right">
                        <div className="text-5xl font-bold text-white mb-1">4.8</div>
                        <div className="flex text-[#eab308] gap-1 mb-1">
                            <Star className="w-4 h-4 fill-current" />
                            <Star className="w-4 h-4 fill-current" />
                            <Star className="w-4 h-4 fill-current" />
                            <Star className="w-4 h-4 fill-current" />
                            <Star className="w-4 h-4 fill-current opacity-70" />
                        </div>
                        <div className="text-xs text-[#8b949e]">2.4K Ratings</div>
                    </div>
                </div>

                {/* Stats Row */}
                <div className="flex items-center gap-12 border-b border-[#30363d] pb-8 mb-10 overflow-x-auto text-center justify-center sm:justify-start">
                    <div>
                        <div className="font-bold text-xl text-white mb-1">{appData.version}</div>
                        <div className="text-xs text-[#8b949e] uppercase tracking-wider">Version</div>
                    </div>
                    <div className="w-px h-8 bg-[#30363d]"></div>
                    <div>
                        <div className="font-bold text-xl text-white mb-1">{appData.size}</div>
                        <div className="text-xs text-[#8b949e] uppercase tracking-wider">Size</div>
                    </div>
                    <div className="w-px h-8 bg-[#30363d]"></div>
                    <div>
                        <div className="font-bold text-xl text-white mb-1">{appData.installs}</div>
                        <div className="text-xs text-[#8b949e] uppercase tracking-wider">Downloads</div>
                    </div>
                    <div className="w-px h-8 bg-[#30363d]"></div>
                    <div>
                        <div className="font-bold text-xl text-white mb-1">100%</div>
                        <div className="text-xs text-[#8b949e] uppercase tracking-wider">Verified</div>
                    </div>
                </div>

                {/* App Description */}
                <div className="mb-14">
                    <h2 className="text-2xl font-bold text-white mb-6">About this app</h2>
                    <p className="text-[#c9d1d9] text-lg leading-relaxed max-w-4xl opacity-90">
                        {appData.description}
                    </p>
                </div>

                {/* Screenshots */}
                <div className="mb-14">
                    <h2 className="text-2xl font-bold text-white mb-6">Screenshots</h2>
                    <div className="flex gap-4 overflow-x-auto pb-4 snap-x pr-8">
                        {appData.screenshots && appData.screenshots.length > 0 ? (
                            appData.screenshots.map((shot, idx) => (
                                <div key={idx} className="min-w-[220px] h-[440px] bg-[#1c2128] rounded-2xl border border-white/10 flex items-center justify-center overflow-hidden snap-start flex-shrink-0">
                                    <img src={`/screenshots/${shot}`} alt="Screenshot" className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }} />
                                    <div className="hidden text-[#8b949e]">No Preview</div>
                                </div>
                            ))
                        ) : (
                            <div className="min-w-[220px] h-[440px] bg-[#1c2128] rounded-2xl border border-white/5 flex items-center justify-center snap-start flex-shrink-0">
                                <div className="text-[#8b949e] text-sm font-medium">Coming Soon</div>
                            </div>
                        )}
                    </div>
                </div>

                {/* What's New */}
                <div className="mb-16">
                    <h2 className="text-2xl font-bold text-white mb-6">What's New</h2>
                    <div className="bg-[#1c2128] border border-[#30363d] rounded-2xl p-6">
                        <div className="flex justify-between items-center mb-4 text-sm">
                            <span className="font-bold text-white">Version {appData.version}</span>
                            <span className="text-[#8b949e]">{appData.updateDate}</span>
                        </div>
                        <p className="text-[#c9d1d9] text-sm leading-relaxed">
                            {appData.changelog}
                        </p>
                    </div>
                </div>

                {/* Security & Purchase Protection */}
                <div className="py-10 border-t border-[#30363d]">
                    <h2 className="text-2xl font-bold text-white mb-8 text-center sm:text-left">Purchase Protection</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white/5 backdrop-blur border border-white/10 p-6 rounded-2xl flex flex-col items-center text-center">
                            <ShieldCheck className="w-10 h-10 text-[#58a6ff] mb-4" />
                            <h3 className="text-lg font-bold text-white mb-2">Secure Payment</h3>
                            <p className="text-[#8b949e] text-sm">Processed entirely through Lipila institutional grade encryption.</p>
                        </div>
                        <div className="bg-white/5 backdrop-blur border border-white/10 p-6 rounded-2xl flex flex-col items-center text-center">
                            <Lock className="w-10 h-10 text-[#58a6ff] mb-4" />
                            <h3 className="text-lg font-bold text-white mb-2">Verified Delivery</h3>
                            <p className="text-[#8b949e] text-sm">Unique download links explicitly generated to the buyer's email after payment.</p>
                        </div>
                        <div className="bg-white/5 backdrop-blur border border-white/10 p-6 rounded-2xl flex flex-col items-center text-center">
                            <Download className="w-10 h-10 text-[#58a6ff] mb-4" />
                            <h3 className="text-lg font-bold text-white mb-2">Instant Access</h3>
                            <p className="text-[#8b949e] text-sm">The high-fidelity APK payload will be authorized for installation immediately.</p>
                        </div>
                    </div>
                </div>

                {/* Custom Buy Modal */}
                {showBuyModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                        <div className="bg-[#1c2128] border border-[#30363d] rounded-3xl w-full max-w-md overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.8)]">
                            <div className="p-6 border-b border-[#30363d] flex justify-between items-center bg-[#0d1117]">
                                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                    <Lock className="w-5 h-5 text-[#58a6ff]" /> Secure Checkout
                                </h3>
                                <button onClick={() => setShowBuyModal(false)} className="text-[#8b949e] hover:text-white transition-colors">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <form onSubmit={handleBuySubmit} className="p-8">
                                <div className="flex items-center gap-4 mb-6">
                                    <img src={appData.logo} alt="Logo" className="w-12 h-12 rounded-xl" />
                                    <div>
                                        <div className="font-bold text-white">{appData.name}</div>
                                        <div className="text-xs text-[#8b949e]">Enterprise App License</div>
                                    </div>
                                </div>

                                <div className="bg-[#0d1117] rounded-xl p-4 mb-6 border border-[#30363d]">
                                    <div className="flex justify-between text-sm mb-2 text-[#8b949e]">
                                        <span>License Cost</span>
                                        <span>K{appData.price.toLocaleString('en-US')}</span>
                                    </div>
                                    <div className="flex justify-between text-sm mb-4 text-[#8b949e]">
                                        <span>Mobile Money Transfer Fee (5%)</span>
                                        <span>K{(appData.price * 0.05).toLocaleString('en-US')}</span>
                                    </div>
                                    <div className="flex justify-between font-bold text-white border-t border-[#30363d] pt-3">
                                        <span>Total Amount</span>
                                        <span className="text-[#34a853]">K{(appData.price * 1.05).toLocaleString('en-US')}</span>
                                    </div>
                                    {appData.price === 500 && (
                                        <div className="mt-3 text-[10px] uppercase text-red-400 font-bold tracking-wider text-right animate-pulse">
                                            🔥 Limited Time Promo Active
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-4 mb-6">
                                    <div>
                                        <label className="block text-sm font-medium text-white mb-2">Payer Name</label>
                                        <input
                                            type="text"
                                            required
                                            value={payerName}
                                            onChange={(e) => setPayerName(e.target.value)}
                                            placeholder="John Doe"
                                            className="w-full bg-[#0d1117] border border-[#30363d] rounded-xl py-3 px-4 text-[#e8eaed] focus:outline-none focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff] transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-white mb-2">Delivery Email</label>
                                        <input
                                            type="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="you@company.com"
                                            className="w-full bg-[#0d1117] border border-[#30363d] rounded-xl py-3 px-4 text-[#e8eaed] focus:outline-none focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff] transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-white mb-2">Mobile Money Number</label>
                                        <input
                                            type="tel"
                                            required
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            placeholder="e.g. 0968551110"
                                            className="w-full bg-[#0d1117] border border-[#30363d] rounded-xl py-3 px-4 text-[#e8eaed] focus:outline-none focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff] transition-all font-mono"
                                        />
                                    </div>
                                </div>

                                {message && (
                                    <div className={`mb-6 p-4 rounded-xl border text-sm flex flex-col items-center justify-center text-center shadow-lg transition-all ${message.includes('sent') ? 'bg-green-500/10 border-green-500/30 text-green-400 animate-pulse' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>
                                        <Lock className={`w-8 h-8 mb-2 ${message.includes('sent') ? 'text-green-500' : 'text-red-500'}`} />
                                        <span className="font-bold text-lg mb-1">{message.includes('sent') ? 'Authorize Payment' : 'Error'}</span>
                                        {message}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={isProcessing}
                                    className={`w-full py-4 rounded-xl font-bold text-white transition-all ${isProcessing ? 'bg-[#2ea043]/50 cursor-not-allowed' : 'bg-[#2ea043] hover:bg-[#2c974b] hover:shadow-[0_0_15px_rgba(46,160,67,0.4)]'}`}
                                >
                                    {isProcessing ? 'Sending Secure Prompt...' : `Pay K${(appData.price * 1.05).toLocaleString('en-US')}`}
                                </button>

                                <div className="mt-6 flex items-center justify-center gap-2 text-xs text-[#8b949e]">
                                    <ShieldCheck className="w-4 h-4" /> Secured by Lipila Mobile Money
                                </div>
                            </form>
                        </div>
                    </div>
                )}

            </div>
        </>
    );
}
