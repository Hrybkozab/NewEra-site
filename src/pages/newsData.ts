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
    statValue: "3 : 0"
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
    statLabel: "Chances to Sign",
    statValue: "Medium"
  },
  {
    slug: "navi-interest",
    tag: "ANNOUNCEMENTS",
    category: "Organization Watch",
    date: "May 3, 2026",
    title: "Natus Vincere interested in acquiring NewEra Esports such as NAVI Junior roster",
    image:
      "https://d3dwep9z8m8y9r.cloudfront.net/publications/2023/07/publications-10412/thumbnail/40127/Site_1738x800.png",
    lead:
      "Interest from a larger organization placed extra attention on the NewEra project and highlighted how quickly the team regained relevance after its return.",
    excerpt:
      "Possibly one of the best deals in the team's history... Don't miss out!", 
    body: [
      "Based on the results of the team NewEra Esports",
      "Natus Vincere have expressed interest in signing a young roster. Based on their impressive results, including frequent victories against Tier-1 teams, NAVI are offering cooperation and shared achievements.",
      "For NewEra, this could be a great chance to get into the world title and prove to the world what their roster is capable of, at the moment we are waiting for the final result of negotiations between the two sides."
    ],
    highlights: [
      "Outside attention increased around the team brand",
      "The roster gained visibility beyond community events",
      "Competitive performance remains the biggest driver of value"
    ],
    statLabel: "Chances to Sign",
    statValue: "High"
  },
  {
    slug: "chit-interest",
    tag: "TOURNAMENTS",
    category: "Match Report",
    date: "April 17, 2026",
    title: "NewEra won the Challengers with a 3:2 victory in the finals",
    image:
      "https://event.supercell.com/brawlstars/public/images/johllpugn3lb/5inu8UU3xQeixEkbTxJd9P/57bce7174e765599afa98a738d246a3e/BSC_ITALY.png",
    lead:
      "A young team defeats one of the strongest teams in the history of the Brawl Stars competitive scene in the finals.",
    excerpt:
      "NewEra wins one of the major tournaments in their region.",
    body: [
      "On April 17, one of the most important tournaments of this season took place, called Brawl Stars Challengers Switzerland.",
      "In the quarter-finals, NovaEra's opponent was the Italian team NOVO Esports, although the opponent seemed stronger, NovaEra won with a score of 3 : 2",
      "In the final, they were already faced with the legendary SK Gaming, who were not easy to defeat, but our guys did not get lost during the game, made an unthinkable draft and, with difficulty, won with a score of 3:2"
    ],
    highlights: [
      "3:2 finish in the grand final",
      "Disciplined map control and cleaner late-game decisions",
      "Major confidence boost before the next event"
    ],
    statLabel: "Final Score",
    statValue: "3 : 2"
  },
  {
    slug: "lenain-interest",
    tag: "ROSTER",
    category: "Roster Changes",
    date: "May 1, 2026",
    title: "Legendary player LeNain is set to join NewEra Esports.",
    image:
      "https://static.wikia.nocookie.net/bs-esports/images/3/31/LeNain.jpg/revision/latest?cb=20221221173437",
    lead:
      "LeNain is kicked from Team Heretics and becomes a free agent for a new organization.",
    excerpt:
      "Where will everyone's favorite Swiss world-class player go?",
    body: [
      "March 1, 2026 LeNain is kicked out of the Spanish organization Team Heretics due to unsatisfactory team performance.",
      "At the moment, he has a choice to make, and many analysts are currently betting that the player will be able to join one of three organizations: BIG Esports, SK Gaming and NewEra Esports.",
      "Also, recently there have been some active scrims with Zabziro, so we are currently waiting for more news regarding this situation."
    ],
    highlights: [
      "The Spaniards' abrupt decision about his kick",
      "Possible changes in the future",
      "Unexpected screams between LeNain and the team"
    ],
    statLabel: "Status of Signing",
    statValue: "Unknown"
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
