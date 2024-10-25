import React, { useEffect, useState } from 'react';
import ErrorBoundary from './ErrorBoundary';

interface DisplayWordProps {
  gameId: string;
}

const DisplayWord: React.FC<DisplayWordProps> = ({ gameId }) => {
  const [word, setWord] = useState<string>('');
  const [score, setScore] = useState<number>(0);
  const [error, setError] = useState<string>('');

  const fetchWordAndScore = async () => {
    setError('');
    try {
      const response = await fetch(`http://localhost:3001/api/game/${gameId}/word`);
      const data = await response.json();
      if (data.word !== word) {
        setWord(data.word);
      }
      if (data.score !== score) {
        setScore(data.score);
      }
    } catch (error: any) {
      setError('Failed to fetch word and score');
    }
  };

  useEffect(() => {
    fetchWordAndScore();
    const interval = setInterval(fetchWordAndScore, 2000);
    return () => clearInterval(interval);
  }, [gameId]);

  return (
    <ErrorBoundary>
      <div className="display-word-container">
        {error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : (
          <>
            <p>{word}</p>
            <p>Score: {score}</p>
          </>
        )}
      </div>
    </ErrorBoundary>
  );
};

export default DisplayWord;
