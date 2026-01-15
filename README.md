# VibeLive

VibeLive is a dynamic, Twitch-inspired live streaming platform interface built with Nuxt 3. It leverages the Twitch API to fetch and display live channels, categories, and stream-specific data, providing a seamless and responsive user experience for discovering and viewing content.

## Features

-   **Twitch API Integration**: Utilizes OAuth 2.0 and the Twitch Helix API to fetch live streams, category data, user information, and follower counts.
-   **Dynamic Homepage**: Features curated sections for "Live channels we think you'll like" and "Categories we think you'll like," with expandable "Show More" functionality.
-   **Stream Viewing Page**: A dedicated route for each stream that embeds the Twitch player and chat for an interactive viewing experience.
-   **Rich Stream Details**: Displays comprehensive information including streamer details, viewer count, live uptime, game category, and tags.
-   **Channel Information**: Shows detailed "About" sections for streamers, including their description and follower count.
-   **Responsive Design**: The layout adapts smoothly from desktop to mobile devices, with collapsible sidebars and reorganized components for smaller screens.
-   **Component-Based Architecture**: Built with a modular structure using Vue 3/Nuxt 3 components for easy maintenance and scalability.

## Tech Stack

-   **Framework**: [Nuxt 3](https://nuxt.com/)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [SCSS](https://sass-lang.com/) with Stylelint and Prettier
-   **API**: [Twitch API (Helix)](https://dev.twitch.tv/docs/api/)
-   **Linting & Formatting**: ESLint, Prettier, Stylelint
-   **Development Tooling**: Vite, Husky, lint-staged, commitlint

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

-   Node.js (version 18.x or higher)
-   npm (default package manager)

### Environment Variables

Before running the application, you need to set up your environment variables. Create a `.env` file in the root of the project and add your Twitch application credentials. You can obtain these from the [Twitch Developer Console](https://dev.twitch.tv/console).

```bash
# .env

VITE_TWITCH_CLIENT_ID=your_twitch_client_id
VITE_TWITCH_CLIENT_SECRET=your_twitch_client_secret
VITE_TWITCH_REDIRECT_URI=http://localhost:3000
```
**Note:** `VITE_TWITCH_REDIRECT_URI` must match the "OAuth Redirect URLs" configured in your Twitch application settings.

### Installation

```bash
git clone https://github.com/mariatfer/VibeLive.git
cd VibeLive
npm install
```

### Running the Development Server

Start the development server on `http://localhost:3000`:
```bash
npm run dev
```


## Project Structure

The project follows the standard Nuxt 3 directory structure:

-   `assets/`: Contains global styles, fonts, and SCSS mixins.
-   `components/`: Houses all Vue components, organized into `ui/` (reusable elements), and `views/` (page-specific sections).
-   `constants/`: Stores application-wide constants, such as icon names.
-   `layouts/`: Defines the main application layouts used by pages.
-   `pages/`: Contains the application's pages and defines the routing structure.
    -   `index.vue`: The homepage.
    -   `[stream].vue`: The dynamic page for individual streams.
-   `utils/`: Includes utility functions, formatters, and the core `TwitchAPI.ts` class for handling all interactions with the Twitch API.
-   `.husky/`: Manages Git hooks for code quality checks before commits.
