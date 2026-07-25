import React from 'react'
import { PiStudentFill } from "react-icons/pi";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";
import { FaPhone } from "react-icons/fa6";
import { TiSocialInstagram } from "react-icons/ti";
import { TiSocialFacebook } from "react-icons/ti";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import './Footer.css';
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);
function Footer() {
  const footerRef = useRef();
  useGSAP(() => {
  
  gsap.from(".fade-up", {
   y: 100,
  opacity: 0,
  scale: 0.75,
  filter: "blur(8px)",
  duration: 1.5,
  ease: "expo.out",
  
  scrollTrigger: {
    trigger: footerRef.current,
    start: "top 100%",
    end:"top 38%",
    
    scrub:2,
  }
});
},{scope: footerRef})
  return (
    <footer ref={footerRef} 
      style={{
        background: "linear-gradient(90deg, #FBC02D, #A855F7, #EC4899)",
      }}
      className="w-full py-10 text-white"
    >
      <div className=" fade-up max-w-7xl mx-auto flex flex-col md:flex-row md:flex-wrap justify-between gap-10 px-6">
      <div className='fade-up flex flex-col items-center md:items-start'>
      <div className='fade-up flex items-center gap-2'>
        <PiStudentFill style={{color:'black',fontSize:'50px'}}className=' ml-[20px] '/>
            <h1 className='fade-up text-3xl text-white text-semibold'>TutorHub</h1>
            
      </div>  
        <div className='fade-up max-w-xs mt-3 text-[17px] text-bolder text-black font-semibold'>
           <p className='fade-up max-w-xs text-center md:text-left'>
            Connecting students with the right Tutors.
           </p>
        </div>      
        <div className='fade-up social-icon flex justify-center md:justify-start gap-3 mt-5' >
           <div className='fade-up border border-white p-2 rounded-full inline-block'>
            <TiSocialInstagram style={{fontSize:'30px',color:'white'}}/>
           </div>
           <div className='fade-up border border-white p-2 rounded-full inline-block'>
            <TiSocialFacebook style={{fontSize:'30px',color:'white'}}/>
           </div>
           <div className='fade-up border border-white p-2 rounded-full inline-block'>
            <FaGithub style={{fontSize:'30px',color:'white'}}/>
           </div>
           <div className='fade-up border border-white p-2 rounded-full inline-block'>
            <FaLinkedin style={{fontSize:'30px',color:'white'}}/>
           </div>
        </div>
       </div>
          <div className='fade-up flex flex-col gap-4 '>
            <h1 className=' fade-up text-xl'>Quick Links</h1>
            
              <ul className=' fade-up flex flex-col gap-2'>
                <li className='fade-up'><a href="#home">Home</a></li>
                <li className='fade-up'><a href="#about">About</a></li>
                <li className='fade-up'><a href='/FindTutor'>Find Tutor</a></li>
                <li className='fade-up'><a href='/BecomeTutor'>Become Tutor</a></li>
              </ul>
      
          </div> 
          <div className='fade-up flex flex-col gap-4 '>
            <h1 className='fade-up text-xl font-semibold'>Resource</h1>
            <div>
              <ul className='fade-up flex flex-col gap-2'>
                <li className='fade-up '><a href="#home">FAQs</a></li>
                <li className='fade-up '><a href="#about">Privacy</a></li>
                <li className='fade-up '><a href='/FindTutor'>Terms</a></li>
                <li className='fade-up '><a href='/BecomeTutor'>Help Center</a></li>
              </ul>
            </div>
          </div> 
          <div className='fade-up flex flex-col gap-4 '>
            <h1 className='fade-up fade-up text-xl font-semibold'>Contact</h1>
            <div>
              <ul className='fade-up flex flex-col gap-3'>
                <li className='fade-up flex items-center gap-2'><FaLocationDot/>Kanpur</li>
                <li className='fade-up flex items-center gap-2'><IoIosMail/>Support@gmail.com</li>
                <li className='fade-up flex items-center gap-2'><FaPhone/>+91 9978979776</li>
              </ul>
            </div>
          </div>                     
         </div> 
         <hr className='fade-up mt-10'/>
       <div className='fade-up copyright mt-7'>
        <p className="fade-up text-center text-sm">
          &copy; {new Date().getFullYear()} TutorHub. All rights reserved.
        </p>
      </div>    
     
    </footer>
  );
}

export default Footer;
