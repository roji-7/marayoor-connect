import { motion } from "framer-motion";
import { Instagram, MessageCircle, MapPin, Mail } from "lucide-react";
import { useSection } from "@/hooks/useSiteContent";

const CONTACT_DEFAULTS = {
  eyebrow: "Connect",
  title_main: "Join the",
  title_accent: "Family",
  body: "Follow us and join our WhatsApp community for updates.",
  instagram: "https://www.instagram.com/tvk_marayoor?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
  whatsapp: "https://chat.whatsapp.com/IuU6QS5BGxq24sE02gHpeK",
  address: "Marayoor, Idukki, Kerala",
  email: "tvk.marayoor@official.in",
  phone: "",
};

const FOOTER_DEFAULTS = {
  description: "தமிழக வெற்றிக் கழகம் — Marayoor Unit. Official voice of the movement in Marayoor, Idukki.",
  credit_text: "Developed by Zybeo Tech Studio",
  credit_url: "https://zybeo.tech",
  tagline: "★ Victory for Tamil Nadu ★",
};

export function Contact() {
  const c = useSection("contact", CONTACT_DEFAULTS);
  return (
    <section id="contact" className="relative overflow-hidden bg-tvk-black py-20 sm:py-28">
      <div className="absolute inset-0 bg-gradient-to-t from-tvk-red/10 to-transparent" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="mb-3 text-sm uppercase tracking-[0.4em] text-tvk-red">{c.eyebrow}</div>
          <h2 className="font-display text-4xl text-tvk-gold sm:text-5xl md:text-6xl">
            {c.title_main} <span className="text-foreground">{c.title_accent}</span>
          </h2>
          <p className="mt-4 text-muted-foreground">{c.body}</p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <motion.a
            href={INSTAGRAM}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -6 }}
            className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition hover:border-tvk-gold hover:shadow-glow"
          >
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br from-pink-500/30 via-tvk-red/20 to-tvk-gold/20 blur-2xl transition group-hover:scale-150" />
            <div className="relative flex items-center gap-4">
              <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-yellow-500 via-pink-500 to-purple-600">
                <Instagram className="h-7 w-7 text-foreground" />
              </div>
              <div className="min-w-0">
                <div className="font-display text-xl text-foreground">Instagram</div>
                <div className="truncate text-sm text-muted-foreground">@tvk_marayoor</div>
              </div>
            </div>
          </motion.a>

          <motion.a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            whileHover={{ y: -6 }}
            className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition hover:border-tvk-gold hover:shadow-glow"
          >
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-green-500/20 blur-2xl transition group-hover:scale-150" />
            <div className="relative flex items-center gap-4">
              <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-green-600">
                <MessageCircle className="h-7 w-7 text-foreground" />
              </div>
              <div className="min-w-0">
                <div className="font-display text-xl text-foreground">WhatsApp Group</div>
                <div className="truncate text-sm text-muted-foreground">Join our community</div>
              </div>
            </div>
          </motion.a>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl border border-border bg-card p-6"
          >
            <div className="flex items-center gap-4">
              <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-tvk-red">
                <MapPin className="h-7 w-7 text-foreground" />
              </div>
              <div className="min-w-0">
                <div className="font-display text-xl text-foreground">Office</div>
                <div className="text-sm text-muted-foreground">Marayoor, Idukki, Kerala</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="rounded-2xl border border-border bg-card p-6"
          >
            <div className="flex items-center gap-4">
              <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-gold">
                <Mail className="h-7 w-7 text-tvk-black" />
              </div>
              <div className="min-w-0">
                <div className="font-display text-xl text-foreground">Email</div>
                <div className="truncate text-sm text-muted-foreground">tvk.marayoor@official.in</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden border-t border-tvk-gold/30 bg-gradient-to-b from-tvk-black via-[#0a0405] to-black">
      {/* Top accent stripe */}
      <div className="h-[3px] w-full bg-gradient-to-r from-tvk-red via-tvk-gold to-tvk-red" />

      {/* Glow blobs */}
      <div className="pointer-events-none absolute -left-20 top-10 h-56 w-56 rounded-full bg-tvk-red/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-56 w-56 rounded-full bg-tvk-gold/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="font-display text-3xl tracking-wide text-tvk-gold drop-shadow-[0_2px_10px_rgba(220,40,40,0.5)]">
              TVK <span className="text-foreground">MARAYOOR</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              தமிழக வெற்றிக் கழகம் — Marayoor Unit. Official voice of the movement in Marayoor, Idukki.
            </p>
            <div className="mt-4 flex items-center gap-3">
              <a
                href={INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-yellow-500 via-pink-500 to-purple-600 text-white transition hover:scale-110"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="grid h-10 w-10 place-items-center rounded-full bg-green-600 text-white transition hover:scale-110"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <div className="mb-3 font-display text-sm uppercase tracking-[0.3em] text-tvk-red">
              Explore
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#home" className="transition hover:text-tvk-gold">Home</a></li>
              <li><a href="#about" className="transition hover:text-tvk-gold">About TVK</a></li>
              <li><a href="#leader" className="transition hover:text-tvk-gold">Our Leader</a></li>
              <li><a href="#vision" className="transition hover:text-tvk-gold">Vision</a></li>
              <li><a href="#member" className="transition hover:text-tvk-gold">Get Member ID</a></li>
              <li><a href="#contact" className="transition hover:text-tvk-gold">Contact</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div className="mb-3 font-display text-sm uppercase tracking-[0.3em] text-tvk-red">
              Reach Us
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-tvk-gold" />
                <span>Marayoor, Idukki District, Kerala — 685620</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-tvk-gold" />
                <span>tvk.marayoor@official.in</span>
              </li>
              <li className="flex items-start gap-2">
                <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-tvk-gold" />
                <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="transition hover:text-tvk-gold">
                  Join WhatsApp Community
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-tvk-gold/20 pt-6 text-center md:flex-row md:text-left">
          <p className="text-xs text-muted-foreground">
            © {year} Tamilaga Vettri Kazhagam — Marayoor Unit. All rights reserved.
          </p>
          <p className="font-display text-xs uppercase tracking-[0.35em] text-tvk-gold">
            ★ Victory for Tamil Nadu ★
          </p>
          <p className="text-xs text-muted-foreground">
            Developed by{" "}
            <a
              href="https://zybeo.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-tvk-gold transition hover:text-white hover:underline"
            >
              Zybeo Tech Studio
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
