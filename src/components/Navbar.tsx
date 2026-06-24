import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const staticLinks = [
  { href: "/#home", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/#leader", label: "Leader" },
  { href: "/#vision", label: "Vision" },
  { href: "/#member", label: "Member ID" },
  { href: "/#contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { data: customPages } = useQuery({
    queryKey: ["public_pages_nav"],
    queryFn: async () => {
      const { data } = await supabase
        .from("pages")
        .select("slug, title, nav_order")
        .eq("published", true)
        .eq("show_in_nav", true)
        .order("nav_order");
      return data ?? [];
    },
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const allLinks = [
    ...staticLinks,
    ...(customPages ?? []).map((p) => ({ href: `/p/${p.slug}`, label: p.title })),
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-tvk-black/90 backdrop-blur-md shadow-card-tvk" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-gold font-display text-xl font-bold text-tvk-black animate-glow-pulse">T</div>
          <div className="min-w-0">
            <div className="font-display text-lg leading-none text-tvk-gold sm:text-xl">TVK MARAYOOR</div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Tamilaga Vettri Kazhagam</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {allLinks.map((l) =>
            l.href.startsWith("/p/") ? (
              <Link key={l.href} to={l.href} className="relative text-sm font-medium uppercase tracking-wide text-foreground/90 transition hover:text-tvk-gold">
                {l.label}
              </Link>
            ) : (
              <a key={l.href} href={l.href} className="relative text-sm font-medium uppercase tracking-wide text-foreground/90 transition hover:text-tvk-gold after:absolute after:left-0 after:bottom-[-4px] after:h-0.5 after:w-0 after:bg-tvk-gold after:transition-all hover:after:w-full">
                {l.label}
              </a>
            )
          )}
        </nav>

        <button onClick={() => setOpen(!open)} className="lg:hidden text-tvk-gold" aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-tvk-black/95 border-t border-border animate-fade-in">
          <nav className="flex flex-col px-6 py-4">
            {allLinks.map((l) =>
              l.href.startsWith("/p/") ? (
                <Link key={l.href} to={l.href} onClick={() => setOpen(false)} className="py-3 text-sm font-medium uppercase tracking-wide text-foreground hover:text-tvk-gold border-b border-border/40 last:border-0">
                  {l.label}
                </Link>
              ) : (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="py-3 text-sm font-medium uppercase tracking-wide text-foreground hover:text-tvk-gold border-b border-border/40 last:border-0">
                  {l.label}
                </a>
              )
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
