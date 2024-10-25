import React from 'react';
import DisplayWord from './DisplayWord';
import GuessWord from './GuessWord';
import ErrorBoundary from './ErrorBoundary'; // P31fd

interface GameProps {
  gameId: string;
  playerId: string;
  onScoreUpdate: (score: number) => void;
  isGuesser: boolean;
}

const Game: React.FC<GameProps> = ({ gameId, playerId, onScoreUpdate, isGuesser }) => {
  return (
    <ErrorBoundary> {/* Pd7ee */}
      <div className="game-container">
        <h2>Game</h2>
        <h3>Game ID: {gameId}</h3>
        {isGuesser ? (
          <GuessWord gameId={gameId} playerId={playerId} onScoreUpdate={onScoreUpdate} />
        ) : (
          <DisplayWord gameId={gameId} />
        )}
      </div>
    </ErrorBoundary> {/* Pd7ee */}
  );
};

export default Game;
