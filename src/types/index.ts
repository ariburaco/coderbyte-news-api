export interface Source {
  name: string;
  url: string;
}

export interface Article {
  title: string;
  description: string;
  content: string;
  url: string;
  image: string;
  publishedAt: string;
  source: Source;
}

export interface NewsResponse {
  totalArticles: number;
  articles: Article[];
}
