'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';
import clsx from 'clsx';

type RevealDirection = 'up' | 'left' | 'right' | 'scale';

interface ScrollRevealProps {
  children: ReactNode;
  direction?: RevealDirection;
  delay?: number;
  className?: string;
  stagger?: boolean;
  threshold?: number;
}

function isElementInViewport(el: HTMLElement): boolean {
  const rect = el.getBoundingClientRect();
  return (
    rect.top < window.innerHeight - 50 &&
    rect.bottom > 0
  );
}

export default function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  className,
  stagger = false,
  threshold = 0.15,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const reveal = () => {
      if (delay > 0) {
        setTimeout(() => setIsRevealed(true), delay);
      } else {
        setIsRevealed(true);
      }
    };

    // Check immediately if already in viewport
    if (isElementInViewport(element)) {
      reveal();
      return;
    }

    // Use IntersectionObserver
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          reveal();
          observer.unobserve(element);
        }
      },
      { threshold, rootMargin: '0px 0px -50px 0px' }
    );

    observer.observe(element);

    // Fallback: also listen to scroll events in case IO doesn't fire
    const handleScroll = () => {
      if (isElementInViewport(element)) {
        reveal();
        window.removeEventListener('scroll', handleScroll);
        observer.unobserve(element);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.unobserve(element);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [delay, threshold]);

  return (
    <div
      ref={ref}
      className={clsx(
        stagger ? 'reveal-stagger' : 'reveal',
        !stagger && `reveal-${direction}`,
        isRevealed && 'revealed',
        className
      )}
    >
      {children}
    </div>
  );
}

// Section divider bar that animates on scroll
export function SectionBar({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Check immediately
    if (isElementInViewport(element)) {
      setIsRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.unobserve(element);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(element);

    // Fallback scroll listener
    const handleScroll = () => {
      if (isElementInViewport(element)) {
        setIsRevealed(true);
        window.removeEventListener('scroll', handleScroll);
        observer.unobserve(element);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.unobserve(element);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={clsx('section-bar mx-auto w-24', isRevealed && 'revealed', className)}
    />
  );
}
