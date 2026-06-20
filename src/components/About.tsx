import { motion } from "framer-motion";
import { Flame, Users, Heart, Trophy } from "lucide-react";

const stats = [
  { icon: Users, label: "Active Members", value: "10,000+" },
  { icon: Heart, label: "Welfare Programs", value: "150+" },
  { icon: Trophy, label: "Years Strong", value: "Since 2024" },
  { icon: Flame, label: "Marayoor Volunteers", value: "500+" },
];

export function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-tvk-black py-20 sm:py-28">
      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-tvk-red/20 blur-3xl" />
      <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-tvk-gold/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mb-3 text-sm uppercase tracking-[0.4em] text-tvk-red">About Us</div>
          <h2 className="font-display text-4xl text-tvk-gold sm:text-5xl md:text-6xl">
            Voice of <span className="text-foreground">Marayoor</span>
          </h2>
          <p className="mt-6 text-base text-muted-foreground sm:text-lg">
            Tamilaga Vettri Kazhagam (TVK) Marayoor unit stands as the proud regional wing of
            Thalapathy Vijay's people-first political movement. We are committed to social justice,
            quality education, farmer welfare, and a corruption-free Tamil Nadu.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 text-center transition hover:border-tvk-gold hover:shadow-glow"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-tvk-red/0 to-tvk-red/0 transition group-hover:from-tvk-red/10 group-hover:to-transparent" />
              <s.icon className="relative mx-auto mb-3 h-8 w-8 text-tvk-gold sm:h-10 sm:w-10" />
              <div className="relative font-display text-2xl text-foreground sm:text-3xl">{s.value}</div>
              <div className="relative mt-1 text-xs uppercase tracking-wider text-muted-foreground sm:text-sm">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
