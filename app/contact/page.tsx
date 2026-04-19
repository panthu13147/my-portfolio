"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // 'idle', 'loading', 'success', 'error'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      // 🚀 THE BRIDGE: Sending data to Python!
      const res = await fetch("http://localhost:8000/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" }); // Form clear kar do
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white relative">
      <Link href="/" className="absolute top-8 left-8 text-zinc-500 hover:text-white duration-200">
        ← Back to Base
      </Link>

      <div className="w-full max-w-md p-8 border border-zinc-800 bg-zinc-900/50 backdrop-blur-md rounded-xl shadow-2xl relative z-10">
        <h2 className="text-3xl font-bold mb-6 text-zinc-100">Secure Comms Channel</h2>
        
        {status === "success" ? (
          <div className="text-center py-10 text-green-400 border border-green-500/30 bg-green-500/10 rounded-lg animate-fade-in">
            <p>Transmission Successful.</p>
            <p className="text-sm mt-2 text-zinc-400">Panth's Engine has received your data.</p>
            <button onClick={() => setStatus("idle")} className="mt-6 text-xs text-zinc-500 hover:text-white">Send another</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 animate-fade-in">
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1">IDENTIFICATION</label>
              <input 
                type="text" 
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-black border border-zinc-700 rounded-md p-3 text-sm focus:outline-none focus:border-zinc-400 transition-colors"
                placeholder="John Doe"
              />
            </div>
            
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1">RETURN ADDRESS</label>
              <input 
                type="email" 
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-black border border-zinc-700 rounded-md p-3 text-sm focus:outline-none focus:border-zinc-400 transition-colors"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1">TRANSMISSION DATA</label>
              <textarea 
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full bg-black border border-zinc-700 rounded-md p-3 text-sm focus:outline-none focus:border-zinc-400 transition-colors resize-none"
                placeholder="Enter your message here..."
              ></textarea>
            </div>

            <button 
              type="submit" 
              disabled={status === "loading"}
              className="mt-4 bg-white text-black font-semibold py-3 rounded-md hover:bg-zinc-200 transition-colors disabled:opacity-50"
            >
              {status === "loading" ? "UPLOADING..." : "EXECUTE TRANSMISSION"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}