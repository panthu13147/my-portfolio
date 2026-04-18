import Link from "next/link";
import React from "react";
import Particles from "./components/particles";

const navigation = [
  { name: "Projects", href: "/projects" },
  { name: "Contact", href: "/contact" },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden relative">
      
      <nav className="my-16 animate-fade-in relative z-20">
        <ul className="flex items-center justify-center gap-4">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm duration-500 text-zinc-300 hover:text-white drop-shadow-md"
            >
              {item.name}
            </Link>
          ))}
        </ul>
      </nav>
      
      <div className="hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0 relative z-20" />
      
      <h1 className="py-3.5 px-0.5 relative z-20 text-4xl text-transparent duration-1000 bg-white cursor-default text-edge-outline animate-title font-display sm:text-6xl md:text-9xl whitespace-nowrap bg-clip-text drop-shadow-2xl">
        PANTH SHAH 
      </h1>

      <div className="hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0 relative z-20" />
      
      <div className="my-16 text-center animate-fade-in relative z-20">
        <h2 className="text-sm text-zinc-200 drop-shadow-lg px-4 max-w-2xl">
         Architecting microsecond-level trading engines and autonomous Agentic AI workflows to automate the impossible.
        </h2>
      </div>
    </div>
  );
}