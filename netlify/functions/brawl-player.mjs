const API_BASE = "https://api.brawlstars.com/v1/players/";

function normalizeTag(tag) {
  if (!tag) {
    return "";
  }

  return String(tag).trim().replace(/^#/, "").toUpperCase();
}

export default async function handler(request) {
  const token = process.env.BRAWL_STARS_API_TOKEN;

  if (!token) {
    return new Response(
      JSON.stringify({
        error: "BRAWL_STARS_API_TOKEN is missing. Add it in your Netlify environment to enable live Brawl Stars data."
      }),
      {
        status: 503,
        headers: { "Content-Type": "application/json" }
      }
    );
  }

  const url = new URL(request.url);
  const tag = normalizeTag(url.searchParams.get("tag"));

  if (!tag) {
    return new Response(
      JSON.stringify({
        error: "Player tag is required."
      }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" }
      }
    );
  }

  try {
    const response = await fetch(`${API_BASE}%23${encodeURIComponent(tag)}`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      }
    });

    const data = await response.json();

    if (!response.ok) {
      return new Response(
        JSON.stringify({
          error: data?.reason || "Official Brawl Stars API request failed."
        }),
        {
          status: response.status,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    const topBrawlers = Array.isArray(data?.brawlers)
      ? [...data.brawlers]
          .sort((left, right) => (right?.trophies || 0) - (left?.trophies || 0))
          .slice(0, 3)
          .map((brawler) => ({
            name: brawler?.name,
            trophies: brawler?.trophies
          }))
      : [];

    const payload = {
      tag: data?.tag,
      name: data?.name,
      trophies: data?.trophies,
      highestTrophies: data?.highestTrophies,
      expLevel: data?.expLevel,
      soloVictories: data?.soloVictories,
      duoVictories: data?.duoVictories,
      teamVictories: data?.["3vs3Victories"],
      clubName: data?.club?.name,
      clubTag: data?.club?.tag,
      topBrawlers
    };

    return new Response(JSON.stringify(payload), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch {
    return new Response(
      JSON.stringify({
        error: "Could not reach the official Brawl Stars API."
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
}
