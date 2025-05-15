import React from 'react';
import bg from './assets/bgg.jpg';
import AnimatedText from './AnimatedText';

const LandingPage = () => {
  const firstLine = ['Expand', 'Knowledg', 'By'];
  const secondLine = ['Reading'];
  const thirdLine = ['Books'];

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Background image */}
      <img
        className="absolute inset-0 w-full h-full object-cover z-0"
        src={bg}
        alt="Background"
      />

      {/* Centered Content */}
      <div className="relative z-10 flex flex-col justify-center items-center text-center px-5 py-10 min-h-screen">
        <h1 className="font-serif text-4xl md:text-6xl lg:text-8xl text-amber-200 mb-10 leading-snug mt-62">
          {/* First Line: Expand Knowledg By */}
          <div className="font-bold animate-typeIn animate-glow space-x-4">
            {firstLine.map((word, index) => (
              <span
                key={index}
                style={{ animationDelay: `${index * 0.2}s` }}
                className="inline-block"
              >
                {word}
              </span>
            ))}
          </div>

          {/* Second Line: Reading */}
          <div
            className="font-bold animate-typeIn animate-glow mt-4"
            style={{ animationDelay: `${firstLine.length * 0.2}s` }}
          >
            {secondLine[0]}
          </div>

          {/* Third Line: Books */}
          <div
            className="font-bold animate-typeIn animate-glow mt-4"
            style={{ animationDelay: `${(firstLine.length + 1) * 0.2}s` }}
          >
            {thirdLine[0]}
          </div>
        </h1>

        <AnimatedText />
      </div>
    </div>
  );
};

export default LandingPage;
