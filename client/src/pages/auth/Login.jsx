import React,{useState} from 'react'
import sign from '../../assets/sign.png'
import Input from '../../components/common/Input'
import { IoRocketSharp } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { FiEye, FiEyeOff } from "react-icons/fi";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../context/ToastContext'



function Login() {
    const navigate = useNavigate();
    const { setUser } = useAuth();
    const { notify } = useToast();
    const [formData,setFormData] = useState({
      email:"",
      password:""
    })
    const [showPassword, setShowPassword] = useState(false);

    const handleChange =(e)=>{
      setFormData({
        ...formData,
        [e.target.name]:e.target.value,
      });
    }

    const handleSubmit =  async (e) =>{
      e.preventDefault();
      if(!formData.email || !formData.password){
         notify("Enter your email and password to continue.", "error");
        return;
      }
      try {
        const res = await axios.post(
          "http://localhost:3000/api/auth/login",formData,
          {
           withCredentials:true
          }
        );
          if (res.data?.user) setUser(res.data.user);

      if (res.data?.user?.role === "student") {
            notify("Welcome back!", "success");
            navigate("/FindTutor");
        } else if (res.data?.user?.role === "teacher") {
        notify("Welcome back!", "success");
        navigate("/teacher");
       } else {
        notify("We couldn't verify your account. Please try again.", "error");
       }
      } catch (error) {
         notify(error.response?.data?.message || "Unable to sign in. Please try again.", "error");
      }
    }

    return (
    <main className='relative isolate min-h-screen bg-slate-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-10'>

      <div className='mx-auto grid max-w-7xl items-center gap-7 lg:min-h-[calc(100vh-4rem)] lg:grid-cols-[minmax(0,1fr)_minmax(400px,500px)] lg:gap-12'>
        <section className='order-1 w-full lg:order-2'>
          <div className='animate-fade-up rounded-3xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/70 sm:p-7'>
           <div className='mb-5'>
            <h1 className='text-center text-4xl sm:text-5xl mb-2'>Tutor<span className='text-primary'>Hub</span></h1>
             <p className='mb-3 text-center text-sm font-semibold text-primary'>Welcome back! Continue your learning journey.</p>
             <h2 className='mt-2 text-2xl tracking-tight text-center sm:text-xl'>Welcome Back</h2>
             <p className='mt-1 text-sm leading-6 text-center text-slate-500'>Login to continue learning or teaching with TutorHub.</p>
           </div>

           <form className='flex w-full flex-col gap-4' onSubmit={handleSubmit}>
              {[
                  { icon: MdOutlineEmail, label: 'Email address', name: 'email', type: 'email', placeholder: 'Enter your email', color: 'text-violet-500' },
                     { icon: FaEye, label: 'Password', name: 'password', type: 'password', placeholder: 'Create a strong password', color: 'text-amber-500' },
                
              ].map(({ icon: Icon, label, name, type, placeholder, color }) => (
                <div key={name} className='flex w-full items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 transition-colors focus-within:border-primary focus-within:bg-white focus-within:shadow-sm'>
                  <Icon className={`shrink-0 text-xl ${color}`} aria-hidden='true' />
                  <span className='flex min-w-0 flex-1 flex-col gap-1'>
                    <label htmlFor={name} className='text-xs font-bold uppercase tracking-wide text-slate-500'>{label}</label>
                    <div className='flex items-center gap-2'>
                      <Input type={name === "password" && showPassword ? "text" : type} name={name} placeholder={placeholder} value={formData[name]} onChange={handleChange} className='w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400' />
                      {name === "password" && (
                        <button
                          type="button"
                          className="shrink-0 rounded p-1.5 text-slate-500 transition hover:text-primary"
                          aria-label={showPassword ? "Hide password" : "Show password"}
                          aria-pressed={showPassword}
                          onClick={() => setShowPassword((visible) => !visible)}
                        >
                          {showPassword ? <FiEyeOff aria-hidden="true" /> : <FiEye aria-hidden="true" />}
                        </button>
                      )}
                    </div>
                  </span>
                </div>
              ))}
                <div className="flex justify-end -mt-2">
                  <button type="button"
                    className="text-sm font-medium text-primary transition-colors hover:text-primary-hover hover:underline">
                    Forgot Password?
                  </button>
                </div>
              <button type='submit' className='mt-3 inline-flex w-full items-center justify-center rounded-xl bg-primary px-5 py-3.5 font-bold text-white shadow-sm transition-colors hover:bg-primary-hover focus:outline-none focus:ring-4 focus:ring-primary-light'>Login <IoRocketSharp className='ml-2 text-lg' aria-hidden='true' /></button>
           </form>
          </div>
        </section>
        <section className='order-2 flex flex-col items-center text-center lg:order-1 lg:items-start lg:text-left'>
          <div className='relative mb-6 w-full max-w-lg animate-float'>
            <img src={sign} alt='Student learning with a tutor' className='relative mx-auto h-48 w-full rounded-3xl object-cover shadow-2xl shadow-slate-300/60 sm:h-64 lg:h-72 lg:mx-0' />
          </div>

          <div className='max-w-xl animate-fade-up'>
            <p className='mb-3 text-sm font-bold uppercase tracking-[0.25em] text-primary'>Your learning community</p>
            <h1 className='text-3xl tracking-tight sm:text-4xl lg:text-5xl'>Teach Better. <span className='text-primary'>Grow Together.</span></h1>
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
