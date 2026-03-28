/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, 
  ShieldCheck, 
  Zap, 
  Award, 
  Instagram, 
  Twitter, 
  Facebook, 
  Menu, 
  X,
  ArrowUpRight,
  Gauge,
  Cpu,
  Wind,
  Rotate3d,
  Star,
  Phone,
  Car,
  LayoutGrid,
  Gem,
  Settings,
  Battery,
  Wrench,
  Clock,
  Key,
  Monitor,
  ChevronLeft,
  ArrowRight,
  Quote
} from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';

const CATEGORIES = [
  { id: 'all', name: 'Showroom', icon: <LayoutGrid className="w-4 h-4" /> },
  { id: 'suv', name: 'Performance SUV', icon: <Car className="w-4 h-4" /> },
  { id: 'luxury', name: 'Grand Tourer', icon: <Gem className="w-4 h-4" /> },
];

const BRANDS = [
  "PORSCHE", "FERRARI", "LAMBORGHINI", "ASTON MARTIN", "BENTLEY", "ROLLS ROYCE", "MCLAREN", "BUGATTI"
];

const FEATURED_CARS = [
  {
    id: 1,
    name: "911 GT3 RS",
    brand: "PORSCHE",
    category: 'luxury',
    price: "$223,800",
    rating: 5,
    specs: { hp: "518", top: "184 mph", zero: "3.0s" },
    image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=2070",
    color: "#C0C0C0"
  },
  {
    id: 2,
    name: "R8 V10 Spyder",
    brand: "AUDI",
    category: 'luxury',
    price: "$209,000",
    rating: 5,
    specs: { hp: "602", top: "204 mph", zero: "3.2s" },
    image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=80&w=2070",
    color: "#1a1a1a"
  },
  {
    id: 3,
    name: "Z06 Convertible",
    brand: "CHEVROLET",
    category: 'luxury',
    price: "$112,300",
    rating: 4,
    specs: { hp: "670", top: "189 mph", zero: "2.6s" },
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=2070",
    color: "#ff3e3e"
  },
  {
    id: 4,
    name: "Range Rover SV",
    brand: "LAND ROVER",
    category: 'suv',
    price: "$201,500",
    rating: 5,
    specs: { hp: "523", top: "162 mph", zero: "4.4s" },
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&q=80&w=2070",
    color: "#2d3436"
  },
  {
    id: 5,
    name: "Urus Performante",
    brand: "LAMBORGHINI",
    category: 'suv',
    price: "$260,000",
    rating: 5,
    specs: { hp: "657", top: "190 mph", zero: "3.3s" },
    image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80&w=2070",
    color: "#f1c40f"
  },
  {
    id: 6,
    name: "G 63 AMG",
    brand: "MERCEDES-BENZ",
    category: 'suv',
    price: "$179,000",
    rating: 5,
    specs: { hp: "577", top: "137 mph", zero: "4.5s" },
    image: "https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&fit=crop&q=80&w=2070",
    color: "#000000"
  }
];

const FEATURES = [
  {
    icon: <ShieldCheck className="w-8 h-8 text-brand-neon" />,
    title: "Lifetime Warranty",
    description: "Unmatched protection for your investment, ensuring peace of mind for every mile."
  },
  {
    icon: <Zap className="w-8 h-8 text-brand-neon" />,
    title: "Performance Tuning",
    description: "Expert engineers dedicated to extracting every ounce of power from your machine."
  },
  {
    icon: <Award className="w-8 h-8 text-brand-neon" />,
    title: "Certified Selection",
    description: "Only the most pristine examples make it into our exclusive showroom."
  }
];

