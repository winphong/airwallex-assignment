# Broccoli & Co.

## Requirements

1. [Bun](https://bun.sh/) - A modern JavaScript runtime  
   Install Bun: `bash curl -fsSL https://bun.sh/install | bash`
2. [Docker](https://docs.docker.com/engine/install/) (optional) - For containerized setup

## Development Workflow

#### Starting development server

1. Install dependencies: `bun install`
2. Start the development server: `bun vite`. The server will be available at http://localhost:5173.

#### Starting development server with Docker

1. `docker-compose -f docker-compose.dev.yml up`

## Building for production

#### Building for production locally

1. Install dependencies (if not already done):
   `bun install`
2. Build the application:
   `bun run build`
3. Preview the production build:
   `bun preview --port=5173`
   The production server will be available at http://localhost:5173.

#### Building for production with Docker

1. `docker-compose -f docker-compose.prod.yml up`

## Testing

#### Running unit tests (vitest)

1. Install dependencies (if not already done):
   `bun install`
2. Run unit tests::
   `bun run test`

#### End-to-End Tests (Playwright)

- <span style="color:red; font-style:italic; font-size:14px">Note: The current Docker image does not have the dependencies to run playwright test. Therefore, playwright test need to run on local device.</span>
- <span style="color:red; font-style:italic; font-size:14px">playwright-test-result.html is attached for convenience. </span>

**Running playwright test**

1. Install dependencies (if not already done):
   `bun install`
2. Start the server before running Playwright tests:
   - Using the development server:
     `bun vite`
   - Using the production build:
     `bun run build && bun preview --port=5173`
3. Install the required Chromium browser for Playwright tests:
   `bun run playwright:setup`
4. Run Playwright tests in headless mode:
   `bun run playwright:test`
5. Run Playwright tests with the UI:
   `bun run playwright:test --ui`

**Running playwright test without starting server manually**

1. Install dependencies (if not already done):
   `bun install`
2. Uncomment `webServer` in `playwright.config.ts` to automatically start a development server before executing playwright test

### React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

### Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from "eslint-plugin-react";

export default tseslint.config({
  // Set the react version
  settings: { react: { version: "18.3" } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs["jsx-runtime"].rules,
  },
});
```
