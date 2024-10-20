import React, { useState } from 'react';

interface StartGameProps {
  onStartGame: (gameId: string, playerId: string) => void;
}

const StartGame: React.FC<StartGameProps> = ({ onStartGame }) => {
  const [gameId, setGameId] = useState<string>('');
  const [playerId, setPlayerId] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleStartGame = async () => {
    try {
      const response = await fetch('http://localhost:3001/start', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to start game');
      }

      const data = await response.json();
      setGameId(data.gameId);
      setPlayerId(data.playerId);
      onStartGame(data.gameId, data.playerId);
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Start a New Game</h2>
      <button onClick={handleStartGame}>Start Game</button>
      {gameId && playerId && (
        <div>
          <p>Game ID: {gameId}</p>
          <p>Player ID: {playerId}</p>
        </div>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default StartGame;
