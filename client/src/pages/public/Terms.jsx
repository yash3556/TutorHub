import React, { useRef } from 'react';
import termsImage from '../../assets/termsImage.png';
import {
  FaFileSignature,
  FaUserCheck,
  FaShieldHalved,
  FaLock,
  FaUserGraduate,
  FaTriangleExclamation,
} from 'react-icons/fa6';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Terms() {

  const termsRef = useRef(null);

  useGSAP(() => {
  const mm = gsap.matchMedia();

  mm.add("(min-width: 1024px)", () => {

    // Badge
    gsap.from(".terms-badge", {
      x: -40,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".terms-badge",
        start: "top 85%",
        end:"top 60%",
        scrub:2,
      },
    });

    // Headings
    gsap.from(".terms-heading", {
      y: 50,
      opacity: 0,
      duration: 0.9,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".terms-heading",
        start: "top 95%",
        end:"top 60%",
        scrub:2,
      },
    });

    // Yellow line
    gsap.from(".terms-line", {
      scaleX: 0,
      opacity: 0,
      transformOrigin: "left center",
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".terms-line",
        start: "top 95%",
        end:"top 60%",
        scrub:2,
      },
    });

    // Description
    gsap.from(".terms-description", {
      y: 35,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".terms-description",
        start: "top 95%",
        end:"top 60%",
        scrub:2,
      },
    });

    gsap.utils.toArray(".terms-card").forEach((card) => {
      gsap.from(card, {
        scale: 0.7,
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger:0.5,
        scrollTrigger: {
          trigger: card,
          start: "top 95%",
          end:"top 70%",
          // markers:true,
          // toggleActions: "play none none reverse",
          scrub:2
        },
      });
    });

    // Note
    gsap.from(".terms-note", {
      y: 50,
      opacity: 0,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".terms-note",
        start: "top 95%",
        end:"top 60%",
        scrub:2,
      },
    });

    // Laptop / Image
    gsap.from(".terms-image", {
      x: 150,
      opacity: 0,
      scale: 0.4,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".terms-image",
        start: "top 80%",
        end:"top 40%",
        scrub:2,
        // markers:true,
      },
    });

  });

  return () => mm.revert();
});
  const termsData = [
    {
      id: 1,
      icon: FaFileSignature,
      heading: 'Acceptance of Terms',
      content:
        'By accessing or using TutorHub, you agree to follow these Terms of Service. If you do not agree with any part of these terms, please do not use our platform.',
    },
    {
      id: 2,
      icon: FaUserCheck,
      heading: 'User Responsibilities',
      content:
        'Users must provide accurate information, maintain account security, and use TutorHub respectfully. Any misuse, fraud, or harmful activity may result in account suspension.',
    },
    {
      id: 3,
      icon: FaUserGraduate,
      heading: 'Tutor & Student Conduct',
      content:
        'Tutors and students are expected to communicate professionally, respect each other’s time, and maintain a safe, friendly learning environment.',
    },
    {
      id: 4,
      icon: FaShieldHalved,
      heading: 'Platform Usage',
      content:
        'TutorHub connects students with tutors but does not guarantee learning outcomes, employment, or academic success. Users are responsible for their own interactions.',
    },
    {
      id: 5,
      icon: FaLock,
      heading: 'Privacy & Data',
      content:
        'We collect and protect user information according to our Privacy Policy. Personal data is securely handled and never sold to third parties.',
    },
    {
      id: 6,
      icon: FaTriangleExclamation,
      heading: 'Changes to Terms',
      content:
        'TutorHub may update these Terms of Service from time to time. Continued use of the platform after changes means you accept the updated terms.',
    },
  ];

  return (
    <section ref={termsRef} id="terms" className="min-h-screen flex items-center py-16 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <div className="terms-badge inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-100 px-4 py-2 mb-5">
            <FaFileSignature className="text-blue-500 text-xl" />
            <span className="text-blue-600 font-medium">Clear Terms, Trusted Platform</span>
          </div>

          <h1 className="terms-heading text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-slate-900">
            Terms of
          </h1>
          <h1 className="terms-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-yellow-500">
            Service
          </h1>

          <div className="terms-line w-20 h-1.5 bg-yellow-500 rounded-full mt-4 mx-auto lg:mx-0"></div>

          <p className="terms-description mt-6 text-gray-600 leading-8 max-w-2xl mx-auto lg:mx-0">
            These Terms of Service govern your use of TutorHub. By accessing or using the platform,
            you agree to these terms and help us keep the community safe and professional.
          </p>

          <div className=" mt-8 grid gap-4 sm:grid-cols-2">
            {termsData.map((term) => {
              const Icon = term.icon;
              return (
                <article
                  key={term.id}
                  className="terms-card rounded-3xl border border-slate-200 bg-white p-5 shadow-lg shadow-slate-100  hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-yellow-400">
                      <Icon className="text-xl" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">{term.heading}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{term.content}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="terms-note mt-8 rounded-2xl border border-blue-100 bg-blue-50/70 p-4 text-sm text-slate-700">
            <strong className="text-slate-900">Please note:</strong> Continued use of TutorHub after any
            update to these terms means you accept the revised terms.
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex justify-center">
          <div className="terms-image relative w-full max-w-130 lg:max-w-155 xl:max-w-175 overflow-hidden rounded-[36px] bg-linear-to-br from-slate-100 via-white to-blue-50 p-3 sm:p-4 shadow-2xl shadow-blue-200/30">
            <div className="absolute -right-8 -top-6 h-28 w-28 rounded-full bg-blue-200/40 blur-2xl" />
             <div className=" absolute -left-6 bottom-10 h-20 w-20 rounded-full bg-yellow-200/40 blur-2xl" />
              <img
              src={termsImage}
              alt="Terms illustration"
              className="relative w-full h-auto max-h-105 sm:max-h-120 lg:max-h-140 object-contain rounded-[28px] transition duration-500 hover:scale-[1.02]"
              />
             </div>
        </div>
      </div>
    </section>
  );
}

export default Terms;