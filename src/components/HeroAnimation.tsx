'use client';

import { useRef, useEffect, useState, useMemo } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

const FRAME_COUNT = 40;
const FRAMES = Array.from({ length: FRAME_COUNT }, (_, i) => `/hero-frames/frame_${i.toString().padStart(2, '0')}_delay-0.1s.webp`);

// Global cache to persist images across navigations/re-mounts
let globalImageCache: HTMLImageElement[] = [];
let globalIsLoaded = false;

export default function HeroAnimation() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>(globalImageCache);
    const [isLoaded, setIsLoaded] = useState(globalIsLoaded);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);
    const scrollPercentage = useTransform(scrollYProgress, [0, 1], [0, 100]);

    // Preload images
    useEffect(() => {
        if (globalIsLoaded && globalImageCache.length > 0) {
            setImages(globalImageCache);
            setIsLoaded(true);
            return;
        }

        const loadedImages: HTMLImageElement[] = [];
        let loadedCount = 0;

        // Load first image immediately
        const firstImg = new Image();
        firstImg.src = FRAMES[0];
        firstImg.onload = () => {
            loadedImages[0] = firstImg;
            globalImageCache[0] = firstImg;
            setImages([...loadedImages]);

            // Force initial render immediately
            requestAnimationFrame(() => renderCurrentFrame());
        };

        // Load remaining images
        FRAMES.forEach((src, index) => {
            if (index === 0) return;
            const img = new Image();
            img.src = src;
            img.onload = () => {
                loadedCount++;
                loadedImages[index] = img;
                globalImageCache[index] = img;
                if (loadedCount === FRAME_COUNT - 1) {
                    globalIsLoaded = true;
                    setIsLoaded(true);
                    setImages([...loadedImages]);
                }
            };
        });
    }, []);

    const renderCurrentFrame = () => {
        if (!canvasRef.current) return;
        const ctx = canvasRef.current.getContext('2d');
        const currentIndex = Math.round(frameIndex.get());
        const img = globalImageCache[currentIndex] || globalImageCache[0];

        if (ctx && img) {
            const canvas = canvasRef.current;
            const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
            const x = (canvas.width / 2) - (img.width / 2) * scale;
            const y = (canvas.height / 2) - (img.height / 2) * scale;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, x, y, img.width * scale, img.height * scale);

            // Hide watermark
            const rectWidth = 200;
            const rectHeight = 60;
            ctx.fillStyle = 'black';
            ctx.fillRect(canvas.width - rectWidth, canvas.height - rectHeight, rectWidth, rectHeight);
        }
    };

    // Update canvas on frame change
    useEffect(() => {
        if (!canvasRef.current) return;

        const render = (index: number) => {
            const ctx = canvasRef.current?.getContext('2d');
            const img = images[index];
            if (ctx && img) {
                const canvas = canvasRef.current!;

                // Clear canvas
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                // Draw image covering the canvas (center crop)
                const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
                const x = (canvas.width / 2) - (img.width / 2) * scale;
                const y = (canvas.height / 2) - (img.height / 2) * scale;

                ctx.drawImage(img, x, y, img.width * scale, img.height * scale);

                // Hide watermark (right bottom)
                const rectWidth = 200;
                const rectHeight = 60;
                ctx.fillStyle = 'black';
                ctx.fillRect(canvas.width - rectWidth, canvas.height - rectHeight, rectWidth, rectHeight);
            }
        };

        const unsubscribe = frameIndex.on("change", () => {
            renderCurrentFrame();
        });

        // Initial render if images exist
        if (images[0] || globalImageCache[0]) {
            renderCurrentFrame();
        }

        return () => unsubscribe();
    }, [isLoaded, images, frameIndex]);

    // Handle resize
    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                // Use parent's stable CSS height and width instead of window
                // to avoid jumping and respect max-width constraints
                const parent = canvasRef.current.parentElement;
                canvasRef.current.width = parent ? parent.offsetWidth : window.innerWidth;
                canvasRef.current.height = parent ? parent.offsetHeight : window.innerHeight;

                // Re-render current frame on resize
                const ctx = canvasRef.current.getContext('2d');
                const currentIndex = Math.round(frameIndex.get());
                const img = images[currentIndex];
                if (ctx && img) {
                    const canvas = canvasRef.current;
                    const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
                    const x = (canvas.width / 2) - (img.width / 2) * scale;
                    const y = (canvas.height / 2) - (img.height / 2) * scale;
                    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);

                    const rectWidth = 200;
                    const rectHeight = 60;
                    ctx.fillStyle = 'black';
                    ctx.fillRect(canvas.width - rectWidth, canvas.height - rectHeight, rectWidth, rectHeight);
                }
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isLoaded, images, frameIndex]);

    return (
        <div ref={containerRef} className="relative h-[300vh] w-full bg-black">
            <div className="sticky top-0 h-[100dvh] w-full overflow-hidden">
                <div className="max-w-[1600px] mx-auto h-full w-full relative">
                    <canvas
                        ref={canvasRef}
                        className="h-full w-full block outline-none"
                    />
                </div>

                {/* Overlays Container */}
                <div className="absolute inset-0 pointer-events-none flex flex-col justify-between py-8 md:py-16 px-6 md:px-12 lg:px-24">
                    <div className="max-w-[1600px] mx-auto w-full flex-1 flex flex-col justify-between">
                        {/* Top Layer for Navbar Padding */}
                        <div className="h-20" />

                        {/* Middle Layer: Side Details */}
                        <div className="flex-1 flex justify-between items-center w-full">
                            {/* Left Side */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={images[0] ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 1, ease: "easeOut" }}
                                className="hidden md:block"
                            >
                                <h1 className="text-6xl lg:text-8xl font-bold text-white/90 leading-[0.8] tracking-normal uppercase flex flex-col">
                                    <span className="text-white/50 text-2xl lg:text-3xl font-medium tracking-normal mb-2 normal-case">I'm</span>
                                    <span>Ziaul</span>
                                    <span>Ameen</span>
                                </h1>
                            </motion.div>
                            <div className='md:hidden'></div>

                            {/* Right Side */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={images[0] ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 1, ease: "easeOut" }}
                                className="text-right flex flex-col self-end pb-12 pr-4 md:pr-0"
                            >
                                <div className="space-y-1 min-h-[4rem] md:min-h-[5rem]">
                                    <motion.p
                                        className="text-white font-bold text-xl md:text-3xl lg:text-4xl uppercase tracking-normal leading-[0.9] drop-shadow-md"
                                    >
                                        {useTransform(scrollPercentage,
                                            [0, 35, 35, 70, 90, 100],
                                            ["Full Stack", "Full Stack", "UX Architect", "UX Architect", "Problem Solver", "Ready to Build Impact"]
                                        )}
                                    </motion.p>
                                    <motion.p
                                        className="text-white/60 text-xs md:text-sm font-medium tracking-widest uppercase drop-shadow-sm"
                                    >
                                        {useTransform(scrollPercentage,
                                            [0, 35, 90, 100],
                                            ["Crafting Experiences", "Building Systems", "Designing Futures", "Let's Collaborate"]
                                        )}
                                    </motion.p>
                                </div>
                                <div className="w-12 h-0.5 bg-[#F2C94C] ml-auto" />
                            </motion.div>
                        </div>

                        {/* Bottom Layer: Scroll Indicators */}
                        <div className="flex justify-between items-end w-full pb-4 pointer-events-auto">
                            {/* Left Bottom: Scroll Down */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                                viewport={{ once: true }}
                                className="flex flex-col gap-6 items-start"
                            >
                                {/* Mobile: show name */}
                                <div className="md:hidden">
                                    <h1 className="text-4xl font-bold text-white/90 leading-[0.85] tracking-normal uppercase flex flex-col">
                                        <span className="text-white/40 text-[20px] font-medium tracking-normal mb-1 normal-case">I'm</span>
                                        <span>Ziaul</span>
                                        <span>Ameen</span>
                                    </h1>
                                </div>
                                {/* Desktop: show scroll indicator */}
                                <div className="hidden md:flex flex-col items-center gap-3">
                                    <div className="text-xs font-mono uppercase tracking-[0.4em] text-white/40 [writing-mode:vertical-lr] mb-2">
                                        Scroll
                                    </div>
                                    <div className="w-8 h-12 border border-white/20 rounded-full flex justify-center p-1">
                                        <motion.div
                                            animate={{ y: [0, 12, 0] }}
                                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                            className="w-1 h-2 bg-[#F2C94C] rounded-full"
                                        />
                                    </div>
                                </div>
                            </motion.div>

                            {/* Right Bottom: Progress Indicator */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={images[0] ? { opacity: 1 } : {}}
                                className="flex flex-col items-end gap-2"
                            >
                                <div className="flex items-baseline gap-2">
                                    <motion.span
                                        className="text-4xl md:text-6xl font-bold tabular-nums text-white"
                                    >
                                        {useTransform(scrollPercentage, (p) => Math.round(p as number))}
                                    </motion.span>
                                    <span className="text-xl md:text-2xl font-light text-white/30">%</span>
                                </div>
                                <div className="w-32 md:w-48 h-1 bg-white/10 relative overflow-hidden rounded-full">
                                    <motion.div
                                        style={{ scaleX: scrollYProgress, originX: 0 }}
                                        className="absolute inset-0 bg-white"
                                    />
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {!isLoaded && !images[0] && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-white text-xl font-light tracking-widest animate-pulse uppercase">
                        Loading Experience...
                    </div>
                )}
            </div>
        </div>
    );
}
