import Link from 'next/link';
import { apps } from '../data/apps';
import { Share2, Lock, ShieldCheck, Download, Code, Smartphone, Briefcase, Zap, CheckCircle2, ChevronRight, Play, Star } from 'lucide-react';

export default function Home() {
  const premiumProjects = apps.filter(app => app.price === 3500);

  return (
    <div className="relative isolate overflow-hidden">

      {/* Background Glow Effects */}
      <div className="absolute top-0 left-1/2 -z-10 -translate-x-1/2 blur-3xl xl:-top-6" aria-hidden="true">
        <div className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#1a73e8] to-[#0d47a1] opacity-20" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}></div>
      </div>

      {/* Hero Section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-24 pb-20 sm:pt-32 sm:pb-32">
        <div className="mx-auto max-w-4xl text-center">
          <span className="text-[#58a6ff] font-bold tracking-wider uppercase text-sm mb-4 block">Creative Technology Agency</span>
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-7xl mb-8 leading-tight">
            Transform Your <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4285f4] to-[#00c6ff]">Brand Story</span>
          </h1>
          <p className="mt-6 text-xl leading-8 text-[#c9d1d9] mb-10 max-w-2xl mx-auto">
            We craft exceptional digital experiences that captivate audiences and drive measurable results for forward-thinking brands.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/contact" className="rounded-full bg-white px-8 py-4 text-sm font-bold text-black shadow-sm hover:bg-gray-200 focus-visible:outline transition-all transform hover:scale-105 shadow-[0_4px_12px_rgba(255,255,255,0.2)] w-full sm:w-auto">
              Let's Talk
            </Link>
            <Link href="/work" className="text-sm font-bold leading-6 text-white hover:text-[#58a6ff] transition-colors border border-white/20 rounded-full px-8 py-4 w-full sm:w-auto hover:bg-white/5 flex items-center justify-center gap-2">
              <Play className="w-4 h-4" /> View Our Work
            </Link>
          </div>
        </div>
      </div>

      {/* Trusted By Marquee */}
      <div className="border-y border-white/10 bg-[#0d1117]/50 backdrop-blur-sm py-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-6 text-center text-sm font-semibold text-[#8b949e]">Trusted by 20+ Businesses Countrywide</div>
        <div className="relative flex overflow-x-hidden">
          <div className="animate-marquee whitespace-nowrap flex items-center gap-16 text-[#e8eaed] font-bold text-xl opacity-60">
            <span>AfriTech Innovations</span>
            <span>Zambezi Solutions</span>
            <span>Copperbelt Systems</span>
            <span>Lusaka Dynamics</span>
            <span>Savannah Data</span>
            <span>Apex Core</span>
            <span>Equator Logic</span>
            <span>Solaris Net</span>
            <span className="ml-16">AfriTech Innovations</span>
            <span>Zambezi Solutions</span>
            <span>Copperbelt Systems</span>
            <span>Lusaka Dynamics</span>
            <span>Savannah Data</span>
            <span>Apex Core</span>
            <span>Equator Logic</span>
            <span>Solaris Net</span>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32" id="services">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[#58a6ff] font-bold tracking-wider uppercase text-sm mb-2 block">Our Services</span>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Explore the world through the lens of our visual capabilities, and find what you love.</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="glass-panel p-8 rounded-2xl flex flex-col items-start transition-all hover:translate-y-[-8px] border-t-4 border-t-[#ea4335]">
            <h3 className="text-xl font-bold text-white mb-4">Design</h3>
            <p className="text-sm text-[#8b949e] leading-relaxed">
              Stunning visual identities, ultra-premium UI/UX design, and brand architectures that leave a lasting impact.
            </p>
          </div>
          <div className="glass-panel p-8 rounded-2xl flex flex-col items-start transition-all hover:translate-y-[-8px] border-t-4 border-t-[#4285f4]">
            <h3 className="text-xl font-bold text-white mb-4">Development</h3>
            <p className="text-sm text-[#8b949e] leading-relaxed">
              Robust enterprise software, scalable APIs, and high-fidelity mobile applications engineered for performance.
            </p>
          </div>
          <div className="glass-panel p-8 rounded-2xl flex flex-col items-start transition-all hover:translate-y-[-8px] border-t-4 border-t-[#fbbc05]">
            <h3 className="text-xl font-bold text-white mb-4">Digital Marketing</h3>
            <p className="text-sm text-[#8b949e] leading-relaxed">
              Data-driven campaigns that amplify your reach and maximize ROI across all digital channels.
            </p>
          </div>
          <div className="glass-panel p-8 rounded-2xl flex flex-col items-start transition-all hover:translate-y-[-8px] border-t-4 border-t-[#34a853]">
            <h3 className="text-xl font-bold text-white mb-4">SEO</h3>
            <p className="text-sm text-[#8b949e] leading-relaxed">
              Deep algorithmic search engine optimization ensuring your brand sits at the pinnacle of organic discovery.
            </p>
          </div>
        </div>
      </div>

      {/* Methodology Section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          <div className="space-y-12">
            <div>
              <h2 className="text-3xl font-bold text-white mb-4">We're passionate about digital excellence</h2>
              <p className="text-[#8b949e] text-lg">Your vision, our expertise. We transform complex problems into elegant scalable solutions.</p>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0 mt-1"><CheckCircle2 className="w-8 h-8 text-[#58a6ff]" /></div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Quality at the forefront</h3>
                <p className="text-[#8b949e]">Every project is crafted with attention to detail and a commitment to deliver exceptional results.</p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0 mt-1"><CheckCircle2 className="w-8 h-8 text-[#58a6ff]" /></div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Focus on measurable impact</h3>
                <p className="text-[#8b949e]">Our focus is on delivering tangible, measurable results that help your business thrive.</p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0 mt-1"><CheckCircle2 className="w-8 h-8 text-[#58a6ff]" /></div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Strategy & Discovery</h3>
                <p className="text-[#8b949e]">We start by deeply understanding your brand, audience, and goals to build a comprehensive roadmap for success.</p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0 mt-1"><CheckCircle2 className="w-8 h-8 text-[#58a6ff]" /></div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Creative Execution</h3>
                <p className="text-[#8b949e]">Our team brings ideas to life with precision and creativity, refining every detail through a collaborative feedback loop.</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="glass-panel p-2 rounded-[2rem] transform rotate-2 hover:rotate-0 transition-transform duration-500">
              <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80" alt="Creative team collaborating" className="rounded-[1.5rem] w-full object-cover aspect-[4/5] shadow-2xl" />
            </div>
            <div className="absolute -bottom-10 -left-10 glass-panel p-6 rounded-2xl shadow-xl w-64 animate-bounce-slow">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center text-white font-bold text-xl">
                  AI
                </div>
                <div>
                  <div className="font-bold text-white">Innovation First</div>
                  <div className="text-sm text-[#8b949e]">Driven Architecture</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Portfolio Promo */}
      <div className="border-y border-white/5 bg-gradient-to-r from-[#0d1117] via-[#161b22] to-[#0d1117] py-24 sm:py-32 my-12" id="portfolio">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="md:flex md:items-end md:justify-between mb-16">
            <div className="max-w-2xl">
              <span className="text-[#58a6ff] font-bold tracking-wider uppercase text-sm mb-2 block">Portfolio</span>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-4">Explore our portfolio of creative solutions</h2>
              <p className="text-[#8b949e] text-lg">
                Explore our portfolio full of creative solutions, from branding and web design to marketing campaigns that drive results.
              </p>
            </div>
            <Link href="/store" className="mt-6 md:mt-0 flex items-center gap-2 text-[#58a6ff] font-bold hover:text-white transition-colors group">
              View Full Portfolio <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group cursor-pointer">
              <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden mb-4 bg-[#1c2128]">
                <img src="https://images.unsplash.com/photo-1618761714954-0b8cd0026356?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Next-Gen Banking UI" />
              </div>
              <h3 className="text-xl font-bold text-white mb-1">Next-Gen Banking UI</h3>
              <p className="text-[#8b949e] text-sm">Fintech Application Dashboard</p>
            </div>
            <div className="group cursor-pointer">
              <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden mb-4 bg-[#1c2128]">
                <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Data Analytics" />
              </div>
              <h3 className="text-xl font-bold text-white mb-1">Fintech Dashboard</h3>
              <p className="text-[#8b949e] text-sm">Payment Details Visualization</p>
            </div>
            <div className="group cursor-pointer">
              <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden mb-4 bg-[#1c2128]">
                <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2015&q=80" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Agency Website" />
              </div>
              <h3 className="text-xl font-bold text-white mb-1">Digital Agency Site</h3>
              <p className="text-[#8b949e] text-sm">Sleek Modern Web Architecture</p>
            </div>
          </div>
        </div>
      </div>


      {/* Flagship Projects Section (From Previous iteration) */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-32 pt-16">
        <div className="mb-16 text-center">
          <span className="text-[#58a6ff] font-bold tracking-wider uppercase text-sm mb-2 block">Premium Deployments</span>
          <h2 className="text-3xl font-bold text-white tracking-tight sm:text-4xl mb-4">Enterprise Market Solutions</h2>
          <p className="text-center text-[#9aa0a6] text-lg max-w-2xl mx-auto">
            A showcase of our highest-tier, full-scale ecosystem implementations ready for immediate Zambian market scaling.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 sm:grid-cols-3 lg:gap-16">
          {premiumProjects.map((project) => (
            <div key={project.id} className="glass-panel rounded-3xl overflow-hidden flex flex-col transform hover:scale-105 transition-all shadow-lg hover:shadow-2xl">
              <div className="h-48 w-full p-8 flex items-center justify-center relative border-b border-[#3c4043]" style={{ background: project.bg }}>
                <div className="absolute inset-0 bg-black/20 z-0"></div>
                <img src={project.logo} className="w-24 h-24 object-cover rounded-[22%] shadow-2xl z-10 bg-white" alt={project.name} />
              </div>
              <div className="p-8 flex-grow flex flex-col">
                <h3 className="text-2xl font-bold text-white mb-2">{project.name}</h3>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#58a6ff] mb-4">{project.category} Ecosystem</span>
                <p className="text-sm text-[#8b949e] flex-grow leading-relaxed">
                  {project.description}
                </p>
                <Link href={`/store/${project.id}`} className="mt-6 w-full text-center py-3 rounded-xl border border-[#3c4043] font-medium text-white hover:bg-white/5 transition-colors">
                  View Deployment Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-24 sm:py-32 bg-[#0d1117]" id="testimonials">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">People who changed how they do business</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            <div className="glass-panel p-8 rounded-2xl border border-white/5">
              <div className="flex gap-1 mb-4 text-[#eab308]"><Star className="fill-current w-4 h-4" /><Star className="fill-current w-4 h-4" /><Star className="fill-current w-4 h-4" /><Star className="fill-current w-4 h-4" /><Star className="fill-current w-4 h-4" /></div>
              <p className="text-[#c9d1d9] mb-6 line-clamp-4 leading-relaxed italic">"Working with this agency transformed our brand completely. Their strategic approach and creative execution exceeded all expectations, driving growth and engagement."</p>
              <div className="flex items-center gap-4 border-t border-white/10 pt-4">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center font-bold text-white">S</div>
                <div><div className="font-bold text-white">Sarah Zimba</div><div className="text-xs text-[#8b949e]">CEO, TechVision</div></div>
              </div>
            </div>

            <div className="glass-panel p-8 rounded-2xl border border-white/5">
              <div className="flex gap-1 mb-4 text-[#eab308]"><Star className="fill-current w-4 h-4" /><Star className="fill-current w-4 h-4" /><Star className="fill-current w-4 h-4" /><Star className="fill-current w-4 h-4" /><Star className="fill-current w-4 h-4" /></div>
              <p className="text-[#c9d1d9] mb-6 line-clamp-4 leading-relaxed italic">"The ROI we achieved through their campaigns was phenomenal. They truly understand digital marketing and deliver tangible results every single time."</p>
              <div className="flex items-center gap-4 border-t border-white/10 pt-4">
                <div className="w-10 h-10 rounded-full bg-[#34a853] flex items-center justify-center font-bold text-white">M</div>
                <div><div className="font-bold text-white">Michael Chembe</div><div className="text-xs text-[#8b949e]">Marketing Director, GrowthCo</div></div>
              </div>
            </div>

            <div className="glass-panel p-8 rounded-2xl border border-white/5">
              <div className="flex gap-1 mb-4 text-[#eab308]"><Star className="fill-current w-4 h-4" /><Star className="fill-current w-4 h-4" /><Star className="fill-current w-4 h-4" /><Star className="fill-current w-4 h-4" /><Star className="fill-current w-4 h-4" /></div>
              <p className="text-[#c9d1d9] mb-6 line-clamp-4 leading-relaxed italic">"From concept to execution, they were professional, creative, and incredibly responsive. Our online sales increased by a staggering 200% in just one quarter!"</p>
              <div className="flex items-center gap-4 border-t border-white/10 pt-4">
                <div className="w-10 h-10 rounded-full bg-[#fbbc05] flex items-center justify-center font-bold text-white">E</div>
                <div><div className="font-bold text-white">Emily K</div><div className="text-xs text-[#8b949e]">Founder, StyleHub</div></div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Our Results Statistics */}
      <div className="py-24 sm:py-32 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[#58a6ff] font-bold tracking-wider uppercase text-sm mb-2 block">Our Results</span>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-4">Tangible results, not empty claims</h2>
            <p className="text-[#8b949e] text-lg">We build efficient AI tools that scale, optimize, and save valuable hours.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/10">
            <div>
              <div className="text-5xl font-extrabold text-[#4285f4] mb-2 tracking-tighter">150+</div>
              <div className="font-bold text-white mb-2">Project success</div>
              <div className="text-sm text-[#8b949e] px-4 hidden sm:block">Delivered projects from startups to top corporations.</div>
            </div>
            <div>
              <div className="text-5xl font-extrabold text-[#34a853] mb-2 tracking-tighter">100%</div>
              <div className="font-bold text-white mb-2">Client efficiency</div>
              <div className="text-sm text-[#8b949e] px-4 hidden sm:block">Clients reporting enhanced efficiency with our custom strategies.</div>
            </div>
            <div>
              <div className="text-5xl font-extrabold text-[#fbbc05] mb-2 tracking-tighter">300+</div>
              <div className="font-bold text-white mb-2">AI innovation</div>
              <div className="text-sm text-[#8b949e] px-4 hidden sm:block">Hours spent crafting smart AI tools to optimize workflows.</div>
            </div>
            <div>
              <div className="text-5xl font-extrabold text-[#ea4335] mb-2 tracking-tighter">75+</div>
              <div className="font-bold text-white mb-2">Industry recognition</div>
              <div className="text-sm text-[#8b949e] px-4 hidden sm:block">Recognized for design, tech, and sustainability—past five years.</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Bottom */}
      <div className="py-24 relative overflow-hidden bg-gradient-to-br from-[#1a73e8] to-[#0d47a1] mx-6 lg:mx-20 rounded-[3rem] mb-20 shadow-2xl">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2670&q=80')] opacity-10 mix-blend-overlay object-cover"></div>
        <div className="relative z-10 text-center max-w-2xl mx-auto px-6">
          <h2 className="text-4xl font-extrabold text-white mb-6">Ready to Start Your Project?</h2>
          <p className="text-blue-100 text-lg mb-10">Let's collaborate to create something extraordinary. We're here to turn your vision into a reality that drives results.</p>
          <Link href="/contact" className="inline-block rounded-full bg-white px-10 py-4 text-sm font-bold text-blue-900 shadow-xl hover:bg-gray-100 transition-all transform hover:scale-105 uppercase tracking-wide">
            Get a Free Quote
          </Link>
        </div>
      </div>

    </div>
  );
}
