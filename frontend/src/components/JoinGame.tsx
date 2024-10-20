import React, { useState } from 'react';

interface JoinGameProps {
  onJoinGame: (gameId: string, playerId: string) => void;
}

const JoinGame: React.FC<JoinGameProps> = ({ onJoinGame }) => {
  const [gameId, setGameId] = useState<string>('');
  const [playerId, setPlayerId] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleJoinGame = async () => {
    try {
      console.log(`Joining game with gameId: ${gameId}`);
      const response = await fetch('http://localhost:3001/join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ gameId }),
      });

      if (!response.ok) {
        throw new Error('Failed to join game');
      }

      const data = await response.json();
      setPlayerId(data.playerId);
      onJoinGame(data.gameId, data.playerId);
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Join an Existing Game</h2>
      <input
        type="text"
        placeholder="Enter Game ID"
        value={gameId}
        onChange={(e) => setGameId(e.target.value)}
      />
      <button onClick={handleJoinGame}>Join Game</button>
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

export default JoinGame;
