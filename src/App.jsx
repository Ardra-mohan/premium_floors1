import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue, useSpring, useMotionValueEvent } from 'framer-motion';
import { Phone, Mail, MapPin, ChevronRight, Menu, X, Instagram, Layers, Paintbrush, Cpu, Sparkles, Wrench } from 'lucide-react';
import Lenis from 'lenis';

import logoImg from './assets/logo.png';
import cardImg from './assets/card image.jpeg';
import warehouseImg from './assets/warehouse.jpg';
import fiveStarHotelImg from './assets/Five Star Hotel.jpg';
import falseCeilingImg from './assets/false ceiling.jpg';
import palmVillaImg from './assets/palm villa.jpg';
import hubImg from './assets/hub.jpg';
import penthouseImg from './assets/penthouse.jpg';
import mainHeroImg from './assets/main.webp';
import epoxy1Img from './assets/epoxy1.jpg';
import epoxy2Img from './assets/epoxy2.jpg';
import epoxy3Img from './assets/epoxy3.jpg';
import epoxy4Img from './assets/epoxy4.jpg';
import epoxy5Img from './assets/epoxy5.jpg';
import epoxy6Img from './assets/epoxy6.png';
import epoxy7Img from './assets/epoxy7.png';

const SERVICES_DATA = [
  {
    id: "01",
    title: "Flooring & Tiling",
    description: "Bespoke stone and marble crafting for high-end residential and commercial spaces.",
    icon: Layers,
    items: ["Marble, porcelain, ceramic, mosaic", "Natural stone installations", "Custom engraving & ornamental"],
    cta: "Explore Flooring Gallery",
    image: palmVillaImg
  },
  {
    id: "02",
    title: "Interior Fit-Out",
    description: "Complete architectural finishes from luxury plastering to custom false ceilings.",
    icon: Paintbrush,
    items: ["False ceilings & partitions", "Luxury plastering & painting", "Custom woodwork & wallpaper"],
    cta: "View Interior Projects",
    image: falseCeilingImg
  },
  {
    id: "03",
    title: "MEP Solutions",
    description: "High-performance electromechanical systems designed for luxury environments.",
    icon: Cpu,
    items: ["Electromechanical systems", "HVAC (AC & ventilation)", "Premium plumbing & sanitary"],
    cta: "Consult Our Engineers",
    image: hubImg
  },
  {
    id: "04",
    title: "Luxury Installations",
    description: "Exquisite outdoor and indoor features, custom pools, and decorative finishes.",
    icon: Sparkles,
    items: ["Swimming pools & deck flooring", "High-end decorative finishes", "Bespoke architectural elements"],
    cta: "Discover Installations",
    image: fiveStarHotelImg
  },
  {
    id: "05",
    title: "Maintenance & Repairs",
    description: "Comprehensive maintenance to preserve the integrity and beauty of your property.",
    icon: Wrench,
    items: ["Preventative maintenance", "Renovation works", "System upgrades"],
    cta: "Schedule Maintenance",
    image: penthouseImg
  }
];

const EPOXY_IMAGES = [epoxy1Img, epoxy2Img, epoxy3Img, epoxy7Img, epoxy4Img, epoxy6Img, epoxy5Img];

