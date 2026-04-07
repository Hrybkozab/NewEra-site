import { useRef, useState, useEffect, type RefObject } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Target, Zap, Shield, Heart, Users, Trophy } from "lucide-react";

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

const values = [
  {
    icon: <Target size={24} />,
    title: "Win-First Mentality",
    desc: "We compete to win. Every training session, every scrim, every tournament - we approach it with the mindset of champions."
  },
  {
    icon: <Zap size={24} />,
    title: "Constant Evolution",
    desc: "The meta changes. We change with it. Our team studies every patch, adapts strategies, and stays ahead of the competition."
  },
  {
    icon: <Shield size={24} />,
    title: "Team Over Individual",
    desc: "No star players, just a star team. We trust each other, communicate openly, and win together."
  },
  {
    icon: <Heart size={24} />,
    title: "Community First",
    desc: "We represent our community. We stream, we share, we engage - because our fans are part of what makes NewEra real."
  }
];

const timeline = [
  {
    year: "2024",
    title: "Founding of the organization",
    desc: "The tag was created and the first French-Ukrainian roster won several Matcherino tournaments."
  },
  {
    year: "2025",
    title: "The End of Era?",
    desc: "In 2025, the team disbanded, which led to the collapse of the original roster."
  },
  {
    year: "2026",
    title: "New Breath",
    desc: "The team led by Zabziro revived the tag and completed the first qualifiers for Monthly Finals."
  }
];

export default function About() {
  const valuesRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);
  const valuesInView = useInView(valuesRef);
  const timelineInView = useInView(timelineRef);
  const missionInView = useInView(missionRef);

  return (
    <div className="overflow-x-hidden bg-black text-white">
      <section className="relative overflow-hidden py-28 md:py-36">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600&h=800&fit=crop"
            alt="About hero"
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
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-[#00ff87]">Our Story</p>
          <h1 className="mb-6 text-5xl font-black tracking-tight md:text-7xl">
            About <span className="text-[#00ff87]">NewEra</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-400">
            We did not just form a team. We started a movement. Here is the story of how NewEra came to be and where we are going.
          </p>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div
            ref={missionRef}
            className={`grid items-center gap-16 transition-all duration-700 md:grid-cols-2 ${
              missionInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-[#00ff87]">Our Mission</p>
              <h2 className="mb-6 text-4xl font-black leading-tight tracking-tight md:text-5xl">
                Redefining What&apos;s <br />
                <span className="text-[#00ff87]">Possible</span> in Brawl Stars
              </h2>
              <p className="mb-6 leading-relaxed text-gray-400">
                The story begins in the summer of 2024. Zabziro, Aranched and NeReRa wanted to create something unique that would change the playstyle and build their own approach to the game.
              </p>
              <p className="mb-6 leading-relaxed text-gray-400">
                On September 9, 2024, the players created the NewEra tag. With this name, they wanted to inspire other players and show that anyone can compete.
              </p>
              <div className="flex flex-wrap gap-4">
                {[
                  { icon: <Trophy size={14} />, text: "1 Trophy" },
                  { icon: <Users size={14} />, text: "7 Players" },
                  { icon: <Target size={14} />, text: "4+ Tournaments" }
                ].map((item) => (
                  <div
                    key={item.text}
                    className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300"
                  >
                    <span className="text-[#00ff87]">{item.icon}</span>
                    {item.text}
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="overflow-hidden rounded-2xl">
                <img
                  src="https://players-cdn.n2erp.co.nz/cdn/images/brands/new_era_logo_nz20240205111039.png"
                  alt="NewEra logo"
                  className="h-80 w-full object-cover md:h-96"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              <div className="absolute -right-6 -bottom-6 rounded-2xl bg-[#00ff87] px-6 py-4 text-black shadow-xl shadow-[#00ff87]/20">
                <div className="text-2xl font-black">Est. 2024</div>
                <div className="text-xs font-bold tracking-wider">NEWERA ESPORTS</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/5 bg-[#050505] py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 text-center">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-[#00ff87]">Journey</p>
            <h2 className="text-4xl font-black md:text-5xl">Our Timeline</h2>
          </div>
          <div ref={timelineRef} className="relative mx-auto max-w-3xl">
            <div className="absolute top-0 bottom-0 left-6 w-px bg-gradient-to-b from-[#00ff87]/50 via-[#00ff87]/20 to-transparent md:left-1/2" />
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div
                  key={item.year}
                  className={`relative flex flex-col gap-6 transition-all duration-700 md:flex-row md:gap-12 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  } ${timelineInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className="absolute top-6 left-6 h-3 w-3 -translate-x-1/2 rounded-full bg-[#00ff87] shadow-lg shadow-[#00ff87]/50 md:left-1/2" />
                  <div className={`ml-14 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                    <div className="mb-3 inline-block rounded-full border border-[#00ff87]/30 bg-[#00ff87]/10 px-3 py-1 text-xs font-black tracking-widest text-[#00ff87]">
                      {item.year}
                    </div>
                    <h3 className="mb-2 text-xl font-black text-white">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-gray-500">{item.desc}</p>
                  </div>
                  <div className="hidden md:block md:w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 text-center">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-[#00ff87]">What Drives Us</p>
            <h2 className="text-4xl font-black md:text-5xl">Our Values</h2>
          </div>
          <div ref={valuesRef} className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <div
                key={value.title}
                className={`rounded-2xl border border-white/10 bg-white/3 p-8 transition-all duration-500 hover:-translate-y-2 hover:border-[#00ff87]/40 ${
                  valuesInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 120}ms` }}
              >
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-[#00ff87]/20 bg-[#00ff87]/10 text-[#00ff87]">
                  {value.icon}
                </div>
                <h3 className="mb-3 text-lg font-black text-white">{value.title}</h3>
                <p className="text-sm leading-relaxed text-gray-500">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-24 text-center md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-[#00ff87]/5 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-2xl px-6">
          <h2 className="mb-6 text-4xl font-black md:text-5xl">
            Be Part of the <span className="text-[#00ff87]">Story</span>
          </h2>
          <p className="mb-10 leading-relaxed text-gray-400">
            Whether you want to support us, partner with us, or join the roster - we would love to hear from you.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-[#00ff87] px-8 py-4 text-sm font-black text-black shadow-lg shadow-[#00ff87]/30 transition-all duration-300 hover:scale-105 hover:bg-white"
          >
            Get In Touch <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
