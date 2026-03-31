'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

const PROJECTS = [
    {
        title: "Quantum Analytics",
        description: "High-performance data visualization dashboard for modern enterprises. Built with Next.js, D3.js and Tailwind CSS.",
        image: "/projects/project_1.png",
    },
    {
        title: "Aethel Luxury",
        description: "Immersive travel booking experience for premium destinations. Featuring immersive 3D landscapes and seamless UX.",
        image: "/projects/project_2.png",
    },
    {
        title: "Cybernetic Chronicles",
        description: "Cutting-edge streetwear e-commerce with interactive 3D elements and a unique glitched aesthetic.",
        image: "/projects/project_3.png",
    }
];

export default function Projects() {
    return (
        <section id="projects" className="bg-[#0a0a0a] pt-40 px-4 md:px-8 border-y border-white/5">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                    className="mb-10 md:mb-20 flex flex-col md:flex-row justify-between items-start md:items-end gap-4"
                >
                    <h2 className="text-5xl md:text-7xl font-extralight text-white tracking-tighter leading-none">
                        My <span className="font-medium text-[#F2C94C] tracking-tight">Works</span>
                    </h2>
                    <div className="text-left md:text-right max-w-sm">
                        <p className="text-white/40 text-sm md:text-base font-medium uppercase tracking-[0.2em] leading-relaxed">
                            Curating high-impact digital experiences through code and design.
                        </p>
                    </div>
                </motion.div>

                <div className="relative flex flex-col gap-60 pb-20">
                    {PROJECTS.map((project, i) => (
                        <ProjectCard key={i} project={project} index={i} total={PROJECTS.length} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function ProjectCard({ project, index, total }: { project: any, index: number, total: number }) {
    const cardRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start start", "end start"]
    });

    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.5]);

    return (
        <motion.div
            ref={cardRef}
            style={{
                scale,
                opacity,
                top: `calc(10vh + ${index * 40}px)`,
                backgroundColor: "#1a1a1aff"
            }}
            className="sticky w-full min-h-[70vh] rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-white/30 shadow-2xl"
        >
            <div className="grid md:grid-cols-2 h-full min-h-[70vh]">
                <div className="p-8 md:p-16 flex flex-col justify-between">
                    <div>
                        <span className="text-white/30 font-mono text-sm mb-6 block uppercase tracking-widest italic font-bold">Project 0{index + 1}</span>
                        <h3 className="text-4xl md:text-6xl font-normal text-white mb-8 uppercase tracking-tighter leading-[0.9]">
                            {project.title}
                        </h3>
                        <p className="text-white/60 text-lg md:text-xl max-w-md leading-relaxed font-normal">
                            {project.description}
                        </p>
                    </div>

                    <div className="flex gap-4 mt-12">
                        <button className="px-8 py-4 bg-white text-black font-bold uppercase text-xs tracking-widest rounded-full hover:bg-gray-200 transition-all active:scale-95">
                            Case Study
                        </button>
                        <button className="px-8 py-4 border border-white/20 text-white font-bold uppercase text-xs tracking-widest rounded-full hover:bg-white/5 transition-all">
                            Live Demo
                        </button>
                    </div>
                </div>

                <div className="relative h-[50vh] md:h-auto bg-neutral-900 group cursor-pointer overflow-hidden">
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
                </div>
            </div>
        </motion.div>
    );
}
