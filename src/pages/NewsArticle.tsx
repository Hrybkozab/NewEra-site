import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, CalendarDays, ChevronRight, ShieldCheck } from "lucide-react";
import { getNewsStory, newsStories } from "./newsData";

export default function NewsArticle() {
  const { slug = "" } = useParams();
  const story = getNewsStory(slug);

  if (!story) {
    return (
      <div className="bg-black px-6 py-32 text-white">
        <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/3 p-10 text-center">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-[#00ff87]">News</p>
          <h1 className="mb-4 text-4xl font-black">Article not found</h1>
          <p className="mb-8 text-gray-400">This news post does not exist yet or the link is incorrect.</p>
          <Link
            to="/news"
            className="inline-flex items-center gap-2 rounded-full bg-[#00ff87] px-6 py-3 text-sm font-black text-black transition-all hover:scale-105 hover:bg-white"
          >
            <ArrowLeft size={16} />
            Back to News
          </Link>
        </div>
      </div>
    );
  }

  const relatedStories = newsStories.filter((item) => item.slug !== story.slug).slice(0, 2);

  return (
    <div className="overflow-x-hidden bg-black text-white">
      <section className="relative overflow-hidden py-28 md:py-36">
        <div className="absolute inset-0">
          <img src={story.image} alt={story.title} className="h-full w-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/75 to-black" />
        </div>
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(#00ff87 1px, transparent 1px), linear-gradient(90deg, #00ff87 1px, transparent 1px)",
            backgroundSize: "60px 60px"
          }}
        />
        <div className="relative mx-auto max-w-5xl px-6">
          <Link
            to="/news"
            className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-[#00ff87] transition-all duration-300 hover:gap-4"
          >
            <ArrowLeft size={16} />
            Back to News
          </Link>
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-[#00ff87] px-3 py-1 text-[10px] font-black tracking-widest text-black">
              {story.tag}
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-gray-300">
              {story.category}
            </span>
          </div>  
          <p className="mb-5 flex items-center gap-2 text-sm uppercase tracking-wider text-gray-400">
            <CalendarDays size={15} className="text-[#00ff87]" />
            {story.date}
          </p>

          <h1 className="mb-6 max-w-4xl text-4xl font-black leading-tight md:text-6xl">{story.title}</h1>
          <p className="max-w-3xl text-lg leading-relaxed text-gray-300">{story.lead}</p>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <article className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
            <img src={story.image} alt={story.title} className="h-80 w-full object-cover md:h-[460px]" />
            <div className="p-8 md:p-10">
              <div className="mb-10 grid gap-4 sm:grid-cols-[minmax(0,1fr)_220px]">
                <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
                  <div className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#00ff87]">
                    <ChevronRight size={16} />
                    Key Takeaways
                  </div>
                  <div className="space-y-3">
                    {story.highlights.map((item) => (
                      <div key={item} className="flex items-start gap-3 text-sm text-gray-300">
                        <ShieldCheck size={16} className="mt-0.5 text-[#00ff87]" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-2xl border border-[#00ff87]/20 bg-[#00ff87]/10 p-5 text-center text-white">
                  <div className="mb-2 text-xs font-black uppercase tracking-[0.25em]">{story.statLabel}</div>
                  <div className="text-4xl font-black">{story.statValue}</div>
                </div>
              </div>

              <div className="space-y-6 text-base leading-relaxed text-gray-300">
                {story.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </article>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-white/3 p-7">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-[#00ff87]">Quick Info</p>
              <h2 className="mb-4 text-2xl font-black">News Hub</h2>
              <p className="mb-6 text-sm leading-relaxed text-gray-400">
                Every article is generated from the same shared news array, so adding or editing posts in one place updates the whole news system.
              </p>
              <Link
                to="/news"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#00ff87] transition-all duration-300 hover:gap-4"
              >
                Open all stories
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/3 p-7">
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.3em] text-[#00ff87]">Related Posts</p>
              <div className="space-y-5">
                {relatedStories.map((item) => (
                  <Link
                    key={item.slug}
                    to={`/news/${item.slug}`}
                    className="group block rounded-2xl border border-white/10 bg-black/30 p-4 transition-all hover:border-[#00ff87]/30"
                  >
                    <p className="mb-2 text-[10px] font-black uppercase tracking-widest text-[#00ff87]">{item.tag}</p>
                    <h3 className="mb-2 text-lg font-black leading-tight transition-colors group-hover:text-[#00ff87]">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-500">{item.date}</p>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
