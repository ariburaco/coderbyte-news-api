import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
import { z } from "zod";

const Article = z
  .object({
    title: z.string(),
    description: z.string(),
    content: z.string(),
    url: z.string().url(),
    image: z.string().url(),
    publishedAt: z.string().datetime({ offset: true }),
    source: z
      .object({ name: z.string(), url: z.string().url() })
      .partial()
      .passthrough(),
  })
  .partial()
  .passthrough();
const NewsResponse = z
  .object({ totalArticles: z.number().int(), articles: z.array(Article) })
  .partial()
  .passthrough();

export const schemas = {
  Article,
  NewsResponse,
};

const endpoints = makeApi([
  {
    method: "get",
    path: "/articles",
    alias: "getArticles",
    requestFormat: "json",
    parameters: [
      {
        name: "n",
        type: "Query",
        schema: z.number().int().gte(1).lte(100).optional().default(10),
      },
      {
        name: "page",
        type: "Query",
        schema: z.number().int().optional().default(1),
      },
    ],
    response: NewsResponse,
    errors: [
      {
        status: 400,
        description: `Bad Request -- Your request is invalid.`,
        schema: z.void(),
      },
      {
        status: 401,
        description: `Unauthorized -- Your API key is wrong.`,
        schema: z.void(),
      },
      {
        status: 403,
        description: `Forbidden -- You have reached your daily quota.`,
        schema: z.void(),
      },
      {
        status: 429,
        description: `Too Many Requests -- You have made more requests per second than you are allowed.`,
        schema: z.void(),
      },
      {
        status: 500,
        description: `Internal Server Error -- We had a problem with our server. Try again later.`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "get",
    path: "/search",
    alias: "getSearch",
    requestFormat: "json",
    parameters: [
      {
        name: "query",
        type: "Query",
        schema: z.string(),
      },
      {
        name: "n",
        type: "Query",
        schema: z.number().int().gte(1).lte(100).optional().default(10),
      },
      {
        name: "page",
        type: "Query",
        schema: z.number().int().optional().default(1),
      },
      {
        name: "lang",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "country",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "in",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "nullable",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "from",
        type: "Query",
        schema: z.string().datetime({ offset: true }).optional(),
      },
      {
        name: "to",
        type: "Query",
        schema: z.string().datetime({ offset: true }).optional(),
      },
      {
        name: "sortby",
        type: "Query",
        schema: z.enum(["publishedAt", "relevance"]).optional(),
      },
    ],
    response: NewsResponse,
    errors: [
      {
        status: 400,
        description: `Bad Request -- Your request is invalid.`,
        schema: z.void(),
      },
      {
        status: 401,
        description: `Unauthorized -- Your API key is wrong.`,
        schema: z.void(),
      },
      {
        status: 403,
        description: `Forbidden -- You have reached your daily quota.`,
        schema: z.void(),
      },
      {
        status: 429,
        description: `Too Many Requests -- You have made more requests per second than you are allowed.`,
        schema: z.void(),
      },
      {
        status: 500,
        description: `Internal Server Error -- We had a problem with our server. Try again later.`,
        schema: z.void(),
      },
    ],
  },
]);

export const api = new Zodios(endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
  return new Zodios(baseUrl, endpoints, options);
}
