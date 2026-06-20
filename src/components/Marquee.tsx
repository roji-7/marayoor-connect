const items = [
  "எங்கள் தலைவர் விஜய்",
  "VICTORY FOR TAMIL NADU",
  "TVK MARAYOOR",
  "புரட்சி வரும்",
  "PEOPLE FIRST",
  "தமிழக வெற்றிக் கழகம்",
  "UNITY • STRENGTH • VICTORY",
];

export function Marquee() {
  return (
    <div className="relative overflow-hidden border-y-2 border-tvk-gold bg-tvk-red py-3">
      <div className="flex w-max animate-marquee gap-12 whitespace-nowrap">
        {[...items, ...items, ...items].map((t, i) => (
          <span key={i} className="font-display text-xl uppercase tracking-widest text-foreground sm:text-2xl">
            ★ {t}
          </span>
        ))}
      </div>
    </div>
  );
}
