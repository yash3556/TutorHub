import React from 'react'
import laptop from '../../assets/laptop.png'
import { FaStar } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { FaChalkboardTeacher } from "react-icons/fa";
import { SiBookstack } from "react-icons/si";
import { MdOutlineSchool } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";
function Hero() {
  return (
    <section id='hero'>
   <div className="w-full min-h-screen flex flex-col-reverse lg:flex-row items-center justify-between px-6 md:px-10 lg:px-20 py-10 gap-10">
         <div className="w-full lg:w-1/2 text-center lg:text-left">
<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F3E8FF] border border-[#E9D5FF]">
              <h1><MdOutlineSchool style={{color:'#8B5CF6',fontSize:'18px' }} /></h1>
              <h1 style={{color:'#8B5CF6',fontSize:'14px' }}>India's Trusted Tutor Platform</h1>
            </div>
           <div className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mt-4">
              <h1>Find the <span style={{color:'#8B5CF6' }}>Perfect Tutor</span></h1>
              <h1>For Your Learning Journey</h1>
            </div>
            <div className="mt-4 max-w-xl mx-auto lg:mx-0 text-md">
              <p>Connect with verified tutors and motivated students.
                 Learn smarter,teach better and achieve your academic
                 goals through personalizes education.
              </p>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className='px-3 py-2 rounded-md border w-43  mr-2'
               style={{backgroundColor:'#8B5CF6',color:'White'}}>
                <span className='flex gap-2 items-center h-10 ml-3'>Find a Tutor  <FaArrowRight/></span></button>
              <button className='border-2 px-3 py-2 w-45 rounded-md'
                     style={{borderColor:'#8B5CF6'}}>
                  <span className='flex items-center h-9 gap-2 '>
                    Become a Tutor <FaArrowRight/>
                    </span>
              </button>
            </div>
           <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              <div className="flex flex-col items-center">
                <FaStar className='ml-4' style={{color:'#F59E0B',fontSize:'25px'}}/>
                <h1 className='mt-1'>4.9</h1>
                <p className='text-md'>Rating</p>
              </div>
              <div className="hidden lg:block bg-zinc-200 h-20 w-px"></div>
             <div className="flex flex-col items-center">
                <FaUsers className='ml-4' style={{color:'#8B5CF6',fontSize:'25px'}} />
                <h1 className='mt-1'>5000+</h1>
                <p>Users</p>
              </div>
              <div className="hidden lg:block bg-zinc-200 h-20 w-px"></div>             
              <div className="flex flex-col items-center">
                <FaChalkboardTeacher className='ml-4' style={{color:'#06B6D4',fontSize:'25px'}}/>
                <h1 className='mt-1'>1000+</h1>
                <p>Tutors</p>
              </div>
              <div className="hidden lg:block bg-zinc-200 h-20 w-px"></div>              
              <div className="flex flex-col items-center">
                <SiBookstack className='ml-4 ' style={{color:'#A855F7',fontSize:'25px'}}/>
                <h1 className='mt-1'>30+</h1>
                <p>Subjects</p>
              </div>
             
            </div>
 
         </div>

         <div className="w-full lg:w-1/2 flex justify-center">
           <img  src={laptop} alt="image"/>
         </div>
    </div>
    </section>
  )
}

export default Hero
