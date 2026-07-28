import React from 'react'
import Input from '../../components/common/Input'
import ContactImage from "../../assets/ContactImage.png"
import { MdOutlineEmail } from "react-icons/md";
import { FaRegUser } from "react-icons/fa6";
import { FiPhone } from "react-icons/fi";
import { CiShoppingTag } from "react-icons/ci";
import { BiMessageRoundedDots } from "react-icons/bi";
import { IoLocationSharp } from "react-icons/io5";
import { FaRegClock } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
function Contact() {
  return (
     <section id='contact'>
       <div className='w-full px-6 py-10 md:px-10 lg:px-16'>
         <div className='flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between'>
           <div className='w-full lg:w-[48%]'>
             <div className='inline-flex mb-4 items-center gap-2 px-4 py-2 rounded-full bg-[#F3E8FF] border border-[#E9D5FF]'>
               <MdOutlineEmail style={{color:'#8B5CF6',fontSize:'18px'}} />
               <h2 style={{color:'#8B5CF6',fontSize:'14px'}}>Contact TutorHub</h2>
             </div>
             <div>
               <h1 className='text-4xl font-bold md:text-5xl'>Let's Build Better</h1>
               <h1 className='text-4xl font-bold md:text-5xl text-yellow-500' style={{color:''}}>Learning Together</h1>
               <p className='max-w-xl text-justify mt-5 text-md text-slate-700'>Have questions, suggestions, or need assistance? Our team is here to help students and tutors at every step.</p>
             </div>
             <div className='mt-8 flex flex-col gap-3 sm:flex-row sm:items-center'>
               <button className='inline-flex w-full items-center justify-center rounded-md border px-4 py-3 bg-yellow-400 text-white transition hover:bg-yellow-600 sm:w-auto'>
                 <span className='flex items-center gap-2'>Contact us <FaArrowRight /></span>
               </button>
               <button className='inline-flex w-full items-center justify-center rounded-md border-2 border-[#8B5CF6] px-4 py-3 text-slate-900 transition hover:bg-cyan-50 sm:w-auto'>
                 <a href='#FAQs'><span className='flex items-center gap-2'>View FAQs <FaArrowRight /></span></a>
               </button>
             </div>
             <form className='mt-6'>
               <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                 <div className='w-full bg-gray-200 shadow-xl flex items-center gap-3 rounded-md px-3 py-4'>
                   <FaRegUser style={{color:'#8B5CF6',fontSize:'18px'}} />
                   <Input type='text' name='fullName' placeholder='Full Name' className='w-full outline-none bg-transparent placeholder:text-gray-600' />
                 </div>
                 <div className='w-full bg-gray-200 shadow-xl flex items-center gap-3 rounded-md px-3 py-4'>
                   <MdOutlineEmail style={{color:'#8B5CF6',fontSize:'18px'}} />
                   <Input type='email' name='email' placeholder='Email Address' className='w-full outline-none bg-transparent placeholder:text-gray-600' />
                 </div>
                 <div className='w-full bg-gray-200 shadow-xl flex items-center gap-3 rounded-md px-3 py-4'>
                   <FiPhone style={{color:'#8B5CF6',fontSize:'18px'}} />
                   <Input type='number' name='phone' placeholder='Phone Number' className='w-full outline-none bg-transparent placeholder:text-gray-600' />
                 </div>
                 <div className='w-full bg-gray-200 shadow-xl flex items-center gap-3 rounded-md px-3 py-4'>
                   <CiShoppingTag style={{color:'#8B5CF6',fontSize:'20px'}} />
                   <Input type='text' name='subject' placeholder='Subject' className='w-full outline-none bg-transparent placeholder:text-gray-600' />
                 </div>
               </div>
               <div className='w-full bg-gray-200 shadow-xl mt-4 flex items-start gap-3 rounded-md px-3 py-4'>
                 <BiMessageRoundedDots style={{color:'#8B5CF6',fontSize:'20px'}} />
                 <Input type='text' name='message' placeholder='Write your message' className='w-full outline-none bg-transparent placeholder:text-gray-600' />
               </div>
               <button className='w-full sm:w-auto block rounded-md bg-yellow-500 px-3 py-2 mt-6 text-white transition hover:bg-yellow-600' style={{color:'white'}}>
                 <span className='flex items-center justify-center h-9 gap-2'><BiMessageRoundedDots /> Send Message</span>
               </button>
             </form>
           </div>
           <div className='w-full lg:w-[48%] flex flex-col items-center justify-start gap-8'>
             <div className='w-full max-w-xl overflow-hidden rounded-[30px] bg-white shadow-2xl'>
               <img src={ContactImage} alt='Contact' className='w-full h-auto object-cover' />
             </div>
             <div className='grid w-full grid-cols-1 gap-4 sm:grid-cols-2'>
               <div className='flex items-center gap-3 rounded-2xl border border-cyan-100 bg-cyan-50 p-4 shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl'>
                 <IoLocationSharp className='text-2xl text-cyan-700' />
                 <div>
                   <h1 className='text-md mb-2 font-semibold'>Office</h1>
                   <p>Kanpur, Uttar Pradesh India</p>
                 </div>
               </div>
               <div className='flex items-center gap-3 rounded-2xl border border-cyan-100 bg-cyan-50 p-4 shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl'>
                 <MdOutlineEmail style={{color:'darkpink',fontSize:'18px'}} />
                 <div>
                   <h1 className='text-md mb-2 font-semibold'>Email</h1>
                   <p>support@tutorhub.com</p>
                 </div>
               </div>
               <div className='flex items-center gap-3 rounded-2xl border border-cyan-100 bg-cyan-50 p-4 shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl'>
                 <FiPhone style={{color:'green',fontSize:'18px'}} />
                 <div>
                   <h1 className='text-md mb-2 font-semibold'>Phone</h1>
                   <p>+91 78967 19067</p>
                 </div>
               </div>
               <div className='flex items-center gap-3 rounded-2xl border border-cyan-100 bg-cyan-50 p-4 shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl'>
                 <FaRegClock style={{color:'#8B5CF6',fontSize:'18px'}} />
                 <div>
                   <h1 className='text-md mb-2 font-semibold'>Working Hours</h1>
                   <p>Monday - Saturday</p>
                   <p>9:00 AM - 5:00 PM</p>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </div>
     </section>
  )
}

export default Contact
