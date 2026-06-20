import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import video from "@/assets/tvk-bg.mp4.asset.json";

export function HeroVideo() {
  return (
    <section id="home" className="relative h-screen min-h-[600px] w-full overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src={video.url} type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-gradient-to-b from-tvk-black/40 via-tvk-black/30 to-tvk-black" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mb-4 inline-block rounded-full border border-tvk-gold/50 bg-tvk-black/60 px-4 py-1.5 backdrop-blur-sm"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-tvk-gold">Official Website</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="font-display text-5xl font-bold leading-none text-tvk-gold drop-shadow-[0_4px_30px_rgba(220,40,40,0.8)] sm:text-7xl md:text-8xl lg:text-9xl"
        >
          TVK <span className="text-foreground">MARAYOOR</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-4 max-w-2xl text-base text-foreground/90 sm:text-lg md:text-xl"
        >
          தமிழக வெற்றிக் கழகம் — Marayoor Unit
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-2 max-w-xl text-sm text-muted-foreground sm:text-base"
        >
          Victory for Tamil Nadu. Strength of the People. Voice of Marayoor.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <a href="#member" className="rounded-full bg-tvk-red px-7 py-3 font-display text-base uppercase tracking-wider text-foreground shadow-glow transition hover:scale-105 hover:bg-tvk-red-glow animate-glow-pulse">
            Get Member ID
          </a>
          <a href="#about" className="rounded-full border-2 border-tvk-gold bg-transparent px-7 py-3 font-display text-base uppercase tracking-wider text-tvk-gold transition hover:bg-tvk-gold hover:text-tvk-black">
            Learn More
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 2, duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-tvk-gold"
      >
        <ChevronDown className="h-8 w-8" />
      </motion.div>
    </section>
  );
}
