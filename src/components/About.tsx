'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const services = [
    {
        id: "01",
        title: "UI/UX Architecture",
        description: "I create intuitive, visually appealing interfaces that enhance user experience, ensuring your app is both beautiful and functional across all devices.",
        skills: "React / Next.js",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#F2C94C]">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        )
    },
    {
        id: "02",
        title: "Full-Stack Development",
        description: "Building reliable, scalable solutions by delivering clean code that powers high-performance web applications with top-notch security.",
        skills: "Node.js / NestJS",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#F2C94C]">
                <path d="M20 7L12 3L4 7M20 7L12 11M20 7V17L12 21M12 11L4 7M12 11V21M4 7V17L12 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        )
    },
    {
        id: "03",
        title: "Data & API Design",
        description: "Designing robust data layers and efficient APIs that serve as the backbone of performant digital products, ensuring seamless data flow.",
        skills: "GraphQL / MySQL / MongoDB / PostgreSQL",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#F2C94C]">
                <path d="M21 12V7H3V12M21 12V17H3V12M21 12H3M18 7V17M6 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        )
    },
    {
        id: "04",
        title: "Performance Optimization",
        description: "Improving application performance through efficient rendering, asset optimization, and scalable backend integrations to ensure user experiences.",
        skills: "S3 / ImageKit / Keystone / Strapi / Redis",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#F2C94C]">
                <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        )
    }
];

export default function About() {
    const [activeIndex, setActiveIndex] = useState(0);

    const nextSlide = () => setActiveIndex((prev) => (prev + 1) % services.length);
    const prevSlide = () => setActiveIndex((prev) => (prev - 1 + services.length) % services.length);

    return (
        <section id="about" className="bg-black py-20 md:py-30 px-6 md:px-12 lg:px-24 overflow-hidden border-b border-white/5">
            <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">

                {/* Services Grid Section */}
                <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-20 items-start">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="lg:sticky lg:top-40"
                    >
                        <h3 className="text-5xl md:text-7xl font-extralight text-white tracking-tighter leading-none mb-6 md:mb-8">
                            How Can I <br />
                            <span className="font-medium text-[#F2C94C] tracking-tight">Assist You?</span>
                        </h3>
                        <p className="text-white/40 text-lg leading-relaxed max-w-xs">
                            Leveraging 2.5+ years of full-stack expertise to solve complex technical challenges.
                        </p>
                        <p className="mt-4 text-white/40 text-lg leading-relaxed max-w-sm">
                            My mission is to assist startups and enterprises in building high-performance, scalable digital products that deliver exceptional user value.
                        </p>
                    </motion.div>

                    <div className="hidden md:grid md:grid-cols-2 gap-6 md:gap-8">
                        {services.map((service, index) => (
                            <motion.div
                                key={service.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <ProjectCard service={service} index={index} />
                            </motion.div>
                        ))}
                    </div>

                    {/* Mobile Carousel (Visible only on mobile) */}
                    <div className="md:hidden space-y-8">
                        <div className="relative min-h-[350px]">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeIndex}
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -50 }}
                                    transition={{ duration: 0.3 }}
                                    drag="x"
                                    dragConstraints={{ left: 0, right: 0 }}
                                    dragElastic={0.2}
                                    onDragEnd={(_, info) => {
                                        const swipeThreshold = 50;
                                        if (info.offset.x < -swipeThreshold) {
                                            nextSlide();
                                        } else if (info.offset.x > swipeThreshold) {
                                            prevSlide();
                                        }
                                    }}
                                    className="cursor-grab active:cursor-grabbing"
                                >
                                    <ProjectCard service={services[activeIndex]} index={activeIndex} />
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Carousel Controls */}
                        <div className="flex items-center justify-between">
                            <div className="flex gap-2">
                                {services.map((_, i) => (
                                    <div
                                        key={i}
                                        className={`h-1.5 transition-all duration-300 rounded-full ${i === activeIndex ? "w-8 bg-[#F2C94C]" : "w-2 bg-white/10"
                                            }`}
                                    />
                                ))}
                            </div>
                            <div className="flex gap-4">
                                <button
                                    onClick={prevSlide}
                                    className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/20 transition-all"
                                >
                                    ←
                                </button>
                                <button
                                    onClick={nextSlide}
                                    className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/20 transition-all"
                                >
                                    →
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function ProjectCard({ service, index }: { service: typeof services[0]; index: number }) {
    return (
        <div className="group relative bg-white/5 border border-white/5 rounded-[24px] p-6 hover:bg-white/[0.08] hover:border-white/10 transition-all duration-500 cursor-default h-full flex flex-col justify-between">
            <div>
                <div className="flex justify-between items-start mb-8">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#F2C94C]/10 transition-all duration-500">
                        {service.icon}
                    </div>
                    <span className="absolute top-4 right-4 text-white/5 font-black text-7xl group-hover:text-white/10 transition-colors">
                        {service.id}
                    </span>
                </div>

                <div className="space-y-3">
                    <h4 className="text-2xl font-medium text-white tracking-tight">
                        {service.title}
                    </h4>
                    <p className="text-white/40 text-lg leading-relaxed font-light">
                        {service.description}
                    </p>
                </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/5">
                <p className="text-[10px] text-[#F2C94C] font-mono uppercase tracking-widest font-bold">
                    {service.skills}
                </p>
            </div>
        </div>
    );
}
