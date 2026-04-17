import React, { useState, useMemo, useEffect } from "react";
import { Search, Gamepad2, X, Maximize2, Star, Zap, Trophy, Puzzle, Ghost } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import gamesData from "./data/games.json";

const CATEGORIES = ["All", "Arcade", "Action", "Puzzle", "Sports"];

export default function App() {
  const [selectedGame, setSelectedGame] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [favorites, setFavorites] = useState([]);

  // Load favorites from local storage
  useEffect(() => {
    const saved = localStorage.getItem("aura-favorites");
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  const toggleFavorite = (id, e) => {
    e.stopPropagation();
    const newFavorites = favorites.includes(id)
      ? favorites.filter((favId) => favId !== id)
      : [...favorites, id];
    setFavorites(newFavorites);
    localStorage.setItem("aura-favorites", JSON.stringify(newFavorites));
  };

  const filteredGames = useMemo(() => {
    return (gamesData).filter((game) => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === "All" || game.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  const getCategoryIcon = (category) => {
    switch (category) {
      case "Action": return <Zap className="w-4 h-4" />;
      case "Puzzle": return <Puzzle className="w-4 h-4" />;
      case "Sports": return <Trophy className="w-4 h-4" />;
      case "Arcade": return <Ghost className="w-4 h-4" />;
      default: return <Gamepad2 className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-bento-bg text-bento-text font-sans selection:bg-bento-accent/30 lowercase italic tracking-tight">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-5">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-bento-accent/20 blur-[120px] rounded-full" />
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-40 border-b border-bento-border bg-bento-bg/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-8">
          <div className="flex items-center gap-4 shrink-0">
            <div className="w-10 h-10 bg-bento-accent rounded-[12px] flex items-center justify-center shadow-[0_4px_20px_rgba(59,130,246,0.4)]">
              <Gamepad2 className="text-white w-6 h-6" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-xl font-extrabold uppercase tracking-tighter text-bento-accent">
                UNBLOCKED<span className="text-bento-text">ARCADE</span>
              </span>
              <span className="text-[10px] text-bento-muted font-bold tracking-[0.2em] mt-1 ml-0.5 opacity-60">PROXIED TUNNEL</span>
            </div>
          </div>

          <div className="relative flex-1 max-w-md group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-bento-muted group-focus-within:text-bento-accent transition-colors" />
            <input
              type="text"
              placeholder="Search library..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-11 bg-bento-card border border-bento-border rounded-[12px] pl-11 pr-4 focus:outline-none focus:ring-1 focus:ring-bento-accent/50 focus:border-bento-accent transition-all placeholder:text-gray-600 text-sm"
            />
          </div>

          <div className="hidden md:flex items-center gap-3">
             <div className="flex items-center gap-2 px-3 py-1.5 bg-bento-accent/10 rounded-full border border-bento-accent/30 self-center">
                <div className="w-1.5 h-1.5 bg-[#10B981] rounded-full animate-pulse" />
                <span className="text-[10px] font-bold text-[#10B981] tracking-widest uppercase">Safe Tunnel</span>
             </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-10 relative">
        {/* Bento Grid Header */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-10">
          <div className="lg:col-span-3 bg-bento-card border border-bento-border p-8 rounded-[20px] relative overflow-hidden group">
             <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-transparent opacity-50" />
             <div className="relative z-10">
                <span className="inline-block px-3 py-1 bg-bento-accent text-white text-[10px] font-bold uppercase tracking-widest rounded-md mb-4">
                   Featured Game
                </span>
                <h2 className="text-4xl font-extrabold mb-3 tracking-tighter">NEON OVERDRIVE 2077</h2>
                <p className="text-bento-muted max-w-xl text-sm leading-relaxed mb-6 italic">
                   Experience high-octane racing in a cyberpunk landscape. Optimized for low-bandwidth school networks.
                </p>
                <button className="bg-bento-text text-black px-6 py-2.5 rounded-[10px] text-sm font-bold hover:scale-105 transition-transform">
                   Launch Project
                </button>
             </div>
          </div>
          <div className="bg-bento-card border border-bento-border p-6 rounded-[20px] flex flex-col justify-between">
             <h3 className="text-xs font-bold text-bento-muted uppercase tracking-[0.2em] mb-4">Categories</h3>
             <div className="flex flex-col gap-2 overflow-y-auto max-h-[160px] no-scrollbar">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`text-left px-4 py-2 rounded-[10px] text-[13px] font-medium transition-all ${
                      activeCategory === cat
                        ? "bg-bento-accent text-white border-bento-accent shadow-lg"
                        : "bg-transparent border border-bento-border text-bento-text hover:bg-white/5"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
             </div>
          </div>
        </div>

        {/* Game Grid - The "Bento" Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[280px]">
          {filteredGames.map((game, index) => (
            <motion.div
              layout
              key={game.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 0.98 }}
              onClick={() => setSelectedGame(game)}
              className={`group relative bg-bento-card border border-bento-border rounded-[20px] overflow-hidden cursor-pointer hover:border-bento-accent/50 transition-all ${
                index % 5 === 0 ? "lg:col-span-2 lg:row-span-1" : ""
              }`}
            >
              <div className="absolute inset-0 z-0">
                <img
                  src={game.thumbnail}
                  alt={game.title}
                  className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-80 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bento-bg via-bento-bg/20 to-transparent" />
              </div>
              
              <div className="relative z-10 p-6 h-full flex flex-col justify-end">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-bold text-bento-accent bg-bento-accent/10 px-2.5 py-1 rounded-md border border-bento-accent/20 uppercase tracking-widest backdrop-blur-sm">
                    {game.category}
                  </span>
                  <button
                    onClick={(e) => toggleFavorite(game.id, e)}
                    className="p-1.5 rounded-lg bg-black/40 hover:scale-110 transition-transform"
                  >
                    <Star
                      className={`w-3.5 h-3.5 transition-colors ${
                        favorites.includes(game.id) ? "text-yellow-500 fill-yellow-500" : "text-white/50"
                      }`}
                    />
                  </button>
                </div>
                <h3 className="text-xl font-extrabold uppercase tracking-tighter group-hover:text-bento-accent transition-colors">{game.title}</h3>
                <p className="text-[12px] text-bento-muted line-clamp-1 italic mt-1 font-medium italic opacity-0 group-hover:opacity-100 transition-opacity">
                  {game.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredGames.length === 0 && (
          <div className="py-20 text-center bg-bento-card border border-bento-border rounded-[20px]">
             <Gamepad2 className="w-12 h-12 text-gray-800 mx-auto mb-4" />
             <h3 className="text-lg font-bold text-bento-muted uppercase tracking-widest">No matching results</h3>
          </div>
        )}
      </main>

      {/* Stats Section added for Bento Vibe */}
      <section className="max-w-7xl mx-auto px-6 mb-20 grid grid-cols-2 md:grid-cols-4 gap-4">
         {[
           { val: "24ms", label: "Latency" },
           { val: "99%", label: "Uptime" },
           { val: "4.2GB", label: "Cache" },
           { val: "HTTPS", label: "Secure" }
         ].map((stat, i) => (
           <div key={i} className="bg-bento-card border border-bento-border p-5 rounded-[20px] text-center">
              <span className="block text-2xl font-black text-bento-accent tracking-tighter">{stat.val}</span>
              <span className="text-[10px] font-bold text-bento-muted uppercase tracking-[0.2em]">{stat.label}</span>
           </div>
         ))}
      </section>

      {/* Footer */}
      <footer className="border-t border-bento-border py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
           <div className="text-left">
              <span className="text-sm font-bold text-bento-muted opacity-50 uppercase tracking-widest block">Static Deployment v2.4.1</span>
              <span className="text-[10px] text-bento-muted mt-1 block tracking-wider">No Tracking &bull; No Cookies &bull; Open Source</span>
           </div>
           <p className="text-bento-muted text-[11px] font-bold uppercase tracking-[0.3em]">
             &copy; {new Date().getFullYear()} UNBLOCKED ARCADE
           </p>
        </div>
      </footer>

      {/* Game Modal / Player */}
      <AnimatePresence>
        {selectedGame && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col bg-bento-bg"
          >
            {/* Player Toolbar */}
            <div className="h-16 flex items-center justify-between px-6 border-b border-bento-border">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-bento-accent/20 rounded-lg flex items-center justify-center border border-bento-accent/20">
                  <Gamepad2 className="w-5 h-5 text-bento-accent" />
                </div>
                <div>
                  <h2 className="font-extrabold uppercase tracking-tighter text-lg">{selectedGame.title}</h2>
                  <span className="text-[10px] text-bento-accent font-black uppercase tracking-widest flex items-center gap-1.5 leading-none">
                    <span className="w-1 h-1 bg-bento-accent animate-ping rounded-full" />
                    Live Connection
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    const iframe = document.getElementById("game-frame");
                    if (iframe.requestFullscreen) iframe.requestFullscreen();
                  }}
                  className="p-2 rounded-[10px] bg-bento-card hover:bg-white/10 transition-colors border border-bento-border"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setSelectedGame(null)}
                  className="p-2 rounded-[10px] bg-bento-card hover:bg-bento-accent hover:text-white transition-all border border-bento-border group"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Game Content */}
            <div className="flex-1 relative bg-black flex items-center justify-center p-6">
              <div className="w-full h-full max-w-6xl shadow-[0_40px_100px_rgba(0,0,0,0.8)] rounded-[20px] overflow-hidden border border-bento-border bg-bento-card">
                <iframe
                  id="game-frame"
                  src={selectedGame.url}
                  className="w-full h-full border-0"
                  allowFullScreen
                  title={selectedGame.title}
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                />
              </div>
            </div>

            <div className="p-8 bg-black/40 border-t border-bento-border backdrop-blur-xl">
              <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12">
                <div className="flex-1">
                  <h4 className="text-bento-accent font-black text-[10px] uppercase tracking-[0.4em] mb-4">Project Overview</h4>
                  <p className="text-sm text-bento-muted leading-relaxed font-medium italic">
                    {selectedGame.description}
                  </p>
                </div>
                <div className="shrink-0">
                   <h4 className="text-bento-accent font-black text-[10px] uppercase tracking-[0.4em] mb-4">Input Mapping</h4>
                   <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                         <div className="w-20 h-8 bg-bento-card border border-bento-border rounded-[8px] flex items-center justify-center text-[10px] font-bold font-mono tracking-tighter">WASD</div>
                         <span className="text-[10px] text-gray-700 mt-2 uppercase font-bold tracking-widest">Movement</span>
                      </div>
                      <div className="flex flex-col items-center">
                         <div className="w-20 h-8 bg-bento-card border border-bento-border rounded-[8px] flex items-center justify-center text-[10px] font-bold font-mono tracking-tighter">SPACE</div>
                         <span className="text-[10px] text-gray-700 mt-2 uppercase font-bold tracking-widest">Action</span>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