function SeamlessVideo({ src, className }: { src: string, className?: string }) {
  const [activeVideo, setActiveVideo] = useState(0);
  const videoRef1 = useRef<HTMLVideoElement>(null);
  const videoRef2 = useRef<HTMLVideoElement>(null);
  const fadeDuration = 1.5; // seconds

  useEffect(() => {
    const v1 = videoRef1.current;
    const v2 = videoRef2.current;
    if (!v1 || !v2) return;

    const handleTimeUpdate = (e: Event) => {
      const video = e.target as HTMLVideoElement;
      if (!video.duration) return;
      
      const remaining = video.duration - video.currentTime;

      if (remaining <= fadeDuration && activeVideo === (video === v1 ? 0 : 1)) {
        const nextVideo = video === v1 ? v2 : v1;
        nextVideo.currentTime = 0;
        const playPromise = nextVideo.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Auto-play was prevented
          });
        }
        setActiveVideo(video === v1 ? 1 : 0);
      }
    };

    v1.addEventListener('timeupdate', handleTimeUpdate);
    v2.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      v1.removeEventListener('timeupdate', handleTimeUpdate);
      v2.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [activeVideo]);

  return (
    <div className={`relative ${className}`}>
      <video
        ref={videoRef1}
        src={src}
        muted
        playsInline
        autoPlay
        preload="auto"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1500ms] ${activeVideo === 0 ? 'opacity-90' : 'opacity-0'}`}
      />
      <video
        ref={videoRef2}
        src={src}
        muted
        playsInline
        preload="auto"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1500ms] ${activeVideo === 1 ? 'opacity-90' : 'opacity-0'}`}
      />
    </div>
  );
}

