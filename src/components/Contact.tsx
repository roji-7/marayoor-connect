import { motion } from "framer-motion";
import { Instagram, MessageCircle, MapPin, Mail } from "lucide-react";

const INSTAGRAM = "https://www.instagram.com/tvk_marayoor?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==";
const WHATSAPP = "https://chat.whatsapp.com/IuU6QS5BGxq24sE02gHpeK";

export function Contact() {
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
          <div className="mb-3 text-sm uppercase tracking-[0.4em] text-tvk-red">Connect</div>
          <h2 className="font-display text-4xl text-tvk-gold sm:text-5xl md:text-6xl">
            Join the <span className="text-foreground">Family</span>
          </h2>
          <p className="mt-4 text-muted-foreground">Follow us and join our WhatsApp community for updates.</p>
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
  return (
    <footer className="border-t border-border bg-tvk-black py-8">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6">
        <div className="font-display text-2xl text-tvk-gold">TVK MARAYOOR</div>
        <p className="mt-2 text-xs text-muted-foreground">
          © {new Date().getFullYear()} Tamilaga Vettri Kazhagam — Marayoor Unit. All rights reserved.
        </p>
        <p className="mt-1 text-xs text-tvk-red">★ Victory for Tamil Nadu ★</p>
      </div>
    </footer>
  );
}
