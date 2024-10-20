import React, { useEffect, useState } from 'react';

interface DisplayWordProps {
  gameId: string;
}

const DisplayWord: React.FC<DisplayWordProps> = ({ gameId }) => {
  const [word, setWord] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchWord = async () => {
      setLoading(true);
      setError('');
      try {
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

  return (
    <div className="display-word-container">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <p>{word}</p>
      )}
    </div>
  );
};

export default DisplayWord;
