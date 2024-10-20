import React, { useState } from 'react';

interface StartGameProps {
  onStartGame: (gameId: string, playerId: string) => void;
}

const StartGame: React.FC<StartGameProps> = ({ onStartGame }) => {
  const [gameId, setGameId] = useState<string>('');
  const [playerId, setPlayerId] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleStartGame = async () => {
    setLoading(true);
    setError('');
    try {
      console.log('Sending request to start a new game');
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="start-container">
      <h2>Start a New Game</h2>
      <button onClick={handleStartGame} className="button">Start Game</button>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {gameId && playerId && (
            <div>
              <p>Game ID: {gameId}</p>
              <p>Player ID: {playerId}</p>
            </div>
          )}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {!error && <p>No errors</p>}
        </>
      )}
    </div>
  );
};

export default StartGame;
