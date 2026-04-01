'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const PROJECTS = [
    {
        title: "NewsPortal",
        slug: "news-portal",
        description: "A high-performance news and media platform with social-media style interactions. Featuring real-time article publishing, video management, and advanced content moderation.",
        tech: ["Next.js", "NestJS", "PostgreSQL", "TanStack Query"],
        image: "/projects/project_1.png",
    },
    {
        title: "Godrej Properties",
        slug: "godrej-properties",
        description: "Contributed to a enterprise-grade real estate platform, optimizing property browsing and UI performance. Integrated dynamic content management systems for real-time listings.",
        tech: ["Next.js", "Keystone CMS", "PostgreSQL", "GraphQL"],
        image: "/projects/project_2.png",
        link: "https://www.godrejproperties.com"
    },
    {
        title: "Planet Petly",
        slug: "planet-petly",
        description: "Created a high-conversion e-commerce brand presence, optimizing frontend performance and user experience. Integrated efficient form handling and secure PHP-backed submissions.",
        tech: ["Next.js", "Tailwind CSS", "React Hook Form", "PHP"],
        image: "/projects/project_3_1.png",
        link: "https://planetpetly.com/"
    }
];

export default function Works() {
    return (
        <section id="works" className="bg-[#0a0a0a] pt-16 md:pt-30 px-4 md:px-8 border-y border-white/5">
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

    return (
        <motion.div
            ref={cardRef}
            style={{
                scale,
                top: `calc(10vh + ${index * 40}px)`,
                backgroundColor: "#1a1a1aff"
            }}
            className="sticky w-full min-h-[70vh] rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-white/30 shadow-2xl"
        >
            <div className="grid md:grid-cols-2 h-full min-h-[70vh]">
                <div className="p-8 md:p-16 flex flex-col justify-between">
                    <div>
                        <span className="text-white/30 font-mono text-sm mb-6 block uppercase tracking-widest italic font-bold">Project 0{index + 1}</span>
                        <h3 className="text-4xl md:text-6xl font-normal text-white mb-6 uppercase tracking-tighter leading-[0.9]">
                            {project.title}
                        </h3>
                        <div className="flex flex-wrap gap-2 mb-8">
                            {project.tech?.map((t: string) => (
                                <span key={t} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] text-white/50 uppercase tracking-widest">{t}</span>
                            ))}
                        </div>
                        <p className="text-white/60 text-lg md:text-xl max-w-sm leading-relaxed font-normal">
                            {project.description}
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-4 mt-12">
                        <Link href={`/projects/${project.slug}`} className="px-8 py-4 bg-white text-black font-bold uppercase text-xs tracking-widest rounded-full hover:bg-[#F2C94C] hover:text-black hover:-translate-y-1 transition-all duration-300 active:scale-95 text-center shadow-lg hover:shadow-[#F2C94C]/20">
                            Case Study
                        </Link>
                        {project.link ? (
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-8 py-4 border border-white/20 text-white font-bold uppercase text-xs tracking-widest rounded-full hover:bg-white hover:text-black hover:-translate-y-1 transition-all duration-300 active:scale-95 text-center"
                            >
                                Live Site
                            </a>
                        ) : (
                            <div className="px-8 py-4 border border-white/5 text-white/20 font-bold uppercase text-[10px] tracking-widest rounded-full cursor-default italic">
                                In Testing
                            </div>
                        )}
                    </div>
                </div>

                <div className="relative h-[50vh] md:h-auto bg-neutral-900 group cursor-pointer overflow-hidden border-l border-white/10">
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover object-left transition-transform duration-1000 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
                </div>
            </div>
        </motion.div>
    );
}
