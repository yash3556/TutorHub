import React from 'react'
import AboutImage from '../../assets/AboutImage.png' 
import { TbTargetArrow } from "react-icons/tb";
import { FaEye } from "react-icons/fa";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

function About() {

const aboutRef = useRef(null);

useGSAP(() => {

  const mm = gsap.matchMedia();

  mm.add("(min-width: 1024px)", () => {

    // Image
    gsap.from(".about-image", {
      x: -150,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".about-image",
        start: "top 80%",
        end: "top 45%",
        scrub: 1.5,
      },
    });

    // Content
    gsap.from(".about-content", {
      x: 150,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".about-content",
        start: "top 80%",
        end: "top 45%",
        scrub: 1.5,
      },
    });

    // Cards
    gsap.from(".about-card", {
      y: 80,
      scale: 0.7,
      opacity: 0,
      // stagger: 0.2,
      ease: "expo.out",
      scrollTrigger: {
        trigger: ".about-card",
        start: "top 90%",
        end: "top 55%",
        scrub: 1.5,
      },
    });

  });

  // mm.add("(max-width: 1023px)", () => {

  //   // Image
  //   gsap.from(".about-image", {
  //     y: 80,
  //     scale: 0.9,
  //     opacity: 0,
  //     duration: 1,
  //     ease: "power2.out",
  //     scrollTrigger: {
  //       trigger: ".about-image",
  //       start: "top 90%",
  //       end: "top 70%",
  //       scrub: 1,
  //       markers:true,
  //     },
  //   });

  //   // Content
  //   gsap.from(".about-content", {
  //     y: 80,
  //     opacity: 0,
  //     duration: 1,
  //     ease: "power2.out",
  //     scrollTrigger: {
  //       trigger: ".about-content",
  //       start: "top 90%",
  //       end: "top 70%",
  //       scrub: 1,
  //     },
  //   });

  //   // Cards
  //   gsap.from(".about-card", {
  //     y: 60,
  //     scale: 0.85,
  //     opacity: 0,
  //     stagger: 0.15,
  //     ease: "power2.out",
  //     scrollTrigger: {
  //       trigger: ".about-card",
  //       start: "top 95%",
  //       end: "top 75%",
  //       scrub: 1,
  //     },
  //   });

  // });

  return () => mm.revert();

}, { scope: aboutRef });


  return (
    <section id='about' ref={aboutRef}>
      <div className='w-full px-6 md:px-10 lg:px-20 py-6 lg:py-8 mt-10'>
         <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="w-full lg:w-1/2 flex justify-center">
                <img src={AboutImage} alt='About image' 
                  className=" about-image w-full max-w-sm md:max-w-md lg:max-w-lg rounded-2xl shadow-2xl"/>
            </div>
             <div className="about-content w-full lg:w-1/2 text-center lg:text-left">
                <h3 className="text-blue-500 text-2xl">About us</h3>
                <h1 className="mt-2 text-3xl md:text-4xl lg:text-5xl font-bold">Our Story</h1>
                <div >
                    <p className="mt-4 max-w-xl mx-auto lg:mx-0 text-justify text-gray-600 leading-7">TutorHub was created with one clear purpose: to make quality education accessible to every learner. We believe finding the right tutor should be simple, transparent, and affordable.</p>
                    <p className='max-w-lg text-justify text-md mt-2'>Our platform connects motivated students with passionate educators, creating meaningful opportunities for growth and success.</p>
                </div>
             </div>
         </div>
        <div className="mt-16 lg:mt-24 grid grid-cols-1 lg:grid-cols-2 gap-8">

<div className="about-card flex items-start gap-6 rounded-2xl border border-cyan-100 bg-cyan-50 p-6 md:p-8 shadow-md  hover:-translate-y-2 hover:shadow-xl">
    <TbTargetArrow className="text-purple-700 text-5xl lg:text-6xl shrink-0" />

    <div >
      <h2 className="text-2xl font-bold text-slate-800">Our Mission</h2>
      <p className="mt-3 text-slate-600 leading-7">
        To connect every student with the right tutor through technology,
        making personalized learning accessible to everyone.
      </p>
    </div>
  </div>

<div className="about-card flex items-start gap-6 rounded-2xl border border-cyan-100 bg-cyan-50 p-6 md:p-8 shadow-md  hover:-translate-y-2 hover:shadow-xl">
    <FaEye className="text-sky-500 text-5xl lg:text-6xl shrink-0" />

    <div>
      <h2 className="text-2xl font-bold text-slate-800">Our Vision</h2>
      <p className="mt-3 text-slate-600 leading-7">
        To become India's most trusted learning marketplace where students
        and tutors grow together.
      </p>
    </div>
  </div>

</div>
       </div>
    </section>
  )
}

export default About
