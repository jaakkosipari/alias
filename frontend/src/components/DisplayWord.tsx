import React, { useEffect, useState } from 'react';

interface DisplayWordProps {
  gameId: string;
}

const DisplayWord: React.FC<DisplayWordProps> = ({ gameId }) => {
  const [word, setWord] = useState<string>('');
  const [error, setError] = useState<string>('');

  const fetchWord = async () => {
    setError('');
    try {
      const response = await fetch(`http://localhost:3001/api/game/${gameId}/word`);
      const data = await response.json();
      if (data.word !== word) {
        setWord(data.word);
      }
    } catch (error: any) {
      setError('Failed to fetch word');
    }
  };

  useEffect(() => {
    fetchWord();
    const interval = setInterval(fetchWord, 2000);
    return () => clearInterval(interval);
  }, [gameId]);

  return (
    <div className="display-word-container">
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <p>{word}</p>
      )}
    </div>
  );
};

export default DisplayWord;
