import React from 'react';

interface ScoreProps {
  score: number;
}

const Score: React.FC<ScoreProps> = ({ score }) => {
  return (
    <div className="score-container">
      <h2>Score</h2>
      <p className="score-value">{score}</p>
    </div>
  );
};

export default Score;
