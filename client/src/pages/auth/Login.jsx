import React from 'react'
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

function Login() {
  return (
    <main className='relative isolate min-h-screen overflow-hidden bg-slate-50 px-4 py-8 sm:px-6 lg:px-10'>
      <div className='pointer-events-none absolute -left-24 -top-24 -z-10 h-72 w-72 rounded-full bg-amber-200/40 blur-3xl' />
      <div className='pointer-events-none absolute -bottom-32 -right-20 -z-10 h-96 w-96 rounded-full bg-blue-200/40 blur-3xl' />

      <div className='mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(420px,520px)] lg:gap-16'>
        <section className='order-2 flex flex-col items-center text-center lg:order-1 lg:items-start lg:text-left'>
          <div className='relative mb-8 w-full max-w-lg animate-float'>
            <div className='absolute inset-8 rounded-full bg-amber-300/30 blur-2xl' />
            <img src={loginImage} alt='Student learning with a tutor' className='relative mx-auto h-auto w-full rounded-3xl object-cover shadow-2xl shadow-slate-300/60 lg:mx-0' />
          </div>

          <div className='max-w-xl animate-fade-up'>
            <p className='mb-3 text-sm font-bold uppercase tracking-[0.25em] text-amber-500'>Your learning community</p>
            <h1 className='text-4xl tracking-tight sm:text-5xl lg:text-6xl'>Learn. <span className='text-amber-500'>Teach.</span> Grow.</h1>
            <p className='mt-5 text-base leading-7 text-slate-600 sm:text-lg'>Join TutorHub and become part of a community that believes in knowledge, connection, and growth.</p>
          </div>

          <div className='mt-8 grid w-full max-w-xl grid-cols-3 gap-3 sm:gap-6'>
            {[
              { icon: BsShieldFillCheck, title: 'Verified Tutors', text: 'Learn from experts', color: 'text-emerald-500' },
              { icon: HiMiniUsers, title: 'Trusted Platform', text: 'Safe & secure', color: 'text-blue-500' },
              { icon: IoRocketSharp, title: 'Achieve Goals', text: 'Grow your future', color: 'text-amber-500' },
            ].map(({ icon: Icon, title, text, color }) => (
              <div key={title} className='animate-fade-up rounded-2xl border border-white/80 bg-white/70 p-3 shadow-sm backdrop-blur-sm sm:p-4'>
                <Icon className={`mx-auto mb-3 text-2xl ${color}`} aria-hidden='true' />
                <h2 className='text-xs font-bold sm:text-sm'>{title}</h2>
                <p className='mt-1 text-[11px] text-slate-500 sm:text-xs'>{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className='order-1 w-full lg:order-2'>
          <div className='animate-fade-up rounded-3xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/70 sm:p-8'>
           <div className='mb-7'>
             <p className='mb-2 text-sm font-semibold text-amber-500'>Start your journey</p>
             <h2 className='text-3xl tracking-tight sm:text-4xl'>Create your account</h2>
             <p className='mt-2 text-sm leading-6 text-slate-500'>Join thousands of students and tutors using TutorHub.</p>
           </div>

           <form className='flex w-full flex-col gap-4'>
              {[
                { icon: FaRegUser, label: 'Full name', name: 'fullName', type: 'text', placeholder: 'Enter your full name', color: 'text-blue-500' },
                { icon: MdOutlineEmail, label: 'Email address', name: 'email', type: 'email', placeholder: 'Enter your email', color: 'text-violet-500' },
                { icon: FiPhone, label: 'Phone number', name: 'phone', type: 'tel', placeholder: 'Enter your phone number', color: 'text-emerald-500' },
                { icon: FaEye, label: 'Password', name: 'password', type: 'password', placeholder: 'Create a strong password', color: 'text-amber-500' },
                { icon: FaEye, label: 'Confirm password', name: 'confirmPassword', type: 'password', placeholder: 'Confirm your password', color: 'text-rose-500' },
              ].map(({ icon: Icon, label, name, type, placeholder, color }) => (
                <label key={name} className='flex w-full items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 transition-all duration-300 focus-within:border-amber-400 focus-within:bg-white focus-within:shadow-md'>
                  <Icon className={`shrink-0 text-xl ${color}`} aria-hidden='true' />
                  <span className='flex min-w-0 flex-1 flex-col gap-1'>
                    <span className='text-xs font-bold uppercase tracking-wide text-slate-500'>{label}</span>
                    <Input type={type} name={name} placeholder={placeholder} className='w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400' />
                  </span>
                </label>
              ))}

              <fieldset className='mt-2'>
                <legend className='mb-3 text-sm font-bold text-slate-800'>Choose your role</legend>
                <div className='grid gap-3 sm:grid-cols-2'>
                  <label className='group flex cursor-pointer items-center gap-3 rounded-2xl border-2 border-slate-200 p-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-400 has-checked:border-amber-400 has-checked:bg-amber-50'>
                    <img src={student} alt='' className='h-12 w-12 rounded-full object-cover' />
                    <span className='min-w-0 flex-1'><strong className='block text-sm'>Student</strong><span className='block text-xs text-slate-500'>I want to learn.</span></span>
                    <Input type='radio' name='role' value='student' className='h-4 w-4 accent-amber-500' />
                  </label>
                  <label className='group flex cursor-pointer items-center gap-3 rounded-2xl border-2 border-slate-200 p-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-400 has-checked:border-blue-400 has-checked:bg-blue-50'>
                    <img src={teacher} alt='' className='h-12 w-12 rounded-full object-cover' />
                    <span className='min-w-0 flex-1'><strong className='block text-sm'>Teacher</strong><span className='block text-xs text-slate-500'>I want to teach.</span></span>
                    <Input type='radio' name='role' value='teacher' className='h-4 w-4 accent-blue-500' />
                  </label>
                </div>
              </fieldset>

              <button type='submit' className='mt-2 inline-flex w-full items-center justify-center rounded-2xl bg-slate-900 px-5 py-3.5 font-bold text-white shadow-lg shadow-slate-300 transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-500 hover:shadow-amber-200 focus:outline-none focus:ring-4 focus:ring-amber-200'>Create account <IoRocketSharp className='ml-2 text-lg' aria-hidden='true' /></button>
           </form>
          </div>
        </section>
      </div>
    </main>
  )
}

export default Login
