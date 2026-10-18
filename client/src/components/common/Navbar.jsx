import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import React, { useState } from 'react';
import { PiStudentFill } from 'react-icons/pi';
import { Link } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';
import { FiMoon, FiSun } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';

gsap.registerPlugin(useGSAP);
function Navbar() {
  const navRef = useRef();
  const { isDark, setIsDark } = useTheme();

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
    { label: 'Home', href: '#hero' },
    { label: 'Find Tutor', href: '/FindTutor' },
    { label: 'Become Tutor', href: '/teacher' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
    { label: 'FAQs', href: '#faq' },
    { label: 'Privacy', href: '#privacy' },
    { label: 'Terms', href: '#terms' },
  ];

  const closeMenu = () => setMenuOpen(false);

  return (
    <header ref={navRef} className="site-navbar sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="relative flex items-center justify-between gap-3 px-4 py-3 md:px-6">
        <div className="flex items-center gap-2">
          <PiStudentFill style={{ fontSize: '50px' }} className="logoo ml-0 text-amber-500" />
          <h1 className="logo text-xl font-semibold text-slate-800  md:text-2xl">Tutor<span className="text-primary">Hub</span></h1>
        </div>

        <nav className="hidden items-center gap-4 text-[15px] font-bold text-slate-700 xl:gap-5 xl:text-base xl:flex">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className="navLink hover:border-b-3 hover:text-primary">
              <span className='inline-block cursor-pointer duration-300 ease-in-out hover:scale-105'>
                {link.label}
                </span>
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 xl:flex">
          <button
            type="button"
            className="site-theme-toggle"
            aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
            aria-pressed={isDark}
            onClick={() => setIsDark((current) => !current)}
          >
            {isDark ? <FiSun aria-hidden="true" /> : <FiMoon aria-hidden="true" />}
            <span>{isDark ? "Light" : "Dark"}</span>
          </button>
          <Link to="/login" className="auth-btn rounded-md bg-primary px-3 py-2 text-xs font-medium text-white hover:bg-primary-hover sm:text-sm">
            Login
          </Link>
          <Link to="/signup" className="auth-btn text-xs font-medium text-primary hover:text-primary-hover sm:text-sm">
            Sign Up
          </Link>
        </div>

        <button
          type="button"
          className="toggle flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-700 hover:bg-slate-100 xl:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <HiX size={22} /> : <HiMenu size={22} />}
        </button>
      </div>

      {menuOpen && (
        <div className="absolute left-0 right-0 top-full border-t border-slate-200 bg-white shadow-lg xl:hidden">
          <nav className="flex flex-col gap-3 px-4 py-5 text-base font-bold text-slate-700">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="navLink rounded-md px-3 py-2.5 transition hover:bg-violet-50 hover:text-violet-600 duration-300 ease-in-out"
                onClick={closeMenu}
              >
              <span className='cursor-pointer'>
                {link.label}
                </span>
              </a>
            ))}

            <div className="mt-2 flex flex-col gap-3 border-t border-slate-200 pt-4">
              <button
                type="button"
                className="site-theme-toggle w-full justify-center"
                aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
                aria-pressed={isDark}
                onClick={() => setIsDark((current) => !current)}
              >
                {isDark ? <FiSun aria-hidden="true" /> : <FiMoon aria-hidden="true" />}
                <span>{isDark ? "Switch to light theme" : "Switch to dark theme"}</span>
              </button>
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
