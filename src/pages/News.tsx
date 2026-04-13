import { useEffect, useRef, useState, type RefObject } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Radio, Trophy, Users } from "lucide-react";
import { coverageAreas, newsStories, seasonNotes } from "./newsData";

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

const coverageIcons = [<Trophy size={18} />, <Users size={18} />, <Radio size={18} />];

export default function News() {
  const coverageRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const storiesRef = useRef<HTMLDivElement>(null);
  const coverageInView = useInView(coverageRef);
  const timelineInView = useInView(timelineRef);
  const storiesInView = useInView(storiesRef);

  return (
    <div className="overflow-x-hidden bg-black text-white">
      <section className="relative overflow-hidden py-28 md:py-36">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1542751110-97427bbecf20?w=1600&h=800&fit=crop"
            alt="News hero"
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
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-[#00ff87]">Team Updates</p>
          <h1 className="mb-6 text-5xl font-black tracking-tight md:text-7xl">
            NewEra <span className="text-[#00ff87]">News</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-400">
            Follow all major updates about the team in one place: roster moves, tournament results, and the biggest headlines around NewEra.
          </p>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-[#00ff87]">Top Stories</p>
              <h2 className="text-4xl font-black md:text-5xl">Latest Headlines</h2>
            </div>
          </div>
          <div ref={storiesRef} className="grid gap-6 md:grid-cols-3">
            {newsStories.map((story, index) => (
              <article
                key={story.slug}
                className={`group overflow-hidden rounded-2xl border border-white/10 bg-white/3 transition-all duration-500 hover:-translate-y-2 hover:border-[#00ff87]/35 ${
                  storiesInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 120}ms` }}
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                  <div className="absolute top-4 left-4 rounded-full bg-[#00ff87] px-3 py-1 text-[10px] font-black tracking-widest text-black">
                    {story.tag}
                  </div>
                </div>
                <div className="p-6">
                  <p className="mb-2 text-xs uppercase tracking-wider text-gray-500">{story.date}</p>
                  <h3 className="mb-3 text-xl font-black leading-tight transition-colors group-hover:text-[#00ff87]">
                    {story.title}
                  </h3>
                  <p className="mb-5 text-sm leading-relaxed text-gray-400">{story.excerpt}</p>
                  <Link
                    to={`/news/${story.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-bold text-[#00ff87] transition-all duration-300 hover:gap-4"
                  >
                    Read More
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/5 bg-[#050505] py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 text-center">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-[#00ff87]">Coverage Blocks</p>
            <h2 className="text-4xl font-black md:text-5xl">What Belongs Here</h2>
          </div>
          <div ref={coverageRef} className="grid gap-6 md:grid-cols-3">
            {coverageAreas.map((item, index) => (
              <div
                key={item.title}
                className={`rounded-2xl border border-white/10 bg-white/3 p-8 transition-all duration-500 hover:border-white/20 ${
                  coverageInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 120}ms` }}
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-[#00ff87]/20 bg-[#00ff87]/10 text-[#00ff87]">
                  {coverageIcons[index]}
                </div>
                <h3 className="mb-3 text-xl font-black text-white">{item.title}</h3>
                <p className="leading-relaxed text-gray-400">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-4xl px-6">
          <div className="mb-16 text-center">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-[#00ff87]">Season Story</p>
            <h2 className="text-4xl font-black md:text-5xl">Timeline</h2>
          </div>
          <div ref={timelineRef} className="space-y-6">
            {seasonNotes.map((item, index) => (
              <div
                key={item.month}
                className={`rounded-2xl border border-white/10 bg-white/3 p-6 transition-all duration-500 md:flex md:items-start md:gap-8 ${
                  timelineInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 130}ms` }}
              >
                <div className="mb-4 w-full max-w-[170px] rounded-xl border border-[#00ff87]/20 bg-[#00ff87]/10 px-4 py-3 text-sm font-black uppercase tracking-wider text-[#00ff87] md:mb-0">
                  {item.month}
                </div>
                <div>
                  <h3 className="mb-3 text-2xl font-black text-white">{item.title}</h3>
                  <p className="leading-relaxed text-gray-400">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>`r`n    
    </div>
  );
}



