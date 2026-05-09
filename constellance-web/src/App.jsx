import { useState, useRef, useEffect } from 'react'
import {getPath} from './utils'
import Time, { TimeOfDay } from './components/Time'
import Bubble from './components/Bubble'
import './App.css'
import DateDisplay from './components/Date'

function App() {
  const audioRef = useRef(null);   // specimen audio
  const ambientRef = useRef(null); // ambient bubbles
  
  const containerRef = useRef(null);
  const [selectedBubble, setSelectedBubble] = useState(null);
  const [hoveredBubble, setHoveredBubble] = useState(null);
  const [mousePos, setMousePos] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });


  const bubbleData = [
    { 
      title: "yearbook", 
      date: "Spring 2026",
      type: "Cyanotype",
      description: "to the people we pass",
      image: getPath("cutouts/1.png"),
      words: ["years", "fragment", "memory", "nostalgia", "confusion", "preservation", "love", "tender", "found"],
      audio: getPath("audio/radio.wav"),
    },
    { 
      title: "board games", 
      date: "April 2026",
      type: "Cutout",
      description: "to the games we play",
      image: getPath("cutouts/2.JPG"),
      words: ["passing", "party", "fun", "friends", "frivolous", "chase", "avoid", "ride", "found"],
      audio: getPath("audio/party.flac"),
    },
    { 
      title: "violin", 
      date: "April 2026",
      type: "Cutout",
      description: "to the things we forget",
      image: getPath("cutouts/3.png"),
      words: ["forget", "opportunity", "propserous", "opportunity", "potential", "regret", "cost", "sacrifice", "redemption"],
      audio: getPath("audio/wood.wav"),
    },
    { 
      title: "chopsticks", 
      date: "April 2026",
      type: "Cutout",
      description: "to what we hold dear to us",
      image: getPath("cutouts/cutout4.png"),
      words: ["love", "mind", "bonds", "sacred", "family", "culture", "tradition", "practice", "study"],
      audio: getPath("audio/bells.wav"),
    },
    { 
      title: "duck", 
      date: "April 2026",
      type: "Cutout",
      description: "to the silly moments",
      image: getPath("cutouts/5.png"),
      words: ["freedom", "joy", "laughter", "ease", "warmth", "comfort", "#alive", "frivalous", "playful"],
      audio: getPath("audio/duck.wav"),
    },
    { 
      title: "shoebox", 
      date: "April 2026",
      type: "Cutout",
      description: "to the passions we have",
      image: getPath("cutouts/6.png"),
      words: ["passion", "art", "focus", "desire", "fervor", "pursuit", "meaning", "reward", "courage"],
      audio: getPath("audio/fire.wav"),
    },
  ];


  const handleBubbleClick = (index) => {
    if (selectedBubble === index) {
      setSelectedBubble(null);
      audioRef.current?.pause();
      audioRef.current.currentTime = 0;
      ambientRef.current?.play();
    } else {
      setSelectedBubble(index);
      ambientRef.current?.pause();
      audioRef.current.src = bubbleData[index].audio;
      audioRef.current?.play();
    }
  };
  
  const handleBackgroundClick = () => {
    setSelectedBubble(null);
    audioRef.current?.pause();
    audioRef.current.currentTime = 0;
    ambientRef.current?.play();
  };


  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      // Remove all the scrolling code
    };
  
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [selectedBubble]);

  useEffect(() => {
    const start = () => {
      ambientRef.current?.play();
      window.removeEventListener('mousedown', start);
    };
    window.addEventListener('mousedown', start);
    return () => window.removeEventListener('mousedown', start);
  }, []);
  

  return (
    <>
      <div className='app-container'  ref={containerRef} onClick={handleBackgroundClick}>
      {selectedBubble === null && (
        <div 
          className="telescope-overlay"
          style={{
            '--mouse-x': `${mousePos.x}px`,
            '--mouse-y': `${mousePos.y}px`
          }}
        />
      )}
        <audio ref={audioRef} loop />

        <h1 className='header-meta'>today's date is <DateDisplay /></h1>
        <p className='time-meta'>current time: <Time /></p>
        <p className='weather-meta'>it is currently: <TimeOfDay /></p>
        
        {hoveredBubble !== null && (
          <p className='bubble-meta'>{bubbleData[hoveredBubble].title}</p>
        )}
        
        <div className='sky1'>
          {selectedBubble !== null && (
            <div 
              className="background-image active"
              style={{ backgroundImage: `url(${bubbleData[selectedBubble].image})` }}
            />
          )}
          
          {bubbleData.map((bubble, i) => (
            <Bubble 
              key={i}
              index={i}
              metadata={bubble}
              isSelected={selectedBubble === i}
              onClick={() => handleBubbleClick(i)}
              onHover={() => setHoveredBubble(i)}
              onLeave={() => setHoveredBubble(null)}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default App