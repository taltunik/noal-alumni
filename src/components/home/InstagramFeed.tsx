'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import ScrollReveal, { SectionBar } from '@/components/ui/ScrollReveal';

const INSTAGRAM_URL = 'https://www.instagram.com/noal.arab/';

// All Instagram images from noal.arab account
const ALL_IMAGES = [
  { id: 'ig-1', src: '/images/instagram/ig-1.jpg', alt: 'NOAL circle discussion' },
  { id: 'ig-2', src: '/images/instagram/ig-2.jpg', alt: 'NOAL outdoor gathering' },
  { id: 'ig-3', src: '/images/instagram/ig-3.jpg', alt: 'NOAL leadership circle' },
  { id: 'ig-4', src: '/images/instagram/ig-4.jpg', alt: 'NOAL group photo' },
  { id: 'ig-5', src: '/images/instagram/ig-5.jpg', alt: 'NOAL outdoor celebration' },
  { id: 'ig-6', src: '/images/instagram/ig-6.jpg', alt: 'NOAL Ramadan greeting' },
  { id: 'ig-7', src: '/images/instagram/ig-7.jpg', alt: 'NOAL holiday greeting' },
  { id: 'ig-8', src: '/images/instagram/ig-8.jpg', alt: 'NOAL youth selfie' },
];

const VISIBLE_COUNT = 4;
const ROTATE_INTERVAL = 3000; // 3 seconds per rotation

export default function InstagramFeed() {
  const t = useTranslations('home');
  // Track which image index each slot is currently showing
  const [slotImages, setSlotImages] = useState([0, 1, 2, 3]);
  const [fadingSlot, setFadingSlot] = useState<number | null>(null);
  const [nextImage, setNextImage] = useState<{ slot: number; imageIdx: number } | null>(null);

  // Track which image index to use next (cycles through all images)
  const [nextImagePool, setNextImagePool] = useState(VISIBLE_COUNT);

  const rotateSlot = useCallback(() => {
    // Pick a random slot to rotate
    const slotToRotate = Math.floor(Math.random() * VISIBLE_COUNT);
    const newImageIdx = nextImagePool % ALL_IMAGES.length;

    // Start fade out
    setFadingSlot(slotToRotate);
    setNextImage({ slot: slotToRotate, imageIdx: newImageIdx });

    // After fade out, swap image and fade in
    setTimeout(() => {
      setSlotImages(prev => {
        const updated = [...prev];
        updated[slotToRotate] = newImageIdx;
        return updated;
      });
      setFadingSlot(null);
      setNextImage(null);
    }, 500); // match CSS transition duration

    setNextImagePool(prev => prev + 1);
  }, [nextImagePool]);

  useEffect(() => {
    const interval = setInterval(rotateSlot, ROTATE_INTERVAL);
    return () => clearInterval(interval);
  }, [rotateSlot]);

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4">
        {/* Section heading - NOAL style */}
        <ScrollReveal direction="up">
          <div className="mb-10 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary">
              {t('instagramTitle')}
            </h2>
            <SectionBar className="mt-4" />
          </div>
        </ScrollReveal>

        <ScrollReveal stagger>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {slotImages.map((imageIdx, slotIdx) => (
              <a
                key={`slot-${slotIdx}`}
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="noal-card group relative aspect-square overflow-hidden"
              >
                {/* Current image */}
                <div
                  className="absolute inset-0 transition-opacity duration-500"
                  style={{ opacity: fadingSlot === slotIdx ? 0 : 1 }}
                >
                  <Image
                    src={ALL_IMAGES[imageIdx].src}
                    alt={ALL_IMAGES[imageIdx].alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                  />
                </div>

                {/* Next image (shown during transition) */}
                {nextImage && nextImage.slot === slotIdx && (
                  <div className="absolute inset-0">
                    <Image
                      src={ALL_IMAGES[nextImage.imageIdx].src}
                      alt={ALL_IMAGES[nextImage.imageIdx].alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                    />
                  </div>
                )}

                {/* Hover overlay with Instagram icon */}
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition-all duration-300">
                  <svg
                    className="h-10 w-10 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </div>
              </a>
            ))}
          </div>
        </ScrollReveal>

        {/* Follow button */}
        <div className="mt-8 text-center">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 px-6 py-3 text-sm font-bold text-white shadow-lg transition-transform duration-300 hover:scale-105"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
            @noal.arab
          </a>
        </div>
      </div>
    </section>
  );
}
