"use client";
import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <nav className="fixed w-full z-50 bg-[#0d1117]/90 backdrop-blur-md border-b border-white/10 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 w-full relative">

                    {/* Logo / Brand */}
                    <div className="flex-shrink-0 flex items-center gap-2 text-xl font-medium text-white shadow-lg">
                        <Link href="/" className="flex items-center gap-2 relative z-50">
                            <img src="/carpso_logo.jpg" alt="Carpso" className="h-8 w-auto rounded-md" />
                            <span className="font-bold tracking-tight">Carpso</span> <span className="hidden sm:inline">Solutions</span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center justify-end w-full">
                        <div className="ml-10 flex items-center space-x-6">
                            <Link href="/" className="text-gray-300 hover:text-white px-3 py-2 rounded-md font-medium transition-colors text-sm">
                                AGENCY
                            </Link>
                            <Link href="/services" className="text-gray-300 hover:text-white px-3 py-2 rounded-md font-medium transition-colors text-sm">
                                Services
                            </Link>
                            <Link href="/about" className="text-gray-300 hover:text-white px-3 py-2 rounded-md font-medium transition-colors text-sm">
                                About
                            </Link>
                            <Link href="/store" className="text-gray-300 hover:text-white px-3 py-2 rounded-md font-medium transition-colors text-sm">
                                Portfolio
                            </Link>

                            <Link href="/contact" className="ml-4 border border-white/20 text-white px-5 py-2 rounded-full text-sm font-semibold transition-all hover:bg-white hover:text-black">
                                Get Started
                            </Link>

                            <Link href="/store" className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white px-5 py-2 rounded-full text-sm font-semibold transition-all shadow-[0_0_15px_rgba(0,198,255,0.3)]">
                                App Store
                            </Link>
                        </div>
                    </div>

                    {/* Mobile Menu Button - positioned on the right */}
                    <div className="md:hidden flex items-center z-50 absolute right-0">
                        {/* Quick App Store button built just for mobile for immediate access */}
                        <Link href="/store" className="mr-3 bg-gradient-to-r from-blue-600 to-cyan-600 active:from-blue-500 active:to-cyan-500 text-white px-3 py-1.5 rounded-full text-[11px] font-bold shadow-[0_0_10px_rgba(0,198,255,0.4)] block sm:hidden">
                            App Store
                        </Link>

                        <button
                            onClick={toggleMenu}
                            className="text-gray-300 hover:text-white focus:outline-none focus:text-white p-2"
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            <div
                className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-[#0d1117]/95 backdrop-blur-xl border-b border-white/10 ${isOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'}`}
            >
                <div className="px-4 pt-4 pb-6 space-y-2">
                    <Link href="/" onClick={toggleMenu} className="block text-gray-300 hover:text-white px-3 py-3 rounded-md font-medium transition-colors text-base border-b border-white/5">
                        AGENCY
                    </Link>
                    <Link href="/services" onClick={toggleMenu} className="block text-gray-300 hover:text-white px-3 py-3 rounded-md font-medium transition-colors text-base border-b border-white/5">
                        Services
                    </Link>
                    <Link href="/about" onClick={toggleMenu} className="block text-gray-300 hover:text-white px-3 py-3 rounded-md font-medium transition-colors text-base border-b border-white/5">
                        About
                    </Link>
                    <Link href="/store" onClick={toggleMenu} className="block text-gray-300 hover:text-white px-3 py-3 rounded-md font-medium transition-colors text-base border-b border-white/5">
                        Portfolio
                    </Link>

                    <div className="pt-6 flex flex-col gap-3">
                        <Link href="/contact" onClick={toggleMenu} className="text-center w-full border border-white/20 text-white px-5 py-3 rounded-full text-sm font-semibold transition-all active:bg-white active:text-black">
                            Get Started
                        </Link>

                        <Link href="/store" onClick={toggleMenu} className="text-center w-full bg-gradient-to-r from-blue-600 to-cyan-600 active:from-blue-500 active:to-cyan-500 text-white px-5 py-3 rounded-full text-sm font-semibold transition-all shadow-[0_0_15px_rgba(0,198,255,0.3)]">
                            App Store
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
