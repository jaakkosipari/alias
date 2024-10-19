import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { getGame, createGame, joinGame, submitGuess } from './database';

const app = express();
const port = 3001;

app.use(express.json());

app.post('/start', (req, res) => {
  const gameId = uuidv4();
  const playerId = uuidv4();
  createGame(gameId, playerId);
  res.json({ gameId, playerId });
});

app.post('/join', (req, res) => {
  const { gameId } = req.body;
  const playerId = uuidv4();
  const success = joinGame(gameId, playerId);
  if (success) {
    res.json({ gameId, playerId });
  } else {
    res.status(400).json({ error: 'Game not found' });
  }
});

app.post('/guess', (req, res) => {
  const { gameId, playerId, guess } = req.body;
  const result = submitGuess(gameId, playerId, guess);
  res.json(result);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
