type Game = {
  id: string;
  players: string[];
  words: string[];
  currentWordIndex: number;
  scores: { [playerId: string]: number };
};

const games: { [gameId: string]: Game } = {};

export const createGame = (gameId: string, playerId: string) => {
  games[gameId] = {
    id: gameId,
    players: [playerId],
    words: [],
    currentWordIndex: 0,
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

  const currentWord = game.words[game.currentWordIndex];
  if (guess.toLowerCase() === currentWord.toLowerCase()) {
    game.scores[playerId]++;
    game.currentWordIndex++;
    return { correct: true, score: game.scores[playerId] };
  }

  return { correct: false, score: game.scores[playerId] };
};
