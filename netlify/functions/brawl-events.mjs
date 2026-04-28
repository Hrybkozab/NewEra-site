const API_URL = "https://api.brawlstars.com/v1/events/rotation";

export default async function handler(_request, context) {
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

  try {
    const response = await fetch(API_URL, {
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

    const items = Array.isArray(data)
      ? data.map((item) => ({
          battleMode: item?.event?.mode,
          mapName: item?.event?.map,
          mapImageUrl: item?.event?.imageUrl,
          startTime: item?.startTime,
          endTime: item?.endTime
        }))
      : [];

    return new Response(JSON.stringify({ items }), {
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
