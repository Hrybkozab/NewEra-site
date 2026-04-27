import { useEffect, useRef, useState, type RefObject } from "react";
import { useSearchParams } from "react-router-dom";
import { Trophy } from "lucide-react";

function useInView(ref: RefObject<HTMLElement | null>, threshold = 0.15) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    // Shared reveal helper for the roster grid near the bottom of the page.
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

// Full player data used by both the spotlight card and the roster cards.
const players = [
  {
    tag: "sEt",
    realName: "Stanislav Dolbnya",
    role: "Player",
    country: "Ukraine",
    flag: "\uD83C\uDDFA\uD83C\uDDE6",
    trophies: "68,112",
    favoriteBrawlers: ["Shade", "Bo", "Draco"],
    bio: "A flexible player who adapts to any draft and gives the team the freedom to switch styles mid-series.",
    img: "/images/team/facegrey.png",
    color: "rgba(168, 85, 247, 1)",
    position: "center center"
  },
  {
    tag: "Zabziro",
    realName: "Mykhailo Hrybko",
    role: "In-Game Leader",
    country: "Ukraine",
    flag: "\uD83C\uDDFA\uD83C\uDDE6",
    trophies: "102,382",
    favoriteBrawlers: ["Mico", "Kit", "Otis"],
    bio: "The tag founder and team captain. He started his esports career in 2024 and led NewEra through the early monthly qualifiers.",
    img: "/images/team/facegrey.png",
    color: "rgb(0, 255, 135)",
    position: "center center"
  },
  {
    tag: "Uzb3K1rOv",
    realName: "Alexandre Taychinov",
    role: "Player",
    country: "France",
    flag: "\uD83C\uDDEB\uD83C\uDDF7",
    trophies: "76,392",
    favoriteBrawlers: ["Colt", "Piper", "Mortis"],
    bio: "Known for calm positioning and defensive awareness, he helps the roster stay stable during aggressive sets.",
    img: "/images/team/facegrey.png",
    color: "rgba(59, 130, 246, 1)",
    position: "center center"
  }
];

