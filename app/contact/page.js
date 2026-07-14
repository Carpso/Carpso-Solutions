"use client";

import { useState } from 'react';
import { Mail, MessageCircle, MapPin, Phone, Send } from 'lucide-react';
import Link from 'next/link';

export default function ContactUs() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [submitting, setSubmitting] = useState(false);
    const [done, setDone] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            // Generate WhatsApp link
            const text = `Hi Carpso Solutions, my name is ${formData.name}.\n\nMessage: ${formData.message}`;
            const whatsappUrl = `https://wa.me/260968551110?text=${encodeURIComponent(text)}`;

            setDone(true);
            setSubmitting(false);

            // Redirect to WhatsApp immediately after showing done state for a sec
            setTimeout(() => {
                window.open(whatsappUrl, "_blank");
            }, 1000);

        } catch (error) {
            setSubmitting(false);
            alert("Failed to send message.");
        }
    };

    return (
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32 relative">
            <div className="absolute top-0 left-1/2 -z-10 -translate-x-1/2 blur-3xl xl:-top-6 opacity-20">
                <div className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#1a73e8] to-[#00c6ff]" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}></div>
            </div>

            <div className="text-center mb-16 max-w-2xl mx-auto">
                <span className="text-[#58a6ff] font-bold tracking-wider uppercase text-sm mb-2 block">Contact Us</span>
                <h1 className="text-4xl font-extrabold text-white tracking-tight sm:text-5xl mb-6">Let's build something extraordinary together.</h1>
                <p className="text-lg text-[#8b949e]">We're here to turn your vision into a reality. Drop us a message, and our enterprise deployment team will follow up via WhatsApp and Email.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

                {/* Contact Information Side */}
                <div className="glass-panel p-10 rounded-3xl border-t-4 border-t-[#58a6ff] h-fit">
                    <h3 className="text-2xl font-bold text-white mb-8">Reach Out Direct</h3>

                    <ul className="space-y-8">
                        <li className="flex gap-4 items-center">
                            <div className="w-12 h-12 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center text-[#58a6ff] flex-shrink-0">
                                <MessageCircle className="w-6 h-6" />
                            </div>
                            <div>
                                <div className="text-white font-bold mb-1">WhatsApp & Phone</div>
                                <div className="text-[#8b949e] font-medium">+260 968 551 110</div>
                            </div>
                        </li>
                        <li className="flex gap-4 items-center">
                            <div className="w-12 h-12 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center text-[#58a6ff] flex-shrink-0">
                                <Mail className="w-6 h-6" />
                            </div>
                            <div>
                                <div className="text-white font-bold mb-1">Email Support</div>
                                <div className="text-[#8b949e] font-medium">info@carpsosolutions.store</div>
                            </div>
                        </li>
                        <li className="flex gap-4 items-center">
                            <div className="w-12 h-12 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center text-[#58a6ff] flex-shrink-0">
                                <MapPin className="w-6 h-6" />
                            </div>
                            <div>
                                <div className="text-white font-bold mb-1">Zambia Headquarters</div>
                                <div className="text-[#8b949e] font-medium">Lusaka, Zambia (Enterprise Operations)</div>
                            </div>
                        </li>
                    </ul>
                </div>

                {/* Form Side */}
                <div className="glass-panel p-10 rounded-3xl relative">
                    {done ? (
                        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center p-8 bg-black/60 rounded-3xl backdrop-blur-md animate-in fade-in zoom-in duration-300">
                            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white mb-6">
                                <MessageCircle className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">Message Registered!</h3>
                            <p className="text-[#8b949e]">Redirecting you to our direct WhatsApp line for immediate assistance...</p>
                        </div>
                    ) : null}

                    <h3 className="text-2xl font-bold text-white mb-8">Send a Detailed Inquiry</h3>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-white mb-2">Full Name / Company Name</label>
                            <input
                                required
                                type="text"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                className="w-full bg-[#0d1117] border border-[#30363d] rounded-xl py-3.5 px-4 text-[#e8eaed] focus:outline-none focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff] transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-white mb-2">Email Address</label>
                            <input
                                required
                                type="email"
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                                className="w-full bg-[#0d1117] border border-[#30363d] rounded-xl py-3.5 px-4 text-[#e8eaed] focus:outline-none focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff] transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-white mb-2">Consultation Details</label>
                            <textarea
                                required
                                rows={4}
                                value={formData.message}
                                onChange={e => setFormData({ ...formData, message: e.target.value })}
                                className="w-full bg-[#0d1117] border border-[#30363d] rounded-xl py-3.5 px-4 text-[#e8eaed] focus:outline-none focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff] transition-all resize-none"
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            disabled={submitting}
                            className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 text-white transition-all ${submitting ? 'bg-[#1a73e8]/50 object-not-allowed cursor-wait' : 'bg-[#1a73e8] hover:bg-[#1557b0] shadow-lg hover:shadow-2xl'}`}
                        >
                            <Send className="w-5 h-5" /> {submitting ? 'Transmitting...' : 'Send to Carpso Hub'}
                        </button>
                        <div className="text-xs text-center text-[#8b949e]">Your request will be recorded directly into our secure deployment pipeline.</div>
                    </form>
                </div>

            </div>
        </div>
    );
}
