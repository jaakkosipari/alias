import React, { useState, useEffect } from 'react';

interface GameProps {
  gameId: string;
  playerId: string;
  onScoreUpdate: (score: number) => void;
}

const Game: React.FC<GameProps> = ({ gameId, playerId, onScoreUpdate }) => {
  const [word, setWord] = useState<string>('');
  const [guess, setGuess] = useState<string>('');
  const [score, setScore] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    // Fetch a new word from the backend
    const fetchWord = async () => {
      setLoading(true);
      setError('');
      try {
        console.log(`Fetching word for gameId: ${gameId}`);
        const response = await fetch(`http://localhost:3001/api/game/${gameId}/word`);
        const data = await response.json();
        setWord(data.word);
      } catch (error: any) {
        setError('Failed to fetch word');
      } finally {
        setLoading(false);
      }
    };

    fetchWord();
  }, [gameId]);

  const handleGuessSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      console.log(`Submitting guess for gameId: ${gameId}, playerId: ${playerId}`);
      const response = await fetch(`http://localhost:3001/api/game/${gameId}/guess`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ playerId, guess }),
      });

      const data = await response.json();

      if (data.correct) {
        setScore(score + 1);
        onScoreUpdate(score + 1);
      }

      setGuess('');
      setWord(data.nextWord);
    } catch (error: any) {
      setError('Failed to submit guess');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="game-container">
      <h2>Game</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <p>Explain this word: {word}</p>
          <input
            type="text"
            placeholder="Enter your guess"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            className="input"
          />
          <button onClick={handleGuessSubmit} className="button">Submit Guess</button>
        </>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!error && !loading && <p>No errors</p>}
    </div>
  );
};

export default Game;
