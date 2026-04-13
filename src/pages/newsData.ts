export type NewsStory = {
  slug: string;
  tag: string;
  category: string;
  date: string;
  title: string;
  image: string;
  lead: string;
  excerpt: string;
  body: string[];
  highlights: string[];
  statLabel: string;
  statValue: string;
};

export const newsStories: NewsStory[] = [
  {
    slug: "roster-2026",
    tag: "ROSTER",
    category: "Lineup Update",
    date: "February 27, 2026",
    title: "NewEra revives new roster for the 2026 season",
    image: "https://d3jk55w6373teq.cloudfront.net/Feedpanel/Edito/Esport/bstars26.jpg",
    lead:
      "NewEra officially returned to the competitive scene with a refreshed roster built around discipline, cleaner communication, and a long-term plan for Monthly Finals.",
    excerpt:
      "A reset with purpose: new structure, clearer roles, and a serious push toward higher-level competition.",
    body: [
      "The new lineup keeps the identity of the tag alive while giving the project a sharper competitive direction. The organization positioned the season as a restart built on stronger structure, more focused practice blocks, and clear in-game roles.",
      "From the first announcement, the message around the roster was simple: NewEra is not returning just to participate. The goal is to become a consistent threat in qualifiers and build enough momentum to challenge deeper into the season.",
      "That makes this roster move more than a headline. It is the foundation for everything that follows, from scrim quality to tournament expectations and how the team presents itself to fans."
    ],
    highlights: [
      "Core focus on stability and coordinated drafts",
      "Clear role distribution inside the active trio",
      "Season target centered on Monthly Finals qualification"
    ],
    statLabel: "Active Players",
    statValue: "3"
  },
  {
    slug: "skystars-title",
    tag: "TOURNAMENTS",
    category: "Match Report",
    date: "April 12, 2026",
    title: "NewEra Esports won the Matcherino Tournament Series Skystars #1 with a dominant 3:0 victory in the finals",
    image:
      "https://matcherino.com/_next/image?url=https%3A%2F%2Fcdn.matcherino.com%2F82f04ae8-1065-4bc7-a326-129785e8860e%2F-%2Fcrop%2F1536x865%2F0%2C80%2F-%2Fresize%2F800x450%2F&w=1920&q=75",
    lead:
      "The team delivered its strongest statement of the season with a clean sweep in the final, showing confident drafting, fast adaptation, and calm end-game execution.",
    excerpt:
      "A title win that showed NewEra can control a series from first map to last with mature, disciplined play.",
    body: [
      "Across the series, NewEra controlled the pace from the opening maps. Their rotations looked sharper, their objective timing was cleaner, and the roster never allowed the opposition to settle into a comfortable rhythm.",
      "The most impressive part of the victory was not only the score line, but the composure behind it. The team looked prepared for multiple draft scenarios and stayed organised when matches became chaotic.",
      "More importantly, the win gave the project visible proof that the current system is working. The result now serves as both a trophy and a benchmark for how the team wants to play moving forward."
    ],
    highlights: [
      "3:0 finish in the grand final",
      "Disciplined map control and cleaner late-game decisions",
      "Major confidence boost before the next event"
    ],
    statLabel: "Final Score",
    statValue: "3:0"
  },
  {
    slug: "b8-interest",
    tag: "ANNOUNCEMENTS",
    category: "Organization Watch",
    date: "March 3, 2026",
    title: "Ukrainian B8 Esports interested in acquiring NewEra Esports",
    image:
      "https://newcdn.igromania.ru/articles/pics/tmp/images/2025/11/1/8043c162-f14b-4a9f-b3b3-64fa7f602621.jpg",
    lead:
      "Interest from a larger organization placed extra attention on the NewEra project and highlighted how quickly the team regained relevance after its return.",
    excerpt:
      "Outside interest became a signal that NewEra had already regained visibility and competitive value.",
    body: [
      "Whether the interest leads to a formal deal or not, the story itself matters. It shows that the team is being noticed beyond its immediate community and that its competitive upside is already creating outside attention.",
      "For a returning project, this kind of attention changes perception. It tells fans, players, and rivals that the brand is becoming relevant again and that performance is starting to translate into market interest.",
      "For NewEra, the key challenge is to stay focused on performance. The strongest response to any market speculation is still the same: keep winning, keep growing the brand, and keep building value through results."
    ],
    highlights: [
      "Outside attention increased around the team brand",
      "The roster gained visibility beyond community events",
      "Competitive performance remains the biggest driver of value"
    ],
    statLabel: "Headline Reach",
    statValue: "High"
  }
];

export const coverageAreas = [
  {
    title: "Tournament Results",
    text: "Use this block for wins, bracket runs, MVP moments, and recaps after every important match day."
  },
  {
    title: "Roster Moves",
    text: "Perfect for signings, stand-ins, academy promotions, role swaps, and future player announcements."
  },
  {
    title: "Community Updates",
    text: "Keep supporters informed about watch parties, Discord events, content drops, and sponsor activity."
  }
];

export const seasonNotes = [
  {
    month: "February 2026",
    title: "The return begins",
    text: "The project re-entered competition with a fresh roster and a stronger focus on long-term structure."
  },
  {
    month: "March 2026",
    title: "Attention builds",
    text: "The team started to pick up more visibility across the scene as scrims and early results created momentum."
  },
  {
    month: "April 2026",
    title: "Results arrive",
    text: "A statement tournament win turned the comeback into a season that fans and rivals have to follow closely."
  }
];

export function getNewsStory(slug: string) {
  return newsStories.find((story) => story.slug === slug);
}
