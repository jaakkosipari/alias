import express, { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { getGame, createGame, joinGame, submitGuess } from './database';
import { wordlist } from './wordlist';
import cors from 'cors';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const logGameInfo = (gameId: string, playerId: string, score: number, additionalInfo: string = '') => {
  console.log(`GameId: ${gameId}, PlayerId: ${playerId}, Score: ${score} ${additionalInfo}`);
};

app.post('/start', (req: Request, res: Response) => {
  console.log('Received request to start a new game');
  const gameId = uuidv4();
  const playerId = uuidv4();
  const randomWord = wordlist.words[Math.floor(Math.random() * wordlist.words.length)];
  createGame(gameId, playerId);
  const game = getGame(gameId);
  const score = game ? game.scores[playerId] : 0;
  logGameInfo(gameId, playerId, score, 'Game started');
  res.json({ gameId, playerId });
});

app.post('/join', (req: Request, res: Response) => {
  console.log('Received request to join a game');
  const { gameId } = req.body;
  const playerId = uuidv4();
  const success = joinGame(gameId, playerId);
  if (success) {
    const game = getGame(gameId);
    const score = game ? game.scores[playerId] : 0;
    logGameInfo(gameId, playerId, score, 'Player joined');
    res.json({ gameId, playerId });
  } else {
    res.status(400).json({ error: 'Game not found' });
  }
});

app.post('/guess', (req: Request, res: Response) => {
  console.log('Received request to submit a guess');
  const { gameId, playerId, guess } = req.body;
  const result = submitGuess(gameId, playerId, guess);
  if ('correct' in result) {
    logGameInfo(gameId, playerId, result.score, `Guess: ${guess}`);
  } else {
    logGameInfo(gameId, playerId, 0, `Guess failed: ${guess}`);
  }
  res.json(result);
});

app.get('/api/game/:gameId/word', (req: Request, res: Response): void => {
  console.log('Received request to fetch a word');
  const { gameId } = req.params;
  const game = getGame(gameId);
  if (!game) {
    res.status(404).json({ error: 'Game not found' });
    return;
  }
  const currentWord = game.currentWord;
  const score = game.scores;
  logGameInfo(gameId, '', 0, `Current word: ${currentWord}, Score: ${score}`);
  res.json({ word: currentWord, score });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
