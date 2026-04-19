"use client";
import { useEffect, useState } from "react";

export default function HftTicker() {
  const [prices, setPrices] = useState({ BTC: 0, SOL: 0 });
  const [color, setColor] = useState("text-green-400");

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        // TERA RENDER CLOUD URL 🚀
        const res = await fetch("https://hft-engine-2ljd.onrender.com/ticker");
        const data = await res.json();
        
        setPrices(prev => {
          // Agar price upar gaya toh Green, neeche gaya toh Red 🔴🟢
          setColor(data.BTC >= prev.BTC ? "text-green-400" : "text-red-400");
          return data;
        });
      } catch (error) {
        // Silent fail if backend is sleeping
      }
    };

    // Har 1000 millisecond (1 second) mein live price update!
    const interval = setInterval(fetchPrices, 1000); 
    fetchPrices(); // First call instantly
    
    return () => clearInterval(interval);
  }, []);

  if (prices.BTC === 0) return null; // Load hone tak hide rakho

  return (
    <div className="fixed bottom-0 w-full bg-black/80 backdrop-blur-md border-t border-zinc-800 text-xs font-mono py-2 px-4 z-50 flex justify-between items-center overflow-hidden">
      <div className="flex gap-6 whitespace-nowrap">
        <span className="text-zinc-500 font-bold tracking-widest">
          PANTH.HFT <span className="text-green-500 animate-pulse">● LIVE</span>
        </span>
        <span>BTC/USD: <span className={color}>${prices.BTC.toFixed(2)}</span></span>
        <span>SOL/USD: <span className={color}>${prices.SOL.toFixed(2)}</span></span>
      </div>
      <div className="text-zinc-600 hidden md:block animate-pulse">LATENCY: &lt;1ms</div>
    </div>
  );
}