# Vi Coding Challenge

This project is a small Lit-based Pokémon grid and card demo with Storybook for UI components.

## Requirements

- Node.js >= 18
- npm or yarn

## Installation

Clone the repository and install dependencies:

```bash
npm install
```

or

```bash
yarn
```

## Running the App

To start the development server:

```bash
npm run dev
```

This will launch the app on `http://localhost:5173` (Vite default).

## Building the App

To build the project for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Storybook

Storybook is included to view and test UI components.

Start Storybook locally:

```bash
npm run storybook
```

It will open at `http://localhost:6006`.

Build a static Storybook:

```bash
npm run build-storybook
```

## Project Structure

- `src/` – source code including components and API mocks
- `stories/` – Storybook stories for components

## Notes

- This project uses Lit 3.x and Vite.
- Storybook is configured for web components using `@storybook/web-components-vite`.
