import React from 'react';
import termsImage from '../../assets/termsImage.png';
import {
  FaFileSignature,
  FaUserCheck,
  FaShieldHalved,
  FaLock,
  FaUserGraduate,
  FaTriangleExclamation,
} from 'react-icons/fa6';

function Terms() {
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
    <section id="terms" className="min-h-screen flex items-center py-16 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-100 px-4 py-2 mb-5">
            <FaFileSignature className="text-blue-500 text-xl" />
            <span className="text-blue-600 font-medium">Clear Terms, Trusted Platform</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-slate-900">
            Terms of
          </h1>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-yellow-500">
            Service
          </h1>

          <div className="w-20 h-1.5 bg-yellow-500 rounded-full mt-4 mx-auto lg:mx-0"></div>

          <p className="mt-6 text-gray-600 leading-8 max-w-2xl mx-auto lg:mx-0">
            These Terms of Service govern your use of TutorHub. By accessing or using the platform,
            you agree to these terms and help us keep the community safe and professional.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {termsData.map((term) => {
              const Icon = term.icon;
              return (
                <article
                  key={term.id}
                  className="rounded-3xl border border-slate-200 bg-white p-5 shadow-lg shadow-slate-100 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
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

          <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50/70 p-4 text-sm text-slate-700">
            <strong className="text-slate-900">Please note:</strong> Continued use of TutorHub after any
            update to these terms means you accept the revised terms.
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex justify-center">
          <div className="relative w-full max-w-130 lg:max-w-155 xl:max-w-175 overflow-hidden rounded-[36px] bg-linear-to-br from-slate-100 via-white to-blue-50 p-3 sm:p-4 shadow-2xl shadow-blue-200/30">
            <div className="absolute -right-8 -top-6 h-28 w-28 rounded-full bg-blue-200/40 blur-2xl" />
            <div className="absolute -left-6 bottom-10 h-20 w-20 rounded-full bg-yellow-200/40 blur-2xl" />
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