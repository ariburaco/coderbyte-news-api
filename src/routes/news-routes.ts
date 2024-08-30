import express from "express";
import {
  getNewsArticles,
  searchNewsArticles,
} from "../controllers/news-controller";

const router = express.Router();

router.get("/articles", getNewsArticles);
router.get("/search", searchNewsArticles);

export default router;
