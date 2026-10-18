import React,{useState} from 'react'
import loginImage from '../../assets/loginImage.jpg'
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
import { FiEye, FiEyeOff } from "react-icons/fi";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useToast } from '../../context/ToastContext'
import { AUTH_API_URL } from '../../services/authService'

function Signup() {
  const navigate = useNavigate();
  const { notify } = useToast();
  const [visiblePasswords, setVisiblePasswords] = useState({});
   const[formData,setFromData] = useState(({
    fullName:"",
    email:"",
    phone:"",
    password:"",
    confirmPassword:"",
    role:"",
   }));

   const handleChange=(e)=>{
     setFromData({
      ...formData,
      [e.target.name]:e.target.value,
     });
     
    }
    
    const handleSubmit=async (e)=>{
      e.preventDefault();
        if (
    !formData.fullName ||
    !formData.email ||
    !formData.phone ||
    !formData.password ||
    !formData.confirmPassword ||
    !formData.role
  ) {
    notify("Complete all fields to create your account.", "error");
    return;
  } 
     if(formData.password !== formData.confirmPassword){
       notify("Your passwords don't match.", "error");
       return;
     }
     if(formData.password.length < 6){
      notify("Use a password with at least 6 characters.", "error");
      return;
     }
     if (!/\S+@\S+\.\S+/.test(formData.email)) {
        notify("Enter a valid email address.", "error");
         return;
      }
      try {
        const res = await axios.post(
          `${AUTH_API_URL}/signup`,
          formData,
          {
            withCredentials:true
          }
        );
        navigate("/login");
        notify(res.data.message || "Your account is ready. Please sign in.", "success");
      } catch (error) {
       notify(error.response?.data?.message || "Unable to create your account. Please try again.", "error");
       }
    };

     return (
    <main className='relative isolate min-h-screen bg-slate-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-10'>

      <div className='mx-auto grid max-w-7xl items-center gap-7 lg:min-h-[calc(100vh-4rem)] lg:grid-cols-[minmax(0,1fr)_minmax(420px,520px)] lg:gap-12'>
        <section className='order-2 flex flex-col items-center text-center lg:order-1 lg:items-start lg:text-left'>
          <div className='relative mb-6 w-full max-w-lg animate-float'>
            <img src={loginImage} alt='Student learning with a tutor' className='relative mx-auto h-44 w-full rounded-3xl object-cover shadow-2xl shadow-slate-300/60 sm:h-56 lg:h-64 lg:mx-0' />
          </div>

          <div className='max-w-xl animate-fade-up'>
            <p className='mb-3 text-sm font-bold uppercase tracking-[0.25em] text-primary'>Your learning community</p>
            <h1 className='text-3xl tracking-tight sm:text-4xl lg:text-5xl'>Learn. <span className='text-primary'>Teach.</span> Grow.</h1>
            <p className='mt-5 text-base leading-7 text-slate-600 sm:text-lg'>Join TutorHub and become part of a community that believes in knowledge, connection, and growth.</p>
          </div>

          <div className='mt-6 grid w-full max-w-xl grid-cols-3 gap-2 sm:gap-4'>
            {[
              { icon: BsShieldFillCheck, title: 'Verified Tutors', text: 'Learn from experts', color: 'text-emerald-500' },
              { icon: HiMiniUsers, title: 'Trusted Platform', text: 'Safe & secure', color: 'text-blue-500' },
              { icon: IoRocketSharp, title: 'Achieve Goals', text: 'Grow your future', color: 'text-amber-500' },
            ].map(({ icon: Icon, title, text, color }) => (
              <div key={title} className='animate-fade-up rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4'>
                <Icon className={`mx-auto mb-3 text-2xl ${color}`} aria-hidden='true' />
                <h2 className='text-xs font-bold sm:text-sm'>{title}</h2>
                <p className='mt-1 text-[11px] text-slate-500 sm:text-xs'>{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className='order-1 w-full lg:order-2'>
          <div className='animate-fade-up rounded-3xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/70 sm:p-7'>
           <div className='mb-5'>
             <p className='mb-2 text-sm font-semibold text-primary'>Start your journey</p>
             <h2 className='text-3xl tracking-tight sm:text-4xl'>Create your account</h2>
             <p className='mt-2 text-sm leading-6 text-slate-500'>Join thousands of students and tutors using TutorHub.</p>
           </div>

           <form onSubmit={handleSubmit} className='flex w-full flex-col gap-3'>
              {[
                { icon: FaRegUser, label: 'Full name', name: 'fullName', type: 'text', placeholder: 'Enter your full name', color: 'text-blue-500' },
                { icon: MdOutlineEmail, label: 'Email address', name: 'email', type: 'email', placeholder: 'Enter your email', color: 'text-violet-500' },
                { icon: FiPhone, label: 'Phone number', name: 'phone', type: 'phone', placeholder: 'Enter your phone number', color: 'text-emerald-500' },
                { icon: FaEye, label: 'Password', name: 'password', type: 'password', placeholder: 'Create a strong password', color: 'text-amber-500' },
                { icon: FaEye, label: 'Confirm password', name: 'confirmPassword', type: 'password', placeholder: 'Confirm your password', color: 'text-rose-500' },
              ].map(({ icon: Icon, label, name, type, placeholder, color }) => (
                <div key={name} className='flex w-full items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 transition-colors focus-within:border-primary focus-within:bg-white focus-within:shadow-sm'>
                  <Icon className={`shrink-0 text-xl ${color}`} aria-hidden='true' />
                  <span className='flex min-w-0 flex-1 flex-col gap-1'>
                    <label htmlFor={name} className='text-xs font-bold uppercase tracking-wide text-slate-500'>{label}</label>
                    <div className='flex items-center gap-2'>
                      <Input type={type === "password" && visiblePasswords[name] ? "text" : type} name={name} placeholder={placeholder} value={formData[name]} onChange={handleChange} className='w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400' />
                      {type === "password" && (
                        <button
                          type="button"
                          className="shrink-0 rounded p-1.5 text-slate-500 transition hover:text-primary"
                          aria-label={visiblePasswords[name] ? `Hide ${label.toLowerCase()}` : `Show ${label.toLowerCase()}`}
                          aria-pressed={Boolean(visiblePasswords[name])}
                          onClick={() => setVisiblePasswords((current) => ({ ...current, [name]: !current[name] }))}
                        >
                          {visiblePasswords[name] ? <FiEyeOff aria-hidden="true" /> : <FiEye aria-hidden="true" />}
                        </button>
                      )}
                    </div>
                  </span>
                </div>
              ))}

              <fieldset className='mt-2'>
                <legend className='mb-3 text-sm font-bold text-slate-800'>Choose your role</legend>
                <div className='grid gap-3 sm:grid-cols-2'>
                  <label className='group flex cursor-pointer items-center gap-3 rounded-2xl border-2 border-slate-200 p-3 transition-colors hover:border-primary has-checked:border-primary has-checked:bg-primary-light'>
                    <img src={student} alt='' className='h-12 w-12 rounded-full object-cover' />
                    <span className='min-w-0 flex-1'><strong className='block text-sm'>Student</strong><span className='block text-xs text-slate-500'>I want to learn.</span></span>
                    <Input type='radio' name='role' value='student' onChange={handleChange}  checked={formData.role === "student"} className='h-4 w-4 accent-primary' />
                  </label>
                  <label className='group flex cursor-pointer items-center gap-3 rounded-2xl border-2 border-slate-200 p-3 transition-colors hover:border-primary has-checked:border-primary has-checked:bg-primary-light'>
                    <img src={teacher} alt='' className='h-12 w-12 rounded-full object-cover' />
                    <span className='min-w-0 flex-1'><strong className='block text-sm'>Teacher</strong><span className='block text-xs text-slate-500'>I want to teach.</span></span>
                    <Input type='radio' name='role' value='teacher'checked={formData.role === "teacher"} onChange={handleChange} className='h-4 w-4 accent-primary' />
                  </label>
                </div>
              </fieldset>

              <button type='submit' className='mt-2 inline-flex w-full items-center justify-center rounded-xl bg-primary px-5 py-3.5 font-bold text-white shadow-sm transition-colors hover:bg-primary-hover focus:outline-none focus:ring-4 focus:ring-primary-light'>Create account <IoRocketSharp className='ml-2 text-lg' aria-hidden='true' /></button>
           </form>
          </div>
        </section>
      </div>
    </main>
  )
}

export default Signup
