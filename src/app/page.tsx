import HeroAnimation from "@/components/HeroAnimation";
import Works from "@/components/Works";
import About from "@/components/About";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <HeroAnimation />
      <About />
      <Works />
      <Contact />
    </main>
  );
}
