import React, { useState } from 'react';
import GuessWord from './GuessWord';

interface JoinGameProps {
  onJoinGame: (gameId: string, playerId: string) => void;
}

const JoinGame: React.FC<JoinGameProps> = ({ onJoinGame }) => {
  const [gameId, setGameId] = useState<string>('');
  const [playerId, setPlayerId] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [joined, setJoined] = useState<boolean>(false);

  const handleJoinGame = async () => {
    setLoading(true);
    setError('');
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
      setJoined(true);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="join-container">
      <h2>Join an Existing Game</h2>
      <input
        type="text"
        placeholder="Enter Game ID"
        value={gameId}
        onChange={(e) => setGameId(e.target.value)}
        className="input"
      />
      <button onClick={handleJoinGame} className="button">Join Game</button>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {joined ? (
            <GuessWord gameId={gameId} playerId={playerId} onScoreUpdate={() => {}} />
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
        </>
      )}
    </div>
  );
};

export default JoinGame;
