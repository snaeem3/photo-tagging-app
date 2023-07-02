# Photo Tagging App

This project showcases a Where's Waldo Photo Tagging App built with React & Firebase as part of the [Odin Project](https://www.theodinproject.com/lessons/node-path-javascript-where-s-waldo-a-photo-tagging-app) Curriculum. Choose a level, and find Waldo and all his friends as fast as you can. Then, submit your name and check where you placed on the leaderboard!

The correct target coordinates and leaderboard entries are stored in the Firebase Database.

## [Live View](https://snaeem3.github.io/photo-tagging-app/)

## Skills involved in this project

- Firebase Backend
  - Importing Firebase SDK and necessary modules with `initializeApp`
  - Firebase configuration to include information like the API key, authentication domain, project ID
  - Fetching Data: `getCollectionDocs`
  - Uploading Data: `uploadEntry`
- ReactJS & Javascript
  - React functional components
  - React Hooks
    - `useState`
    - `useEffect`
    - `useRef`
  - React Router (`BrowserRouter`, `Routes`, `Route`, `Link`) for handling navigation and routing within the application.
  - React props to pass data and functions between components
  - Rendering JSX code using React
  - DOM manipulation
  - Event handling
  - Accurate StopWatch implementation with `performance.now()` time stamps
  - Dynamic CSS classes
- Canvas API to draw a box with specified coordinates and styles.
  - `beginPath`, `moveTo`, `lineTo`, `closePath`, `lineWidth`, `strokeStyle`, `fillStyle`, `fill`, and `stroke` to create the box.
  - Image loading and rendering
  - Image scaling
- CSS
  - Responsive design for portrait/landscape screens using media queries
  - Transition effects
  - Modals/Dialogs
  - CSS Flex
  - Sticky elements
  - Hover effects
  - Table styling
  - .svg icons

## Usage

1. Clone the repository.
2. Install the necessary dependencies using `npm install`.
3. Run the app using `npm start`.
4. Open the app in your web browser by navigating to http://localhost:3000.
