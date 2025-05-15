
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import logo from './assets/1.png';
const Intro = ({ onFinish }) => {
  const logoRef = useRef(null);
  const welcomeRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.to(logoRef.current, { opacity: 1, y: 0, duration: 1 })
      .to(welcomeRef.current, { opacity: 1, y: 0, duration: 1 }, "+=0.5")
      .to(".intro-container", { opacity: 0, duration: 1 }, "+=1")
      .call(onFinish); // يستدعي onFinish بعد الأنيميشن

  }, [onFinish]);

  return (
    <div className="intro-container fixed inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white flex flex-col justify-center items-center z-50">
      <h1 ref={logoRef} className="text-5xl opacity-0 translate-y-10"><img className='w-96 h-96 ' src={logo} alt="" /></h1>
      <h2 ref={welcomeRef} className="mt-2 text-3xl  md:text-5xl opacity-0 translate-y-10 font-serif">Welcome To The world of Books!</h2>
    </div>
  );
};

export default Intro;
