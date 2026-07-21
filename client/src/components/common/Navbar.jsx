import React from 'react'
import { PiStudentFill } from "react-icons/pi";
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className='w-full h-15 flex items-center justify-evenly gap-5 sticky top-0 z-50 bg-white shadow-sm'>
      <div className='flex items-center gap-2'>
        <PiStudentFill style={{color:'#8B5CF6',fontSize:'50px'}}className=' ml-[20px] '/>
            <h1 className='text-3xl'>TutorHub</h1>
      </div>

        <nav style={{color:'#1F2937'}} className='flex items-center gap-6 text-md'>
         <a href="#home">Home</a>
         <a href='/FindTutor'>Find Tutor</a>
         <a href='/BecomeTutor'>Become Tutor</a>
         <a href='#about'>About</a>
         <a hef='#contact'>Contact</a>
        </nav>
         <div className='gap-5 flex items-center'>
          <Link style={{background:'#8B5CF6',color:'white'}} 
            className='px-3 py-2 rounded-md' to="/login">Login</Link>
           <Link to="/signup">Sign Up</Link>
         </div>
    </div>
  )
}

export default Navbar
