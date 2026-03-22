export const AUTH_KEY = import.meta.env.VITE_TMDB_AUTH_KEY || "";
export const URL_BASE = "https://api.themoviedb.org/3";
export const IMAGE_URL_BASE = "https://image.tmdb.org/t/p/original";

export const SIDEBAR_PRIMARY_LINKS = [
  { key: "home", label: "Home", icon: "home", active: true },
  { key: "genres", label: "Genres", icon: "grid" },
];

export const SIDEBAR_LIBRARY_LINKS = [
  { key: "continue", label: "Continue Watching", icon: "play" },
  { key: "recent", label: "Recently Released", icon: "clock" },
  { key: "downloads", label: "Downloads", icon: "download" },
];

export const DASHBOARD_SECTIONS = [
  {
    key: "continueWatching",
    title: "Continue Watching",
    endpoint: "/movie/popular",
  },
  {
    key: "recentlyReleased",
    title: "Recently Released",
    endpoint: "/movie/now_playing",
  },
  {
    key: "topRated",
    title: "Top Rated",
    endpoint: "/movie/top_rated",
  },
];

export const FEATURED_COLLECTION = {
  key: "featured",
  endpoint: "/trending/movie/week",
  badge: "Now Trending",
};

export const APP_COPY = {
  brand: "ebb.io",
  searchPlaceholder: "Search for movies...",
  searchHint: "Type at least 2 characters to search TMDB live.",
  searchEmpty: "No matching films found.",
  heroPrimaryAction: "Watch Now",
  sidebarLibraryTitle: "Library",
  settingsLabel: "Settings",
  logoutLabel: "Logout",
  searchLabel: "Search",
  searchingStatus: "Searching TMDB...",
  drawerTitle: "Movie details",
  noSynopsis: "No synopsis available.",
  continueWatchingLabel: "Continue Watching",
  watchNowLabel: "Watch Now",
  searchAriaLabel: "Search movies",
  closeDetailsAria: "Close movie details",
  moreOptionsLabel: "More options",
  downloadLabel: "Download",
  heroDefaultTitle: "Cinema, curated beautifully",
  heroDefaultSummary:
    "Discover the most talked-about stories, surfaced with bold artwork and clean categorisation.",
  errorLoadMovies: "Unable to load movies right now.",
  errorSearchUnavailable: "Search is unavailable right now.",
  errorLoadDetails: "Unable to load movie details.",
  appLogoAlt: "App logo",
  detailsAction: "Watch Trailer",
  detailsFallback: "No trailer available",
};

export const SEARCH_MIN_CHARACTERS = 2;