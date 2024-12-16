export const APOLLO_GRAPHQL_URL = process.env.NODE_ENV !== "development"
	? "http://localhost:3001"
	: "https://vodafone-backend-production.up.railway.app" as const;

export const MAP_STYLE = "https://api.maptiler.com/maps/streets-v2/style.json?key=xjadzlUZsDZs2zDxfuXk" as const;

export const DEFAULT_MAP_POSITION = {
	latitude: 37.9838,
	longitude: -1.1280
} as const;