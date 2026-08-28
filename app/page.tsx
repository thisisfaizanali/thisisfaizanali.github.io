import { Hero } from "@/components/sections/hero";
import { Work } from "@/components/sections/work";
import { Experience } from "@/components/sections/experience";
import { About } from "@/components/sections/about";
import { Stack } from "@/components/sections/stack";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Work />
      <Experience />
      <About />
      <Stack />
      <Contact />
    </>
  );
}
