import { useRef, useEffect } from 'react';
import '../styles/Bubble.css';

function FloatingWord({ word, index, total }) {
  const style = {
    '--orbit-a': `${250 + (index % 3) * 30}px`,
    '--orbit-b': `${200 + (index % 2) * 25}px`,
    '--orbit-duration': `${12 + index * 5}s`,
    '--orbit-delay': `${-(index * (20 / total))}s`,
    '--orbit-tilt': `${(index % 4) * 15 - 20}deg`,
    '--font-size': `${11 + (index % 3) * 2}px`,
  };

  return (
    <span className="orbiting-word" style={style}>
      {word}
    </span>
  );
}

export default function Bubble({ onClick, onHover, onLeave, index, metadata, isSelected }) {
  const words = metadata.words ?? ["specimen", "archival", "found", "trace", "memory"];

  return (
    <>
      {isSelected && (
        <div className="background-black" onClick={(e) => {
          e.stopPropagation();
          onClick();
        }} />
      )}
      <div
        className={`circle circle-${index} ${isSelected ? 'vignette' : ''}`}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        onMouseEnter={!isSelected ? onHover : undefined}
        onMouseLeave={!isSelected ? onLeave : undefined}
      >
        <img className={isSelected ? "bubble-hide" : "bubble-image"} src={metadata.image} alt="" />
        {isSelected && (
          <div className="microscope-world">
            <img
              className="vignette-image"
              src={metadata.image}
              alt=""
            />
            <p className='description'>"{metadata.description}"</p>
            <div className="word-orbit-container">
              {words.map((word, i) => (
                <FloatingWord key={word} word={word} index={i} total={words.length} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}