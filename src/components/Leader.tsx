import { motion } from "framer-motion";
import vijayImg from "@/assets/tvk-vijay-bg.png.asset.json";


export function Leader() {
  return (
    <section id="leader" className="relative overflow-hidden bg-gradient-to-b from-tvk-black via-card to-tvk-black py-20 sm:py-28">
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, var(--tvk-red) 0%, transparent 50%)" }} />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-3 text-sm uppercase tracking-[0.4em] text-tvk-red">Our Leader</div>
          <h2 className="font-display text-4xl text-tvk-gold sm:text-5xl md:text-6xl">
            Thalapathy <span className="text-foreground">Vijay</span>
          </h2>
          <div className="mt-2 font-display text-lg text-muted-foreground">Founder & President — TVK</div>

          <p className="mt-6 text-base leading-relaxed text-foreground/80 sm:text-lg">
            A leader born from the love of the people. Thalapathy Vijay founded Tamilaga Vettri
            Kazhagam with a clear mission — to deliver an honest, transparent, and just government
            for every Tamilian. His vision unites every village, every town, every heart.
          </p>

          <ul className="mt-6 space-y-2 text-sm text-muted-foreground sm:text-base">
            <li className="flex items-start gap-2"><span className="text-tvk-gold">★</span> Champion of social justice and education</li>
            <li className="flex items-start gap-2"><span className="text-tvk-gold">★</span> Voice for farmers and working families</li>
            <li className="flex items-start gap-2"><span className="text-tvk-gold">★</span> Symbol of Tamil pride and unity</li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="relative mx-auto aspect-[3/4] max-w-sm overflow-hidden rounded-3xl border-4 border-tvk-gold shadow-glow animate-float">
            <img src={vijayImg.url} alt="Thalapathy Vijay - TVK Leader" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-tvk-black/90 via-tvk-black/40 to-transparent p-6 text-center">
              <div className="font-display text-3xl text-tvk-gold drop-shadow-lg">VIJAY</div>
              <div className="mt-1 font-display text-lg text-foreground">தலைவர்</div>
              <div className="mx-auto mt-3 inline-block rounded-full border border-tvk-gold/70 bg-tvk-black/60 px-4 py-1 text-xs uppercase tracking-widest text-tvk-gold backdrop-blur-sm">
                Thalapathy
              </div>
            </div>
            <div className="absolute inset-0 animate-shimmer pointer-events-none" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
