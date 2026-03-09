'use client';

import { useEffect, useRef, useState } from 'react';

/* ── Global YouTube IFrame API loader (shared across all players) ── */
let apiReady = false;
let apiLoading = false;
const waitQueue: Array<() => void> = [];

function loadYouTubeAPI(): Promise<void> {
  return new Promise((resolve) => {
    if (apiReady) { resolve(); return; }

    waitQueue.push(resolve);

    if (!apiLoading) {
      apiLoading = true;
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.head.appendChild(tag);

      (window as unknown as Record<string, unknown>).onYouTubeIframeAPIReady = () => {
        apiReady = true;
        waitQueue.forEach((cb) => cb());
        waitQueue.length = 0;
      };
    }
  });
}

/* ── Props ── */
interface YouTubePlayerProps {
  videoId: string;
  title: string;
  /** Tailwind aspect-ratio class, e.g. "aspect-video" or "aspect-[9/16]" */
  aspectClass?: string;
  /** Show native YouTube controls */
  showControls?: boolean;
  /** Extra className on the outer wrapper */
  className?: string;
}

/* ── Component ── */
export default function YouTubePlayer({
  videoId,
  title,
  aspectClass = 'aspect-video',
  showControls = true,
  className = '',
}: YouTubePlayerProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const playerRef = useRef<any>(null);

  const [isMuted, setIsMuted] = useState(true);
  const [showPlay, setShowPlay] = useState(false);
  const [ready, setReady] = useState(false);

  /* ── Initialise player ── */
  useEffect(() => {
    let alive = true;
    const id = `yt-${videoId}-${Math.random().toString(36).slice(2, 8)}`;

    const init = async () => {
      await loadYouTubeAPI();
      if (!alive || !hostRef.current) return;

      hostRef.current.id = id;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const YT = (window as any).YT;

      playerRef.current = new YT.Player(id, {
        videoId,
        width: '100%',
        height: '100%',
        playerVars: {
          autoplay: 1,
          mute: 1,
          loop: 1,
          playlist: videoId,
          playsinline: 1,
          controls: showControls ? 1 : 0,
          showinfo: 0,
          rel: 0,
          modestbranding: 1,
        },
        events: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onReady(e: any) {
            if (!alive) return;
            setReady(true);
            e.target.mute();
            e.target.playVideo();

            // After 2 s check if autoplay actually started (fails on many mobiles)
            setTimeout(() => {
              if (!alive) return;
              try {
                const state = e.target.getPlayerState();
                // 1 = playing, 3 = buffering
                if (state !== 1 && state !== 3) setShowPlay(true);
              } catch {
                setShowPlay(true);
              }
            }, 2000);
          },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onStateChange(e: any) {
            if (!alive) return;
            if (e.data === 1) setShowPlay(false); // playing → hide overlay
          },
        },
      });
    };

    init();

    return () => {
      alive = false;
      playerRef.current?.destroy?.();
      playerRef.current = null;
    };
  }, [videoId, showControls]);

  /* ── Intersection Observer: play when visible, pause when off-screen ── */
  useEffect(() => {
    if (!wrapperRef.current || !ready) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        try {
          if (entry.isIntersecting) {
            playerRef.current?.playVideo?.();
          } else {
            playerRef.current?.pauseVideo?.();
          }
        } catch { /* ignore */ }
      },
      { threshold: 0.25 },
    );

    observer.observe(wrapperRef.current);
    return () => observer.disconnect();
  }, [ready]);

  /* ── Handlers ── */
  const handlePlay = () => {
    try {
      playerRef.current?.mute?.();
      playerRef.current?.playVideo?.();
      setShowPlay(false);
      setIsMuted(true);
    } catch { /* ignore */ }
  };

  const toggleMute = () => {
    try {
      if (isMuted) playerRef.current?.unMute?.();
      else playerRef.current?.mute?.();
      setIsMuted(!isMuted);
    } catch { /* ignore */ }
  };

  /* ── Render ── */
  return (
    <div ref={wrapperRef} className={`relative overflow-hidden ${className}`}>
      {/* Aspect-ratio container */}
      <div className={`${aspectClass} [&_iframe]:!w-full [&_iframe]:!h-full`}>
        <div ref={hostRef} className="w-full h-full" />
      </div>

      {/* ▶ Play overlay — shown when mobile autoplay fails */}
      {showPlay && (
        <button
          onClick={handlePlay}
          className="absolute inset-0 z-10 flex items-center justify-center bg-black/40 transition-opacity duration-300"
          aria-label={title}
        >
          <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-red-600/90 shadow-xl transition-transform duration-200 hover:scale-110 hover:bg-red-600">
            <svg
              className="h-8 w-8 sm:h-10 sm:w-10 text-white ms-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </button>
      )}

      {/* 🔇/🔊 Mute toggle */}
      <button
        onClick={toggleMute}
        className="absolute bottom-3 end-3 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-all duration-200 hover:bg-black/70 hover:scale-110"
        aria-label={isMuted ? 'Unmute' : 'Mute'}
      >
        {isMuted ? (
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
          </svg>
        ) : (
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          </svg>
        )}
      </button>
    </div>
  );
}
