const API_URL = "https://api.brawlstars.com/v1/events/rotation";
const BRAWLIFY_MAPS_URL = "https://api.brawlify.com/v1/maps";
const MAP_CACHE_MS = 60 * 60 * 1000;

let cachedMapImages = null;
let cachedMapImagesAt = 0;

function normalizeMapName(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "");
}

function readBrawlifyMaps(payload) {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload?.list)) {
    return payload.list;
  }

  if (Array.isArray(payload?.maps)) {
    return payload.maps;
  }

  return [];
}

async function getMapImagesByName() {
  const now = Date.now();

  if (cachedMapImages && now - cachedMapImagesAt < MAP_CACHE_MS) {
    return cachedMapImages;
  }

  try {
    const response = await fetch(BRAWLIFY_MAPS_URL, {
      headers: { Accept: "application/json" }
    });

    if (!response.ok) {
      throw new Error("Brawlify maps request failed.");
    }

    const payload = await response.json();
    const imagesByName = new Map();

    for (const map of readBrawlifyMaps(payload)) {
      const name = map?.name;
      const imageUrl = map?.imageUrl || map?.image || map?.thumbnailUrl || map?.previewUrl;

      if (name && imageUrl) {
        imagesByName.set(normalizeMapName(name), imageUrl);
      }
    }

    cachedMapImages = imagesByName;
    cachedMapImagesAt = now;

    return imagesByName;
  } catch {
    cachedMapImages = new Map();
    cachedMapImagesAt = now;

    return cachedMapImages;
  }
}

export default async function handler() {
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

    const mapImagesByName = await getMapImagesByName();
    const items = Array.isArray(data)
      ? data
          .filter((item) => item?.event?.mode !== "soloShowdown")
          .map((item) => {
            const mapName = item?.event?.map;
            const brawlifyImage = mapImagesByName.get(normalizeMapName(mapName));

            return {
              battleMode: item?.event?.mode,
              mapName,
              mapImageUrl: item?.event?.imageUrl || brawlifyImage || "",
              startTime: item?.startTime,
              endTime: item?.endTime
            };
          })
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
