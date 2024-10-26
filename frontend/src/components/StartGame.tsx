import React, { useState } from 'react';
import DisplayWord from './DisplayWord';
import { BACKEND_HOST } from '../config';

interface StartGameProps {
  onStartGame: (gameId: string, playerId: string, score: number) => void;
}

const StartGame: React.FC<StartGameProps> = ({ onStartGame }) => {
  const [gameId, setGameId] = useState<string>('');
  const [playerId, setPlayerId] = useState<string>('');
  const [score, setScore] = useState<number>(0);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleStartGame = async () => {
    setLoading(true);
    setError('');
    try {
      console.log('Sending request to start a new game');
      const response = await fetch(`${BACKEND_HOST}/start`, {
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
      setScore(data.score);
      onStartGame(data.gameId, data.playerId, data.score);
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
              <p>Score: {score}</p>
              <DisplayWord gameId={gameId} />
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
