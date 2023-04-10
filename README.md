# Numbers Game

This is a simple sliding puzzle game implemented using React. The game consists of a board with a 4x4 grid of tiles, where one tile is missing. The tiles can be moved around by clicking on them, and the objective of the game is to rearrange the tiles so that they are in order (from 1 to 15).

## Getting Started

To run the game, you need to have Node.js and npm (or yarn) installed. Once you have these dependencies installed, follow these steps:

- Clone this repository to your local machine.
- Navigate to the root directory of the project in your terminal.
- Run npm install or yarn install to install the project's dependencies.
- Run npm start or yarn start to start the development server.
- Open your web browser and navigate to http://localhost:3000 to play the game.

## Code Overview

The main logic of the game is implemented in the App component, which is defined in src/App.js. The component uses the useState hook to keep track of the current state of the board (i.e., the position of the tiles), and the useEffect hook to handle window resizing. The shuffle function is used to randomly shuffle the tiles at the start of the game, and the handleTileClick function is called when a tile is clicked.

The isTilesOrdered variable is used to check if the tiles are in order (i.e., the game is won), and the game displays a message when the condition is true. The styling of the board and the tiles is defined in src/App.css.

## Dependencies

The project uses the following dependencies:

- React: A JavaScript library for building user interfaces.
- react-dom: A package that provides DOM-specific methods for React.
- react-scripts: A set of scripts and configuration used by Create React App.
