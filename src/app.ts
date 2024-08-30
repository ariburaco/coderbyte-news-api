import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import newsRoutes from "./routes/news-routes";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

const swaggerDocument = YAML.load("./docs/openapi.yaml");
const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/api", newsRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to News API");
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default app;
