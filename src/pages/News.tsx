import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
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

type LiveRotationItem = {
  battleMode?: string;
  mapName?: string;
  mapImageUrl?: string;
  startTime?: string;
  endTime?: string;
};

export default function News() {
  const coverageRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const storiesRef = useRef<HTMLDivElement>(null);
  const coverageInView = useInView(coverageRef);
  const timelineInView = useInView(timelineRef);
  const storiesInView = useInView(storiesRef);
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState("ALL");
  const [liveRotation, setLiveRotation] = useState<LiveRotationItem[]>([]);
  const [liveRotationError, setLiveRotationError] = useState("");
  const [isLoadingRotation, setIsLoadingRotation] = useState(true);

  const storyTags = useMemo(
    () => ["ALL", ...Array.from(new Set(newsStories.map((story) => story.tag)))],
    []
  );

  const filteredStories = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return newsStories.filter((story) => {
      const matchesTag = activeTag === "ALL" || story.tag === activeTag;
      const matchesQuery =
        normalizedQuery.length === 0 ||
        story.title.toLowerCase().includes(normalizedQuery) ||
        story.excerpt.toLowerCase().includes(normalizedQuery) ||
        story.category.toLowerCase().includes(normalizedQuery) ||
        story.tag.toLowerCase().includes(normalizedQuery);

      return matchesTag && matchesQuery;
    });
  }, [activeTag, query]);

  useEffect(() => {
    let cancelled = false;

    async function loadRotation() {
      try {
        setIsLoadingRotation(true);
        setLiveRotationError("");

        const response = await fetch("/.netlify/functions/brawl-events");
        const contentType = response.headers.get("content-type") || "";

        if (!contentType.includes("application/json")) {
          throw new Error(
            window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
              ? "Live Brawl Stars rotation is only available after deploy on Netlify or when Netlify Functions are running locally."
              : "The live API endpoint is not returning JSON yet."
          );
        }

        const payload = await response.json();

        if (!response.ok) {
          throw new Error(payload?.error || "Could not load live Brawl Stars rotation.");
        }

        if (!cancelled) {
          setLiveRotation(Array.isArray(payload?.items) ? payload.items.slice(0, 3) : []);
        }
      } catch (error) {
        if (!cancelled) {
          setLiveRotation([]);
          setLiveRotationError(
            error instanceof Error ? error.message : "Could not load live Brawl Stars rotation."
          );
        }
      } finally {
        if (!cancelled) {
          setIsLoadingRotation(false);
        }
      }
    }

    loadRotation();

    return () => {
      cancelled = true;
    };
  }, []);

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

      <section className="border-b border-white/5 bg-[#050505] py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-[#00ff87]">Live Rotation</p>
              <h2 className="text-3xl font-black md:text-4xl">Live Brawl Stars Rotation</h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-400">
                Current map pool and active events.
              </p>
            </div>
          </div>

          {isLoadingRotation ? (
            <div className="grid gap-6 md:grid-cols-3">
              {[0, 1, 2].map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/3 p-6">
                  <div className="mb-4 h-40 animate-pulse rounded-xl bg-white/5" />
                  <div className="mb-3 h-4 w-28 animate-pulse rounded bg-white/5" />
                  <div className="h-3 w-40 animate-pulse rounded bg-white/5" />
                </div>
              ))}
            </div>
          ) : liveRotation.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-3">
              {liveRotation.map((item) => (
                <article key={`${item.battleMode}-${item.mapName}-${item.startTime}`} className="overflow-hidden rounded-2xl border border-white/10 bg-white/3">
                  <div className="relative h-44 overflow-hidden bg-black">
                    {item.mapImageUrl ? (
                      <img src={item.mapImageUrl} alt={item.mapName || "Brawl map"} className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full items-center justify-center text-sm text-gray-500">No map image</div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                    <div className="absolute top-4 left-4 rounded-full bg-[#00ff87] px-3 py-1 text-[10px] font-black tracking-widest text-black">
                      {item.battleMode || "Rotation"}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="mb-2 text-xl font-black text-white">{item.mapName || "Unknown map"}</h3>
                    <p className="text-sm leading-relaxed text-gray-400">
                      Starts: {item.startTime ? new Date(item.startTime).toLocaleString() : "Unknown"}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-gray-500">
                      Ends: {item.endTime ? new Date(item.endTime).toLocaleString() : "Unknown"}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-white/10 bg-white/3 p-8 text-center">
              <p className="mb-3 text-lg font-black text-white">Live Brawl Stars data coming soon</p>
              <p className="mx-auto max-w-2xl text-sm leading-relaxed text-gray-400">
                This section will show current map rotation and active events once live data is connected.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-[#00ff87]">Top Stories</p>
              <h2 className="text-4xl font-black md:text-5xl">Latest Headlines</h2>
            </div>
            <div className="w-full max-w-2xl space-y-4">
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-[0.28em] text-gray-500">
                  Search news
                </label>
                <input
                  type="text"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search by title, category, tag..."
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-600 transition-all focus:border-[#00ff87]/40 focus:outline-none"
                />
              </div>
              <div className="flex flex-wrap gap-3">
                {storyTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setActiveTag(tag)}
                    className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] ${
                      activeTag === tag
                        ? "bg-[#00ff87] text-black"
                        : "border border-white/10 bg-white/5 text-gray-400 hover:border-white/20 hover:text-white"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
              <p className="text-xs uppercase tracking-[0.22em] text-gray-600">
                Showing {filteredStories.length} of {newsStories.length} stories
              </p>
            </div>
          </div>

          {filteredStories.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-white/3 p-10 text-center">
              <p className="mb-3 text-lg font-black text-white">No news matched your search</p>
              <p className="text-sm text-gray-400">Try another keyword or switch the active tag filter.</p>
            </div>
          ) : (
            <div ref={storiesRef} className="grid gap-6 md:grid-cols-3">
              {filteredStories.map((story, index) => (
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
          )}
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
      </section>
    </div>
  );
}
