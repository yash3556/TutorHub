import React,{ useRef, useState } from 'react'
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
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useToast } from "../../context/ToastContext";
import { sendContactMessage } from "../../services/contactService";

gsap.registerPlugin(useGSAP, ScrollTrigger);

 function Contact() {
  const contactRef = useRef();
  const { notify } = useToast();
  const [isSending, setIsSending] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    website: "",
  });

  const handleChange = (event) => {
    setFormData((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSending(true);
    try {
      const response = await sendContactMessage(formData);
      notify(response.message || "Thanks for your message. Our team will be in touch.", "success");
      setFormData({ fullName: "", email: "", phone: "", subject: "", message: "", website: "" });
    } catch (error) {
      notify(error.response?.data?.message || "We couldn't send your message. Please try again later.", "error");
    } finally {
      setIsSending(false);
    }
  };

  useGSAP(() => {

    gsap.from(".badge", {
      x:-100,
      duration: 0.5,
      ease:"power4.out",
      opacity:0,
      scrollTrigger:{
        trigger:".badge",
        start:"top 90%",
        end:"bottom 80%",
        //markers:true,
        scrub:2,
      }
    });

    gsap.from(".contact-img", {
      x:200,
      duration: 2,
      ease:"power4.out",
      opacity:0,
      scrollTrigger:{
        trigger:".contact-img",
        start:"top 90%",
        end:"bottom 100%",
        //markers:true,
        scrub:2,
      }
    });
     gsap.from(".content", {
      x:200,
      duration: 2,
      ease:"power4.out",
      opacity:0,
      scrollTrigger:{
        trigger:".content",
        start:"top 90%",
        end:"bottom 70%",
        //markers:true,
        scrub:2,
      }
    });

    gsap.from(".btn", {
      x:-50,
      duration: 2,
      ease:"power4.out",
      opacity:0,
      scrollTrigger:{
        trigger:".btn",
        start:"top 90%",
        end:"bottom 70%",
       // markers:true,
        scrub:2,
      }
    });

    gsap.from(".form-area", {
      y:50,
      x:-50,
      duration: 2,
      stagger: 0.2,
      ease:"power4.out",
      opacity:0,
      scrollTrigger:{
        trigger:".form-area",
        start:"top 85%",
        end:"bottom 30%",
        //markers:true,
        scrub:2,
      }
    });

    gsap.from(".contact-details", {
      y:50,
      x:50,
      duration: 1,
      ease:"power4.out",
      opacity:0,
      scrollTrigger:{
        trigger:".contact-details",
        start:"top 85%",
        end:"bottom 30%",
        // markers:true,
        scrub:2,
      }
    });
  }, {scope:contactRef});
  return (
     <section id='contact' ref={contactRef}>
       <div className='w-full px-6 py-10 md:px-10 lg:px-16'>
         <div className='flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between'>
           <div className='w-full lg:w-[48%]'>
             <div className='badge mb-4 inline-flex items-center gap-2 rounded-lg border border-primary-light bg-primary-light px-4 py-2'>
               <MdOutlineEmail className='text-lg text-primary' />
               <h2 className='text-sm font-semibold text-primary'>Contact TutorHub</h2>
             </div>
             <div>
               <h1 className='content text-4xl font-bold md:text-5xl'>Let's Build Better</h1>
               <h1 className='content text-4xl font-bold text-primary md:text-5xl'>Learning Together</h1>
               <p className='content max-w-xl text-justify mt-5 text-md text-slate-700'>Have questions, suggestions, or need assistance? Our team is here to help students and tutors at every step.</p>
             </div>
             <div className='mt-8 flex flex-col gap-3 sm:flex-row sm:items-center'>
               <a href="mailto:yashkush660@gmail.com" className='btn inline-flex w-full items-center justify-center rounded-md border border-primary bg-primary px-4 py-3 text-white transition hover:bg-primary-hover sm:w-auto'>
                 <span className='flex items-center gap-2'>Contact us <FaArrowRight /></span>
               </a>
               <a href='#faq' className='btn inline-flex w-full items-center justify-center rounded-md border-2 border-primary px-4 py-3 text-slate-900 transition hover:bg-primary-light sm:w-auto'>
                 <span className='flex items-center gap-2'>View FAQs <FaArrowRight /></span>
               </a>
             </div>
             <form className='contact-form mt-6' onSubmit={handleSubmit}>
               <label className="contact-honeypot" aria-hidden="true">
                 Leave this field empty
                 <input
                   name="website"
                   value={formData.website}
                   onChange={handleChange}
                   tabIndex={-1}
                   autoComplete="off"
                 />
               </label>
               <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                 <div className='form-area flex w-full items-center gap-3 rounded-md border border-gray-200 bg-white px-3 py-4 shadow-sm'>
                   <FaRegUser className='text-primary' />
                   <label className="sr-only" htmlFor="contact-fullName">Full name</label>
                   <Input id='contact-fullName' type='text' name='fullName' value={formData.fullName} onChange={handleChange} placeholder='Full Name' required maxLength={120} className='w-full outline-none bg-transparent placeholder:text-gray-600' />
                 </div>
                 <div className='form-area flex w-full items-center gap-3 rounded-md border border-gray-200 bg-white px-3 py-4 shadow-sm'>
                   <MdOutlineEmail className='text-primary' />
                   <label className="sr-only" htmlFor="contact-email">Email address</label>
                   <Input id='contact-email' type='email' name='email' value={formData.email} onChange={handleChange} placeholder='Email Address' required maxLength={254} className='w-full outline-none bg-transparent placeholder:text-gray-600' />
                 </div>
                 <div className='form-area flex w-full items-center gap-3 rounded-md border border-gray-200 bg-white px-3 py-4 shadow-sm'>
                   <FiPhone className='text-primary' />
                   <label className="sr-only" htmlFor="contact-phone">Phone number (optional)</label>
                   <Input id='contact-phone' type='tel' name='phone' value={formData.phone} onChange={handleChange} placeholder='Phone Number (optional)' maxLength={30} className='w-full outline-none bg-transparent placeholder:text-gray-600' />
                 </div>
                 <div className='form-area flex w-full items-center gap-3 rounded-md border border-gray-200 bg-white px-3 py-4 shadow-sm'>
                   <CiShoppingTag className='text-primary' />
                   <label className="sr-only" htmlFor="contact-subject">Subject</label>
                   <Input id='contact-subject' type='text' name='subject' value={formData.subject} onChange={handleChange} placeholder='Subject' required maxLength={150} className='w-full outline-none bg-transparent placeholder:text-gray-600' />
                 </div>
               </div>
               <div className='form-area mt-4 flex w-full items-start gap-3 rounded-md border border-gray-200 bg-white px-3 py-4 shadow-sm'>
                 <BiMessageRoundedDots className='text-primary' />
                 <label className="sr-only" htmlFor="contact-message">Message</label>
                 <textarea id="contact-message" name="message" value={formData.message} onChange={handleChange} placeholder='Write your message' rows={5} maxLength={5000} required className='w-full resize-y bg-transparent text-sm outline-none placeholder:text-gray-600' />
               </div>
               <div className="form-area">
                <button type="submit" disabled={isSending} className='mt-6 block w-full rounded-md bg-primary px-5 py-2 text-white transition hover:bg-primary-hover sm:w-auto'>
                  <span className='flex h-9 items-center justify-center gap-2'><BiMessageRoundedDots /> {isSending ? "Sending..." : "Send Message"}</span>
                </button>
               </div>
             </form>
           </div>
           <div className='w-full lg:w-[48%] flex flex-col items-center justify-start gap-8'>
             <div className='w-full max-w-xl overflow-hidden rounded-[30px] bg-white shadow-2xl'>
               <img src={ContactImage} alt='Contact' className='contact-img w-full h-auto object-cover' />
             </div>
             <div className=' contact-details grid w-full grid-cols-1 gap-4 sm:grid-cols-2'>
               <div className=' flex items-center gap-3 rounded-2xl border border-cyan-100 bg-cyan-50 p-4 shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl'>
                 <IoLocationSharp className='text-2xl text-cyan-700' />
                 <div>
                   <h1 className='text-md mb-2 font-semibold'>Office</h1>
                   <p>Kanpur, Uttar Pradesh India</p>
                 </div>
               </div>
               <div className=' flex items-center gap-3 rounded-2xl border border-cyan-100 bg-cyan-50 p-4 shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl'>
                 <MdOutlineEmail className='text-primary' />
                 <div>
                   <h1 className='text-md mb-2 font-semibold'>Email</h1>
                   <a className="contact-email-link" href="mailto:yashkush660@gmail.com">yashkush660@gmail.com</a>
                 </div>
               </div>
               <div className=' flex items-center gap-3 rounded-2xl border border-cyan-100 bg-cyan-50 p-4 shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl'>
                 <FiPhone className='text-primary' />
                 <div>
                   <h1 className='text-md mb-2 font-semibold'>Phone</h1>
                   <p>+91 78967 19067</p>
                 </div>
               </div>
               <div className=' flex items-center gap-3 rounded-2xl border border-cyan-100 bg-cyan-50 p-4 shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl'>
                 <FaRegClock className='text-primary' />
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
