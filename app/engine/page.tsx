"use client"; // Yeh zaroori hai kyunki hum browser mein fetch call kar rahe hain
import React, { useState } from "react";
import Link from "next/link";

export default function EngineRoom() {
  const [serverData, setServerData] = useState<string>("Awaiting connection...");

  const connectToFastAPI = async () => {
    setServerData("Pinging HFT Engine...");
    try {
      // 🚀 THE BRIDGE: Making the call to Port 8000
      const response = await fetch("http://localhost:8000/");
      const data = await response.json();
      
      // Formatting JSON to look like a hacker terminal
      setServerData(JSON.stringify(data, null, 2));
    } catch (error) {
      setServerData("CRITICAL ERROR: Backend is offline.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-black text-white font-mono p-4">
      <div className="absolute top-4 left-4">
        <Link href="/" className="text-zinc-500 hover:text-white">← Back to Base</Link>
      </div>

      <h1 className="text-3xl font-bold mb-8 text-zinc-200">Terminal: Engine Room</h1>
      
      <button 
        onClick={connectToFastAPI}
        className="px-6 py-2 mb-8 bg-zinc-800 hover:bg-zinc-700 border border-zinc-600 rounded transition-all"
      >
        Execute Ping()
      </button>

      <div className="w-full max-w-2xl bg-zinc-900 border border-zinc-800 p-6 rounded-lg min-h-[200px]">
        <pre className="text-sm text-green-400 whitespace-pre-wrap">
          {serverData}
        </pre>
      </div>
    </div>
  );
}