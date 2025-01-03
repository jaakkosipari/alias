import React, { useEffect, useState } from 'react';
import ErrorBoundary from './ErrorBoundary';
import { BACKEND_HOST } from '../config';

interface DisplayWordProps {
  gameId: string;
  onScoreUpdate: (score: number) => void;
}

const DisplayWord: React.FC<DisplayWordProps> = ({ gameId, onScoreUpdate }) => {
  const [word, setWord] = useState<string>('');
  const [score, setScore] = useState<number>(0);
  const [error, setError] = useState<string>('');

  const fetchWordAndScore = async () => {
    setError('');
    try {
      const response = await fetch(`${BACKEND_HOST}/api/game/${gameId}/word`);
      const data = await response.json();
      if (data.word !== word) {
        setWord(data.word);
      }
      if (data.score !== score) {
        setScore(data.score);
        onScoreUpdate(data.score);
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
