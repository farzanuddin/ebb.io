import axios from "axios";
import { AUTH_KEY, IMAGE_URL_BASE, URL_BASE } from "./constants";

const cache = {};

const buildEndpoint = (endpoint, params = {}) => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") {
      return;
    }

    searchParams.set(key, String(value));
  });

  return `${endpoint}${searchParams.size ? `?${searchParams.toString()}` : ""}`;
};

export const getDataFromAPI = async (endpoint, params = {}) => {
  try {
    if (!AUTH_KEY) {
      throw new Error("Missing VITE_TMDB_AUTH_KEY environment variable.");
    }

    const fullEndpoint = buildEndpoint(endpoint, params);

    if (cache[fullEndpoint]) {
      return cache[fullEndpoint];
    }

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${AUTH_KEY}`,
      },
    };

    const constructedUrl = URL_BASE + fullEndpoint;

    const response = await axios.get(constructedUrl, options);

    if (response.status !== 200) {
      throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }

    cache[fullEndpoint] = response.data;
    return response.data;
  } catch (error) {
    console.error(`Error fetching data from ${endpoint}`, error.message);
    throw error;
  }
};

const mapGenreIdsToNames = async (genreIds) => {
  try {
    const genreResponse = await getDataFromAPI("/genre/movie/list");

    const genreMap = new Map(genreResponse?.genres?.map((genre) => [genre.id, genre.name]));

    const mappedGenres = genreIds?.map((genreId) => ({
      id: genreId,
      name: genreMap.get(genreId),
    }));

    return mappedGenres;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getMoviesWithGenres = async (endpoint, options = {}) => {
  try {
    const response = await getDataFromAPI(endpoint, options);

    if (!response || !response.results) {
      throw new Error("Invalid response format");
    }

    const genreIds = [...new Set(response.results.flatMap((movie) => movie.genre_ids))];
    const mappedGenres = await mapGenreIdsToNames(genreIds);
    const moviesWithGenres = response?.results?.map((movie) => ({
      ...movie,
      genres: movie?.genre_ids?.map((genreId) =>
        mappedGenres.find((genre) => genre.id === genreId)
      ),
    }));

    return { ...response, results: moviesWithGenres };
  } catch (error) {
    console.error(error);
    return;
  }
};

export const searchMovies = async (query) => {
  const sanitizedQuery = query?.trim();

  if (!sanitizedQuery) {
    return [];
  }

  const response = await getMoviesWithGenres("/search/movie", {
    query: sanitizedQuery,
    include_adult: false,
  });

  return response?.results?.filter((movie) => movie.poster_path || movie.backdrop_path) || [];
};

export const getMovieDetails = async (movieId) => {
  if (!movieId) {
    return null;
  }

  const response = await getDataFromAPI(`/movie/${movieId}`, {
    append_to_response: "credits,videos",
  });

  return {
    ...response,
    genres: response?.genres || [],
    cast: response?.credits?.cast?.slice(0, 6) || [],
    trailer: response?.videos?.results?.find((video) => video.site === "YouTube" && video.type === "Trailer") || null,
  };
};

export const getImageUrl = (path) => {
  if (!path) {
    return "";
  }

  return `${IMAGE_URL_BASE}${path}`;
};

export const mapActorDetails = async (actorId) => {
  try {
    const res = await getDataFromAPI(`/person/${actorId}`);
    const mappedActorDetails = {
      name: res.name,
      birth: res.place_of_birth,
      profile: res.profile_path,
      popularity: res.popularity,
    };
    return mappedActorDetails;
  } catch (error) {
    console.error(error);
  }
};
