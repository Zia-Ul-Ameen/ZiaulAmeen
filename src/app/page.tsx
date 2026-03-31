import HeroAnimation from "@/components/HeroAnimation";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <HeroAnimation />
      <About />
      <Projects />
      <Contact />
    </main>
  );
}
