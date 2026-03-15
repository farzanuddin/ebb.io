import axios from "axios";
import { AUTH_KEY, URL_BASE } from "./constants";

const cache = {};

export const getDataFromAPI = async (endpoint, query = "", page = 1) => {
  try {
    if (!AUTH_KEY) {
      throw new Error("Missing VITE_TMDB_AUTH_KEY environment variable.");
    }

    const fullEndpoint = `${endpoint}${query && `?query=${query}`}${page > 1 ? `?page=${page}` : ""}`;

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

export const getMoviesWithGenres = async (endpoint, page = 1 ) => {
  try {
    const response = await getDataFromAPI(endpoint, "", page);

    if (!response || !response.results) {
      throw new Error("Invalid response format");
    }

    const genreIds = response.results.flatMap((movie) => movie.genre_ids);
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
