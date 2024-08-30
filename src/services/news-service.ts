import { NewsResponse } from "../types";
import cache from "../utils/cache";
import axios from "axios";

const API_URL = "https://gnews.io/api/v4";
const API_KEY = process.env.GNEWS_API_KEY;

export const fetchNewsArticles = async (
  n: number,
  page: number = 1,
): Promise<NewsResponse> => {
  const cacheKey = `/articles/${n}/page/${page}/max/${n}`;
  const cachedResponse = cache.get(cacheKey);

  if (cachedResponse) {
    return cachedResponse;
  }

  const params: Record<string, any> = {
    token: API_KEY,
    max: n,
    page,
  };

  try {
    const response = await axios.get(`${API_URL}/top-headlines`, {
      params,
    });

    cache.set(cacheKey, response.data);
    return response.data;
  } catch (error: any) {
    handleApiError(error);
    throw error;
  }
};

export const searchArticles = async (
  query: string,
  n: number = 10,
  page: number = 1,
  lang?: string,
  country?: string,
  inAttributes?: string,
  nullable?: string,
  from?: string,
  to?: string,
  sortby: string = "publishedAt",
): Promise<NewsResponse> => {
  const cacheKey = `/search/${query}/page/${page}/lang/${lang}/country/${country}/in/${inAttributes}/nullable/${nullable}/from/${from}/to/${to}/sortby/${sortby}/max/${n}`;
  const cachedResponse = cache.get(cacheKey);

  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    const params: Record<string, any> = {
      q: query,
      token: API_KEY,
      max: n,
      page,
    };

    if (lang) params.lang = lang;
    if (country) params.country = country;
    if (inAttributes) params.in = inAttributes;
    if (nullable) params.nullable = nullable;
    if (from) params.from = from;
    if (to) params.to = to;
    if (sortby) params.sortby = sortby;

    const response = await axios.get(`${API_URL}/search`, { params });

    cache.set(cacheKey, response.data);
    return response.data;
  } catch (error: any) {
    handleApiError(error);
    throw error;
  }
};

const handleApiError = (error: any) => {
  if (error.response) {
    const status = error.response.status;
    switch (status) {
      case 400:
        throw new Error("Bad Request -- Your request is invalid.");
      case 401:
        throw new Error("Unauthorized -- Your API key is wrong.");
      case 403:
        throw new Error("Forbidden -- You have reached your daily quota.");
      case 429:
        throw new Error(
          "Too Many Requests -- You have made more requests per second than you are allowed.",
        );
      case 500:
        throw new Error(
          "Internal Server Error -- We had a problem with our server. Try again later.",
        );
      case 503:
        throw new Error(
          "Service Unavailable -- We're temporarily offline for maintenance.",
        );
      default:
        throw new Error("An unexpected error occurred.");
    }
  } else if (error.request) {
    throw new Error("No response was received from the API.");
  } else {
    throw new Error(`Request error: ${error.message}`);
  }
};
