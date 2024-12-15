import React, { useState, useEffect } from 'react';
import './dino.css';

const Dino = () => {
  const [isJumping, setIsJumping] = useState(false);
  const [dinoTop, setDinoTop] = useState(0);
  const [treeLeft, setTreeLeft] = useState(800);
  const [isGameOver, setIsGameOver] = useState(false);

  // Function to handle jumping
  const jump = () => {
    if (!isJumping) {
      setIsJumping(true);
      let upInterval = setInterval(() => {
        setDinoTop((prevTop) => {
          if (prevTop >= 150) {
            clearInterval(upInterval);
            let downInterval = setInterval(() => {
              setDinoTop((prevTop) => {
                if (prevTop <= 0) {
                  clearInterval(downInterval);
                  setIsJumping(false);
                  return 0;
                }
                return prevTop - 5;
              });
            }, 20);
            return prevTop;
          }
          return prevTop + 5;
        });
      }, 20);
    }
  };

  // Game loop for cactus movement and collision detection
  useEffect(() => {
    if (!isGameOver) {
      const interval = setInterval(() => {
        setTreeLeft((prevLeft) => {
          if (prevLeft <= -50) {
            return 800; // Reset tree position
          }
          return prevLeft - 5; // Move tree to the left
        });

        // Collision detection
        if (treeLeft < 80 && treeLeft > 20 && dinoTop <= 50) {
          setIsGameOver(true); // End game on collision
          clearInterval(interval); // Stop game loop
        }
      }, 50);

      return () => clearInterval(interval); // Cleanup on unmount
    }
  }, [treeLeft, dinoTop, isGameOver]);

  // Event listener for keydown
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === 'Space') {
        jump();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown); // Cleanup on unmount
    };
  }, []);

  return (
    <div className="game">
      {!isGameOver ? (
        <>
          <div className="dino" style={{ bottom: `${dinoTop}px` }}></div>
          <div className="tree" style={{ left: `${treeLeft}px` }}></div>
        </>
      ) : (
        <div className="game-over">
          <h1>Game Over!</h1>
        </div>
      )}
    </div>
  );
};

export default Dino;
