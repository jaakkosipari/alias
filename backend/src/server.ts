import express, { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { getGame, createGame, joinGame, submitGuess } from './database';
import { wordlist } from './wordlist';

const app = express();
const port = 3001;

app.use(express.json());

app.post('/start', (req: Request, res: Response) => {
  console.log('Received request to start a new game');
  const gameId = uuidv4();
  const playerId = uuidv4();
  createGame(gameId, playerId);
  res.json({ gameId, playerId });
});

app.post('/join', (req: Request, res: Response) => {
  console.log('Received request to join a game');
  const { gameId } = req.body;
  const playerId = uuidv4();
  const success = joinGame(gameId, playerId);
  if (success) {
    res.json({ gameId, playerId });
  } else {
    res.status(400).json({ error: 'Game not found' });
  }
});

app.post('/guess', (req: Request, res: Response) => {
  console.log('Received request to submit a guess');
  const { gameId, playerId, guess } = req.body;
  const result = submitGuess(gameId, playerId, guess);
  res.json(result);
});

app.get('/api/game/:gameId/word', (req: Request, res: Response): express.Response<any, Record<string, any>> | undefined => {
  console.log('Received request to fetch a word');
  const { gameId } = req.params;
  const game = getGame(gameId);
  if (!game) {
    return res.status(404).json({ error: 'Game not found' });
  }
  const randomWord = wordlist.words[Math.floor(Math.random() * wordlist.words.length)];
  game.words.push(randomWord);
  return res.json({ word: randomWord });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
