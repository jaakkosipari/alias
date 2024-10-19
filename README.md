# Alias

Single-team Alias game for web - developed using copilot workspace.

## Application architecture

A single page app built using TypeScript and ReactJS. Has a backend with a simple in-memory database (a typescript object, no libraries).

## Application logic

Starting a new game:
- Player starts a new team and gets a numeric code
- Another player uses that code to join the team

Game logic:
- Repeats for ten words
  - The game randomly selects a word from it's wordlist (a json file)
  - Player 1 is shown a word and is instructed to explain that word in person to Player 2
  - Player 2 is shown a text input with ok button, and instructions to enter the word once guessed
  - Once Player 2 submits the guess, it's checked. If it's correct, the team gets a point.
- Displays score & game ends

## New Project Structure

The project has been restructured to separate the backend and frontend into their own directories with their own `package.json` files.

### Backend

The backend code is located in the `backend` directory. To start the backend server, navigate to the `backend` directory and run:

```bash
npm install
npm start
```

The backend server will be running on `http://localhost:3001`.

### Frontend

The frontend code is located in the `frontend` directory. To start the frontend development server, navigate to the `frontend` directory and run:

```bash
npm install
npm start
```

The frontend development server will be running on `http://localhost:9000`.
