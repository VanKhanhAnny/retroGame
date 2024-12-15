import { useState } from 'react';
import './App.css';
import musicFile from '../public/background-audio.mp3';
import Dino from './dino.jsx';

const App = () => {
  const [countdown, setCountdown] = useState(null);
  const [showButton, setShowButton] = useState(true);
  const [buttonText, setButtonText] = useState("Play Music");
  const [audio] = useState(new Audio(musicFile));
  const [isPlaying, setIsPlaying] = useState(false);
  const [showGame, setShowGame] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);
  const [showRequire, setShowRequire] = useState(false);

  const handleMusic = () => {
    if (!isPlaying) {
      setButtonText("Stop Music");
      audio.play();
      setIsPlaying(true);
    } else {
      setButtonText("Play Music");
      audio.pause();
      setIsPlaying(false);
    }
  }

  const handleGameStart = () => {
    setShowButton(false);
    setCountdown(3);

    let count = 3;
    const interval = setInterval(() => {
      setCountdown(count-1);
      count -= 1;
      if (count < 1) {
        clearInterval(interval);
        setCountdown(null);
        setShowGame(true);
        setShowQuestion(true);
        setShowRequire(true);
      }
    }, 1000);
  };
  
  return (
    <div style = {{ fontFamily: 'myfont'}} className = "app-background">
      <div className = "content">
        <button className = "music-play-button" onClick = {handleMusic}>{buttonText}</button>
        { showButton &&
          (<button onClick = {handleGameStart} className = "button">Game Start</button>)
        }

        {countdown !== null && (
          <div className = "countdown">
            <h1>{countdown}</h1>
          </div>
        )}

        {showGame && <Dino />}

        {showRequire && (
          <div className = "require">
            <h1>
            Please press the A, B, C, or D command corresponding to the answer you choose to jump
            </h1>
          </div>
        )}
        

        { showQuestion && (
          <div className = "question">
            1. What is the primary cause of climate change? <br />
            A. Volcanic eruptions <br />
            B. Deforestation <br />
            C. Greenhouse gas emissions <br />
            D. Ocean currents
          </div>
        )}
      </div>
    </div>
  );
};
export default App