function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMarqueeHovered, setIsMarqueeHovered] = React.useState(false);
  const [isEpoxyHovered, setIsEpoxyHovered] = React.useState(false);
  const [windowWidth, setWindowWidth] = React.useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  React.useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getScrollEnd = () => {
    if (windowWidth < 768) return "-450vw";
    if (windowWidth < 1024) return "-250vw";
    return "-120vw";
  };

  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const torchSize = useTransform(scrollYProgress, [0, 0.4], [15, 150]);
  const torchBg = useMotionTemplate`radial-gradient(circle at 50% 50%, transparent ${torchSize}vw, rgba(10,10,10,0.98) calc(${torchSize}vw + 10vw))`;

  const bgScale = useTransform(scrollYProgress, [0.4, 1], [1, 2.5]);

  const textOpacity = useTransform(scrollYProgress, [0, 0.4, 0.8], [1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);

  React.useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.05,
      smoothWheel: true,
      syncTouch: true,
    });

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-ivory flex flex-col">
      <CursorSparkles />
      {/* Navigation */}
      <nav className={`fixed w-full z-[1000] transition-all duration-300 ${isScrolled ? 'bg-matte-black border-b border-white/10 shadow-lg py-2' : 'bg-transparent py-4'}`}>
        <div className="w-full mx-auto px-6 md:px-12 lg:px-20 flex justify-between items-center relative h-12">

          <div
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={`cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95 flex items-center group`}
            aria-label="Premium Floors Home"
          >
            <div
              style={{
                maskImage: `url(${logoImg})`,
                WebkitMaskImage: `url(${logoImg})`,
                maskRepeat: 'no-repeat',
                WebkitMaskRepeat: 'no-repeat',
                maskSize: 'contain',
                WebkitMaskSize: 'contain',
                backgroundColor: '#C5A059'
              }}
              className="h-12 md:h-16 w-12 md:w-16"
            />
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="ml-3 font-heading text-sm md:text-lg text-gold tracking-[0.25em] uppercase font-bold"
            >
              Premium Floors
            </motion.span>
          </div>

          <div className={`hidden md:flex space-x-8 text-sm uppercase tracking-widest transition-colors duration-300 ${isScrolled ? 'text-gold' : 'text-ivory'}`}>
            <a href="#about" className="hover:text-white transition-colors block">About</a>
            <a href="#services" className="hover:text-white transition-colors block">Services</a>
            <a href="#epoxy" className="hover:text-white transition-colors block">Epoxy System</a>
            <a href="#projects" className="hover:text-white transition-colors block">Projects</a>
            <a href="#careers" className="hover:text-white transition-colors block">Careers</a>
            <a href="#contact" className="hover:text-white transition-colors block">Contact</a>
          </div>

          <button
            className={`md:hidden transition-colors duration-300 ${isScrolled ? 'text-gold' : 'text-ivory'}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <motion.div
          initial={false}
          animate={isMenuOpen ? { x: 0, opacity: 1 } : { x: '100%', opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed inset-0 bg-matte-black z-[1001] flex flex-col items-center justify-center space-y-8 md:hidden"
        >
          <div
            style={{
              maskImage: `url(${logoImg})`,
              WebkitMaskImage: `url(${logoImg})`,
              maskRepeat: 'no-repeat',
              WebkitMaskRepeat: 'no-repeat',
              maskSize: 'contain',
              WebkitMaskSize: 'contain',
              backgroundColor: '#C5A059'
            }}
            className="h-28 w-60 mb-8"
          />
          <div className="flex flex-col items-center space-y-6 text-xl tracking-[0.2em] uppercase text-gold">
            <a href="#about" onClick={() => setIsMenuOpen(false)} className="hover:text-white">About</a>
            <a href="#services" onClick={() => setIsMenuOpen(false)} className="hover:text-white">Services</a>
            <a href="#epoxy" onClick={() => setIsMenuOpen(false)} className="hover:text-white">Epoxy System</a>
            <a href="#projects" onClick={() => setIsMenuOpen(false)} className="hover:text-white">Projects</a>
            <a href="#contact" onClick={() => setIsMenuOpen(false)} className="hover:text-white">Contact</a>
          </div>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="mt-12 w-12 h-12 border border-gold/30 rounded-full flex items-center justify-center text-gold"
          >
            <X size={24} />
          </button>
        </motion.div>
      </nav>

      {/* Hero Section */}
      {/* Torch Hero Section */}
      <section ref={heroRef} id="hero" className="relative h-[400vh] bg-matte-black">
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-matte-black">

          {/* Base Floor Image (Zooms in) */}
          <motion.div
            style={{ scale: bgScale, transformOrigin: "50% 50%", backgroundImage: `url("${mainHeroImg}")` }}
            className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          />

          {/* Torch Overlay */}
          <motion.div
            style={{ background: torchBg }}
            className="absolute inset-0 w-full h-full pointer-events-none z-10"
          />

          {/* Initial Hero Text */}
          <motion.div
            style={{ opacity: textOpacity, y: textY }}
            className="relative z-20 text-center px-6 py-8 md:px-10 md:py-10 max-w-2xl mx-auto mt-28 md:mt-32 bg-black/15 backdrop-blur-sm rounded-2xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.4)]"
          >
            <span className="block text-gold drop-shadow-[0_2px_15px_rgba(0,0,0,0.9)] uppercase tracking-[0.4em] text-xs md:text-sm mb-4 font-heading border border-gold/30 rounded-full px-4 py-1.5 inline-block bg-black/40 font-bold max-w-fit mx-auto relative shadow-xl">
              Bold. Refined. Iconic.
            </span>
            <h1 className="text-xl md:text-3xl lg:text-5xl font-serif italic font-light mb-5 text-white drop-shadow-[0_5px_20px_rgba(0,0,0,0.8)] leading-tight">
              Redefining <br className="hidden md:block" /> Modern Luxury
            </h1>
            <p className="text-sm md:text-base text-white font-serif italic tracking-wide font-medium max-w-xl mx-auto leading-relaxed drop-shadow-[0_4px_15px_rgba(0,0,0,0.8)]">
              We combine cutting-edge materials with timeless design principles to create spaces that embody sophistication and contemporary elegance.
            </p>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative z-10 py-24 md:py-32 bg-ivory text-charcoal px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-sm tracking-[0.3em] uppercase text-gold mb-6"
          >
            A Dubai-Based Turnkey Contractor
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl md:text-5xl font-heading leading-tight text-matte-black"
          >
            Experts in premium flooring and full interior solutions. Licensed across MEP, finishing, and specialized installations to elevate Dubai’s most exclusive properties.
          </motion.p>
        </div>
      </section>

      <ExpertiseLayersSection />

      {/* Services Section */}
      <ServicesSection />

      {/* Epoxy Specialties Section */}
      <section id="epoxy" className="py-24 bg-matte-black text-ivory border-b border-white/10 overflow-hidden" style={{ perspective: "2500px" }}>
        <div className="max-w-7xl mx-auto px-6 mb-8 md:mb-16">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-heading mb-6 text-white tracking-widest uppercase">Industrial & Commercial Epoxy</h2>
            <p className="text-sand/80 font-light max-w-2xl mx-auto text-lg mb-8">
              Our advanced resin solutions deliver hyper-durable, <strong className="text-gold font-normal">joint-free seamless surfaces</strong> designed to withstand the heaviest traffic.
            </p>
            <span className="inline-block text-gold/90 uppercase tracking-[0.2em] md:tracking-widest text-[10px] md:text-sm font-bold border border-gold/30 px-4 py-2.5 md:px-6 md:py-3 rounded-full shadow-[0_0_15px_rgba(197,160,89,0.2)] leading-relaxed">
              Backed by up to 15 Years Warranty
            </span>
          </div>
        </div>

        <div
          className="relative w-full flex items-center py-12"
          onMouseEnter={() => setIsEpoxyHovered(true)}
          onMouseLeave={() => setIsEpoxyHovered(false)}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Subtle gradient edges to fade out the marquee on the sides, dark style */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-matte-black to-transparent z-20 pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-matte-black to-transparent z-20 pointer-events-none"></div>

          <div
            className={`flex space-x-8 md:space-x-12 px-6 w-max animate-marquee ${isEpoxyHovered ? '[animation-play-state:paused]' : ''}`}
            style={{ transformStyle: "preserve-3d" }}
          >
            {[...EPOXY_IMAGES, ...EPOXY_IMAGES].map((imgSrc, i) => (
              <EpoxyCard key={i} img={imgSrc} isMarqueeHovered={isEpoxyHovered} />
            ))}
          </div>
        </div>
      </section>

      {/* Projects Showcase */}
      <section id="projects" className="py-24 md:py-32 bg-charcoal text-ivory overflow-hidden">
        <div className="px-6 max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-heading mb-16 text-white border-b border-sand/20 pb-8">Featured Work</h2>

          {/* Grid Layout below */}
          <div className="mt-8">
            <h3 className="text-2xl md:text-4xl font-heading mb-12 text-white border-b border-white/10 pb-6">
              Complete Portfolio Index
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
              <ProjectCard title="Warehouse Facilities" category="Heavy-Duty Epoxy" img={warehouseImg} />
            <ProjectCard title="Hospital & Medical" category="Hygienic Epoxy" img="/extracted/brochure_img_80.jpg" />
            <ProjectCard title="Parking Structures" category="High-Traction" img="/extracted/brochure_img_55.jpg" />
            <ProjectCard title="Shopping Malls" category="Decorative Finish" img="/extracted/brochure_img_84.jpg" />

            <ProjectCard title="Luxury Villa Palm Jumeirah" category="Residential" img={palmVillaImg} />
            <ProjectCard title="Five Star Hotel Downtown" category="Hospitality" img={fiveStarHotelImg} />
            <ProjectCard title="Premium Commercial Hub" category="Commercial" img={hubImg} />
            <ProjectCard title="Penthouse Marina" category="Renovation" img={penthouseImg} />

            <ProjectCard title="M E P Works" category="Infrastructure" img="/extracted/brochure_img_61.jpg" />
            <ProjectCard title="Construction Related Works" category="Structural" img="/extracted/brochure_img_54.jpg" />
            <ProjectCard title="False Ceiling" category="Interior" img={falseCeilingImg} />
            <ProjectCard title="AC Electromechanical Works" category="Systems" img="/extracted/brochure_img_62.jpg" />
          </div>
        </div>
      </div>
    </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-ivory text-charcoal px-6 border-b border-sand/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-heading mb-8 text-matte-black">Why Choose Premium Floors</h2>
              <p className="text-lg text-charcoal/80 mb-12 font-light leading-relaxed">
                We deliver a unified experience. By managing every aspect of your project—from the underlying MEP systems to the final marble polish—we ensure unparalleled quality and seamless execution.
              </p>

              <div className="space-y-8">
                <FeatureItem title="Turnkey Solutions" desc="The single contractor advantage for complete peace of mind." />
                <FeatureItem title="Licensed & Compliant" desc="Fully certified for operations across Dubai's prestigious locales." />
                <FeatureItem title="High-End Craftsmanship" desc="Uncompromising quality using the world's finest materials." />
              </div>
            </div>
            <div className="relative h-[600px]">
              <img src="/extracted/brochure_img_46.jpg" alt="Craftsmanship" className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-1000 shadow-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-heading mb-16 text-matte-black">Trusted by the Best</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-12 border border-sand/50 relative"
            >
              <p className="text-gold text-6xl font-heading leading-none absolute top-6 left-6 opacity-20">"</p>
              <p className="font-light italic text-charcoal/80 mb-6 relative z-10 text-lg">
                Their attention to detail and ability to deliver complex MEP and premium finishing works strictly on schedule is unmatched in Dubai. Exceptional craftsmanship.
              </p>
              <div className="border-t border-sand/30 pt-6 mt-6">
                <h4 className="font-heading text-lg font-bold">Zayed Al Mansouri</h4>
                <p className="text-sm text-gold uppercase tracking-widest mt-1">Property Developer</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white p-12 border border-sand/50 relative"
            >
              <p className="text-gold text-6xl font-heading leading-none absolute top-6 left-6 opacity-20">"</p>
              <p className="font-light italic text-charcoal/80 mb-6 relative z-10 text-lg">
                Premium Floors transformed our penthouse into a masterpiece. From the custom marble engraving to the seamless false ceilings, every detail breathes luxury.
              </p>
              <div className="border-t border-sand/30 pt-6 mt-6">
                <h4 className="font-heading text-lg font-bold">Sarah Williams</h4>
                <p className="text-sm text-gold uppercase tracking-widest mt-1">Private Client</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Careers Section */}
      <section id="careers" className="py-24 md:py-32 bg-sand/10 text-matte-black border-t border-sand/30">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-heading mb-6 text-matte-black">Join Our Legacy</h2>
          <p className="text-lg md:text-xl text-charcoal/80 font-light max-w-2xl mx-auto mb-12">
            We are actively seeking exceptional talent—from master craftsmen to site engineers and visionary designers—to help build the future of Dubai.
          </p>
          <a href="mailto:careers@premiumfloors.com" className="inline-block bg-matte-black text-gold px-12 py-4 font-bold tracking-widest uppercase text-sm hover:bg-charcoal transition-colors duration-300">
            View Openings
          </a>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 md:py-32 bg-white text-matte-black px-6 relative overflow-hidden border-t border-sand/30">
        <div className="absolute inset-0 bg-sand/10"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-heading mb-6 text-matte-black">Start Your Project</h2>
          <p className="text-xl text-charcoal/80 font-light mb-16">
            Partner with us to build complete luxury environments.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            <div className="flex flex-col items-center group">
              <div className="w-16 h-16 border border-gold/40 rounded-full flex items-center justify-center mb-6 group-hover:bg-gold/10 transition-colors">
                <Phone className="text-gold drop-shadow-sm" />
              </div>
              <h3 className="text-lg uppercase tracking-widest font-heading mb-2">Call Us</h3>
              <p className="text-charcoal/70 font-light">056 7377056</p>
            </div>
            <div className="flex flex-col items-center group">
              <div className="w-16 h-16 border border-gold/40 rounded-full flex items-center justify-center mb-6 group-hover:bg-gold/10 transition-colors">
                <Mail className="text-gold drop-shadow-sm" />
              </div>
              <h3 className="text-lg uppercase tracking-widest font-heading mb-2">Email</h3>
              <p className="text-charcoal/70 font-light">info@premiumfloorllc.com</p>
            </div>
            <div className="flex flex-col items-center group">
              <div className="w-16 h-16 border border-gold/40 rounded-full flex items-center justify-center mb-6 group-hover:bg-gold/10 transition-colors">
                <MapPin className="text-gold drop-shadow-sm" />
              </div>
              <h3 className="text-lg uppercase tracking-widest font-heading mb-2">Location</h3>
              <p className="text-charcoal/70 font-light">Deira Naif, Dubai, Ajman</p>
            </div>
          </div>

          <a href="mailto:info@premiumfloorllc.com" className="inline-flex items-center px-12 py-5 bg-matte-black text-white hover:bg-gold transition-colors duration-300 uppercase tracking-widest font-medium text-sm shadow-xl">
            Inquire Now
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-[#0a0a0a] border-t border-white/10 text-center text-sm text-sand/50 font-light flex flex-col items-center">
        <div className="flex flex-col items-center mb-8 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div
            style={{
              maskImage: `url(${logoImg})`,
              WebkitMaskImage: `url(${logoImg})`,
              maskRepeat: 'no-repeat',
              WebkitMaskRepeat: 'no-repeat',
              maskSize: 'contain',
              WebkitMaskSize: 'contain',
              backgroundColor: '#C5A059'
            }}
            className="h-20 w-20 mb-4 opacity-90 transition-all group-hover:scale-110"
          />
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="font-heading text-lg text-gold tracking-[0.3em] uppercase font-bold"
          >
            Premium Floors
          </motion.span>
        </div>
        <p className="mb-4">&copy; {new Date().getFullYear()} Premium Floors LLC. All rights reserved. Crafted for Excellence.</p>
        <a
          href="https://www.instagram.com/intellex.web?igsh=MWZyenU0bWc3M2RxOQ=="
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-gold/60 hover:text-gold transition-colors duration-300"
        >
          <Instagram size={14} />
          <span className="text-[11px] uppercase tracking-[0.2em] font-medium">Meet the developers</span>
        </a>
      </footer>
    </div>
  );
}

function ServicesSection() {
  const [active, setActive] = React.useState(null);
  const [windowWidth, setWindowWidth] = React.useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  React.useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 768;

  return (
    <section id="services" className="relative py-24 md:py-32 bg-[#0a0a0a] border-b border-white/10 overflow-hidden">
      {/* Background neon glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] rounded-full bg-gold/5 blur-[80px] md:blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] rounded-full bg-gold/5 blur-[80px] md:blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 md:mb-24">
          <span className="block text-gold uppercase tracking-[0.25em] text-xs md:text-sm mb-3 font-bold">
            Signature Capabilities
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading text-white tracking-wide">
            Our Elite Services
          </h2>
          <p className="text-sand/60 font-body font-light max-w-xl mx-auto mt-4 text-sm md:text-base leading-relaxed">
            Hover or click to expand our bespoke turnkey solutions and discover how we engineer luxury finishes from core MEP to final marble polish.
          </p>
        </div>

        {/* Expanding Cards Layout */}
        {isMobile ? (
          // Mobile: Vertical Accordion Layout
          <div className="flex flex-col space-y-4">
            {SERVICES_DATA.map((service, idx) => (
              <MobileServiceCard 
                key={service.id}
                service={service}
                index={idx}
                active={active}
                setActive={setActive}
              />
            ))}
          </div>
        ) : (
          // Desktop: Horizontal Expanding Flex Layout
          <div className="flex w-full h-[550px] gap-4" onMouseLeave={() => setActive(null)}>
            {SERVICES_DATA.map((service, idx) => (
              <DesktopServiceCard 
                key={service.id}
                service={service}
                index={idx}
                active={active}
                setActive={setActive}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function DesktopServiceCard({ service, index, active, setActive }) {
  const isActive = active === index;
  const isAnyActive = active !== null;
  const isShrunk = isAnyActive && !isActive;
  
  const Icon = service.icon;

  return (
    <motion.div
      onMouseEnter={() => setActive(index)}
      onClick={() => setActive(index)}
      animate={{
        flexGrow: isActive ? 2.8 : isShrunk ? 0.65 : 1,
      }}
      transition={{ type: "spring", stiffness: 100, damping: 20, mass: 0.8 }}
      className={`relative h-full rounded-2xl overflow-hidden cursor-pointer border ${
        isActive 
          ? 'border-gold/40 shadow-[0_0_40px_rgba(197,160,89,0.2)] bg-[#121212]/95' 
          : 'border-white/5 bg-[#121212]/80'
      } transition-shadow duration-500 flex flex-col justify-between p-8 select-none`}
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <motion.img 
          src={service.image} 
          alt={service.title} 
          animate={{
            scale: isActive ? 1.05 : 1,
            filter: isShrunk ? "blur(2px) brightness(0.5)" : "blur(0px) brightness(0.8)"
          }}
          transition={{ duration: 0.6 }}
          className="w-full h-full object-cover"
        />
        {/* Dark Vignette Overlay */}
        <motion.div 
          animate={{
            background: isActive 
              ? "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.25) 100%)"
              : "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.7) 100%)"
          }}
          className="absolute inset-0 z-0" 
        />
      </div>

      {/* Top Header */}
      <div className="relative z-10 flex justify-between items-center w-full">
        <motion.div 
          animate={{
            scale: isActive ? 1.15 : 1,
            borderColor: isActive ? "rgba(197,160,89,0.5)" : "rgba(255,255,255,0.1)",
            backgroundColor: isActive ? "rgba(197,160,89,0.1)" : "rgba(255,255,255,0.05)"
          }}
          className="w-12 h-12 rounded-full border flex items-center justify-center text-gold transition-colors duration-300"
        >
          <Icon size={20} />
        </motion.div>
        <span className="text-gold/80 font-serif italic text-xl font-light">
          {service.id}
        </span>
      </div>

      {/* Bottom Content Area */}
      <div className="relative z-10 flex flex-col justify-end w-full">
        {/* Always Visible Title */}
        <h3 className="text-xl lg:text-3xl font-serif italic text-white leading-snug">
          {service.title}
        </h3>

        {/* Short Teaser (Fade out when expanded) */}
        <motion.div
          animate={{
            height: isActive ? 0 : "auto",
            opacity: isActive ? 0 : 0.85,
            marginTop: isActive ? 0 : 8
          }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <p className="text-xs text-sand/80 font-light font-body line-clamp-2 leading-relaxed">
            {service.description}
          </p>
        </motion.div>

        {/* Expanded Details */}
        <motion.div
          initial={false}
          animate={{
            height: isActive ? "auto" : 0,
            opacity: isActive ? 1 : 0,
            marginTop: isActive ? 16 : 0
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <p className="text-sm text-white/80 font-light font-body leading-relaxed mb-6">
            {service.description}
          </p>

          {/* Benefits/Items list */}
          <ul className="space-y-3 mb-8">
            {service.items.map((item, idx) => (
              <motion.li 
                key={idx} 
                initial={{ opacity: 0, x: -10 }}
                animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                transition={{ delay: isActive ? idx * 0.08 + 0.15 : 0 }}
                className="flex items-center text-xs text-white/70 font-light font-body"
              >
                <span className="text-gold mr-3 text-[7px]">◆</span>
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>

          {/* CTA Link */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ delay: 0.4 }}
          >
            <a 
              href="#contact"
              className="inline-flex items-center gap-2 bg-gold hover:bg-white text-matte-black px-5 py-2.5 text-xs uppercase tracking-widest font-bold transition-all duration-300 rounded-sm shadow-lg hover:scale-105 active:scale-95"
            >
              <span>{service.cta}</span>
              <ChevronRight size={14} />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function MobileServiceCard({ service, index, active, setActive }) {
  const isActive = active === index;
  const Icon = service.icon;

  return (
    <div
      onClick={() => setActive(isActive ? null : index)}
      className={`relative w-full rounded-xl overflow-hidden border ${
        isActive 
          ? 'border-gold/45 shadow-[0_0_30px_rgba(197,160,89,0.15)] bg-black/60' 
          : 'border-white/5 bg-[#121212]/80'
      } backdrop-blur-md p-5 flex flex-col justify-between transition-all duration-300`}
    >
      {/* Background Image (Lower opacity for accordion backing) */}
      <div className="absolute inset-0 z-0 opacity-15">
        <img 
          src={service.image} 
          alt={service.title} 
          className="w-full h-full object-cover filter blur-[1px]" 
        />
      </div>

      {/* Header bar */}
      <div className="relative z-10 flex justify-between items-center w-full">
        <div className="flex items-center space-x-3.5">
          <div className="w-10 h-10 rounded-full border border-gold/25 bg-gold/5 flex items-center justify-center text-gold">
            <Icon size={18} />
          </div>
          <h3 className="text-base font-serif italic text-white">
            {service.title}
          </h3>
        </div>
        <span className="text-gold/60 text-xs font-semibold font-body">
          {service.id}
        </span>
      </div>

      {/* Content area */}
      <motion.div
        initial={false}
        animate={{
          height: isActive ? "auto" : 0,
          opacity: isActive ? 1 : 0,
          marginTop: isActive ? 16 : 0
        }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="relative z-10 overflow-hidden"
      >
        <p className="text-xs text-white/70 font-light font-body leading-relaxed mb-4">
          {service.description}
        </p>
        
        {/* Items List */}
        <ul className="space-y-2 mb-6">
          {service.items.map((item, idx) => (
            <li key={idx} className="flex items-center text-[11px] text-white/60 font-light font-body">
              <span className="text-gold mr-2.5 text-[6px]">◆</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <a 
          href="#contact"
          className="inline-flex items-center gap-1.5 bg-gold hover:bg-white text-matte-black px-4 py-2 text-[10px] uppercase tracking-widest font-bold transition-all duration-300 rounded-sm shadow-md"
        >
          <span>{service.cta}</span>
          <ChevronRight size={12} />
        </a>
      </motion.div>

      {/* Compact Teaser (only visible when not active) */}
      {!isActive && (
        <div className="relative z-10 mt-3 pt-3 border-t border-white/5">
          <p className="text-[11px] text-sand/50 font-light font-body line-clamp-1">
            {service.description}
          </p>
        </div>
      )}
    </div>
  );
}

function EpoxyCard({ img, isMarqueeHovered }) {
  const [isHovered, setIsHovered] = React.useState(false);
  const cardRef = React.useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(0, { stiffness: 60, damping: 20 });
  const rotateY = useSpring(0, { stiffness: 60, damping: 20 });

  function handleMouseMove({ clientX, clientY }) {
    if (!cardRef.current) return;
    let { left, top, width, height } = cardRef.current.getBoundingClientRect();
    let x = clientX - left;
    let y = clientY - top;
    mouseX.set(x);
    mouseY.set(y);

    // Tilt calculations (-15 to +15 deg)
    const rX = ((y / height) - 0.5) * -30;
    const rY = ((x / width) - 0.5) * 30;
    rotateX.set(rX);
    rotateY.set(rY);
  }

  function handleMouseLeave() {
    setIsHovered(false);
    rotateX.set(0);
    rotateY.set(0);
  }

  const isDimmed = isMarqueeHovered && !isHovered;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      animate={{
        scale: isHovered ? 1.12 : 1,
        y: isHovered ? -20 : 0,
        z: isHovered ? 40 : 0,
        opacity: isDimmed ? 0.4 : 1,
        filter: isDimmed ? "blur(3px)" : "blur(0px)",
      }}
      style={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        boxShadow: isHovered ? "0 40px 80px -15px rgba(197,160,89,0.2), 0 20px 40px -15px rgba(0,0,0,0.8)" : "0 10px 20px -5px rgba(0,0,0,0.4)",
      }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex-none w-[200px] md:w-[260px] h-[260px] md:h-[340px] bg-white/5 backdrop-blur-xl border rounded-[4px] cursor-pointer overflow-hidden transform-gpu group will-change-transform"
    >
      <img src={img} alt="Epoxy Finish" className="absolute inset-0 w-full h-full object-cover opacity-100 md:opacity-80 grayscale-0 md:grayscale-[20%] group-hover:scale-110 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-1000" />

      {/* Glass Overlay for frosting effect */}
      <div className="absolute inset-0 bg-transparent md:bg-matte-black/40 group-hover:bg-transparent transition-colors duration-1000"></div>

      {/* Light Reflection */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-20 mix-blend-overlay"
        style={{
          background: useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.15), transparent 50%)`
        }}
      />

      {/* Golden Spot Light */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 mix-blend-color-dodge w-full h-full"
        style={{
          background: useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(197,160,89,0.15), transparent 60%)`
        }}
      />
    </motion.div>
  );
}

function ProjectCard({ title, category, img }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="group relative overflow-hidden h-[250px] md:h-[500px] cursor-pointer"
    >
      {img ? (
        <img src={img} alt={title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
      ) : (
        <div className="w-full h-full bg-ivory/10 transition-transform duration-1000 group-hover:scale-110 border border-white/5" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-matte-black/90 via-matte-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
        <p className="text-gold uppercase tracking-widest text-[10px] md:text-xs mb-2 font-medium">{category}</p>
        <h3 className="text-xl md:text-3xl font-heading text-white">{title}</h3>
      </div>
    </motion.div>
  );
}

function FeatureItem({ title, desc }) {
  return (
    <div className="flex">
      <div className="mr-6 mt-1">
        <div className="w-12 h-12 rounded-full border border-gold/50 flex items-center justify-center">
          <ChevronRight className="text-gold" size={20} />
        </div>
      </div>
      <div>
        <h3 className="text-xl font-heading text-matte-black mb-2">{title}</h3>
        <p className="text-charcoal/70 font-light leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

function ExpertiseLayersSection() {
  const containerRef = React.useRef(null);
  const [hoveredLayer, setHoveredLayer] = React.useState(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const [maxZ, setMaxZ] = React.useState(220);

  React.useEffect(() => {
    const handleResize = () => {
      setMaxZ(window.innerWidth < 768 ? 220 : 300);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const zExpanded = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  const tileZ = useTransform(zExpanded, v => `${v * maxZ}px`);
  const heatingZ = useTransform(zExpanded, v => `${v * (maxZ * 0.78)}px`);
  const wiringZ = useTransform(zExpanded, v => `${v * (maxZ * 0.56)}px`);
  const insulationZ = useTransform(zExpanded, v => `${v * (maxZ * 0.34)}px`);
  const concreteZ = useTransform(zExpanded, v => `${v * (maxZ * 0.12)}px`);

  const opacityLabels = useTransform(zExpanded, [0.3, 1], [0, 1]);

  const textOpacity = useTransform(scrollYProgress, [0, 0.45, 0.55], [1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.45, 0.55], [0, 0, -45]);

  return (
    <section ref={containerRef} className="relative z-20 h-[220vh] md:h-[250vh] bg-white text-matte-black border-b border-sand/30">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-start pt-12 md:pt-16 overflow-hidden">

        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="relative text-center w-full px-6 z-20 mb-8 md:mb-12 mt-4 md:mt-0 pointer-events-none"
        >
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif italic font-black mb-4 !text-black"
          >
            The Anatomy of Excellence
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg !text-black font-bold max-w-2xl mx-auto"
          >
            From the core structural MEP layers to the finest luxury finishes, we engineer every inch.
          </motion.p>
        </motion.div>

        <div
          className="relative w-[80vw] h-[80vw] max-w-[240px] max-h-[240px] md:max-w-[380px] md:max-h-[380px] translate-y-[100px] md:translate-y-[140px]"
          style={{
            perspective: "1200px",
            transformStyle: "preserve-3d",
            transform: "rotateX(60deg) rotateZ(-45deg)"
          }}
        >
          {/* Layer 1: Concrete */}
          <motion.div
            style={{ translateZ: concreteZ }}
            animate={{ scale: hoveredLayer === 1 ? 1.05 : 1, filter: hoveredLayer === 1 ? 'brightness(1.1) drop-shadow(0 0 30px rgba(197,160,89,0.5))' : 'brightness(1) drop-shadow(0 0 0px rgba(197,160,89,0))' }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="absolute inset-0 bg-[#E0E0E0] border border-gray-400 shadow-[20px_20px_50px_rgba(0,0,0,0.5)] cursor-pointer z-10"
            onMouseEnter={() => setHoveredLayer(1)}
            onMouseLeave={() => setHoveredLayer(null)}
          >
            <motion.div
              style={{ opacity: opacityLabels }}
              className="absolute bottom-4 left-4 md:bottom-8 md:left-8 z-30 pointer-events-none"
            >
              <span className={`whitespace-nowrap text-[13px] md:text-lg lg:text-xl font-extrabold tracking-[0.15em] md:tracking-[0.25em] uppercase transition-all duration-300 ${hoveredLayer === 1 ? 'text-gold drop-shadow-[0_0_8px_rgba(197,160,89,0.8)]' : 'text-matte-black/75 md:text-matte-black/85'}`}>
                Structural Concrete
              </span>
            </motion.div>
          </motion.div>

          {/* Layer 2: Insulation */}
          <motion.div
            style={{ translateZ: insulationZ }}
            animate={{ scale: hoveredLayer === 2 ? 1.05 : 1, filter: hoveredLayer === 2 ? 'brightness(1.1) drop-shadow(0 0 30px rgba(197,160,89,0.5))' : 'brightness(1) drop-shadow(0 0 0px rgba(197,160,89,0))' }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="absolute inset-0 bg-[#F5EEDC] border border-[#D1C2A5] shadow-[0_20px_40px_rgba(0,0,0,0.2)] cursor-pointer z-20"
            onMouseEnter={() => setHoveredLayer(2)}
            onMouseLeave={() => setHoveredLayer(null)}
          >
            <motion.div
              style={{ opacity: opacityLabels }}
              className="absolute bottom-4 left-4 md:bottom-8 md:left-8 z-30 pointer-events-none"
            >
              <span className={`whitespace-nowrap text-[13px] md:text-lg lg:text-xl font-extrabold tracking-[0.15em] md:tracking-[0.25em] uppercase transition-all duration-300 ${hoveredLayer === 2 ? 'text-gold drop-shadow-[0_0_8px_rgba(197,160,89,0.8)]' : 'text-matte-black/75 md:text-matte-black/85'}`}>
                Acoustic Insulation
              </span>
            </motion.div>
          </motion.div>

          {/* Layer 3: MEP & Wiring */}
          <motion.div
            style={{ translateZ: wiringZ }}
            animate={{ scale: hoveredLayer === 3 ? 1.05 : 1, filter: hoveredLayer === 3 ? 'brightness(1.1) drop-shadow(0 0 30px rgba(96,165,250,0.6))' : 'brightness(1) drop-shadow(0 0 0px rgba(96,165,250,0))' }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="absolute inset-0 border border-blue-300 bg-blue-50/40 shadow-[0_15px_30px_rgba(0,0,0,0.1)] drop-shadow-md cursor-pointer z-30"
            onMouseEnter={() => setHoveredLayer(3)}
            onMouseLeave={() => setHoveredLayer(null)}
          >
            <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_49%,rgba(96,165,250,0.5)_50%,transparent_51%),linear-gradient(0deg,transparent_49%,rgba(96,165,250,0.5)_50%,transparent_51%)] bg-[size:30px_30px] pointer-events-none"></div>
            <motion.div
              style={{ opacity: opacityLabels }}
              className="absolute bottom-4 left-4 md:bottom-8 md:left-8 z-30 pointer-events-none"
            >
              <span className={`whitespace-nowrap text-[13px] md:text-lg lg:text-xl font-extrabold tracking-[0.15em] md:tracking-[0.25em] uppercase transition-all duration-300 ${hoveredLayer === 3 ? 'text-gold drop-shadow-[0_0_8px_rgba(197,160,89,0.8)]' : 'text-blue-700/80 md:text-blue-700/90'}`}>
                MEP / Wiring
              </span>
            </motion.div>
          </motion.div>

          {/* Layer 4: Heating */}
          <motion.div
            style={{ translateZ: heatingZ }}
            animate={{ scale: hoveredLayer === 4 ? 1.05 : 1, filter: hoveredLayer === 4 ? 'brightness(1.1) drop-shadow(0 0 30px rgba(248,113,113,0.5))' : 'brightness(1) drop-shadow(0 0 0px rgba(248,113,113,0))' }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="absolute inset-0 bg-red-50/50 border border-red-300 shadow-[0_15px_30px_rgba(0,0,0,0.15)] cursor-pointer z-40"
            onMouseEnter={() => setHoveredLayer(4)}
            onMouseLeave={() => setHoveredLayer(null)}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(248,113,113,0.3)_0,transparent_10px)] bg-[size:25px_25px] pointer-events-none"></div>
            <motion.div
              style={{ opacity: opacityLabels }}
              className="absolute bottom-4 left-4 md:bottom-8 md:left-8 z-30 pointer-events-none"
            >
              <span className={`whitespace-nowrap text-[13px] md:text-lg lg:text-xl font-extrabold tracking-[0.15em] md:tracking-[0.25em] uppercase transition-all duration-300 ${hoveredLayer === 4 ? 'text-gold drop-shadow-[0_0_8px_rgba(197,160,89,0.8)]' : 'text-red-600/80 md:text-red-600/90'}`}>
                Radiant Heating
              </span>
            </motion.div>
          </motion.div>

          {/* Layer 5: Tile/Finishes */}
          <motion.div
            style={{ translateZ: tileZ }}
            animate={{ scale: hoveredLayer === 5 ? 1.05 : 1, filter: hoveredLayer === 5 ? 'brightness(1.1) drop-shadow(0 0 40px rgba(197,160,89,0.7))' : 'brightness(1) drop-shadow(0 0 0px rgba(197,160,89,0))' }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="absolute inset-0 bg-white border border-gray-100 shadow-[0_40px_60px_rgba(0,0,0,0.3)] cursor-pointer z-50"
            onMouseEnter={() => setHoveredLayer(5)}
            onMouseLeave={() => setHoveredLayer(null)}
          >
            {/* The Un-compressed Floor Image Hack */}
            <div
              className={`absolute inset-0 bg-cover bg-center pointer-events-none z-0`}
              style={{ backgroundImage: `url(${cardImg})` }}
            />
            <motion.div
              style={{ opacity: opacityLabels }}
              className="absolute bottom-4 left-4 md:bottom-8 md:left-8 z-30 pointer-events-none"
            >
              <span className={`whitespace-nowrap text-[13px] md:text-lg lg:text-xl font-extrabold tracking-[0.15em] md:tracking-[0.25em] uppercase transition-all duration-300 ${hoveredLayer === 5 ? 'text-gold drop-shadow-[0_0_8px_rgba(197,160,89,0.8)]' : 'text-matte-black/75 md:text-matte-black/85'}`}>
                Premium Marble Finish
              </span>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

function CursorSparkles() {
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let particles = [];
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    class Particle {
      constructor(x, y) {
        this.x = x + (Math.random() * 10 - 5);
        this.y = y + (Math.random() * 10 - 5);
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5 + 0.5; // Slight drift down
        this.color = `rgba(197, 160, 89, ${Math.random() * 0.5 + 0.5})`; // Gold #C5A059
        this.life = 1;
        this.decay = Math.random() * 0.02 + 0.015;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= this.decay;
      }

      draw() {
        ctx.fillStyle = this.color.replace(/[\d.]+\)$/g, `${this.life})`);
        ctx.shadowBlur = 4;
        ctx.shadowColor = '#C5A059';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    const handleMouseMove = (e) => {
      // Create a few sparkle trails
      for (let i = 0; i < 3; i++) {
        particles.push(new Particle(e.clientX, e.clientY));
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }

      particles = particles.filter(p => p.life > 0);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-[9999]"
    />
  );
}

export default App;
