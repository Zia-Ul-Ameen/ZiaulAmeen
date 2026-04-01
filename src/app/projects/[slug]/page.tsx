'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';

const PROJECTS_DATA: Record<string, any> = {
    "news-portal": {
        title: "NewsPortal",
        year: "2026",
        role: "Lead Full-Stack Developer",
        description: "A comprehensive media platform designed for high-volume content consumption and social engagement. The project focused on bridging the gap between traditional news reporting and modern social interaction.",
        challenge: "Scaling a real-time reactive system that handles thousands of concurrent users interacting with video and article content, while maintaining strict content moderation and low latency.",
        solution: "Designed and implemented a high-performance scalable backend architecture using NestJS and PostgreSQL. Leveraged TanStack Query for optimized data fetching and state-syncing, ensuring a seamless 'Instagram-like' experience for reactions and comments.",
        tech: ["Next.js", "NestJS", "PostgreSQL", "Zustand", "TanStack Query", "Redis"],
        image: "/projects/project_1.png",
    },
    "godrej-properties": {
        title: "Godrej Properties",
        year: "2025",
        role: "Full-Stack Developer",
        description: "An elite real estate portal for one of India's leading developers. The focus was on creating a highly performant, accessible, and visually stunning property browsing experience.",
        challenge: "Managing thousands of dynamic property listings with complex filtering requirements while ensuring ultra-fast load times and a premium feel across all device types.",
        solution: "Optimization of the Next.js frontend to achieve perfect Lighthouse scores. Integrated Keystone CMS for streamlined property management and collaborator workflows, reducing content update cycles by 60%.",
        tech: ["Next.js", "Keystone CMS", "PostgreSQL", "GraphQL", "Tailwind CSS"],
        image: "/projects/project_2.png",
        link: "https://www.godrejproperties.com"
    },
    "planet-petly": {
        title: "Planet Petly",
        year: "2026",
        role: "Lead Developer",
        description: "PLANET-FRIENDLY DOG WALK ESSENTIALS — BIODEGRADABLE WASTE BAGS AND CONVENIENT DISPENSERS FOR RESPONSIBLE PET OWNERS.",
        challenge: "Architecting a high-conversion, performant e-commerce brand presence from scratch, ensuring a lightweight frontend on a PHP-backed system.",
        solution: "Engineered a rapid Next.js frontend with Tailwind CSS for high performance. Implemented intuitive form validation using React Hook Form, integrating with PHP handlers to secure and streamline user submissions.",
        tech: ["Next.js", "Tailwind CSS", "React Hook Form", "PHP"],
        image: "/projects/project_3_3.png",
        link: "https://planetpetly.com/"
    }
};

