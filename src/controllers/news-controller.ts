import { Request, Response, NextFunction } from "express";
import * as newsService from "../services/news-service";

export const getNewsArticles = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { n = 10, page = 1 } = req.query;
  try {
    const articles = await newsService.fetchNewsArticles(
      Number(n),
      Number(page),
    );
    res.json(articles);
  } catch (error) {
    next(error);
  }
};

export const searchNewsArticles = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const {
    query,
    n = 10,
    page = 1,
    lang,
    country,
    in: inAttributes,
    nullable,
    from,
    to,
    sortby = "publishedAt",
  } = req.query;

  if (!query) {
    return res.status(400).json({ error: "Query parameter is required" });
  }

  try {
    const articles = await newsService.searchArticles(
      query as string,
      Number(n),
      Number(page),
      lang as string,
      country as string,
      inAttributes as string,
      nullable as string,
      from as string,
      to as string,
      sortby as string,
    );
    res.json(articles);
  } catch (error) {
    next(error);
  }
};
