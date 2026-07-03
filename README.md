# S-MAI Website

A promotional website for the S-MAI Special Classroom Program at Triam Udom Suksa Pattanakarn Ratchada School. Built with React, Vite, and Tailwind CSS.

## Tech Stack

- **Framework**: React 19
- **Build Tool**: Vite 6
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React
- **Extra dependencies**: `motion` and `@google/genai` are included for future features.

## Project Structure

- `src/App.tsx` - Main application file containing the header, image slider, news section, activity gallery, about section, and footer.
- `src/main.tsx` - Entry point for the React application.
- `src/index.css` - Global CSS file importing Tailwind CSS and setting up default fonts.
- `public/` - Public assets directory for images and logos (accessible at the root path `/...`).
- `vite.config.ts` - Vite configuration with React, Tailwind plugins, and path aliases.

## Getting Started

### Prerequisites

Make sure you have Node.js installed.

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to:
   ```text
   http://localhost:3000
   ```

## Available Scripts

- `npm run dev`: Runs the app in development mode at port 3000.
- `npm run build`: Builds the app for production.
- `npm run preview`: Locally previews the production build.
- `npm run lint`: Performs typechecking with `tsc --noEmit`.

<<<<<<< HEAD
=======
*Note: These variables are optional and only needed if you are extending the website with Gemini features.*
>>>>>>> 22e08b5e156b3e8d167490b5c689bdf11cb48058

## Customization

- **Texts, Menus, Links**: Update `src/App.tsx`.
- **Local Assets & Logos**: Replace or add files in `public/`.
- **Fonts & Themes**: Adjust `src/index.css`.
- **Slideshow Images**: Edit the `SLIDES` array in `src/App.tsx`.
