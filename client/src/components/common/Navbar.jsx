import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import React, { useState } from 'react';
import { PiStudentFill } from 'react-icons/pi';
import { Link } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';

gsap.registerPlugin(useGSAP);
function Navbar() {
 

 const navRef = useRef();
   

useGSAP(() => {
  const tl = gsap.timeline();

 

 tl.fromTo(
  ".toggle,.logoo,.logo,.navLink,.auth-btn",
  {
    
    opacity: 0,
    scale:0,
    
  },
  {
    scale:1,
    opacity: 1,
    duration: 1,
    delay:0.5,
    ease: "power4.out",
    stagger:0.08,
  }
);
 tl.fromTo(
  ".navLink,.auth-btn",
  {
    x:-5,
    y: 0,
    opacity: 0,
  },
  {
    x:0,
    y: 0,
    opacity: 1,
    duration: 0.5,
    ease: "expo.out",
    stagger:0.08,
  }
);




 
})

  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Find Tutor', href: '/FindTutor' },
    { label: 'Become Tutor', href: '/BecomeTutor' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
    { label: 'FAQs', href: '#faq' },
    { label: 'Privacy', href: '#privacy' },
    { label: 'Terms', href: '#terms' },
  ];

  const closeMenu = () => setMenuOpen(false);

  return (
    <header ref= {navRef}className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="relative flex items-center justify-between gap-3 px-4 py-3 md:px-6">
        <div className="flex items-center gap-2">
          <PiStudentFill style={{ color: '#8B5CF6', fontSize: '50px' }} className="logoo ml-0" />
          <h1 className="logo text-xl font-semibold text-slate-800 md:text-2xl">TutorHub</h1>
        </div>

        <nav className="hidden items-center gap-4 text-[13px] text-slate-700 xl:gap-5 xl:text-[14px] lg:flex">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className="navLink transition hover:text-violet-600">
              {link.label}
            </a>
          ))}
        </nav>

        <div className=" hidden items-center gap-2 lg:flex">
          <Link to="/login" className="auth-btn rounded-md bg-violet-500 px-3 py-2 text-xs font-medium text-white transition hover:bg-violet-600 sm:text-sm">
            Login
          </Link>
          <Link to="/signup" className="auth-btn text-xs font-medium text-slate-700 transition hover:text-violet-600 sm:text-sm">
            Sign Up
          </Link>
        </div>

        <button
          type="button"
          className="toggle flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-700 transition hover:bg-slate-100 lg:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <HiX size={22} /> : <HiMenu size={22} />}
        </button>
      </div>

      {menuOpen && (
        <div className="absolute left-0 right-0 top-full border-t border-slate-200 bg-white shadow-lg lg:hidden">
          <nav className="flex flex-col gap-4 px-4 py-5 text-slate-700">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="navLink rounded-md px-2 py-2 transition hover:bg-violet-50 hover:text-violet-600"
                onClick={closeMenu}
              >
                {link.label}
              </a>
            ))}

            <div className="mt-2 flex flex-col gap-3 border-t border-slate-200 pt-4">
              <Link to="/login" className="auth-btn rounded-md bg-violet-500 px-4 py-2 text-center text-sm font-medium text-white" onClick={closeMenu}>
                Login
              </Link>
              <Link to="/signup" className="auth-btn rounded-md border border-slate-200 px-4 py-2 text-center text-sm font-medium" onClick={closeMenu}>
                Sign Up
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;
