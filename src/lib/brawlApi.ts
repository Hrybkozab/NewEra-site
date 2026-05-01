export type LiveRotationItem = {
  battleMode?: string;
  mapName?: string;
  mapImageUrl?: string;
  startTime?: string;
  endTime?: string;
};

export type PlayerTopBrawler = {
  name?: string;
  trophies?: number;
};

export type LivePlayerStats = {
  tag?: string;
  name?: string;
  trophies?: number;
  highestTrophies?: number;
  expLevel?: number;
  soloVictories?: number;
  duoVictories?: number;
  teamVictories?: number;
  clubName?: string;
  clubTag?: string;
  topBrawlers?: PlayerTopBrawler[];
};

type LiveRotationResponse = {
  items?: LiveRotationItem[];
  error?: string;
};

type LivePlayerResponse = LivePlayerStats & {
  error?: string;
};

const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1"]);

function getApiBase() {
  const configuredBase = import.meta.env.VITE_BRAWL_API_BASE?.trim();

  if (configuredBase) {
    return configuredBase.replace(/\/$/, "");
  }

  return "/.netlify/functions";
}

export async function fetchLiveRotation() {
  const response = await fetch(`${getApiBase()}/brawl-events`);
  const contentType = response.headers.get("content-type") || "";

  if (!contentType.includes("application/json")) {
    throw new Error(
      LOCAL_HOSTS.has(window.location.hostname)
        ? "For local Brawl Stars API calls, run the site with `npx netlify dev` so the function is available."
        : "The live Brawl Stars API endpoint did not return JSON."
    );
  }

  const payload = (await response.json()) as LiveRotationResponse;

  if (!response.ok) {
    throw new Error(payload.error || "Could not load live Brawl Stars rotation.");
  }

  return Array.isArray(payload.items) ? payload.items.slice(0, 3) : [];
}

export async function fetchPlayerStats(playerTag: string) {
  const normalizedTag = playerTag.trim().replace(/^#/, "");
  const response = await fetch(`${getApiBase()}/brawl-player?tag=${encodeURIComponent(normalizedTag)}`);
  const contentType = response.headers.get("content-type") || "";

  if (!contentType.includes("application/json")) {
    throw new Error(
      LOCAL_HOSTS.has(window.location.hostname)
        ? "For local Brawl Stars API calls, run the site with `npx netlify dev` so the function is available."
        : "The live Brawl Stars API endpoint did not return JSON."
    );
  }

  const payload = (await response.json()) as LivePlayerResponse;

  if (!response.ok) {
    throw new Error(payload.error || "Could not load live player stats.");
  }

  return payload;
}

export function formatRotationTime(value?: string) {
  if (!value) {
    return "Unknown";
  }

  const normalized = value.match(/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})\.\d{3}Z$/);
  const date = normalized
    ? new Date(
        Date.UTC(
          Number(normalized[1]),
          Number(normalized[2]) - 1,
          Number(normalized[3]),
          Number(normalized[4]),
          Number(normalized[5]),
          Number(normalized[6])
        )
      )
    : new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short"
  });
}

export function formatStatNumber(value?: number | string) {
  if (value === undefined || value === null || value === "") {
    return "Unknown";
  }

  const numeric = typeof value === "number" ? value : Number(String(value).replace(/,/g, ""));

  if (Number.isNaN(numeric)) {
    return String(value);
  }

  return numeric.toLocaleString();
}
