const AnimatedText = () => {
    const text = 'Read , Learn , Grow , Repeat';
  
    return (
      <p className="hidden md:block text-3xl md:text-4xl font-semibold  flex-wrap text-white">
        {text.split('').map((char, index) => (
          <span
            key={index}
            className="text-amber-200 inline-block animate-typeIn animate-glow"
            style={{
              animationDelay: `${index * 0.1}s`, // Delay each character's animation
            }}
          >
            {char}
          </span>
        ))}
      </p>
    );
  };
  
  export default AnimatedText;
  