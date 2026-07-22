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
function Footer() {
  return (
    <footer
      style={{
        background: "linear-gradient(90deg, #8B5CF6, #A855F7, #EC4899)",
      }}
      className="w-full py-10 text-white"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:flex-wrap justify-between gap-10 px-6">
      <div className='flex flex-col items-center md:items-start'>
      <div className='flex items-center gap-2'>
        <PiStudentFill style={{color:'black',fontSize:'50px'}}className=' ml-[20px] '/>
            <h1 className='text-3xl text-white text-semibold'>TutorHub</h1>
            
      </div>  
        <div className='max-w-xs mt-3 text-[17px] text-bolder text-black font-semibold'>
           <p className='max-w-xs text-center md:text-left'>
            Connecting students with the right Tutors.
           </p>
        </div>      
        <div className='social-icon flex justify-center md:justify-start gap-3 mt-5' >
           <div className='border border-white p-2 rounded-full inline-block'>
            <TiSocialInstagram style={{fontSize:'30px',color:'white'}}/>
           </div>
           <div className='border border-white p-2 rounded-full inline-block'>
            <TiSocialFacebook style={{fontSize:'30px',color:'white'}}/>
           </div>
           <div className='border border-white p-2 rounded-full inline-block'>
            <FaGithub style={{fontSize:'30px',color:'white'}}/>
           </div>
           <div className='border border-white p-2 rounded-full inline-block'>
            <FaLinkedin style={{fontSize:'30px',color:'white'}}/>
           </div>
        </div>
       </div>
          <div className='flex flex-col gap-4 '>
            <h1 className='text-xl'>Quick Links</h1>
            
              <ul className='flex flex-col gap-2'>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href='/FindTutor'>Find Tutor</a></li>
                <li><a href='/BecomeTutor'>Become Tutor</a></li>
              </ul>
      
          </div> 
          <div className='flex flex-col gap-4 '>
            <h1 className='text-xl font-semibold'>Resource</h1>
            <div>
              <ul className='flex flex-col gap-2'>
                <li><a href="#home">FAQs</a></li>
                <li><a href="#about">Privacy</a></li>
                <li><a href='/FindTutor'>Terms</a></li>
                <li><a href='/BecomeTutor'>Help Center</a></li>
              </ul>
            </div>
          </div> 
          <div className='flex flex-col gap-4 '>
            <h1 className='text-xl font-semibold'>Contact</h1>
            <div>
              <ul className='flex flex-col gap-3'>
                <li className='flex items-center gap-2'><FaLocationDot/>Kanpur</li>
                <li className='flex items-center gap-2'><IoIosMail/>Support@gmail.com</li>
                <li className='flex items-center gap-2'><FaPhone/>+91 9978979776</li>
              </ul>
            </div>
          </div>                     
         </div> 
         <hr className='mt-10'/>
       <div className='copyright mt-7'>
        <p className="text-center text-sm">
          &copy; {new Date().getFullYear()} TutorHub. All rights reserved.
        </p>
      </div>    
     
    </footer>
  );
}

export default Footer;
