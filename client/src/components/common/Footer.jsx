import React from 'react'
import { PiStudentFill } from "react-icons/pi";

function Footer() {
  return (
    <footer
      style={{
        background: "linear-gradient(90deg, #8B5CF6, #A855F7, #EC4899)",
      }}
      className="w-full py-10 text-white"
    >
      <div className="max-w-8xl mx-auto flex items-center justify-evenly">
      <div>
      <div className='flex items-center gap-2'>
        <PiStudentFill style={{color:'black',fontSize:'50px'}}className=' ml-[20px] '/>
            <h1 className='text-3xl text-white text-semibold'>TutorHub</h1>
            
      </div>  
        <div className='w-50 ml-10 text-[17px] text-bolder text-black font-semibold'>
           <p>
            Connecting students with the right Tutors.
           </p>
        </div>      
       </div>
          <div className='flex flex-col gap-4'>
            <h1 className='text-xl'>Quick Links</h1>
            
              <ul className='flex flex-col gap-2'>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href='/FindTutor'>Find Tutor</a></li>
                <li><a href='/BecomeTutor'>Become Tutor</a></li>
              </ul>
      
          </div> 
          <div className='flex flex-col gap-4'>
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
          <div className='flex flex-cols'>
            <h1>Quick Links</h1>
            <div>
              <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href='/FindTutor'>Find Tutor</a></li>
                <li><a href='/BecomeTutor'>Become Tutor</a></li>
              </ul>
            </div>
          </div>                     
         </div> 
         <hr className='mt-5'/>
       <div className='copyright mt-7'>
        <p className="text-center text-sm">
          &copy; {new Date().getFullYear()} TutorHub. All rights reserved.
        </p>
      </div>    
     
    </footer>
  );
}

export default Footer;
