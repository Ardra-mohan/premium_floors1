import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion';
import { Phone, Mail, MapPin, ChevronRight, Menu, X } from 'lucide-react';
import Lenis from 'lenis';
import mainImage from './assets/main image.jpeg';
import logoImg from './assets/logo.png';
import cardImg from './assets/card image.jpeg';

function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const torchSize = useTransform(scrollYProgress, [0, 0.4], [15, 150]);
  const torchBg = useMotionTemplate`radial-gradient(circle at 50% 50%, transparent ${torchSize}vw, rgba(10,10,10,0.98) calc(${torchSize}vw + 10vw))`;

  const bgScale = useTransform(scrollYProgress, [0.4, 1], [1, 2.5]);

  const textOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);

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
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'glass bg-matte-black/95 border-b border-white/10 shadow-sm py-2' : 'bg-transparent py-4'}`}>
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
          className="fixed inset-0 bg-matte-black/95 backdrop-blur-xl z-[60] flex flex-col items-center justify-center space-y-8 md:hidden"
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
            style={{ scale: bgScale, transformOrigin: "50% 50%", backgroundImage: `url("${mainImage}")` }}
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
            className="relative z-20 text-center px-8 py-12 md:px-16 md:py-16 max-w-4xl mx-auto mt-20 bg-black/30 backdrop-blur-md rounded-2xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
          >
            <span className="block text-gold uppercase tracking-[0.4em] text-sm md:text-base mb-6 font-heading animate-pulse">
              Bold. Refined. Iconic.
            </span>
            <h1 className="text-2xl md:text-5xl lg:text-6xl font-serif italic font-light mb-8 text-white drop-shadow-2xl leading-tight">
              Redefining <br className="hidden md:block"/> Modern Luxury
            </h1>
            <p className="text-lg md:text-2xl text-white/90 font-sans font-light max-w-3xl mx-auto leading-relaxed drop-shadow-md">
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
      <section id="services" className="py-24 bg-sand/10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between">
            <div>
              <h2 className="text-4xl md:text-6xl font-heading text-matte-black">Signature Services</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard
              title="Flooring & Tiling"
              items={["Marble, porcelain, ceramic, mosaic", "Natural stone installations", "Custom engraving & ornamental"]}
              delay={0.1}
            />
            <ServiceCard
              title="Interior Fit-Out"
              items={["False ceilings & partitions", "Luxury plastering & painting", "Custom woodwork & wallpaper"]}
              delay={0.2}
            />
            <ServiceCard
              title="MEP Solutions"
              items={["Electromechanical systems", "HVAC (AC & ventilation)", "Premium plumbing & sanitary"]}
              delay={0.3}
            />
            <ServiceCard
              title="Luxury Installations"
              items={["Swimming pools & deck flooring", "High-end decorative finishes", "Bespoke architectural elements"]}
              delay={0.4}
            />
            <ServiceCard
              title="Maintenance & Repairs"
              items={["Preventative maintenance", "Renovation works", "System upgrades"]}
              delay={0.5}
            />
          </div>
        </div>
      </section>

      {/* Epoxy Specialties Section */}
      <section id="epoxy" className="py-24 bg-matte-black text-ivory border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading mb-6 text-white tracking-widest uppercase">Industrial & Commercial Epoxy</h2>
            <p className="text-sand/80 font-light max-w-2xl mx-auto text-lg mb-8">
              Our advanced resin solutions deliver hyper-durable, <strong className="text-gold font-normal">joint-free seamless surfaces</strong> designed to withstand the heaviest traffic.
            </p>
            <span className="inline-block text-gold/90 uppercase tracking-[0.2em] md:tracking-widest text-[10px] md:text-sm font-bold border border-gold/30 px-4 py-2.5 md:px-6 md:py-3 rounded-full shadow-[0_0_15px_rgba(197,160,89,0.2)] leading-relaxed">
              Backed by up to 15 Years Warranty
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ProjectCard title="Warehouse Facilities" category="Heavy-Duty Epoxy" img="/extracted/brochure_img_10.jpg" />
            <ProjectCard title="Hospital & Medical" category="Hygienic Epoxy" img="/extracted/brochure_img_42.jpg" />
            <ProjectCard title="Parking Structures" category="High-Traction" img="/extracted/brochure_img_44.jpg" />
            <ProjectCard title="Shopping Malls" category="Decorative Finish" img="/extracted/brochure_img_46.jpg" />
          </div>
        </div>
      </section>

      {/* Projects Showcase */}
      <section id="projects" className="py-24 md:py-32 bg-charcoal text-ivory">
        <div className="px-6 max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-heading mb-16 text-white border-b border-sand/20 pb-8">Featured Work</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
            <ProjectCard title="Luxury Villa Palm Jumeirah" category="Residential" img="/extracted/brochure_img_17.jpg" />
            <ProjectCard title="Five Star Hotel Downtown" category="Hospitality" img="/extracted/brochure_img_27.jpg" />
            <ProjectCard title="Premium Commercial Hub" category="Commercial" img="/extracted/brochure_img_33.jpg" />
            <ProjectCard title="Penthouse Marina" category="Renovation" img="/extracted/brochure_img_38.jpg" />
            
            <ProjectCard title="M E P Works" category="Infrastructure" img="/extracted/brochure_img_61.jpg" />
            <ProjectCard title="Construction Related Works" category="Structural" img="/extracted/brochure_img_21.jpg" />
            <ProjectCard title="False Ceiling" category="Interior" img="/extracted/brochure_img_14.jpg" />
            <ProjectCard title="AC Electromechanical Works" category="Systems" img="/extracted/brochure_img_62.jpg" />
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
              <img src="/extracted/brochure_img_84.jpg" alt="Craftsmanship" className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-1000 shadow-2xl" />
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
              <p className="text-charcoal/70 font-light">+971 4 123 4567</p>
            </div>
            <div className="flex flex-col items-center group">
              <div className="w-16 h-16 border border-gold/40 rounded-full flex items-center justify-center mb-6 group-hover:bg-gold/10 transition-colors">
                <Mail className="text-gold drop-shadow-sm" />
              </div>
              <h3 className="text-lg uppercase tracking-widest font-heading mb-2">Email</h3>
              <p className="text-charcoal/70 font-light">info@premiumfloors.ae</p>
            </div>
            <div className="flex flex-col items-center group">
              <div className="w-16 h-16 border border-gold/40 rounded-full flex items-center justify-center mb-6 group-hover:bg-gold/10 transition-colors">
                <MapPin className="text-gold drop-shadow-sm" />
              </div>
              <h3 className="text-lg uppercase tracking-widest font-heading mb-2">Location</h3>
              <p className="text-charcoal/70 font-light">Business Bay, Dubai, UAE</p>
            </div>
          </div>

          <a href="mailto:info@premiumfloors.ae" className="inline-flex items-center px-12 py-5 bg-matte-black text-white hover:bg-gold transition-colors duration-300 uppercase tracking-widest font-medium text-sm shadow-xl">
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
        <p>&copy; {new Date().getFullYear()} Premium Floors LLC. All rights reserved. Crafted for Excellence.</p>
      </footer>
    </div>
  );
}

function ServiceCard({ title, items, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ type: "spring", stiffness: 100, damping: 20, delay }}
      className="bg-white p-10 border border-sand/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group will-change-transform"
    >
      <h3 className="text-2xl font-heading text-matte-black mb-6 border-b border-sand/30 pb-4 group-hover:border-gold transition-colors">{title}</h3>
      <ul className="space-y-4 text-charcoal/80 font-light">
        {items.map((item, i) => (
          <li key={i} className="flex items-start">
            <span className="text-gold mr-3 mt-1 text-xs">◆</span>
            {item}
          </li>
        ))}
      </ul>
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
      <img src={img} alt={title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
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

  const zExpanded = useTransform(scrollYProgress, [0, 0.7], [0, 1]);

  const tileZ = useTransform(zExpanded, v => `${v * 200}px`);
  const heatingZ = useTransform(zExpanded, v => `${v * 100}px`);
  const wiringZ = useTransform(zExpanded, v => `0px`);
  const insulationZ = useTransform(zExpanded, v => `${v * -100}px`);
  const concreteZ = useTransform(zExpanded, v => `${v * -200}px`);

  const opacityLabels = useTransform(zExpanded, [0.3, 1], [0, 1]);

  return (
    <section ref={containerRef} className="relative z-20 h-[250vh] bg-white text-matte-black border-b border-sand/30">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-start md:justify-center pt-8 md:pt-0 overflow-hidden">

        <div className="relative text-center w-full px-6 z-20 mb-32 md:mb-48 mt-12 md:mt-0">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif italic font-light mb-4 text-matte-black"
          >
            The Anatomy of Excellence
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-charcoal/70 font-light max-w-2xl mx-auto"
          >
            From the core structural MEP layers to the finest luxury finishes, we engineer every inch.
          </motion.p>
        </div>

        <div
          className="relative w-[80vw] h-[80vw] max-w-[280px] max-h-[280px] md:max-w-[450px] md:max-h-[450px] translate-y-8 md:translate-y-0"
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
            <div className="md:hidden absolute bottom-4 left-4 z-30 pointer-events-none">
              <span className={`text-[10px] font-bold tracking-widest uppercase transition-all duration-300 ${hoveredLayer === 1 ? 'text-gold drop-shadow-[0_0_8px_rgba(197,160,89,0.8)]' : 'text-matte-black/40'}`}>
                Structural Concrete
              </span>
            </div>
            <div className="hidden md:block absolute top-[80%] right-0 w-3 h-3 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,1),0_0_20px_rgba(197,160,89,1)] border-[2.5px] border-gold transform translate-x-1/2 translate-y-1/2 z-20">
              <motion.div
                style={{ opacity: opacityLabels, transform: "rotateZ(45deg) rotateX(-60deg)", transformOrigin: "top left" }}
                className="absolute top-1/2 left-1/2 flex items-start pointer-events-auto"
              >
                <svg width="40" height="40" className="md:w-[60px] md:h-[60px] absolute top-0 left-0 overflow-visible z-0 -translate-x-[1px] -translate-y-[1px]">
                  <path d="M 0 0 L 10 10 L 25 10 md:M 0 0 L 20 20 L 50 20" fill="transparent" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.8))" />
                </svg>

                <div className="bg-white px-2 py-1.5 md:px-8 md:py-3.5 z-10 shadow-xl border border-sand/40 rounded-[3px] translate-x-2 md:translate-x-12 translate-y-3">
                  <span className="font-sans font-bold text-[10px] md:text-lg lg:text-xl text-matte-black tracking-[1px] uppercase whitespace-nowrap">
                    Structural Concrete
                  </span>
                </div>
              </motion.div>
            </div>
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
            <div className="md:hidden absolute bottom-4 left-4 z-30 pointer-events-none">
              <span className={`text-[10px] font-bold tracking-widest uppercase transition-all duration-300 ${hoveredLayer === 2 ? 'text-gold drop-shadow-[0_0_8px_rgba(197,160,89,0.8)]' : 'text-matte-black/40'}`}>
                Acoustic Insulation
              </span>
            </div>
            <div className="hidden md:block absolute top-[30%] left-0 w-3 h-3 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,1),0_0_20px_rgba(197,160,89,1)] border-[2.5px] border-gold transform -translate-x-1/2 translate-y-1/2 z-20">
              <motion.div
                style={{ opacity: opacityLabels, transform: "rotateZ(45deg) rotateX(-60deg)", transformOrigin: "top right" }}
                className="absolute top-1/2 right-1/2 flex items-start justify-end pointer-events-auto"
              >
                <svg width="40" height="40" className="md:w-[60px] md:h-[60px] absolute top-0 right-0 overflow-visible z-0 translate-x-[1px] -translate-y-[1px]">
                  <path d="M 0 0 L -10 10 L -25 10 md:M 0 0 L -20 20 L -50 20" fill="transparent" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.8))" />
                </svg>

                <div className="bg-white px-2 py-1.5 md:px-8 md:py-3.5 z-10 shadow-xl border border-sand/40 rounded-[3px] -translate-x-2 md:-translate-x-12 translate-y-3">
                  <span className="font-sans font-bold text-[10px] md:text-lg lg:text-xl text-matte-black tracking-[1px] uppercase whitespace-nowrap">
                    Acoustic Insulation
                  </span>
                </div>
              </motion.div>
            </div>
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
            <div className="md:hidden absolute bottom-4 left-4 z-30 pointer-events-none">
              <span className={`text-[10px] font-bold tracking-widest uppercase transition-all duration-300 ${hoveredLayer === 3 ? 'text-gold drop-shadow-[0_0_8px_rgba(197,160,89,0.8)]' : 'text-blue-600/60'}`}>
                MEP / Wiring
              </span>
            </div>
            <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_49%,rgba(96,165,250,0.5)_50%,transparent_51%),linear-gradient(0deg,transparent_49%,rgba(96,165,250,0.5)_50%,transparent_51%)] bg-[size:30px_30px] pointer-events-none"></div>

            <div className="hidden md:block absolute bottom-0 right-[15%] w-3 h-3 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,1),0_0_20px_rgba(197,160,89,1)] border-[2.5px] border-gold transform translate-x-1/2 translate-y-1/2 z-20">
              <motion.div
                style={{ opacity: opacityLabels, transform: "rotateZ(45deg) rotateX(-60deg)", transformOrigin: "top left" }}
                className="absolute top-1/2 left-1/2 flex items-start pointer-events-auto"
              >
                <svg width="40" height="40" className="md:w-[60px] md:h-[60px] absolute top-0 left-0 overflow-visible z-0 -translate-x-[1px] -translate-y-[1px]">
                  <path d="M 0 0 L 10 10 L 25 10 md:M 0 0 L 20 20 L 50 20" fill="transparent" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.8))" />
                </svg>

                <div className="bg-white px-2 py-1.5 md:px-8 md:py-3.5 z-10 shadow-xl border border-sand/40 rounded-[3px] translate-x-2 md:translate-x-12 translate-y-3">
                  <span className="font-sans font-bold text-[10px] md:text-lg lg:text-xl text-matte-black tracking-[1px] uppercase whitespace-nowrap">
                    MEP / Wiring
                  </span>
                </div>
              </motion.div>
            </div>
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
            <div className="md:hidden absolute bottom-4 left-4 z-30 pointer-events-none">
              <span className={`text-[10px] font-bold tracking-widest uppercase transition-all duration-300 ${hoveredLayer === 4 ? 'text-gold drop-shadow-[0_0_8px_rgba(197,160,89,0.8)]' : 'text-red-500/60'}`}>
                Radiant Heating
              </span>
            </div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(248,113,113,0.3)_0,transparent_10px)] bg-[size:25px_25px] pointer-events-none"></div>

            <div className="hidden md:block absolute top-[20%] left-0 w-3 h-3 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,1),0_0_20px_rgba(197,160,89,1)] border-[2.5px] border-gold transform -translate-x-1/2 -translate-y-1/2 z-20">
              <motion.div
                style={{ opacity: opacityLabels, transform: "rotateZ(45deg) rotateX(-60deg)", transformOrigin: "bottom right" }}
                className="absolute bottom-1/2 right-1/2 flex items-end justify-end pointer-events-auto"
              >
                <svg width="40" height="40" className="md:w-[60px] md:h-[60px] absolute bottom-0 right-0 overflow-visible z-0 translate-x-[1px] translate-y-[1px]">
                  <path d="M 0 0 L -10 -10 L -25 -10 md:M 0 0 L -20 -20 L -50 -20" fill="transparent" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.8))" />
                </svg>

                <div className="bg-white px-2 py-1.5 md:px-8 md:py-3.5 z-10 shadow-xl border border-sand/40 rounded-[3px] -translate-x-2 md:-translate-x-12 -translate-y-6">
                  <span className="font-sans font-bold text-[10px] md:text-lg lg:text-xl text-matte-black tracking-[1px] uppercase whitespace-nowrap">
                    Radiant Heating
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Layer 5: Tile/Finishes */}
          <motion.div
            style={{ translateZ: tileZ }}
            animate={{ scale: hoveredLayer === 5 ? 1.05 : 1, filter: hoveredLayer === 5 ? 'brightness(1.1) drop-shadow(0 0 40px rgba(197,160,89,0.7))' : 'brightness(1) drop-shadow(0 0 0px rgba(197,160,89,0))' }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="absolute inset-0 bg-white border border-gray-100 shadow-[0_40px_60px_rgba(0,0,0,0.3)] cursor-pointer overflow-hidden z-50"
            onMouseEnter={() => setHoveredLayer(5)}
            onMouseLeave={() => setHoveredLayer(null)}
          >
            <div className="md:hidden absolute bottom-4 left-4 z-30 pointer-events-none">
              <span className={`text-[10px] font-bold tracking-widest uppercase transition-all duration-300 ${hoveredLayer === 5 ? 'text-gold drop-shadow-[0_0_8px_rgba(197,160,89,0.8)]' : 'text-matte-black/40'}`}>
                Marble Finishes
              </span>
            </div>
            {/* The Un-compressed Floor Image Hack */}
            <div
              className={`absolute inset-0 bg-cover bg-center pointer-events-none z-0`}
              style={{ backgroundImage: `url(${cardImg})` }}
            />

            <div
              className="hidden md:block absolute top-0 left-[50%] w-3 h-3 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,1),0_0_20px_rgba(197,160,89,1)] border-[2.5px] border-gold transform -translate-x-1/2 -translate-y-1/2 z-20"
              onMouseEnter={() => setHoveredLayer(5)}
              onMouseLeave={() => setHoveredLayer(null)}
            >
              <motion.div
                style={{ opacity: opacityLabels, transform: "rotateZ(45deg) rotateX(-60deg)", transformOrigin: "bottom center" }}
                className="absolute bottom-1/2 left-1/2 flex items-end justify-center pointer-events-auto"
              >
                {/* Stem goes STRAIGHT UP */}
                <svg width="60" height="60" className="absolute bottom-0 left-1/2 -translate-x-1/2 overflow-visible z-0 translate-y-[1px]">
                  <path d="M 0 0 L 0 -40" fill="transparent" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.8))" />
                </svg>

                <div className="bg-white px-2 py-1.5 md:px-8 md:py-3.5 z-10 shadow-xl border border-sand/40 rounded-[3px] -translate-x-1/2 -translate-y-[24px] md:-translate-y-[48px]">
                  <span className="font-sans font-bold text-[10px] md:text-lg lg:text-xl text-matte-black tracking-[1px] uppercase whitespace-nowrap">
                    Premium Marble Finish
                  </span>
                </div>
              </motion.div>
            </div>
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
