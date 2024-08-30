import swaggerJSDoc from "swagger-jsdoc";

const PORT = process.env.PORT || 4000;

const swaggerOptions: swaggerJSDoc.Options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "News API",
      version: "1.0.0",
      description: "A simple API to fetch news articles",
    },
    servers: [
      {
        url: `http://localhost:${PORT}/api`,
        description: "Local server",
      },
    ],
  },
  apis: ["./src/routes/*.ts"],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

export default swaggerDocs;
