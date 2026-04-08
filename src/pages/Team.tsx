import { useRef, useState, useEffect, type RefObject } from "react";
import { Trophy } from "lucide-react";

function useInView(ref: RefObject<HTMLElement | null>, threshold = 0.15) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, threshold]);

  return inView;
}

const players = [
  {
    tag: "Zabziro",
    realName: "Mykhailo Hrybko",
    role: "In-Game Leader",
    trophies: "102,250",
    mainBrawler: "Mico",
    bio: "The tag founder and team captain. He started his esports career in 2024 and led NewEra through the early monthly qualifiers.",
    img: "/images/team/player-image3.png.png",
    color: "rgba(0, 255, 135, 1)",
    position: "center top"
  },
  {
    tag: "sEt",
    realName: "Stanislav Dolbnya",
    role: "Player",
    trophies: "65,900",
    mainBrawler: "Shade",
    bio: "A flexible player who adapts to any draft and gives the team the freedom to switch styles mid-series.",
    img: "/images/team/player-image4.png",
    color: "rgba(168, 85, 247, 1)",
    position: "center top"
  },
  {
    tag: "Uzb3K1rOv",
    realName: "Alexandre Taychinov",
    role: "Player",
    trophies: "72,300",
    mainBrawler: "Colt",
    bio: "Known for calm positioning and defensive awareness, he helps the roster stay stable during aggressive sets.",
    img: "/images/team/player-image1.png.png",
    color: "rgba(59, 130, 246, 1)",
    position: "center top"
  }
];

export default function Team() {
  const playersRef = useRef<HTMLDivElement>(null);
  const playersInView = useInView(playersRef);
  const [activePlayer, setActivePlayer] = useState(0);

  return (
    <div className="overflow-x-hidden bg-black text-white">
      <section className="relative overflow-hidden py-28 md:py-36">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1600&h=800&fit=crop"
            alt="Team hero"
            className="h-full w-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black" />
        </div>
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(#00ff87 1px, transparent 1px), linear-gradient(90deg, #00ff87 1px, transparent 1px)",
            backgroundSize: "60px 60px"
          }}
        />
        <div className="relative mx-auto max-w-7xl px-6 text-center">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-[#00ff87]">NewEra Esports</p>
          <h1 className="mb-6 text-5xl font-black tracking-tight md:text-7xl">
            The <span className="text-[#00ff87]">Roster</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-400">
            Three elite Brawl Stars players. One shared mission. Meet the athletes who carry the NewEra tag into battle.
          </p>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-[#00ff87]">Player Spotlight</p>
            <h2 className="text-3xl font-black md:text-4xl">Select a Player</h2>
          </div>

          <div className="mb-12 flex flex-wrap justify-center gap-3">
            {players.map((player, index) => (
              <button
                key={player.tag}
                onClick={() => setActivePlayer(index)}
                className={`rounded-full px-6 py-3 text-sm font-bold transition-all duration-300 ${
                  activePlayer === index
                    ? "scale-105 bg-[#00ff87] text-black"
                    : "border border-white/10 bg-white/5 text-gray-400 hover:border-white/30 hover:text-white"
                }`}
              >
                {player.tag}
              </button>
            ))}
          </div>

          {players[activePlayer] && (
            <div className="grid items-center gap-8 overflow-hidden rounded-3xl border border-white/10 bg-white/3 md:grid-cols-2">
              <div className="relative h-80 min-h-[320px] md:h-full">
                <img
                  src={players[activePlayer].img}
                  alt={players[activePlayer].tag}
                  className="h-full w-full object-cover"
                  style={{ objectPosition: players[activePlayer].position }}
                />
                <div className="absolute inset-0 hidden bg-gradient-to-r from-transparent to-black/80 md:block" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent md:hidden" />
              </div>
              <div className="p-8 md:p-10">
                <div
                  className="mb-4 inline-block rounded-full px-3 py-1 text-xs font-bold"
                  style={{
                    background: `${players[activePlayer].color}20`,
                    color: players[activePlayer].color,
                    border: `1px solid ${players[activePlayer].color}40`
                  }}
                >
                  {players[activePlayer].role}
                </div>
                <h2 className="mb-1 text-4xl font-black">{players[activePlayer].tag}</h2>
                <p className="mb-6 text-sm text-gray-500">{players[activePlayer].realName}</p>
                <p className="mb-8 leading-relaxed text-gray-400">{players[activePlayer].bio}</p>

                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400">
                  <Trophy size={14} className="text-[#00ff87]" />
                  <span>{players[activePlayer].trophies} Trophies</span>
                  <span className="text-gray-700">•</span>
                  <span>{players[activePlayer].mainBrawler}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="border-y border-white/5 bg-[#050505] py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 text-center">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-[#00ff87]">Full Roster</p>
            <h2 className="text-4xl font-black tracking-tight md:text-5xl">All Players</h2>
          </div>
          <div ref={playersRef} className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {players.map((player, index) => (
              <div
                key={player.tag}
                className={`group cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-white/3 transition-all duration-500 hover:-translate-y-2 hover:border-[#00ff87]/40 ${
                  playersInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
                onClick={() => setActivePlayer(index)}
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={player.img}
                    alt={player.tag}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    style={{ objectPosition: player.position }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                  <div
                    className="absolute top-4 right-4 rounded-full px-3 py-1 text-xs font-bold"
                    style={{
                      background: `${player.color}20`,
                      color: player.color,
                      border: `1px solid ${player.color}40`
                    }}
                  >
                    {player.role}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="mb-1 text-xl font-black text-white">{player.tag}</h3>
                  <p className="mb-4 text-sm text-gray-500">{player.realName}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Trophy size={13} className="text-[#00ff87]" />
                      <span>{player.trophies}</span>
                    </div>
                    <span className="text-xs text-gray-600">{player.mainBrawler}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
