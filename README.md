# News API Service

This project is a simple API service that interacts with the GNews API to fetch and search for news articles. The service is built using Node.js, Express, and TypeScript, and it supports features like pagination, error handling, and API documentation using Swagger.

## Features

- Fetch the latest news articles
- Search for news articles by keywords
- Support for pagination
- Error handling with appropriate HTTP status codes
- API documentation with Swagger (OpenAPI)
- Local caching for improved performance - (This can be improved further with Redis)

## Installation

To get started, clone the repository and install the dependencies using `yarn`:

```bash
git clone https://github.com/ariburaco/coderbyte-news-api.git
cd coderbyte-news-api
yarn install
```

## Environment Variables

Create a `.env` file in the root of the project and add the following environment variables:

```bash
## Default port is set to 4000
PORT=4000
GNEWS_API_KEY=your_gnews_api_key_here
```

Ensure that you replace `your_gnews_api_key_here` with your actual GNews API key.

## Live Environment

You can access the live version of the API at [https://coderbyte-news-api.onrender.com/api](https://coderbyte-news-api.onrender.com/api).
If you want to test the API with Postman, you need to change the base URL to `https://coderbyte-news-api.onrender.com/api`. in the collection.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in production mode. The API will be available at [http://localhost:4000](http://localhost:4000).

### `yarn dev`

Runs the app in development mode with hot-reloading. The API will be available at [http://localhost:4000](http://localhost:4000).

### `yarn build`

Builds the TypeScript project for production to the `dist` folder.

### `yarn typecheck`

Runs TypeScript type checking.

### `yarn format`

Formats the code using Prettier.

### `yarn generate:client`

Generates the TypeScript client based on the OpenAPI specification located at `./docs/openapi.yaml`.

## API Documentation

The API documentation is available via Swagger UI at [http://localhost:4000/api-docs](http://localhost:4000/api-docs).

To modify the API documentation, edit the `openapi.yaml` file located in the `docs` directory.

## Project Structure

```
├── docs                # API documentation (Swagger)
│   └── openapi.yaml
├── generated           # Generated TypeScript client for client-side usage
│   └── client.ts
├── src                 # Source files
│   ├── controllers     # API route handlers
│   ├── middlewares     # Custom Express middlewares
│   ├── routes          # Express route definitions
│   ├── services        # Business logic
│   ├── types           # TypeScript type definitions
│   └── utils           # Utility functions and helpers
├── .env                # Environment variables
├── .env.example        # Example .env file
├── .eslintrc.js        # ESLint configuration
├── .prettierrc         # Prettier configuration
├── tsconfig.json       # TypeScript configuration
└── package.json        # Project dependencies and scripts
```

## Development

To contribute to this project, please fork the repository and create a pull request. Contributions are always welcome!

### Prettier and ESLint

This project uses Prettier and ESLint to maintain code quality and consistency. Run the following command to format your code:

```bash
yarn format
```

### Type Checking

Ensure that your code is type-safe by running:

```bash
yarn typecheck
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [GNews API](https://gnews.io) - for providing the news data
- [Express.js](https://expressjs.com/) - the web framework used
- [Swagger](https://swagger.io/) - for API documentation
- [TypeScript](https://www.typescriptlang.org/) - for static type checking

---

Happy coding!
