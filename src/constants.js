export const AUTH_KEY = import.meta.env.VITE_TMDB_AUTH_KEY || "";

export const URL_BASE = "https://api.themoviedb.org/3";
export const IMAGE_URL_BASE = "https://image.tmdb.org/t/p/original";

export const LIST_ITEMS = {
  menu: ["home", "favorite", "purchase", "reminder"],
  other: ["playlist", "live", "bookmarks", "settings"],
};

export const FILTERS = ["now_playing", "top_rated", "upcoming"];

export const FILTER_MAPPING = {
  now_playing: "Now Playing",
  top_rated: "Top Rated",
  upcoming: "Upcoming",
};

export const LOGGED_IN_USER = "Torkia Mahloul";
