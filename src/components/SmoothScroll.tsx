'use client';

import { ReactNode, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { usePathname } from 'next/navigation';

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (target && target.hash && target.origin === window.location.origin) {
        // Only intercept if we're on the same page
        if (target.pathname === window.location.pathname) {
          e.preventDefault();
          lenis.scrollTo(target.hash);
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // If there is a hash on initial mount, scroll to it
    if (window.location.hash) {
      setTimeout(() => {
        lenis.scrollTo(window.location.hash, { immediate: true });
      }, 500);
    }

    return () => {
      lenis.destroy();
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  useEffect(() => {
    if (!lenisRef.current) return;

    const hash = window.location.hash;

    if (hash && hash !== '') {
      // Hash navigation: wait for DOM to settle then scroll to target
      const checkAndScroll = (attempts = 0) => {
        const target = document.querySelector(hash);
        if (target) {
          setTimeout(() => {
            lenisRef.current?.scrollTo(hash, { offset: -20, immediate: true });
          }, 300);
        } else if (attempts < 10) {
          setTimeout(() => checkAndScroll(attempts + 1), 100);
        }
      };
      const timer = setTimeout(checkAndScroll, 200);
      return () => clearTimeout(timer);
    } else {
      // No hash: reset to top IMMEDIATELY so new page never paints at old scroll position
      lenisRef.current.scrollTo(0, { immediate: true });
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return <>{children}</>;
}
