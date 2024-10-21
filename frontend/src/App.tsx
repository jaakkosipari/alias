import React, { useState } from 'react';
import StartGame from './components/StartGame';
import JoinGame from './components/JoinGame';
import Game from './components/Game';
import Score from './components/Score';
import './styles.css';

const App: React.FC = () => {
  const [gameId, setGameId] = useState<string | null>(null);
  const [playerId, setPlayerId] = useState<string | null>(null);
  const [score, setScore] = useState<number>(0);
  const [isGuesser, setIsGuesser] = useState<boolean>(false);

  const handleStartGame = (newGameId: string, newPlayerId: string) => {
    setGameId(newGameId);
    setPlayerId(newPlayerId);
    setIsGuesser(false);
  };

  const handleJoinGame = (existingGameId: string, newPlayerId: string) => {
    setGameId(existingGameId);
    setPlayerId(newPlayerId);
    setIsGuesser(true);
  };

  const handleScoreUpdate = (newScore: number) => {
    setScore(newScore);
  };

  return (
    <div className="main-container">
      {!gameId && !playerId && (
        <>
          <StartGame onStartGame={handleStartGame} />
          <JoinGame onJoinGame={handleJoinGame} />
        </>
      )}
      {gameId && playerId && (
        <>
          <Game gameId={gameId} playerId={playerId} onScoreUpdate={handleScoreUpdate} isGuesser={isGuesser} />
          <Score score={score} />
        </>
      )}
    </div>
  );
};

export default App;
