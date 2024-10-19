import React from 'react';

interface ScoreProps {
  score: number;
}

const Score: React.FC<ScoreProps> = ({ score }) => {
  return (
    <div>
      <h2>Score</h2>
      <p>{score}</p>
    </div>
  );
};

export default Score;