function Car360Modal({ car, onClose }: { car: any, onClose: () => void }) {
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const lastX = useRef(0);

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    lastX.current = 'touches' in e ? e.touches[0].clientX : e.clientX;
  };

  const handleMouseMove = (e: MouseEvent | TouchEvent) => {
    if (!isDragging) return;
    const currentX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
    const delta = currentX - lastX.current;
    setRotation(prev => (prev + delta * 0.5) % 360);
    lastX.current = currentX;
  };

  const handleMouseUp = () => setIsDragging(false);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleMouseMove);
      window.addEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleMouseMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/98 backdrop-blur-2xl p-4 md:p-10"
    >
      <button 
        onClick={onClose}
        className="absolute top-8 right-8 p-5 glass rounded-full hover:bg-white/10 transition-all z-10 group"
      >
        <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-500" />
      </button>

      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-3 gap-16 items-center">
        <div className="lg:col-span-2 relative aspect-video flex items-center justify-center overflow-hidden rounded-[3rem] glass cursor-grab active:cursor-grabbing group"
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
        >
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-full h-full opacity-30 bg-[radial-gradient(circle,rgba(0,242,255,0.1)_0%,transparent_70%)]" />
          </div>
          
          <motion.div 
            style={{ 
              rotateY: rotation,
              perspective: 2000,
              transformStyle: "preserve-3d"
            }}
            className="relative w-full h-full flex items-center justify-center"
          >
            <img 
              src={car.image} 
              alt={car.name}
              className="w-4/5 h-auto object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,0.8)]"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ transform: "translateZ(-100px)" }}>
              <div className="w-4/5 aspect-video border border-brand-neon/5 rounded-full blur-3xl" />
            </div>
          </motion.div>

          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 pointer-events-none">
            <div className="flex items-center gap-6 px-8 py-4 glass rounded-full text-[9px] font-bold uppercase tracking-[0.4em] text-white/60">
              <Rotate3d className="w-4 h-4 text-brand-neon animate-pulse" />
              Interactive 360° Inspection
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-10">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-brand-neon text-[9px] font-bold uppercase tracking-[0.5em]">Precision Engineering</span>
              <div className="flex-1 h-[1px] bg-brand-neon/20" />
            </div>
            <h2 className="text-5xl md:text-7xl font-display font-bold tracking-tighter mb-6 leading-none">{car.name}</h2>
            <p className="text-gray-400 font-light leading-relaxed text-lg italic font-serif">
              "Every component of the {car.name} is a testament to our commitment to automotive excellence."
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {Object.entries(car.specs).map(([key, value]) => (
              <div key={key} className="glass p-8 rounded-3xl group hover:border-brand-neon/20 transition-colors">
                <p className="text-[9px] text-gray-500 uppercase tracking-widest mb-2 font-bold">{key === 'zero' ? '0-60 MPH' : key === 'hp' ? 'Horsepower' : 'Top Speed'}</p>
                <p className="text-2xl font-bold tracking-tight">{value as string}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-5">
            <button className="btn-neon w-full">
              <span className="relative z-10">CONFIGURE YOUR BUILD</span>
            </button>
            <button className="btn-premium w-full">
              <span className="relative z-10">REQUEST PRIVATE QUOTE</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [viewing360, setViewing360] = useState<any>(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredCars = activeCategory === 'all' 
    ? FEATURED_CARS 
    : FEATURED_CARS.filter(car => car.category === activeCategory);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-white selection:bg-brand-neon selection:text-black">
      <div className="grain" />
      
      <AnimatePresence>
        {viewing360 && (
          <Car360Modal 
            car={viewing360} 
            onClose={() => setViewing360(null)} 
          />
        )}
      </AnimatePresence>

      {/* Navbar */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${scrolled ? 'glass-dark py-4 shadow-2xl' : 'py-8 border-b border-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 relative group">
              <div className={`absolute inset-0 border rotate-45 group-hover:rotate-90 transition-all duration-700 ${scrolled ? 'border-white/20' : 'border-white/10'}`} />
              <div className="absolute inset-0 flex items-center justify-center">
                <Car className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="text-xl font-display font-bold tracking-[0.2em] uppercase">
              BLOOD
            </div>
          </motion.div>

          <div className="hidden md:flex items-center space-x-10">
            {['Home', 'Showroom', 'Experience', 'About'].map((item, i) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-[9px] font-bold hover:text-brand-neon transition-colors uppercase tracking-[0.4em] relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brand-neon transition-all duration-500 group-hover:w-full" />
              </motion.a>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden md:flex items-center gap-8"
          >
            <button className="btn-premium group !py-3 !px-6">
              <span className="relative z-10 flex items-center gap-3">
                CONTACT US <ArrowUpRight className="w-3 h-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </span>
            </button>
          </motion.div>

          <button className="md:hidden p-2 glass" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 glass-dark flex flex-col items-center justify-center space-y-8 md:hidden"
          >
            {['Home', 'Gallery', 'About', 'Contact Us'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase().replace(' ', '-')}`} 
                onClick={() => setIsMenuOpen(false)}
                className="text-3xl font-display font-bold"
              >
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen overflow-hidden flex items-center justify-center">
        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0"
        >
          <SeamlessVideo 
            src="/asset/animation.mp4" 
            className="w-full h-full"
          />
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />
          <div className="absolute inset-0 cinematic-vignette" />
        </motion.div>

        <div className="relative w-full max-w-7xl mx-auto px-6 h-full flex flex-col justify-center pt-20 md:pt-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
            {/* Left side content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1], delay: 0.5 }}
              className="flex flex-col items-start text-left"
            >
              <div className="flex items-center gap-4 mb-8 opacity-40">
                <div className="w-12 h-[1px] bg-white/30" />
                <span className="text-blue-500 text-[9px] font-light uppercase tracking-[0.8em]">Est. 2005</span>
              </div>
              
              <h2 className="text-base md:text-2xl font-display font-extralight tracking-[1.2em] leading-[2.5] mb-15 uppercase text-white/20">
                Pure <br />
                <span className="text-2xl md:text-5xl font-extralight tracking-[0.2em] text-white/50 block mt-10">Performance</span>
              </h2>
              
              <p className="text-white/30 text-[9px] font-light tracking-[0.5em] uppercase leading-relaxed max-w-lg mb-20">
                The world's most exclusive collection of <br />
                luxury and high-performance automobiles.
              </p>

              <div className="flex flex-col items-start gap-8">
                <motion.button 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5, duration: 2 }}
                  className="btn-premium group !px-16 !py-8 text-[9px] tracking-[0.6em] border-white/5"
                >
                  <span className="relative z-10 flex items-center gap-6">
                    EXPLORE SHOWROOM 
                    <ChevronRight className="w-3 h-3 opacity-30 group-hover:opacity-100 transition-opacity" />
                  </span>
                </motion.button>
              </div>
            </motion.div>

            {/* Right side empty */}
            <div className="hidden md:block" />
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 2 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6"
          >
            <div className="w-[1px] h-12 bg-gradient-to-b from-brand-neon/50 to-transparent relative overflow-hidden">
              <motion.div 
                animate={{ y: ["-100%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-brand-neon"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Brand Marquee */}
      <section className="py-20 border-y border-white/5 bg-[#050505] overflow-hidden">
        <div className="flex whitespace-nowrap">
          <motion.div 
            animate={{ x: [0, -1000] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="flex gap-20 items-center px-10"
          >
            {[...BRANDS, ...BRANDS].map((brand, i) => (
              <span key={i} className="text-2xl md:text-4xl font-display font-bold text-white/10 tracking-[0.3em] hover:text-white/40 transition-colors cursor-default">
                {brand}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Cars / Specials */}
      <section id="gallery" className="py-40 px-6 bg-[#050505]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-[1px] bg-brand-gold" />
                <span className="text-brand-gold text-[10px] font-bold uppercase tracking-[0.5em]">Inventory</span>
              </div>
              <h2 className="text-5xl md:text-8xl font-display font-bold tracking-tighter leading-none mb-12">TODAYS <br />SPECIALS</h2>
              
              <div className="flex flex-wrap gap-4">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`flex items-center gap-3 px-8 py-4 text-[9px] font-bold uppercase tracking-[0.4em] transition-all duration-700 ${
                      activeCategory === cat.id 
                        ? 'bg-brand-gold text-black' 
                        : 'border border-white/5 text-gray-500 hover:text-white hover:border-white/20'
                    }`}
                  >
                    {cat.icon}
                    {cat.name}
                  </button>
                ))}
              </div>
            </motion.div>
            
            <div className="flex gap-4">
              <button className="w-14 h-14 border border-white/5 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-500 rounded-full">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button className="w-14 h-14 border border-white/5 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-500 rounded-full">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5 border border-white/5">
            <AnimatePresence mode="popLayout">
              {filteredCars.map((car, i) => (
                <motion.div
                  key={car.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                  className="group relative bg-[#050505] p-10 transition-all duration-700 hover:bg-[#080808] folded-corner"
                >
                  <div className="folded-corner-accent" />
                  
                  <div className="relative aspect-[16/10] overflow-hidden mb-10 bg-[#050505]">
                    <img 
                      src={car.image} 
                      alt={car.name} 
                      className="w-full h-full object-contain transition-transform duration-1000 group-hover:scale-110 relative z-10 grayscale group-hover:grayscale-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />
                    
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0 z-30">
                      <button 
                        onClick={() => setViewing360(car)}
                        className="p-4 glass rounded-full hover:bg-brand-gold hover:text-black transition-all shadow-2xl"
                      >
                        <Rotate3d className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="relative z-10">
                    <div className="w-12 h-[2px] bg-brand-gold mb-6" />
                    <h3 className="text-xl font-display font-bold mb-4 tracking-widest uppercase">{car.name}</h3>
                    <p className="text-gray-500 text-[10px] font-light tracking-[0.2em] uppercase mb-8 leading-relaxed">
                      {car.brand} • {car.specs.hp} HP • {car.specs.zero} 0-60
                    </p>
                    <div className="flex justify-between items-center">
                      <p className="text-white font-bold tracking-[0.2em] text-sm">{car.price}</p>
                      <button className="flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.3em] text-gray-500 group-hover:text-brand-gold transition-colors">
                        <div className="w-6 h-6 border border-white/10 flex items-center justify-center group-hover:border-brand-gold/30">
                          <ArrowRight className="w-3 h-3" />
                        </div>
                        DETAILS
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-40 px-6 bg-[#050505] relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
              className="max-w-2xl"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-[1px] bg-brand-gold" />
                <span className="text-brand-gold text-[10px] font-bold uppercase tracking-[0.5em]">Maintenance</span>
              </div>
              <h2 className="text-5xl md:text-8xl font-display font-bold tracking-tighter leading-none">ELITE <br />SERVICES</h2>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5 border border-white/5">
            {[
              {
                title: "SCHEDULE SERVICE",
                desc: "Book your next maintenance appointment with our master technicians.",
                image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=2072"
              },
              {
                title: "PREVENTIVE MAINTENANCE",
                desc: "Comprehensive checks to ensure your machine performs at its peak.",
                image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=2070"
              },
              {
                title: "TIRE & WHEEL SERVICES",
                desc: "Precision alignment and high-performance tire solutions.",
                image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80&w=2070"
              }
            ].map((service, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: i * 0.15, ease: [0.19, 1, 0.22, 1] }}
                className="bg-[#050505] group relative overflow-hidden folded-corner"
              >
                <div className="folded-corner-accent" />
                <div className="aspect-[16/9] overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-12">
                  <div className="w-12 h-[2px] bg-brand-gold mb-6" />
                  <h3 className="text-xl font-display font-bold mb-6 tracking-widest uppercase group-hover:text-brand-gold transition-colors">{service.title}</h3>
                  <p className="text-gray-500 text-[11px] font-light leading-relaxed mb-10 tracking-widest uppercase opacity-60">
                    {service.desc}
                  </p>
                  <button className="flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.3em] text-gray-500 group-hover:text-brand-gold transition-colors">
                    <div className="w-6 h-6 border border-white/10 flex items-center justify-center group-hover:border-brand-gold/30">
                      <ArrowRight className="w-3 h-3" />
                    </div>
                    MORE DETAILS
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Icons Grid */}
      <section className="py-40 px-6 bg-[#050505] border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-24">
            <h2 className="text-4xl font-display font-bold tracking-tighter uppercase">Our Services</h2>
            <div className="flex gap-4">
              <button className="w-10 h-10 border border-white/5 flex items-center justify-center hover:bg-white hover:text-black transition-all rounded-full">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="w-10 h-10 border border-white/5 flex items-center justify-center hover:bg-white hover:text-black transition-all rounded-full">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-12">
            {[
              { icon: <Settings className="w-8 h-8" />, title: "Car Tuning" },
              { icon: <Battery className="w-8 h-8" />, title: "Battery & Electrical" },
              { icon: <Wrench className="w-8 h-8" />, title: "Repair Service" },
              { icon: <Clock className="w-8 h-8" />, title: "Urgent Repairs" },
              { icon: <Key className="w-8 h-8" />, title: "Car Keys Repair" },
              { icon: <Monitor className="w-8 h-8" />, title: "Computer Diagnostics" }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-start group cursor-pointer"
              >
                <div className="text-white mb-8 group-hover:text-brand-gold transition-colors duration-500">
                  {item.icon}
                </div>
                <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] mb-4 group-hover:text-brand-gold transition-colors">{item.title}</h4>
                <p className="text-[9px] text-gray-600 leading-relaxed mb-6 uppercase tracking-widest">
                  Professional solutions for your vehicle's performance.
                </p>
                <button className="text-[8px] font-bold uppercase tracking-[0.3em] text-gray-500 border-b border-white/10 pb-1 group-hover:text-brand-gold group-hover:border-brand-gold/30 transition-all">
                  Read More
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="relative py-80 overflow-hidden bg-black">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=2083" 
            alt="Driving Experience"
            className="w-full h-full object-cover grayscale opacity-40"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-4 mb-12">
              <div className="w-12 h-[1px] bg-brand-gold" />
              <span className="text-brand-gold text-xs font-bold uppercase tracking-[0.5em]">The Philosophy</span>
            </div>
            <h2 className="text-6xl md:text-9xl font-display font-bold tracking-tighter mb-12 leading-none">BEYOND <br />DRIVING</h2>
            <p className="text-lg text-gray-400 font-light leading-relaxed mb-16 max-w-lg uppercase tracking-[0.2em]">
              We have propositions for everybody. Our curated collection represents the absolute zenith of automotive performance and luxury.
            </p>
            <button className="btn-premium !px-16 !py-8">
              <span className="relative z-10">READ MORE</span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-40 relative overflow-hidden bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6 mb-24">
          <div className="flex items-center justify-between">
            <h2 className="text-4xl font-display font-bold tracking-tighter uppercase">Client Voices</h2>
            <div className="flex gap-4">
              <button className="w-10 h-10 border border-white/5 flex items-center justify-center hover:bg-white hover:text-black transition-all rounded-full">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="w-10 h-10 border border-white/5 flex items-center justify-center hover:bg-white hover:text-black transition-all rounded-full">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex whitespace-nowrap overflow-hidden">
          <motion.div 
            animate={{ x: [0, -7600] }}
            transition={{ 
              duration: 50, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="flex gap-px bg-white/5"
          >
            {[
              {
                text: "LuxeDrive redefined my expectations of automotive luxury. The attention to detail in their collection is simply unparalleled.",
                author: "hariii_exe"
              },
              {
                text: "The acquisition process was seamless. Their global logistics team handled everything with absolute precision.",
                author: "art_by_viknesh"
              },
              {
                text: "A masterclass in automotive curation. Every vehicle in their showroom is a piece of art.",
                author: "sanjayv3_18"
              },
              {
                text: "The elite maintenance service is the only one I trust with my vintage collection. Absolute perfection.",
                author: "saha_na0712"
              },
              {
                text: "Unrivaled performance and white-glove service. They truly understand the needs of the modern collector.",
                author: "thee.mofee"
              },
              {
                text: "From acquisition to global delivery, LuxeDrive is the gold standard in luxury automotive services.",
                author: "gowri__ns"
              },
              {
                text: "The most exclusive showroom I've ever visited. The collection is curated with impeccable taste.",
                author: "anu_.ramachandran._"
              },
              {
                text: "Their bespoke customization service turned my dream into a reality. Truly exceptional craftsmanship.",
                author: "sarouk_94"
              },
              {
                text: "A level of professionalism that is rare to find. They make the complex world of high-end cars feel simple.",
                author: "__mr_black_66"
              },
              {
                text: "The ultimate destination for any serious automotive enthusiast. Their knowledge and passion are infectious.",
                author: "margaretdora.10"
              },
              {
                text: "I've never seen a more impressive inventory. LuxeDrive is truly in a league of its own.",
                author: "naveen73___"
              },
              {
                text: "The personalized attention I received was incredible. They really go above and beyond.",
                author: "appuuu_67"
              },
              {
                text: "Their expertise in high-performance vehicles is unmatched. A truly rewarding experience.",
                author: "maniikandane"
              },
              {
                text: "LuxeDrive makes the dream of owning a supercar a seamless reality. Highly recommended.",
                author: "its_me_udhaya_001"
              },
              {
                text: "The transparency and integrity of their team are what set them apart in this industry.",
                author: "ig__sanj"
              },
              {
                text: "Every interaction with LuxeDrive is a testament to their commitment to excellence.",
                author: "_saravana._.22"
              },
              {
                text: "A truly global service. They delivered my vehicle halfway across the world without a scratch.",
                author: "duduban3"
              },
              {
                text: "The after-sales support is just as impressive as the initial purchase. They really care.",
                author: "mr_red_wolf_kd"
              },
              {
                text: "LuxeDrive is the only place I'll go for my automotive needs. They are the best in the business.",
                author: "sarcasm___06"
              }
            ].concat([
              {
                text: "LuxeDrive redefined my expectations of automotive luxury. The attention to detail in their collection is simply unparalleled.",
                author: "hariii_exe"
              },
              {
                text: "The acquisition process was seamless. Their global logistics team handled everything with absolute precision.",
                author: "art_by_viknesh"
              },
              {
                text: "A masterclass in automotive curation. Every vehicle in their showroom is a piece of art.",
                author: "sanjayv3_18"
              },
              {
                text: "The elite maintenance service is the only one I trust with my vintage collection. Absolute perfection.",
                author: "saha_na0712"
              },
              {
                text: "Unrivaled performance and white-glove service. They truly understand the needs of the modern collector.",
                author: "thee.mofee"
              },
              {
                text: "From acquisition to global delivery, Blood Drive is the gold standard in luxury automotive services.",
                author: "gowri__ns"
              },
              {
                text: "The most exclusive showroom I've ever visited. The collection is curated with impeccable taste.",
                author: "anu_.ramachandran._"
              },
              {
                text: "Their bespoke customization service turned my dream into a reality. Truly exceptional craftsmanship.",
                author: "sarouk_94"
              },
              {
                text: "A level of professionalism that is rare to find. They make the complex world of high-end cars feel simple.",
                author: "__mr_black_66"
              },
              {
                text: "The ultimate destination for any serious automotive enthusiast. Their knowledge and passion are infectious.",
                author: "margaretdora.10"
              },
              {
                text: "I've never seen a more impressive inventory. LuxeDrive is truly in a league of its own.",
                author: "naveen73___"
              },
              {
                text: "The personalized attention I received was incredible. They really go above and beyond.",
                author: "appuuu_67"
              },
              {
                text: "Their expertise in high-performance vehicles is unmatched. A truly rewarding experience.",
                author: "maniikandane"
              },
              {
                text: "LuxeDrive makes the dream of owning a supercar a seamless reality. Highly recommended.",
                author: "its_me_udhaya_001"
              },
              {
                text: "The transparency and integrity of their team are what set them apart in this industry.",
                author: "ig__sanj"
              },
              {
                text: "Every interaction with LuxeDrive is a testament to their commitment to excellence.",
                author: "_saravana._.22"
              },
              {
                text: "A truly global service. They delivered my vehicle halfway across the world without a scratch.",
                author: "duduban3"
              },
              {
                text: "The after-sales support is just as impressive as the initial purchase. They really care.",
                author: "mr_red_wolf_kd"
              },
              {
                text: "LuxeDrive is the only place I'll go for my automotive needs. They are the best in the business.",
                author: "sarcasm___06"
              }
            ]).map((testimonial, i) => (
              <div 
                key={i}
                className="bg-[#050505] p-10 md:p-12 w-[300px] md:w-[400px] flex-shrink-0 relative group folded-corner border-r border-white/5"
              >
                <div className="folded-corner-accent" />
                <Quote className="w-8 h-8 text-brand-gold/20 mb-8 group-hover:text-brand-gold/40 transition-colors" />
                <p className="text-sm md:text-base text-gray-300 font-light leading-relaxed mb-10 italic whitespace-normal">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-[1px] bg-brand-gold" />
                  <div>
                    <h4 className="text-brand-gold font-bold tracking-widest uppercase text-[11px]">{testimonial.author}</h4>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats/Specs Section */}
      <section className="py-40 px-6 bg-[#050505] border-y border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-16">
          {[
            { label: "Top Speed", value: "350+", unit: "km/h", icon: <Gauge className="w-8 h-8" /> },
            { label: "Inventory", value: "50+", unit: "Cars", icon: <Cpu className="w-8 h-8" /> },
            { label: "Experience", value: "21", unit: "Years", icon: <Wind className="w-8 h-8" /> },
            { label: "Clients", value: "2k+", unit: "Global", icon: <ShieldCheck className="w-8 h-8" /> }
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group text-center"
            >
              <div className="flex justify-center mb-10 text-gray-800 group-hover:text-brand-gold transition-colors duration-500">{stat.icon}</div>
              <div className="text-5xl md:text-8xl font-display font-bold mb-6 tracking-tighter">
                {stat.value}<span className="text-brand-gold text-2xl ml-1 font-light opacity-60">{stat.unit}</span>
              </div>
              <p className="text-[10px] uppercase tracking-[0.5em] text-gray-600 font-bold group-hover:text-brand-gold transition-colors">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-40 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#050505] p-16 md:p-40 relative overflow-hidden flex flex-col items-center text-center folded-corner"
          >
            <div className="folded-corner-accent" />
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-gold/5 blur-[150px] -translate-y-1/2 translate-x-1/2" />
            
            <div className="flex items-center gap-4 mb-12">
              <div className="w-12 h-[1px] bg-brand-gold" />
              <span className="text-brand-gold text-xs font-bold uppercase tracking-[0.5em]">Join the Elite</span>
              <div className="w-12 h-[1px] bg-brand-gold" />
            </div>
            
            <h2 className="text-6xl md:text-9xl font-display font-bold tracking-tighter mb-16 relative z-10 leading-none">
              READY TO DEFINE <br />YOUR LEGACY?
            </h2>
            <p className="max-w-2xl text-lg text-gray-500 mb-20 relative z-10 font-light uppercase tracking-[0.3em] leading-relaxed">
              Join the exclusive circle of LuxeDrive owners. <br />
              Schedule a private consultation with our specialists today.
            </p>
            <div className="flex flex-col sm:flex-row gap-8 relative z-10">
              <button className="btn-premium !px-16 !py-8">
                <span className="relative z-10">BOOK CONSULTATION</span>
              </button>
              <button className="btn-premium !px-16 !py-8 !bg-white !text-black border-white">
                <span className="relative z-10">VIEW INVENTORY</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer id="about" className="py-32 px-6 border-t border-white/5 bg-[#030303]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-24 mb-32">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-12">
                <div className="w-10 h-10 relative">
                  <div className="absolute inset-0 border border-white/20 rotate-45" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Car className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="text-2xl font-display font-bold tracking-[0.2em] uppercase">
                  BLOOD
                </div>
              </div>
              <p className="max-w-md text-gray-500 font-light leading-relaxed text-lg italic font-serif mb-12">
                "The world's premier destination for luxury and performance automobiles. Redefining the art of driving since 2005."
              </p>
              <div className="flex space-x-8">
                <a href="#" className="text-gray-500 hover:text-brand-neon transition-all hover:-translate-y-1"><Instagram className="w-5 h-5" /></a>
                <a href="#" className="text-gray-500 hover:text-brand-neon transition-all hover:-translate-y-1"><Twitter className="w-5 h-5" /></a>
                <a href="#" className="text-gray-500 hover:text-brand-neon transition-all hover:-translate-y-1"><Facebook className="w-5 h-5" /></a>
              </div>
            </div>
            
            <div>
              <h4 className="text-[9px] font-bold uppercase tracking-[0.5em] mb-12 text-white/50">Navigation</h4>
              <ul className="space-y-6 text-gray-500 text-[10px] font-bold uppercase tracking-[0.3em]">
                <li><a href="#" className="hover:text-brand-neon transition-colors">Showroom</a></li>
                <li><a href="#" className="hover:text-brand-neon transition-colors">Services</a></li>
                <li><a href="#" className="hover:text-brand-neon transition-colors">Experience</a></li>
                <li><a href="#" className="hover:text-brand-neon transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-[9px] font-bold uppercase tracking-[0.5em] mb-12 text-white/50">Contact</h4>
              <ul className="space-y-6 text-gray-500 text-[10px] font-bold uppercase tracking-[0.3em]">
                <li><span className="text-white block mb-1">Showroom</span> 123 Luxury Way, Beverly Hills</li>
                <li><span className="text-white block mb-1">Phone</span> +1 (800) LUXE-DRIVE</li>
                <li><span className="text-white block mb-1">Email</span> concierge@blood.com</li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/5 gap-8">
            <p className="text-[9px] text-gray-600 uppercase tracking-[0.5em] font-bold">
              © 2026 BLOOD Automobile Group. All rights reserved.
            </p>
            <div className="flex space-x-12 text-[9px] text-gray-600 uppercase tracking-[0.5em] font-bold">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-10 right-10 w-14 h-14 glass rounded-full flex items-center justify-center z-[90] hover:bg-brand-neon hover:text-black transition-all shadow-2xl group"
          >
            <ArrowUpRight className="w-6 h-6 -rotate-45 group-hover:scale-110 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
