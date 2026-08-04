import React,{useState} from 'react'
import sign from '../../assets/sign.png'
import Input from '../../components/common/Input'
import student from '../../assets/student.jpg'
import teacher from '../../assets/teacher.jpg'
import { FaRegUser } from "react-icons/fa6";
import { BsShieldFillCheck } from "react-icons/bs";
import { HiMiniUsers } from "react-icons/hi2";
import { IoRocketSharp } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import { FaEye } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";



function Login() {
    const navigate = useNavigate();
    const [formData,setFormData] = useState({
      email:"",
      password:""
    })

    const handleChange =(e)=>{
      setFormData({
        ...formData,
        [e.target.name]:e.target.value,
      });
    }

    const handleSubmit =  async (e) =>{
      e.preventDefault();
      if(!formData.email || !formData.password){
         alert("Missing fields!");
        return;
      }
      try {
        const res = await axios.post(
          "http://localhost:3000/api/auth/login",formData,
          {
           withCredentials:true
          }
        );
        alert(res.data.message);
        console.log(res.data);

      if (res.data.user.role === "student") {
            navigate("/FindTutor");
        } else if (res.data.user.role === "teacher") {
        navigate("/BecomeTutor");
       }
      } catch (error) {
         console.log(error);
         alert(error.response?.data?.message || "Something went wrong");  
      }
    }

    return (
    <main className='relative isolate min-h-screen overflow-hidden bg-slate-50 px-4 py-8 sm:px-6 lg:px-10'>
      <div className='pointer-events-none absolute -left-24 -top-24 -z-10 h-72 w-72 rounded-full bg-amber-200/40 blur-3xl' />
      <div className='pointer-events-none absolute -bottom-32 -right-20 -z-10 h-96 w-96 rounded-full bg-blue-200/40 blur-3xl' />

      <div className='mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(420px,520px)] lg:gap-16'>
        <section className='order-1 w-full lg:order-2'>
          <div className='animate-fade-up rounded-3xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/70 sm:p-8'>
           <div className='mb-7'>
            <h1 className='text-4xl sm:text-5xl text-center mb-2'>Tutor<span className='text-amber-400'>Hub</span></h1>
             <p className='mb-3 text-sm font-semibold text-center text-amber-500'>Welcome back! Continue your learning journey.</p>
             <h2 className='mt-2 text-2xl tracking-tight text-center sm:text-xl'>Welcome Back</h2>
             <p className='mt-1 text-sm leading-6 text-center text-slate-500'>Login to continue learning or teaching with TutorHub.</p>
           </div>

           <form className='flex w-full flex-col gap-8' onSubmit={handleSubmit}>
              {[
                  { icon: MdOutlineEmail, label: 'Email address', name: 'email', type: 'email', placeholder: 'Enter your email', color: 'text-violet-500' },
                     { icon: FaEye, label: 'Password', name: 'password', type: 'password', placeholder: 'Create a strong password', color: 'text-amber-500' },
                
              ].map(({ icon: Icon, label, name, type, placeholder, color }) => (
                <label key={name} className='flex w-full items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 transition-all duration-300 focus-within:border-amber-400 focus-within:bg-white focus-within:shadow-md'>
                  <Icon className={`shrink-0 text-xl ${color}`} aria-hidden='true' />
                  <span className='flex min-w-0 flex-1 flex-col gap-1'>
                    <span className='text-xs font-bold uppercase tracking-wide text-slate-500'>{label}</span>
                    <Input type={type} name={name} placeholder={placeholder} value={formData[name]} onChange={handleChange} className='w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400' />
                  </span>
                </label>
              ))}
                <div className="flex justify-end -mt-2">
                  <button type="button"
                    className="text-sm font-medium text-blue-600 transition-colors hover:text-blue-800 hover:underline">
                    Forgot Password?
                  </button>
                </div>
              <button type='submit' className='mt-3 inline-flex w-full items-center justify-center rounded-2xl bg-slate-900 px-5 py-3.5 font-bold text-white shadow-lg shadow-slate-300 transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-500 hover:shadow-amber-200 focus:outline-none focus:ring-4 focus:ring-amber-200'>Login <IoRocketSharp className='ml-2 text-lg' aria-hidden='true' /></button>
           </form>
          </div>
        </section>
        <section className='order-2 flex flex-col items-center text-center lg:order-1 lg:items-start lg:text-left'>
          <div className='relative mb-8 w-full max-w-lg animate-float'>
            <div className='absolute inset-8 rounded-full bg-amber-300/30 blur-2xl' />
            <img src={sign} alt='Student learning with a tutor' className='relative mx-auto h-auto w-full rounded-3xl object-cover shadow-2xl shadow-slate-300/60 lg:mx-0' />
          </div>

          <div className='max-w-xl animate-fade-up'>
            <p className='mb-3 text-sm font-bold uppercase tracking-[0.25em] text-amber-500'>Your learning community</p>
            <h1 className='text-3xl tracking-tight sm:text-4xl lg:text-5xl'>Teach Better. <span className='text-amber-500'>Grow Together.</span></h1>
            <p className='mt-5 text-base leading-7 text-slate-600 sm:text-lg'>TutorHub connect students with verified tutors
              and tutors with eager students.
            </p>
          </div>
        </section>        
      </div>
    </main>
  )
}

export default Login
