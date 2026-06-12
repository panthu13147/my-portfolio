"use client";
import { useEffect, useRef, useState } from "react";

// ─── Why no network call? ────────────────────────────────────────────────────
// The backend /ticker route returns random.uniform() (simulated prices anyway).
// Hitting your Render backend every 1 second per visitor:
//   • Keeps it warm ✅ (good)
//   • But 60 requests/min per visitor × N visitors = unnecessary load
//   • Also causes a flash of "nothing" on first render while awaiting response
//
// Solution: compute the simulated fluctuations locally in the browser.
// The "live" effect is identical, with zero latency and zero backend load.
// ─────────────────────────────────────────────────────────────────────────────

const BASE_PRICES = { BTC: 64230.5, SOL: 145.2 };

function simulateTick(base: number, spread: number): number {
  return parseFloat((base + (Math.random() - 0.5) * spread * 2).toFixed(2));
}

export default function HftTicker() {
  const [prices, setPrices] = useState({ BTC: 0, SOL: 0 });
  const [btcDir, setBtcDir] = useState<"up" | "down">("up");
  const prevBtc = useRef(BASE_PRICES.BTC);

  useEffect(() => {
    const tick = () => {
      const newBtc = simulateTick(BASE_PRICES.BTC, 25);
      const newSol = simulateTick(BASE_PRICES.SOL, 1.5);
      setBtcDir(newBtc >= prevBtc.current ? "up" : "down");
      prevBtc.current = newBtc;
      setPrices({ BTC: newBtc, SOL: newSol });
    };

    tick(); // first tick instantly
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  if (prices.BTC === 0) return null;

  const color = btcDir === "up" ? "text-green-400" : "text-red-400";

  return (
    <div className="fixed bottom-0 w-full bg-black/80 backdrop-blur-md border-t border-zinc-800 text-xs font-mono py-2 px-4 z-50 flex justify-between items-center">
      <div className="flex gap-6 whitespace-nowrap">
        <span className="text-zinc-500 font-bold tracking-widest">
          PANTH.HFT{" "}
          <span className="text-green-500 animate-pulse">● LIVE</span>
        </span>
        <span>
          BTC/USD: <span className={color}>${prices.BTC.toFixed(2)}</span>
        </span>
        <span>
          SOL/USD:{" "}
          <span className={btcDir === "up" ? "text-green-400" : "text-red-400"}>
            ${prices.SOL.toFixed(2)}
          </span>
        </span>
      </div>
      <div className="text-zinc-600 hidden md:block animate-pulse">
        LATENCY: &lt;1ms
      </div>
    </div>
  );
}