export default function CaseStudyPage() {
    const params = useParams();
    const slug = params?.slug as string;
    const project = PROJECTS_DATA[slug];

    useEffect(() => {
        // Handle hash on initial mount (e.g. from a fresh page load with /#works)
        if (window.location.hash) {
            const element = document.querySelector(window.location.hash);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [slug]);

    if (!project) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center text-white">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
                    <Link href="/#works" className="text-[#F2C94C] hover:underline uppercase tracking-widest text-sm">Back to Works</Link>
                </div>
            </div>
        );
    }

    return (
        <main className="bg-black min-h-screen text-white">
            {/* Project Hero */}
            <section className="relative h-[60vh] md:h-[75vh] w-full overflow-hidden border-b border-white/5 bg-neutral-900/50">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
                <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover object-left"
                    priority
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

                <div className="absolute inset-0 flex flex-col px-6 md:px-12 lg:px-24 py-12 md:py-20">
                    <div className="max-w-[1600px] mx-auto w-full flex flex-col h-full">
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="mb-auto"
                            whileHover="hover"
                        >
                            <Link href="/#works" className="inline-flex items-center mt-6 md:mt-0 gap-3 px-4 py-2 bg-black/50 backdrop-blur-2xl border border-white/10 rounded-full text-white/40 hover:text-white transition-all group leading-none">
                                <motion.div
                                    variants={{
                                        hover: { x: -3 }
                                    }}
                                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                    className="flex items-center"
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M19 12H5M5 12L11 6M5 12L11 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </motion.div>
                                <span className="text-[10px] uppercase tracking-[0.2em] font-bold flex items-center leading-none">Back to Works</span>
                            </Link>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <h1 className="text-5xl md:text-8xl lg:text-9xl font-extralight tracking-tighter uppercase leading-none mb-8">
                                {project.title.split(' ')[0]} <br />
                                <span className="font-medium text-[#F2C94C]">{project.title.split(' ').slice(1).join(' ')}</span>
                            </h1>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-white/10">
                                <div>
                                    <p className="text-xs text-white/30 uppercase tracking-[0.3em] mb-2 font-bold">Role</p>
                                    <p className="text-md font-medium">{project.role}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-white/30 uppercase tracking-[0.3em] mb-2 font-bold">Year</p>
                                    <p className="text-md font-medium">{project.year}</p>
                                </div>
                                {project.link ? (
                                    <div>
                                        <p className="text-xs text-white/30 uppercase tracking-[0.3em] mb-2 font-bold">Live Site</p>
                                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-md font-medium text-[#F2C94C] hover:underline underline-offset-4">Visit Link</a>
                                    </div>
                                ) : (
                                    <div>
                                        <p className="text-xs text-white/30 uppercase tracking-[0.3em] mb-2 font-bold">Status</p>
                                        <p className="text-md font-medium text-white/40">In Testing</p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Content Body */}
            <section className="py-20 md:py-40 px-6 md:px-12 lg:px-24">
                <div className="max-w-[1600px] mx-auto">
                    <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-20 lg:gap-40 items-start">
                        {/* Summary & Tech */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="space-y-12 lg:sticky lg:top-40"
                        >
                            <div>
                                <h2 className="text-3xl font-medium mb-6 uppercase tracking-tighter italic font-bold">The Concept</h2>
                                <p className="text-white/60 text-lg leading-relaxed">{project.description}</p>
                            </div>

                            <div>
                                <h2 className="text-[10px] text-white/30 uppercase tracking-[0.3em] mb-6 font-bold italic">Tech Stack</h2>
                                <div className="flex flex-wrap gap-2">
                                    {project.tech.map((t: string) => (
                                        <span key={t} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[11px] text-white/80 uppercase tracking-widest font-medium">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* Details */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="space-y-20 md:space-y-32"
                        >
                            <div>
                                <h3 className="text-white/30 text-sm mb-8 block uppercase tracking-widest italic font-bold">01 — The Challenge</h3>
                                <p className="text-white text-2xl md:text-3xl lg:text-4xl font-extralight leading-tight tracking-tight">
                                    {project.challenge}
                                </p>
                            </div>

                            <div>
                                <h3 className="text-white/30 text-sm mb-8 block uppercase tracking-widest italic font-bold">02 — The Solution</h3>
                                <p className="text-white/60 text-xl md:text-2xl font-normal leading-relaxed max-w-3xl">
                                    {project.solution}
                                </p>
                            </div>

                            {/* Call to action */}
                            <div className="pt-20 border-t border-white/10">
                                <h4 className="text-4xl md:text-6xl font-normal mb-12 uppercase tracking-tighter leading-none italic font-bold">
                                    Looking for <br />
                                    <span className="text-[#F2C94C]">Similar Impact?</span>
                                </h4>
                                <a href="/#contact" className="inline-block px-10 py-5 bg-white text-black font-bold uppercase text-xs tracking-[0.2em] rounded-full hover:bg-[#F2C94C] hover:text-black hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-[#F2C94C]/20 active:scale-95">
                                    Let&apos;s Build Together
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </main>
    );
}
