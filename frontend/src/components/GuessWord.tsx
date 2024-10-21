import React, { useState, useEffect } from 'react';

interface GuessWordProps {
  gameId: string;
  playerId: string;
  onScoreUpdate: (score: number) => void;
}

const GuessWord: React.FC<GuessWordProps> = ({ gameId, playerId, onScoreUpdate }) => {
  const [guess, setGuess] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleGuessSubmit = async () => {
    setLoading(true);
    setError('');
    setMessage('');
    try {
      const response = await fetch(`http://localhost:3001/guess`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ gameId, playerId, guess }),
      });

      const data = await response.json();

      if (data.correct) {
        onScoreUpdate(data.score);
        setMessage('Correct guess!');
      } else {
        setMessage('Incorrect guess.');
      }

      setGuess('');
    } catch (error: any) {
      setError('Failed to submit guess');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="guess-word-container">
      <h2>Guess the Word</h2>
      <input
        type="text"
        placeholder="Enter your guess"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        className="input"
      />
      <button onClick={handleGuessSubmit} className="button">Submit Guess</button>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message && <p>{message}</p>}
    </div>
  );
};

export default GuessWord;
