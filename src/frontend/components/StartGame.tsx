import React, { useState } from 'react';

interface StartGameProps {
  onStartGame: (gameId: string, playerId: string) => void;
}

const StartGame: React.FC<StartGameProps> = ({ onStartGame }) => {
  const [gameId, setGameId] = useState<string>('');
  const [playerId, setPlayerId] = useState<string>('');

  const handleStartGame = () => {
    const newGameId = Math.random().toString(36).substr(2, 9);
    const newPlayerId = Math.random().toString(36).substr(2, 9);
    setGameId(newGameId);
    setPlayerId(newPlayerId);
    onStartGame(newGameId, newPlayerId);
  };

  return (
    <div>
      <h2>Start a New Game</h2>
      <button onClick={handleStartGame}>Start Game</button>
    </div>
  );
};

export default StartGame;
