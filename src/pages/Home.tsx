import { useEffect, useRef, useState, type RefObject } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Trophy, Zap } from "lucide-react";

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

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref as RefObject<HTMLElement | null>);

  useEffect(() => {
    if (!inView) return;

    let start = 0;
    const duration = 1500;
    const step = target / (duration / 16);
    const timer = window.setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        window.clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => window.clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

const stats = [
  { value: 12, suffix: "+", label: "Tournaments Played" },
  { value: 8, suffix: "", label: "Trophies Won" },
  { value: 3, suffix: "", label: "Active Players" },
  { value: 98, suffix: "%", label: "Win Rate (Season)" }
];

const achievements = [
  {
    place: "1st",
    tournament: "Brawl Stars Championship - Regional",
    date: "March 2025",
    prize: "$2,500",
    color: "#FFD700"
  },
  {
    place: "2nd",
    tournament: "EsportsOne Open Cup",
    date: "January 2025",
    prize: "$1,200",
    color: "#C0C0C0"
  },
  {
    place: "1st",
    tournament: "Community Clash Invitational",
    date: "November 2024",
    prize: "$800",
    color: "#FFD700"
  }
];

const players = [
  {
    tag: "Zabziro",
    role: "In-Game Leader",
    trophies: "102,250",
    img: "/images/team/player-image3.png.png",
    position: "center top"
  },
  {
    tag: "sEt",
    role: "Player",
    trophies: "65,900",
    img: "/images/team/player-image4.png",
    position: "center top"
  },
  {
    tag: "Uzb3K1rOv",
    role: "Player",
    trophies: "72,300",
    img: "/images/team/player-image1.png.png",
    position: "center top"
  }
];

const newsItems = [
  {
    tag: "ROSTER",
    title: "NewEra signs new support player for the 2026 season",
    date: "May 12, 2025",
    img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=500&fit=crop"
  },
  {
    tag: "TOURNAMENT",
    title: "Regional Championship recap - we took gold",
    date: "April 28, 2025",
    img: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=500&fit=crop"
  },
  {
    tag: "ANNOUNCEMENT",
    title: "NewEra partners with GearUp for the season",
    date: "April 5, 2025",
    img: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=800&h=500&fit=crop"
  }
];

export default function Home() {
  const [typedText, setTypedText] = useState("");
  const fullText = "DOMINATE THE BRAWL";
  const statsRef = useRef<HTMLDivElement>(null);
  const achievementsRef = useRef<HTMLDivElement>(null);
  const playersRef = useRef<HTMLDivElement>(null);
  const newsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef);
  const achievementsInView = useInView(achievementsRef);
  const playersInView = useInView(playersRef);
  const newsInView = useInView(newsRef);

  useEffect(() => {
    let index = 0;
    const timer = window.setInterval(() => {
      setTypedText(fullText.slice(0, index + 1));
      index += 1;
      if (index >= fullText.length) window.clearInterval(timer);
    }, 80);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="overflow-x-hidden bg-black text-white">
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1600&h=900&fit=crop"
            alt="Hero background"
            className="h-full w-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black" />
        </div>

        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(#00ff87 1px, transparent 1px), linear-gradient(90deg, #00ff87 1px, transparent 1px)",
            backgroundSize: "60px 60px"
          }}
        />

        <div className="pointer-events-none absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00ff87]/5 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
          <div className="mb-8 inline-flex animate-pulse items-center gap-2 rounded-full border border-[#00ff87]/30 bg-[#00ff87]/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#00ff87]">
            <Zap size={12} />
            Brawl Stars Competitive Team
          </div>

          <h1 className="mb-4 text-5xl font-black leading-none tracking-tighter sm:text-7xl md:text-8xl lg:text-9xl">
            <span className="block text-white">NEW</span>
            <span className="block text-[#00ff87] drop-shadow-[0_0_40px_rgba(0,255,135,0.5)]">ERA</span>
          </h1>

          <div className="mb-8 flex h-12 items-center justify-center">
            <p className="text-xl font-bold tracking-[0.3em] text-gray-300 md:text-2xl">
              {typedText}
              <span className="animate-pulse text-[#00ff87]">|</span>
            </p>
          </div>

          <p className="mx-auto mb-10 max-w-xl text-base leading-relaxed text-gray-400 md:text-lg">
            We are NewEra - a competitive Brawl Stars team built to win. Rising through the ranks, one trophy at a time.
          </p>

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              to="/team"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#00ff87] px-8 py-4 text-sm font-black tracking-wide text-black shadow-lg shadow-[#00ff87]/30 transition-all duration-300 hover:scale-105 hover:bg-white"
            >
              Meet The Team
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-xs tracking-widest text-gray-600">
          <span>SCROLL</span>
          <div className="h-12 w-px animate-pulse bg-gradient-to-b from-[#00ff87]/50 to-transparent" />
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-16 md:grid-cols-2">
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-[#00ff87]">Who We Are</p>
              <h2 className="mb-6 text-4xl font-black leading-tight tracking-tight md:text-5xl">
                Built for the <br />
                <span className="text-[#00ff87]">Competitive</span> Stage
              </h2>
              <p className="mb-6 leading-relaxed text-gray-400">
                NewEra was founded with one goal: to compete at the highest level of Brawl Stars. We recruit only the most dedicated players, train relentlessly, and show up to every tournament ready to win.
              </p>
              <p className="mb-8 leading-relaxed text-gray-400">
                Our roster combines raw mechanical skill with deep strategic understanding of the meta. We do not just play - we study, adapt, and evolve with every patch.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#00ff87] transition-all duration-300 hover:gap-4"
              >
                Learn More About Us <ArrowRight size={16} />
              </Link>
            </div>

            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src="https://supercell.com/images/b524ca49e8549e5d3f5485452da7f26c/cropped.webp"
                  alt="Gaming setup"
                  className="h-80 w-full object-cover md:h-96"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="absolute -bottom-6 -left-6 rounded-2xl bg-[#00ff87] px-6 py-4 text-black shadow-xl shadow-[#00ff87]/20">
                <div className="text-2xl font-black">2026</div>
                <div className="text-xs font-bold tracking-wider">SEASON ACTIVE</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/5 bg-[#050505] py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 text-center">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-[#00ff87]">The Roster</p>
            <h2 className="text-4xl font-black tracking-tight md:text-5xl">Meet Our Players</h2>
          </div>
          <div ref={playersRef} className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {players.map((player, index) => (
              <div
                key={player.tag}
                className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/3 transition-all duration-500 hover:-translate-y-2 hover:border-[#00ff87]/40 ${
                  playersInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={player.img}
                    alt={player.tag}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    style={{ objectPosition: player.position }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-2xl font-black text-white">{player.tag}</h3>
                    <p className="text-sm font-bold text-[#00ff87]">{player.role}</p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Trophy size={13} className="text-[#00ff87]" />
                      <span>{player.trophies} trophies</span>
                    </div>
                      <Link
                        to={`/team?player=${encodeURIComponent(player.tag)}`}
                        className="text-sm font-bold text-[#00ff87] transition-colors hover:text-white"
                      >
                        View profile
                      </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div ref={statsRef} className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`rounded-2xl border border-white/10 bg-white/3 p-8 text-center transition-all duration-500 hover:border-[#00ff87]/30 ${
                  statsInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 120}ms` }}
              >
                <div className="mb-3 text-4xl font-black text-[#00ff87] md:text-5xl">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-sm uppercase tracking-wider text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/5 bg-[#050505] py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 text-center">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-[#00ff87]">Achievements</p>
            <h2 className="text-4xl font-black md:text-5xl">Recent Success</h2>
          </div>
          <div ref={achievementsRef} className="grid gap-6 md:grid-cols-3">
            {achievements.map((achievement, index) => (
              <div
                key={achievement.tournament}
                className={`relative overflow-hidden rounded-2xl border border-white/10 bg-white/3 p-8 transition-all duration-500 hover:-translate-y-2 hover:border-white/20 ${
                  achievementsInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 140}ms` }}
              >
                <div className="absolute top-0 left-0 h-1 w-full" style={{ background: achievement.color }} />
                <div className="mb-4 text-5xl font-black" style={{ color: achievement.color }}>
                  {achievement.place}
                </div>
                <h3 className="mb-3 text-xl font-black">{achievement.tournament}</h3>
                <p className="mb-2 text-sm text-gray-500">{achievement.date}</p>
                <p className="font-bold text-[#00ff87]">{achievement.prize}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-[#00ff87]">Latest News</p>
              <h2 className="text-4xl font-black md:text-5xl">Updates from NewEra</h2>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 font-bold text-[#00ff87] transition-all duration-300 hover:gap-4"
            >
              Work with us <ArrowRight size={16} />
            </Link>
          </div>

          <div ref={newsRef} className="grid gap-6 md:grid-cols-3">
            {newsItems.map((item, index) => (
              <article
                key={item.title}
                className={`group overflow-hidden rounded-2xl border border-white/10 bg-white/3 transition-all duration-500 hover:border-white/20 ${
                  newsInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                  <div className="absolute top-4 left-4 rounded-full bg-[#00ff87] px-3 py-1 text-[10px] font-black tracking-widest text-black">
                    {item.tag}
                  </div>
                </div>
                <div className="p-6">
                  <p className="mb-2 text-xs uppercase tracking-wider text-gray-500">{item.date}</p>
                  <h3 className="mb-4 text-xl font-black leading-tight transition-colors group-hover:text-[#00ff87]">
                    {item.title}
                  </h3>
                  <button className="flex items-center gap-2 text-sm font-bold text-[#00ff87] transition-all duration-300 hover:gap-4">
                    Read More
                    <ArrowRight size={14} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
