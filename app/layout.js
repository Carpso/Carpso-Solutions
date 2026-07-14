import "./globals.css";
import Link from 'next/link';
import { Instagram, Linkedin, Facebook, MessageCircle, Mail } from 'lucide-react';
import Navbar from './components/Navbar';

export const metadata = {
  title: "Carpso Solutions | Creative Technology Agency",
  description: "Zambia's comprehensive provider of high-fidelity business architecture, enterprise management tools, and personal digital solutions.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased text-[#c9d1d9] bg-[#0d1117] min-h-screen flex flex-col">
        <div className="planet planet-1"></div>
        <div className="planet planet-2"></div>

        {/* Navigation Bar */}
        <Navbar />

        {/* Main Content Area */}
        <main className="flex-grow pt-16">
          {children}
        </main>

        {/* Dynamic Custom Footer */}
        <footer className="border-t border-white/5 mt-20 pt-16 pb-12 bg-[#0d1117] relative z-10 w-full overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">

            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

              <div className="md:col-span-1">
                <div className="flex items-center gap-2 text-xl font-medium text-white mb-6">
                  <img src="/carpso_logo.jpg" alt="Carpso" className="h-8 w-auto rounded-md" />
                  <span className="font-bold tracking-tight">Carpso</span> Solutions
                </div>
                <p className="text-[#8b949e] text-sm leading-relaxed mb-6">
                  Creative solutions that drive results. Zambia's comprehensive provider of high-fidelity business architecture.
                </p>

                {/* Social Icons */}
                <div className="flex gap-4">
                  <a href="https://instagram.com" className="w-8 h-8 rounded-full bg-white/5 flex flex-col items-center justify-center text-[#8b949e] hover:text-white hover:bg-[#e1306c] transition-all" aria-label="Instagram">
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a href="https://linkedin.com" className="w-8 h-8 rounded-full bg-white/5 flex flex-col items-center justify-center text-[#8b949e] hover:text-white hover:bg-[#0077b5] transition-all" aria-label="LinkedIn">
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a href="https://facebook.com" className="w-8 h-8 rounded-full bg-white/5 flex flex-col items-center justify-center text-[#8b949e] hover:text-white hover:bg-[#1877f2] transition-all" aria-label="Facebook">
                    <Facebook className="w-4 h-4" />
                  </a>
                  {/* TikTok Icon using Custom SVG or simple text if lucide doesn't have it natively */}
                  <a href="https://tiktok.com" className="w-8 h-8 rounded-full bg-white/5 flex flex-col items-center justify-center text-[#8b949e] hover:text-white hover:bg-[#00f2fe] transition-all" aria-label="TikTok">
                    <span className="font-bold text-xs font-serif">t</span>
                  </a>
                  <a href="https://wa.me/260968551110" className="w-8 h-8 rounded-full bg-white/5 flex flex-col items-center justify-center text-[#8b949e] hover:text-white hover:bg-[#25D366] transition-all" aria-label="WhatsApp">
                    <MessageCircle className="w-4 h-4" />
                  </a>
                  <a href="mailto:info@carpsosolutions.store" className="w-8 h-8 rounded-full bg-white/5 flex flex-col items-center justify-center text-[#8b949e] hover:text-white hover:bg-[#ea4335] transition-all" aria-label="Email">
                    <Mail className="w-4 h-4" />
                  </a>
                </div>
              </div>

              <div>
                <h4 className="text-white font-bold mb-6 tracking-wider uppercase text-sm">Quick Links</h4>
                <ul className="space-y-4 text-sm text-[#8b949e] font-medium">
                  <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                  <li><Link href="/services" className="hover:text-white transition-colors">Services</Link></li>
                  <li><Link href="/store" className="hover:text-white transition-colors">Portfolio</Link></li>
                  <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                  <li><Link href="/store" className="hover:text-[#58a6ff] transition-colors font-bold flex items-center gap-1">App Store <span className="bg-blue-500/20 text-blue-400 text-[10px] px-1.5 py-0.5 rounded ml-1">NEW</span></Link></li>
                </ul>
              </div>

              <div>
                <h4 className="text-white font-bold mb-6 tracking-wider uppercase text-sm">Company</h4>
                <ul className="space-y-4 text-sm text-[#8b949e] font-medium">
                  <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                  <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
                  <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                  <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="text-white font-bold mb-6 tracking-wider uppercase text-sm">Connect With Us</h4>
                <ul className="space-y-4 text-sm text-[#8b949e]">
                  <li className="flex gap-3">
                    <Mail className="w-5 h-5 text-[#58a6ff] flex-shrink-0" />
                    <span>info@carpsosolutions.store</span>
                  </li>
                  <li className="flex gap-3">
                    <MessageCircle className="w-5 h-5 text-[#58a6ff] flex-shrink-0" />
                    <span>+260 968 551 110</span>
                  </li>
                  <li className="mt-6 pt-6 border-t border-white/10 italic text-xs">
                    "Transforming Zambian digital infrastructure through high-fidelity code execution."
                  </li>
                </ul>
              </div>

            </div>

            <div className="border-t border-white/5 pt-8 text-center text-[#8b949e]">
              <p className="text-white font-medium mb-3">&copy; {new Date().getFullYear()} <b>Carpso Solutions</b>. All rights reserved.</p>
              <div className="max-w-4xl mx-auto text-xs leading-relaxed opacity-70">
                Ziba Apps is a specialized software development subsidiary of <b>Carpso Solutions</b>.
                Carpso Solutions is Zambia's comprehensive provider of high-fidelity business architecture, enterprise
                management tools, and personal digital solutions - empowering individuals and industry leaders through technical excellence.
              </div>
            </div>

          </div>
        </footer>

      </body>
    </html>
  );
}
