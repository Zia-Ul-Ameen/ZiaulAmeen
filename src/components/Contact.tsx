'use client';

import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

export default function Contact() {
    const formRef = useRef<HTMLFormElement>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formRef.current) return;

        setIsSubmitting(true);
        setStatus('idle');

        try {
            await emailjs.sendForm(
                process.env.NEXT_PUBLIC_SERVICE_ID!,
                process.env.NEXT_PUBLIC_TEMPLATE_ID!,
                formRef.current,
                process.env.NEXT_PUBLIC_PUBLIC_KEY!
            );
            setStatus('success');
            formRef.current.reset();
        } catch (error) {
            console.error('EmailJS Error:', error);
            setStatus('error');
        } finally {
            setIsSubmitting(false);
            // Reset status after a few seconds
            setTimeout(() => setStatus('idle'), 5000);
        }
    };

    return (
        <section id="contact" className="bg-black py-20 md:py-30 px-6 md:px-12 lg:px-24 text-white">
            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-32">
                    {/* Left Column: CTA & Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="flex flex-col justify-center h-full"
                    >
                        <div>
                            <h2 className="text-5xl md:text-7xl font-extralight text-white tracking-tighter leading-[0.85] mb-6 md:mb-12">
                                Have a <br />
                                <span className="font-medium tracking-tight text-[#F2C94C]">Project?</span>
                            </h2>

                            <div className="space-y-6">
                                <p className="text-white/40 text-lg max-w-sm leading-relaxed">
                                    I'm currently available for freelance projects and full-time opportunities. Let's build something extraordinary together.
                                </p>
                                <a
                                    href="mailto:testitziaul@gmail.com"
                                    className="group relative inline-flex items-center gap-4 text-2xl font-bold transition-all"
                                >
                                    <span className="text-[#F2C94C] border-b-2 border-[#F2C94C]/20 group-hover:border-[#F2C94C] transition-all">
                                        testitziaul@gmail.com
                                    </span>
                                    <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-[#F2C94C] group-hover:border-[#F2C94C] group-hover:text-black transition-all">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column: Premium Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="bg-white/5 border border-white/5 rounded-[40px] p-8 md:p-16 backdrop-blur-xl"
                    >
                        <form ref={formRef} onSubmit={handleSubmit} className="space-y-8 md:space-y-12">
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="group relative">
                                    <label className="block text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] mb-4 group-focus-within:text-[#F2C94C] transition-colors">Your Name</label>
                                    <input
                                        type="text"
                                        name="user_name"
                                        required
                                        className="w-full bg-transparent border-b border-white/10 outline-none pb-4 text-xl font-medium focus:border-[#F2C94C] transition-colors"
                                        placeholder="Enter your name"
                                    />
                                </div>
                                <div className="group relative">
                                    <label className="block text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] mb-4 group-focus-within:text-[#F2C94C] transition-colors">Your Email</label>
                                    <input
                                        type="email"
                                        name="user_email"
                                        required
                                        className="w-full bg-transparent border-b border-white/10 outline-none pb-4 text-xl font-medium focus:border-[#F2C94C] transition-colors"
                                        placeholder="example@gmail.com"
                                    />
                                </div>
                            </div>

                            <div className="group relative">
                                <label className="block text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] mb-4 group-focus-within:text-[#F2C94C] transition-colors">Brief Message</label>
                                <textarea
                                    name="message"
                                    required
                                    rows={4}
                                    className="w-full bg-transparent border-b border-white/10 outline-none pb-4 text-xl font-medium focus:border-[#F2C94C] transition-colors resize-none"
                                    placeholder="Hey, I'd like to talk about..."
                                />
                            </div>

                            <div className="relative">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-full h-16 rounded-[20px] font-black uppercase tracking-widest text-sm transition-all flex items-center justify-center gap-4 ${status === 'success'
                                        ? 'bg-green-500 text-white'
                                        : status === 'error'
                                            ? 'bg-red-500 text-white'
                                            : 'bg-[#F2C94C] text-black hover:shadow-[0_0_30px_rgba(242,201,76,0.3)]'
                                        } disabled:opacity-50`}
                                >
                                    {isSubmitting ? 'Sending...' : status === 'success' ? 'Sent Successfully' : status === 'error' ? 'Try Again' : 'Send Inquiry'}
                                    {!isSubmitting && status === 'idle' && (
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    )}
                                </motion.button>

                                {status === 'success' && (
                                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute -bottom-8 left-0 w-full text-center text-xs text-green-500 font-bold uppercase tracking-widest">
                                        Talk to you soon!
                                    </motion.p>
                                )}
                            </div>
                        </form>
                    </motion.div>
                </div>

                {/* Footer Signature */}
                <div
                    className="mt-40 flex flex-col items-center text-center space-y-12"
                >
                    <motion.div
                        whileHover={{ scale: 1.1, rotate: [-2, 2, -1, 1, 0] }}
                        className="w-20 h-20 grayscale hover:grayscale-0 transition-all cursor-crosshair opacity-30 hover:opacity-100"
                    >
                        <svg width="80" height="80" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22 12H52C56.4183 12 60 15.5817 60 20V42C60 46.4183 56.4183 50 52 50H22C17.5817 50 14 46.4183 14 42V20C14 15.5817 17.5817 12 22 12Z" stroke="white" strokeWidth="3" strokeLinecap="round" />
                            <path d="M12 24H44C48.4183 24 52 27.5817 52 32V46C52 50.4183 48.4183 54 44 54H24L12 62V54H12C7.58172 54 4 50.4183 4 46V32C4 27.5817 7.58172 24 12 24Z" fill="#1a1a1a" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                            <line x1="14" y1="34" x2="38" y2="34" stroke="white" strokeWidth="3" strokeLinecap="round" />
                            <line x1="14" y1="41" x2="38" y2="41" stroke="white" strokeWidth="3" strokeLinecap="round" />
                            <line x1="14" y1="48" x2="28" y2="48" stroke="white" strokeWidth="3" strokeLinecap="round" />
                        </svg>
                    </motion.div>

                    <div className="space-y-2">
                        <p className="text-[10px] font-black uppercase tracking-[1em] text-white/20">Thank you for scrolling</p>
                        <h4 className="text-4xl md:text-6xl font-black text-white/5 uppercase tracking-tighter">Let's Build.</h4>
                    </div>
                </div>
            </div>
        </section>
    );
}
