import { wordlist } from './wordlist';

type Game = {
  id: string;
  players: string[];
  currentWord: string | null;
  scores: { [playerId: string]: number };
};

const games: { [gameId: string]: Game } = {};

export const createGame = (gameId: string, playerId: string) => {
  const randomWord = wordlist.words[Math.floor(Math.random() * wordlist.words.length)];
  games[gameId] = {
    id: gameId,
    players: [playerId],
    currentWord: randomWord,
    scores: { [playerId]: 0 },
  };
};

export const joinGame = (gameId: string, playerId: string): boolean => {
  const game = games[gameId];
  if (game) {
    game.players.push(playerId);
    game.scores[playerId] = 0;
    return true;
  }
  return false;
};

export const getGame = (gameId: string): Game | undefined => {
  return games[gameId];
};

export const submitGuess = (
  gameId: string,
  playerId: string,
  guess: string
): { correct: boolean; score: number } | { error: string } => {
  const game = games[gameId];
  if (!game) {
    return { error: 'Game not found' };
  }

  const currentWord = game.currentWord;
  if (currentWord && guess.toLowerCase() === currentWord.toLowerCase()) {
    game.scores[playerId]++;
    const randomWord = wordlist.words[Math.floor(Math.random() * wordlist.words.length)];
    game.currentWord = randomWord;
    return { correct: true, score: game.scores[playerId] };
  }

  const randomWord = wordlist.words[Math.floor(Math.random() * wordlist.words.length)];
  game.currentWord = randomWord;

  return { correct: false, score: game.scores[playerId] };
};
