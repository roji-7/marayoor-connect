import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import video from "@/assets/tvk-bg.mp4.asset.json";
import { useSection } from "@/hooks/useSiteContent";

interface ConnInfo {
  saveData?: boolean;
  effectiveType?: "2g" | "3g" | "4g" | "slow-2g";
}

const HERO_DEFAULTS = {
  badge: "Official Website",
  title_main: "TVK",
  title_accent: "MARAYOOR",
  tagline: "தமிழக வெற்றிக் கழகம் — Marayoor Unit",
  subtitle: "Victory for Tamil Nadu. Strength of the People. Voice of Marayoor.",
  cta_primary_label: "Get Member ID",
  cta_primary_href: "#member",
  cta_secondary_label: "Learn More",
  cta_secondary_href: "#about",
  video_url: "",
  poster_url: "",
};

export function HeroVideo() {
  const hero = useSection("hero", HERO_DEFAULTS);
  const [videoMode, setVideoMode] = useState<{
    preload: "auto" | "metadata" | "none";
    loadSource: boolean;
  }>({ preload: "metadata", loadSource: true });

  useEffect(() => {
    const conn = (navigator as Navigator & { connection?: ConnInfo }).connection;
    const saveData = conn?.saveData;
    const effectiveType = conn?.effectiveType;

    if (saveData || effectiveType === "2g" || effectiveType === "slow-2g") {
      setVideoMode({ preload: "none", loadSource: false });
    } else if (effectiveType === "3g") {
      setVideoMode({ preload: "metadata", loadSource: true });
    } else {
      setVideoMode({ preload: "auto", loadSource: true });
    }
  }, []);

  const videoSrc = hero.video_url || video.url;
  const posterSrc = hero.poster_url || "/assets/tvk-bg-poster.jpg";

  return (
    <section
      id="home"
      className="relative w-full overflow-hidden bg-tvk-black"
      style={{ height: "100svh", minHeight: "560px" }}
    >
      {/* Background video — full frame on mobile (contain), cinematic cover on desktop */}
      <video
        autoPlay={videoMode.loadSource}
        muted
        loop
        playsInline
        preload={videoMode.preload}
        poster={posterSrc}
        className="absolute inset-0 h-full w-full object-contain object-center sm:object-cover"
        style={{ background: "var(--tvk-black)" }}
      >
        {videoMode.loadSource && <source src={videoSrc} type="video/mp4" />}
      </video>

      {/* Gradient overlays for legibility */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-tvk-black/50 via-tvk-black/30 to-tvk-black" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-tvk-black to-transparent" />

      <div className="relative z-10 flex h-full flex-col items-center justify-end px-4 pb-24 text-center sm:justify-center sm:pb-0">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mb-4 inline-block rounded-full border border-tvk-gold/50 bg-tvk-black/60 px-4 py-1.5 backdrop-blur-sm"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-tvk-gold sm:text-xs">
            {hero.badge}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="font-display text-4xl font-bold leading-none text-tvk-gold drop-shadow-[0_4px_30px_rgba(220,40,40,0.8)] xs:text-5xl sm:text-7xl md:text-8xl lg:text-9xl"
        >
          {hero.title_main} <span className="text-foreground">{hero.title_accent}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-3 max-w-2xl px-2 text-sm text-foreground/90 sm:mt-4 sm:text-lg md:text-xl"
        >
          {hero.tagline}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-1.5 max-w-xl px-3 text-xs text-muted-foreground sm:mt-2 sm:text-base"
        >
          {hero.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:mt-8"
        >
          <a
            href={hero.cta_primary_href}
            className="rounded-full bg-tvk-red px-6 py-2.5 font-display text-sm uppercase tracking-wider text-foreground shadow-glow transition hover:scale-105 hover:bg-tvk-red-glow animate-glow-pulse sm:px-7 sm:py-3 sm:text-base"
          >
            {hero.cta_primary_label}
          </a>
          <a
            href={hero.cta_secondary_href}
            className="rounded-full border-2 border-tvk-gold bg-transparent px-6 py-2.5 font-display text-sm uppercase tracking-wider text-tvk-gold transition hover:bg-tvk-gold hover:text-tvk-black sm:px-7 sm:py-3 sm:text-base"
          >
            {hero.cta_secondary_label}
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 2, duration: 2, repeat: Infinity }}
        className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 text-tvk-gold sm:bottom-8"
      >
        <ChevronDown className="h-7 w-7 sm:h-8 sm:w-8" />
      </motion.div>
    </section>
  );
}