export default function Team() {
  const playersRef = useRef<HTMLDivElement>(null);
  // This ref is used so selecting a player always returns the user to the spotlight card.
  const spotlightRef = useRef<HTMLDivElement>(null);
  const playersInView = useInView(playersRef);
  const [searchParams, setSearchParams] = useSearchParams();

  const getPlayerIndex = (tag: string | null) => {
    // Query params let Home open Team with a specific player already selected.
    if (!tag) return 0;
    const index = players.findIndex((player) => player.tag.toLowerCase() === tag.toLowerCase());
    return index >= 0 ? index : 0;
  };

  const [activePlayer, setActivePlayer] = useState(() => getPlayerIndex(searchParams.get("player")));

  useEffect(() => {
    setActivePlayer(getPlayerIndex(searchParams.get("player")));
  }, [searchParams]);

  useEffect(() => {
    // When the selected player comes from the URL, jump directly to the spotlight section.
    if (!searchParams.get("player")) return;
    spotlightRef.current?.scrollIntoView({ behavior: "auto", block: "start" });
  }, [activePlayer, searchParams]);

  const selectPlayer = (index: number) => {
    // Keep component state and URL in sync so direct links still work.
    setActivePlayer(index);
    setSearchParams({ player: players[index].tag });
    spotlightRef.current?.scrollIntoView({ behavior: "auto", block: "start" });
  };

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
        <div ref={spotlightRef} className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-[#00ff87]">Player Spotlight</p>
            <h2 className="text-3xl font-black md:text-4xl">Select a Player</h2>
          </div>

          <div className="mb-12 flex flex-wrap justify-center gap-3">
            {players.map((player, index) => (
              <button
                key={player.tag}
                onClick={() => selectPlayer(index)}
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

          {/* Large spotlight card for the currently selected player. */}
          {players[activePlayer] && (
            <div className="relative grid min-h-[520px] items-stretch gap-4 overflow-hidden rounded-3xl border border-white/10 bg-white/3 md:grid-cols-[minmax(260px,340px)_1fr]">
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.12]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
                  backgroundSize: "48px 48px"
                }}
              />
              <div
                key={players[activePlayer].tag}
                className="team-player-title pointer-events-none absolute left-0 top-8 hidden whitespace-nowrap text-[clamp(5rem,15vw,13rem)] font-black uppercase leading-none text-transparent opacity-100 md:block"
                style={{ WebkitTextStroke: "1.5px rgba(255,255,255,0.22)" }}
              >
                {players[activePlayer].tag}
              </div>
              <div className="pointer-events-none absolute left-8 top-7 hidden text-[10px] font-bold uppercase tracking-[0.55em] text-white/70 md:block">
                Brawl Stars
              </div>
              <div className="relative flex h-72 min-h-[280px] items-end justify-start overflow-hidden md:h-[520px]">
                <img
                  src={players[activePlayer].img}
                  alt={players[activePlayer].tag}
                  className="h-[82%] w-auto max-w-none object-contain md:h-[86%]"
                  style={{ objectPosition: players[activePlayer].position }}
                />
              </div>
              <div className="relative z-10 flex h-full flex-col justify-center p-6 md:p-7">
                <div
                  className="mb-4 inline-block rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em]"
                  style={{
                    background: `${players[activePlayer].color}20`,
                    color: "#ffffff",
                    border: `1px solid ${players[activePlayer].color}55`
                  }}
                >
                  {players[activePlayer].role}
                </div>
                <h2 className="mb-2 text-4xl font-black uppercase leading-none tracking-tight text-white md:text-6xl">
                  {players[activePlayer].tag}
                </h2>
                <p className="mb-5 text-xs uppercase tracking-[0.32em] text-white/45 md:text-sm">
                  {players[activePlayer].realName}
                </p>
                <div className="mb-4 inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-gray-300">
                  <span className="text-base">{players[activePlayer].flag}</span>
                  <span className="font-semibold">{players[activePlayer].country}</span>
                </div>
                <div className="mb-4 flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5">
                    <img
                      src="/images/brawl-stars-badge.png"
                      alt="Brawl Stars"
                      className="h-8 w-8 object-contain"
                    />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">Brawl Stars</div>
                    <div className="text-sm text-gray-400">Joined 27 February 2026</div>
                  </div>
                </div>
                <div className="mb-4 rounded-xl border border-white/10 bg-white/5 px-4 py-4">
                  <div className="mb-3 text-sm font-bold text-white">Favorite brawlers:</div>
                  <div className="space-y-2">
                    {players[activePlayer].favoriteBrawlers.map((brawler) => (
                      <div key={brawler} className="flex items-center gap-3 text-sm text-gray-300">
                        <span className="h-3 w-3 rounded-full bg-white" />
                        <span>{brawler}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <p className="mb-6 max-w-xl leading-relaxed text-gray-400">{players[activePlayer].bio}</p>

                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400">
                  <Trophy size={14} className="text-[#00ff87]" />
                  <span>{players[activePlayer].trophies} Trophies</span>
                  <span className="text-gray-700">/</span>
                  <span>{players[activePlayer].favoriteBrawlers.join(", ")}</span>
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
          {/* Lower roster grid is mainly for browsing and re-selecting a player quickly. */}
          <div ref={playersRef} className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {players.map((player, index) => (
              <div
                key={player.tag}
                className={`group cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-white/3 transition-all duration-500 hover:-translate-y-2 hover:border-[#00ff87]/40 ${
                  playersInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
                onClick={() => selectPlayer(index)}
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
                  <div className="mb-4 inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-gray-300">
                    <span className="text-base">{player.flag}</span>
                    <span className="font-semibold">{player.country}</span>
                  </div>
                  <div className="mb-4 flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5">
                      <img
                        src="/images/brawl-stars-badge.png"
                        alt="Brawl Stars"
                        className="h-8 w-8 object-contain"
                      />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">Brawl Stars</div>
                      <div className="text-sm text-gray-400">Joined 27 February 2026</div>
                    </div>
                  </div>
                  <div className="mb-4 rounded-xl border border-white/10 bg-white/5 px-4 py-4">
                    <div className="mb-3 text-sm font-bold text-white">Favorite brawlers:</div>
                    <div className="space-y-2">
                      {player.favoriteBrawlers.map((brawler) => (
                        <div key={brawler} className="flex items-center gap-3 text-sm text-gray-300">
                          <span className="h-3 w-3 rounded-full bg-white" />
                          <span>{brawler}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Trophy size={13} className="text-[#00ff87]" />
                      <span>{player.trophies}</span>
                    </div>
                    <span className="text-xs text-gray-600">{player.favoriteBrawlers.join(", ")}</span>
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
