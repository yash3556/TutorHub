import React from 'react'
import laptop from '../../assets/laptop.png'
import { FaStar } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { FaChalkboardTeacher } from "react-icons/fa";
import { SiBookstack } from "react-icons/si";
import { MdOutlineSchool } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

function Hero() {
  const heroRef = useRef();
  
  useGSAP(() => {

  const mm = gsap.matchMedia();

  mm.add("(min-width:1024px)", () => {

    const tl = gsap.timeline();

  tl.from(".badge", {
    x:-30,
    y: -30,
    opacity: 0,
    duration: 0.6,
    delay:1.4,
  
  })

  .from(".hero-heading", {
    x:-30,
    y:-30,
    opacity: 0,
    duration: 0.5,
    
  }, "-=0.2")

  .from(".hero-heading2", {
    x:-50,
    
    opacity: 0,
    duration: 0.5,
    
  }, ">")

   .from(".hero-img", {
    y:-100,
    x: 100,
    opacity: 0,
    duration: 3,
  }, "<")

  .from(".hero-text", {
    
    y:30,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
  }, "-=2.4")

  .from(".hero-btn", {
    
    y:30,
    opacity: 0,
    duration: 0.6,
    stagger: 0.20,
    ease: "back.out(1.7)"
  }, "-=1.5")

 .from(".stat", {
    y: 30,
    x:-30,
    opacity: 0,
    duration: 1,
    stagger: 0.20,
    ease: "power3.out",
    
    
  }, "-=0.2")
   });

//    mm.add("(max-width:1023px)", () => {

//    let tl=gsap.timeline();

//     tl.from(".hero-img", {
//     y: 80,
//     opacity: 0,
//     duration: 1,
//   })

//    tl.from(".badge", {
//     y: -30,
//     opacity: 0,
//     duration: 0.6,
//   },"<")

//   tl.from(".hero-heading", {
//     scale:0.7,
//     opacity: 0,
//     duration: 1,
//     ease: "power3.out",
//   }, "-=0.2")

//   tl.from(".hero-heading2", {
//     scale:0.7,
//     opacity: 0, 
//     duration: 1,
//     ease: "power3.out",
//   }, "<")

//     gsap.from(".hero-text", {
//     y: 30,
//     opacity: 0,
//     duration: 0.8,
//     ease: "power3.out",
//     scrollTrigger:{
//       trigger:".hero-text",
//       start:"top bottom",
//       end: "bottom 70%",
//       scrub: 2, 
      
      
//     }
//   })

//   gsap.from(".stat", {
//     y: 30,
//     opacity: 0,
//     duration: 0.8,
//     stagger: 0.15,
//     ease: "power3.out",
//     scrollTrigger: {
//       trigger: ".stat",
//       start: "top 100%",
//       end: "bottom 70%",
//       scrub: 2,
      
//     }
//   })

//    gsap.from(".hero-btn", {
//     y: 30,
//     opacity: 0,
//     duration: 0.6,
//     stagger: 0.15,
//     ease: "back.out(1.7)",
//     scrollTrigger:{
//       trigger:".hero-btn",
//       start: "top bottom",
//       end: "bottom 70%",
//       scrub: 2, 
        
//     }
//   })
// });

//  mm.add("(max-width:1023px)", () => {

//    gsap.from(".hero-text", {
//     y: 30,
//     opacity: 0,
//     duration: 0.8,
//     ease: "power3.out",
//     scrollTrigger:{
//       trigger:".hero-text",
//       start:"top bottom",
//       end: "bottom 70%",
//       scrub: 2, 
      
      
//     }
//   })

//   gsap.from(".stat", {
//     y: 30,
//     opacity: 0,
//     duration: 0.8,
//     stagger: 0.15,
//     ease: "power3.out",
//     scrollTrigger: {
//       trigger: ".stat",
//       start: "top 100%",
//       end: "bottom 70%",
//       scrub: 2,
      
//     }
//   })

//    gsap.from(".hero-btn", {
//     y: 30,
//     opacity: 0,
//     duration: 0.6,
//     stagger: 0.15,
//     ease: "back.out(1.7)",
//     scrollTrigger:{
//       trigger:".hero-btn",
//       start: "top bottom",
//       end: "bottom 70%",
//       scrub: 2, 
        
//     }
//   })
//  });



   return () => mm.revert();
 }, { scope: heroRef });

  return (

    <section id='hero' ref={heroRef} >
   <div className="w-full  flex flex-col-reverse lg:flex-row items-center justify-between px-6 md:px-10 lg:px-20 py-6 gap-8">

         <div className="w-full lg:w-1/2 text-center lg:text-left">
<div className="badge inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F3E8FF] border border-[#E9D5FF]">
              <h1><MdOutlineSchool style={{color:'#8B5CF6',fontSize:'18px' }} /></h1>
              <h1 style={{color:'#8B5CF6',fontSize:'14px' }}>India's Trusted Tutor Platform</h1>
            </div>
           <div className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mt-4">
              <h1 className="hero-heading" ><span >Find the</span> <span className='text-yellow-500'>Perfect Tutor</span></h1>
              <h1 className="hero-heading2">For Your Learning Journey</h1>
            </div>
            <div className="hero-text mt-4 max-w-xl mx-auto lg:mx-0 text-md">
              <p>Connect with verified tutors and motivated students.
                 Learn smarter,teach better and achieve your academic
                 goals through personalizes education.
              </p>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className='hero-btn px-3 py-2 rounded-md border w-43  mr-2 bg-yellow-500 hover:bg-yellow-400'
               style={{color:'White'}}>
                <span className='flex gap-2 items-center h-10 ml-3'>Find a Tutor  <FaArrowRight/></span></button>
              <button className='hero-btn border-2 px-3 py-2 w-45 rounded-md'
                     style={{borderColor:'#8B5CF6'}}>
                  <span className='flex items-center h-9 gap-2 '>
                    Become a Tutor <FaArrowRight/>
                    </span>
              </button>
            </div>
   <div className=" mt-12 grid grid-cols-2 md:grid-cols-4 gap-8">

            <div className="stat text-center">
              <FaStar className="mx-auto text-yellow-500 text-3xl mb-2" />
              <h2 className="font-bold text-2xl">4.9</h2>
              <p className="text-gray-500">Rating</p>
            </div>

            <div className="stat text-center">
              <FaUsers className="mx-auto text-violet-600 text-3xl mb-2" />
              <h2 className="font-bold text-2xl">5000+</h2>
              <p className="text-gray-500">Users</p>
            </div>

            <div className="stat text-center">
              <FaChalkboardTeacher className="mx-auto text-cyan-500 text-3xl mb-2" />
              <h2 className="font-bold text-2xl">1000+</h2>
              <p className="text-gray-500">Tutors</p>
            </div>

            <div className=" stat text-center">
              <SiBookstack className="mx-auto text-purple-500 text-3xl mb-2" />
              <h2 className="font-bold text-2xl">30+</h2>
              <p className="text-gray-500">Subjects</p>
            </div>

             
            </div>
 
         </div>

         <div className="hero-img w-full lg:w-1/2 flex justify-center">
           <img  src={laptop} alt="image"/>
         </div>
    </div>
    </section>
  )
}

export default Hero
