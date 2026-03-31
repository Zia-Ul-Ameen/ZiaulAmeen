'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Trigger blur only after completely crossing the hero section (300vh)
            // to keep the arrival and animation perfectly clean
            setScrolled(window.scrollY > window.innerHeight * 2);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${scrolled
            ? "bg-black/40 backdrop-blur-xl border-b border-white/5 py-3 md:py-4 px-6 md:px-12 lg:px-24"
            : "mix-blend-difference py-6 px-6 md:px-12 lg:px-24"
            }`}>
            <div className="max-w-[1600px] mx-auto flex md:justify-between justify-center items-center">
                {/* Status Badge */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="hidden md:flex items-center gap-2 md:gap-3 bg-white/5 border border-white/10 rounded-full px-3 md:px-4 py-2 backdrop-blur-md"
                >
                    <div className="relative">
                        <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-500 rounded-full" />
                        <motion.div
                            animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute inset-0 bg-green-500 rounded-full"
                        />
                    </div>
                    <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Open to Work</span>
                </motion.div>

                {/* Navigation Links */}
                <div className="flex items-center gap-4 md:gap-8 text-white/70 text-sm font-medium uppercase tracking-widest transition-colors">
                    <Link href="#about" className="hover:text-white transition-colors underline-offset-4 hover:underline decoration-white/30">About</Link>
                    <Link href="#projects" className="hover:text-white transition-colors underline-offset-4 hover:underline decoration-white/30">Projects</Link>
                    <Link href="#contact" className="hover:text-white transition-colors underline-offset-4 hover:underline decoration-white/30">Contact</Link>
                    <a
                        href="/Ziaul-Ameen-Resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full hover:bg-[#F2C94C] hover:text-black hover:border-[#F2C94C] transition-all duration-300"
                    >
                        Resume
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </a>
                </div>
            </div>
        </nav>
    );
}
