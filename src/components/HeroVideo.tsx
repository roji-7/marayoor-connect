import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import video from "@/assets/tvk-bg.mp4.asset.json";

export function HeroVideo() {
  return (
    <section
      id="home"
      className="relative w-full overflow-hidden bg-tvk-black"
      style={{ height: "100svh", minHeight: "560px" }}
    >
      {/* Background video — covers on desktop, contains on small phones so full frame is visible */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster=""
        className="absolute inset-0 h-full w-full object-cover object-center sm:object-cover"
      >
        <source src={video.url} type="video/mp4" />
      </video>

      {/* Mobile-friendly contained video layer (shows full frame on phones) */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-contain sm:hidden"
        style={{ background: "var(--tvk-black)" }}
      >
        <source src={video.url} type="video/mp4" />
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
            Official Website
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="font-display text-4xl font-bold leading-none text-tvk-gold drop-shadow-[0_4px_30px_rgba(220,40,40,0.8)] xs:text-5xl sm:text-7xl md:text-8xl lg:text-9xl"
        >
          TVK <span className="text-foreground">MARAYOOR</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-3 max-w-2xl px-2 text-sm text-foreground/90 sm:mt-4 sm:text-lg md:text-xl"
        >
          தமிழக வெற்றிக் கழகம் — Marayoor Unit
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-1.5 max-w-xl px-3 text-xs text-muted-foreground sm:mt-2 sm:text-base"
        >
          Victory for Tamil Nadu. Strength of the People. Voice of Marayoor.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:mt-8"
        >
          <a
            href="#member"
            className="rounded-full bg-tvk-red px-6 py-2.5 font-display text-sm uppercase tracking-wider text-foreground shadow-glow transition hover:scale-105 hover:bg-tvk-red-glow animate-glow-pulse sm:px-7 sm:py-3 sm:text-base"
          >
            Get Member ID
          </a>
          <a
            href="#about"
            className="rounded-full border-2 border-tvk-gold bg-transparent px-6 py-2.5 font-display text-sm uppercase tracking-wider text-tvk-gold transition hover:bg-tvk-gold hover:text-tvk-black sm:px-7 sm:py-3 sm:text-base"
          >
            Learn More
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
