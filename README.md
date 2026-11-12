# Wordle Game

This is a simple Wordle-style game where the player has to guess the target word "date". The game provides feedback on each guess, indicating which letters are correct and in the correct position, which letters are correct but in the wrong position, and which letters are not in the word at all.

## Project Structure

```
wordle-game
├── public
│   └── index.html          # Main HTML entry point
├── src
│   ├── components          # React components for the game
│   │   ├── Board.tsx
│   │   ├── Keyboard.tsx
│   │   ├── Row.tsx
│   │   └── Tile.tsx
│   ├── hooks               # Custom hooks
│   │   └── useWordle.ts
│   ├── styles              # CSS styles
│   │   └── index.css
│   ├── utils               # Utility functions
│   │   └── game.ts
│   ├── App.tsx             # Main application component
│   ├── constants.ts        # Game constants
│   └── main.tsx            # Entry point for the React application
├── .gitignore              # Git ignore file
├── package.json            # NPM configuration
├── tsconfig.json           # TypeScript configuration
├── vercel.json             # Vercel deployment configuration
└── vite.config.ts          # Vite configuration
```

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   cd wordle-game
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000` to play the game.

## Usage

- Type your guess into the on-screen keyboard and press enter.
- The game will provide feedback on your guess:
  - Green tiles indicate correct letters in the correct position.
  - Yellow tiles indicate correct letters in the wrong position.
  - Gray tiles indicate letters that are not in the word.

## Deployment

This project can be deployed on Vercel. Ensure that you have the `vercel.json` file configured correctly for your deployment settings. 

Enjoy playing the game!