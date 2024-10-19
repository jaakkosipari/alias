import React, { useState } from 'react';

interface JoinGameProps {
  onJoinGame: (gameId: string, playerId: string) => void;
}

const JoinGame: React.FC<JoinGameProps> = ({ onJoinGame }) => {
  const [gameId, setGameId] = useState<string>('');
  const [playerId, setPlayerId] = useState<string>('');

  const handleJoinGame = () => {
    const newPlayerId = Math.random().toString(36).substr(2, 9);
    setPlayerId(newPlayerId);
    onJoinGame(gameId, newPlayerId);
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
    </div>
  );
};

export default JoinGame;
