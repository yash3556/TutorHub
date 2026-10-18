import React from "react";
import privacyImage from "../../assets/privacyImage.jpg";
import { MdOutlineSecurity } from "react-icons/md";
import { BsFillShieldLockFill } from "react-icons/bs";
import { FaUserAlt, FaBook } from "react-icons/fa";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

function Privacy() {

const privacyRef = useRef();

useGSAP(() => {

  const mm = gsap.matchMedia();

  mm.add("(min-width:1024px)", () => {

    // Badge
    gsap.from(".privacy-badge", {
      x: -80,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".privacy-badge",
        start: "top 95%",
        end: "top 60%",
        scrub: 1,
      },
    });

    // Heading + Line + Paragraph
    gsap.from(".privacy-content > *", {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.18,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".privacy-content",
        start: "top 80%",
        end: "top 45%",
        scrub: 1,
        // markers:true,
      },
    });

    // Feature Cards
    gsap.from(".privacy-card", {
      y: 80,
      opacity: 0,
      scale: 0.9,
      stagger: 0.18,
      duration: 1,
      ease: "expo.out",
      scrollTrigger: {
        trigger: ".privacy-card",
        start: "top 100%",
        end: "top 40%",
        scrub: 1.2,
      },
    });

    // Image
    gsap.from(".privacy-image", {
      x: 150,
      opacity: 0,
      duration: 1.3,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".privacy-image",
        start: "top 80%",
        end: "top 45%",
        scrub: 1.2,
      },
    });

    // Floating Image
    gsap.to(".privacy-image img", {
      y: -15,
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

  });

  return () => mm.revert();

}, { scope: privacyRef });


  return (
    <section
      ref={privacyRef}
      id="privacy"
      className="min-h-screen flex items-center py-16 px-6 md:px-12 lg:px-20"
    >
      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-12">

       
        <div className="w-full lg:w-1/2 text-center lg:text-left">

   
          <div className=" privacy-badge inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-100 px-4 py-2 mb-5">
            <MdOutlineSecurity className="text-blue-500 text-xl" />
            <span className="text-blue-600 font-medium">
              Your Privacy, Our Priority
            </span>
          </div>

        <div className="privacy-content">
          <h1 className=" text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
            Privacy at
          </h1>

          <h1 className="text-4xl font-bold text-primary sm:text-5xl lg:text-6xl">
            TutorHub
          </h1>

          <div className="mx-auto mt-4 h-1.5 w-20 rounded-full bg-accent lg:mx-0"></div>


          <p className=" mt-6 text-gray-600 leading-8 max-w-xl mx-auto lg:mx-0">
            We are committed to protecting your personal information and
            ensuring complete transparency in everything we do. Your data is
            handled securely, respectfully, and responsibly.
          </p>
          </div>


          <div className="privacy-card grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">

            <div className=" rounded-3xl border border-slate-200 bg-linear-to-br from-slate-50 via-white to-cyan-50 p-6 text-left shadow-xl shadow-cyan-100/40  hover:-translate-y-1">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-green-600 shadow-sm shadow-slate-200">
                <BsFillShieldLockFill className="text-2xl" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-slate-900">Secure Data</h3>
              <p className="mt-3 text-sm text-slate-500 leading-6">
                Your information is encrypted and protected with modern systems.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-linear-to-br from-slate-50 via-white to-violet-50 p-6 text-left shadow-xl shadow-violet-100/30  hover:-translate-y-1">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-blue-600 shadow-sm shadow-slate-200">
                <FaUserAlt className="text-2xl" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-slate-900">Respect Privacy</h3>
              <p className="mt-3 text-sm text-slate-500 leading-6">
                We never misuse or share your personal data without consent.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-linear-to-br from-slate-50 via-white to-pink-50 p-6 text-left shadow-xl shadow-pink-100/30  hover:-translate-y-1">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-pink-600 shadow-sm shadow-slate-200">
                <FaBook className="text-2xl" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-slate-900">Transparency</h3>
              <p className="mt-3 text-sm text-slate-500 leading-6">
                Clear policies and no hidden terms for total confidence.
              </p>
            </div>

          </div>
        </div>

        <div className="privacy-image w-full lg:w-1/2 flex justify-center">
          <div className="relative max-w-lg overflow-hidden rounded-[36px] bg-linear-to-br from-slate-100 via-white to-blue-50 p-4 shadow-2xl shadow-blue-200/30">
            <div className="absolute -right-8 -top-6 h-28 w-28 rounded-full bg-blue-200/40 blur-2xl" />
            <img
              src={privacyImage}
              alt="Privacy Illustration"
              className="relative w-full rounded-[28px] object-cover transition duration-500 hover:scale-[1.02]"
            />
          </div>
        </div>

      </div>
    </section>
  );
}

export default Privacy;