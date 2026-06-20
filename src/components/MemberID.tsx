import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import html2canvas from "html2canvas";
import { Download, Upload, BadgeCheck } from "lucide-react";
import idBg from "@/assets/idcard-bg.jpg";

type FormData = {
  name: string;
  phone: string;
  dob: string;
  blood: string;
  photo: string | null;
};

const BLOOD = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

function genId() {
  const n = Math.floor(100000 + Math.random() * 900000);
  return `TVK-MYR-${n}`;
}

export function MemberID() {
  const [form, setForm] = useState<FormData>({ name: "", phone: "", dob: "", blood: "", photo: null });
  const [memberId, setMemberId] = useState<string>("");
  const [generated, setGenerated] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!memberId) setMemberId(genId());
  }, [memberId]);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (f.size > 5 * 1024 * 1024) { alert("Image must be under 5MB"); return; }
    const reader = new FileReader();
    reader.onload = () => setForm((p) => ({ ...p, photo: reader.result as string }));
    reader.readAsDataURL(f);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.dob || !form.blood || !form.photo) {
      alert("Please fill all fields and upload your photo");
      return;
    }
    setMemberId(genId());
    setGenerated(true);
    setTimeout(() => {
      document.getElementById("id-preview")?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 200);
  };

  const download = async () => {
    if (!cardRef.current) return;
    const canvas = await html2canvas(cardRef.current, {
      backgroundColor: null,
      scale: 3,
      useCORS: true,
      allowTaint: true,
    });
    const link = document.createElement("a");
    link.download = `${memberId}-tvk-marayoor.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <section id="member" className="relative overflow-hidden bg-gradient-to-b from-tvk-black via-card to-tvk-black py-20 sm:py-28">
      <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(circle at 70% 30%, var(--tvk-red) 0%, transparent 60%)" }} />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mb-3 text-sm uppercase tracking-[0.4em] text-tvk-red">Join the Movement</div>
          <h2 className="font-display text-4xl text-tvk-gold sm:text-5xl md:text-6xl">
            Get Your <span className="text-foreground">Member ID</span>
          </h2>
          <p className="mt-4 text-muted-foreground">Generate your official TVK Marayoor membership card in seconds.</p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-2">
          {/* FORM */}
          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-3xl border border-border bg-card p-6 shadow-card-tvk sm:p-8"
          >
            <h3 className="mb-6 font-display text-2xl text-tvk-gold">Member Details</h3>

            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">Full Name</label>
                <input
                  type="text"
                  required
                  maxLength={50}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-lg border border-input bg-input/40 px-4 py-2.5 text-foreground outline-none transition focus:border-tvk-red focus:ring-2 focus:ring-tvk-red/30"
                  placeholder="Your full name"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">Phone Number</label>
                  <input
                    type="tel"
                    required
                    maxLength={15}
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/[^0-9+]/g, "") })}
                    className="w-full rounded-lg border border-input bg-input/40 px-4 py-2.5 text-foreground outline-none transition focus:border-tvk-red focus:ring-2 focus:ring-tvk-red/30"
                    placeholder="+91 9876543210"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">Date of Birth</label>
                  <input
                    type="date"
                    required
                    value={form.dob}
                    onChange={(e) => setForm({ ...form, dob: e.target.value })}
                    className="w-full rounded-lg border border-input bg-input/40 px-4 py-2.5 text-foreground outline-none transition focus:border-tvk-red focus:ring-2 focus:ring-tvk-red/30"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">Blood Group</label>
                <select
                  required
                  value={form.blood}
                  onChange={(e) => setForm({ ...form, blood: e.target.value })}
                  className="w-full rounded-lg border border-input bg-input/40 px-4 py-2.5 text-foreground outline-none transition focus:border-tvk-red focus:ring-2 focus:ring-tvk-red/30"
                >
                  <option value="">Select blood group</option>
                  {BLOOD.map((b) => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">Upload Your Photo</label>
                <label className="flex cursor-pointer items-center gap-3 rounded-lg border-2 border-dashed border-border bg-input/20 px-4 py-4 transition hover:border-tvk-red">
                  <Upload className="h-5 w-5 text-tvk-gold" />
                  <span className="text-sm text-muted-foreground">
                    {form.photo ? "Photo selected ✓ (tap to change)" : "Tap to upload photo (passport size)"}
                  </span>
                  <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
                </label>
                {form.photo && (
                  <img src={form.photo} alt="preview" className="mt-3 h-24 w-24 rounded-lg object-cover border-2 border-tvk-gold" />
                )}
              </div>
            </div>

            <button
              type="submit"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-tvk-red px-6 py-3.5 font-display text-base uppercase tracking-wider text-foreground shadow-glow transition hover:scale-[1.02] hover:bg-tvk-red-glow animate-glow-pulse"
            >
              <BadgeCheck className="h-5 w-5" />
              Generate Member ID
            </button>
          </motion.form>

          {/* PREVIEW */}
          <motion.div
            id="id-preview"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col items-center"
          >
            <h3 className="mb-6 font-display text-2xl text-tvk-gold">Your ID Card</h3>

            <div
              ref={cardRef}
              className="relative aspect-[1/1.58] w-full max-w-[340px] overflow-hidden rounded-2xl shadow-glow border-4 border-tvk-gold"
              style={{
                backgroundImage: `linear-gradient(135deg, rgba(20,5,5,0.55), rgba(120,20,20,0.6)), url(${idBg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Top header */}
              <div className="bg-tvk-black/85 px-3 py-2 text-center backdrop-blur-sm">
                <div className="font-display text-base leading-tight text-tvk-gold">தமிழக வெற்றிக் கழகம்</div>
                <div className="font-display text-[10px] uppercase tracking-widest text-foreground">Tamilaga Vettri Kazhagam • Marayoor</div>
              </div>

              {/* Photo */}
              <div className="mt-4 flex justify-center">
                <div className="h-24 w-24 overflow-hidden rounded-lg border-2 border-tvk-gold bg-card shadow-lg">
                  {form.photo ? (
                    <img src={form.photo} alt="member" className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">PHOTO</div>
                  )}
                </div>
              </div>

              {/* Details */}
              <div className="mt-3 px-4 text-center">
                <div className="font-display text-base text-tvk-gold drop-shadow-lg leading-tight uppercase">
                  {form.name || "MEMBER NAME"}
                </div>
                <div className="mt-0.5 text-[10px] uppercase tracking-widest text-foreground/90">Active Member</div>
              </div>

              {/* Info grid */}
              <div className="mx-3 mt-3 rounded-lg bg-tvk-black/75 p-2.5 text-[10px] text-foreground backdrop-blur-sm">
                <div className="flex justify-between border-b border-tvk-gold/30 py-1">
                  <span className="text-tvk-gold/80">ID No:</span>
                  <span className="font-mono font-bold">{memberId}</span>
                </div>
                <div className="flex justify-between border-b border-tvk-gold/30 py-1">
                  <span className="text-tvk-gold/80">Phone:</span>
                  <span>{form.phone || "—"}</span>
                </div>
                <div className="flex justify-between border-b border-tvk-gold/30 py-1">
                  <span className="text-tvk-gold/80">DOB:</span>
                  <span>{form.dob || "—"}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-tvk-gold/80">Blood Group:</span>
                  <span className="font-bold text-tvk-red">{form.blood || "—"}</span>
                </div>
              </div>

              {/* Footer */}
              <div className="absolute bottom-0 left-0 right-0 bg-tvk-red px-3 py-1.5 text-center">
                <div className="font-display text-[10px] uppercase tracking-widest text-foreground">
                  ★ Victory for Tamil Nadu ★
                </div>
                <div className="text-[8px] text-foreground/80">tvk-marayoor.official</div>
              </div>
            </div>

            <button
              onClick={download}
              disabled={!generated}
              className="mt-6 flex items-center gap-2 rounded-full bg-gradient-gold px-6 py-3 font-display text-sm uppercase tracking-wider text-tvk-black shadow-card-tvk transition hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Download className="h-4 w-4" />
              Download ID Card
            </button>
            {!generated && (
              <p className="mt-2 text-xs text-muted-foreground">Fill the form and generate to enable download.</p>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
