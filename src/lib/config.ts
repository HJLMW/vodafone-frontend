// Define the Apollo GraphQL URL based on the environment (production or development)
// If in development, it uses the local server URL, otherwise, it points to the production URL on Railway
export const APOLLO_GRAPHQL_URL = process.env.NODE_ENV === "development"
	? "http://localhost:3001"  // Local development server URL
	: "https://vodafone-backend-production.up.railway.app" as const;  // Production server URL

// Set the default Map style URL, linking to the MapTiler API with a specific key for the map style
export const MAP_STYLE = "https://api.maptiler.com/maps/streets-v2/style.json?key=xjadzlUZsDZs2zDxfuXk" as const;

// Define the default map position (latitude and longitude) for the map (Murcia <3)
export const DEFAULT_MAP_POSITION = {
	latitude: 37.9838,
	longitude: -1.1280
} as const;