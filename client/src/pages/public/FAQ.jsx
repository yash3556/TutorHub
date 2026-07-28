import React, { useState } from 'react'
import FaImage from '../../assets/FaImage.png'
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
function FAQ() {
    const [index,setIndex] = useState(null);

  const faqs = [
  {
    question: "What is TutorHub?",
    answer:
      "TutorHub is a platform that connects students with verified tutors across different subjects.",
  },
  {
    question: "How can I become a tutor?",
    answer:
      "Click on the 'Become Tutor' button, register yourself, and complete your profile.",
  },
  {
    question: "Is TutorHub free for students?",
    answer:
      "Yes, students can search and connect with tutors for free.",
  },
  {
    question: "How do I contact a tutor?",
    answer:
      "After finding a tutor, you can view their contact details and reach out directly.",
  },
];
  return (
     <section id='faq' className="py-16 bg-slate-50">
       <div className='mx-auto flex max-w-7xl flex-col gap-6 px-4 text-center sm:px-6 lg:px-8'>
         <div className='flex items-center justify-center'>
           <div className='inline-flex items-center justify-center rounded-full border border-[#E9D5FF] bg-[#F3E8FF] px-4 py-2'>
             <h2 className='text-sm font-semibold text-[#8B5CF6]'>FAQs</h2>
           </div>
         </div>

         <div className='mx-auto max-w-3xl space-y-4'>
           <h1 className='text-3xl font-bold leading-tight text-slate-900 sm:text-4xl lg:text-5xl'>Frequently Asked Questions</h1>
           <p className='text-blue-600 text-lg font-medium'>Got questions? We’ve got answers.</p>
           <p className='mx-auto max-w-2xl text-base leading-8 text-slate-600'>Find quick answers to the most common questions about <span className='text-blue-700'>TutorHub</span>.</p>
         </div>

         <div className='mt-12 grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center'>
           <div className='flex justify-center'>
             <img src={FaImage} alt='FAQ illustration' className='w-full max-w-md rounded-4xl shadow-2xl sm:max-w-lg' />
           </div>

           <div className='space-y-4'>
             {faqs.map((faq, idx) => (
               <div key={idx} className='overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm transition duration-300 hover:shadow-lg'>
                 <button
                   onClick={() => setIndex(index === idx ? null : idx)}
                   className='flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6 sm:py-6'
                   aria-expanded={index === idx}
                 >
                   <span className='text-base font-semibold text-slate-900 sm:text-lg'>{faq.question}</span>
                   {index === idx ? (
                     <FaChevronUp className='text-violet-600' />
                   ) : (
                     <FaChevronDown className='text-slate-500' />
                   )}
                 </button>
                 {index === idx && (
                   <div className='border-t border-slate-200 px-5 pb-5 pt-0 text-slate-600 leading-7 sm:px-6'>
                     {faq.answer}
                   </div>
                 )}
               </div>
             ))}
           </div>
         </div>
       </div>
     </section>
  )
}

export default FAQ
