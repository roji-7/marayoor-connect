import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { HeroVideo } from "@/components/HeroVideo";
import { Marquee } from "@/components/Marquee";
import { About } from "@/components/About";
import { Leader } from "@/components/Leader";
import { Vision } from "@/components/Vision";
import { MemberID } from "@/components/MemberID";
import { Contact, Footer } from "@/components/Contact";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TVK Marayoor — Official Website | Tamilaga Vettri Kazhagam" },
      { name: "description", content: "Official website of TVK Marayoor — Tamilaga Vettri Kazhagam. Join the movement, get your official member ID card, and stay connected." },
      { property: "og:title", content: "TVK Marayoor — Official Website" },
      { property: "og:description", content: "Official TVK Marayoor — join the movement and get your member ID." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-tvk-black text-foreground">
      <Navbar />
      <HeroVideo />
      <Marquee />
      <About />
      <Leader />
      <Vision />
      <MemberID />
      <Contact />
      <Footer />
    </div>
  );
}
