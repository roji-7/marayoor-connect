import { motion } from "framer-motion";
import { GraduationCap, Wheat, Scale, Hospital, Briefcase, Sparkles } from "lucide-react";
import { useSection } from "@/hooks/useSiteContent";

const VISION_DEFAULTS = {
  eyebrow: "Our Vision",
  title_main: "A New",
  title_accent: "Tamil Nadu",
  body: "Six pillars that guide our work in Marayoor and beyond.",
};

const visions = [
  { icon: GraduationCap, title: "Quality Education", text: "Free, modern education for every child of Marayoor." },
  { icon: Wheat, title: "Farmer Welfare", text: "Fair prices, water security and dignity for our farmers." },
  { icon: Scale, title: "Social Justice", text: "Equality for all communities — no caste, no division." },
  { icon: Hospital, title: "Health for All", text: "Accessible, affordable healthcare at every doorstep." },
  { icon: Briefcase, title: "Youth Employment", text: "Skills, startups and jobs for the next generation." },
  { icon: Sparkles, title: "Clean Governance", text: "Transparent, corruption-free public service." },
];

export function Vision() {
  const c = useSection("vision", VISION_DEFAULTS);
  return (
    <section id="vision" className="relative bg-tvk-black py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mb-3 text-sm uppercase tracking-[0.4em] text-tvk-red">{c.eyebrow}</div>
          <h2 className="font-display text-4xl text-tvk-gold sm:text-5xl md:text-6xl">
            {c.title_main} <span className="text-foreground">{c.title_accent}</span>
          </h2>
          <p className="mt-4 text-muted-foreground">{c.body}</p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visions.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              whileHover={{ scale: 1.03 }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition hover:border-tvk-red hover:shadow-glow"
            >
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-tvk-red/10 blur-2xl transition group-hover:bg-tvk-red/30" />
              <div className="relative mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-gold text-tvk-black">
                <v.icon className="h-6 w-6" />
              </div>
              <h3 className="relative font-display text-2xl text-foreground">{v.title}</h3>
              <p className="relative mt-2 text-sm text-muted-foreground">{v.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
