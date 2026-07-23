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
    <div className='w-full min-h-screen flex items-center justify-evenly '>
         <div className="left ml-25 mb-25">
            <div className="box inline-flex items-center gap-2 px-4 py-2 rounded-full mb-1
            bg-[#F3E8FF] text-[#7C3AED] border border-[#E9D5FF]">
              <h1><MdOutlineSchool style={{color:'#8B5CF6',fontSize:'18px' }} /></h1>
              <h1 style={{color:'#8B5CF6',fontSize:'14px' }}>India's Trusted Tutor Platform</h1>
            </div>
            <div className="main text-5xl">
              <h1>Find the <span style={{color:'#8B5CF6' }}>Perfect Tutor</span></h1>
              <h1>For Your Learning Journey</h1>
            </div>
            <div className="w-[60%] mt-2 text-md">
              <p>Connect with verified tutors and motivated students.
                 Learn smarter,teach better and achieve your academic
                 goals through personalizes education.
              </p>
            </div>
            <div className="buttons mt-6">
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
            <div className="icons text-center flex items-center mt-10 justify-evenly h-30 w-140" >
              <div className='flex flex-col gap-1'>
                <FaStar className='ml-4' style={{color:'#F59E0B',fontSize:'25px'}}/>
                <h1 className='mt-1'>4.9</h1>
                <p className='text-md'>Rating</p>
              </div>
              <div className='bg-zinc-200 h-20 w-1.5'></div>
              <div className='flex flex-col gap-2'>
                <FaUsers className='ml-4' style={{color:'#8B5CF6',fontSize:'25px'}} />
                <h1 className='mt-1'>5000+</h1>
                <p>Users</p>
              </div>
              <div className='bg-zinc-200 h-20 w-1.5'></div>              
              <div className='flex flex-col gap-2'>
                <FaChalkboardTeacher className='ml-4' style={{color:'#06B6D4',fontSize:'25px'}}/>
                <h1 className='mt-1'>1000+</h1>
                <p>Tutors</p>
              </div>
              <div className='bg-zinc-200 h-20 w-1.5'></div>              
              <div className='flex flex-col gap-2'>
                <SiBookstack className='ml-4 ' style={{color:'#A855F7',fontSize:'25px'}}/>
                <h1 className='mt-1'>30+</h1>
                <p>Subjects</p>
              </div>
             
            </div>
 
         </div>

         <div className="right w-[75%] mr-20 mb-20">
           <img  src={laptop} alt="image"/>
         </div>
    </div>
  )
}

export default Hero
