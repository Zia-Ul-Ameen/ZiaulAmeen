'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();
    const isProjectPage = pathname?.startsWith('/projects/');

    useEffect(() => {
        const handleScroll = () => {
            // Larger threshold for main page hero traversal
            // Smaller threshold for shorter case study hero
            const threshold = isProjectPage ? 50 : window.innerHeight * 2;
            setScrolled(window.scrollY > threshold);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isProjectPage]);

    const showBackground = scrolled || isProjectPage;

    return (
        <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${showBackground
            ? "bg-black/40 backdrop-blur-xl border-b border-white/5 py-5 md:py-4 px-6 md:px-12 lg:px-24"
            : "mix-blend-difference py-6 px-6 md:px-12 lg:px-24"
            }`}>
            <div className="max-w-[1600px] mx-auto flex md:justify-between justify-center items-center">
                {/* Status Badge */}
                <Link
                    href="/#contact"
                    className="hidden md:flex items-center gap-2 md:gap-3 bg-white/5 border border-white/10 rounded-full px-3 md:px-4 py-2 backdrop-blur-md hover:bg-white/10 transition-all group"
                >
                    <div className="relative">
                        <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-500 rounded-full" />
                        <motion.div
                            animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute inset-0 bg-green-500 rounded-full"
                        />
                    </div>
                    <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] group-hover:text-white transition-colors">Open to Work</span>
                </Link>

                {/* Navigation Links */}
                <div className="flex items-center gap-4 md:gap-8 text-white/70 text-sm font-medium uppercase tracking-widest transition-colors">
                    <Link href="#about" className="hover:text-white transition-colors underline-offset-4 hover:underline decoration-[#F2C94C]/70">About</Link>
                    <Link href="#works" className="hover:text-white transition-colors underline-offset-4 hover:underline decoration-[#F2C94C]/70">My Works</Link>
                    <Link href="#contact" className="hover:text-white transition-colors underline-offset-4 hover:underline decoration-[#F2C94C]/70">Contact</Link>
                    <a
                        href="/Ziaul-Ameen-Resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full hover:bg-[#F2C94C] hover:text-black hover:border-[#F2C94C] transition-all duration-300"
                    >
                        Resume
                        <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="group-hover:rotate-45 transition-transform duration-300"
                        >
                            <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </a>
                </div>
            </div>
        </nav>
    );
}
