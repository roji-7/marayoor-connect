import { Navbar } from "@/components/Navbar";
import { HeroVideo } from "@/components/HeroVideo";
import { Marquee } from "@/components/Marquee";
import { About } from "@/components/About";
import { Leader } from "@/components/Leader";
import { Vision } from "@/components/Vision";
import { MemberID } from "@/components/MemberID";
import { Contact, Footer } from "@/components/Contact";

export default function App() {
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
