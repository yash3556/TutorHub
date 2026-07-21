import React from 'react'
import Navbar from '../../components/common/Navbar'
import Footer from '../../components/common/Footer'
import Hero from './Hero'
import Contact from './Contact'
import FAQ from './FAQ'

function Home() {
  return (
    <div className='min-h-screen flex flex-col'>
      <Navbar/>
       <div className='flex-1'>
       <Hero/>
       <Contact/>
       <FAQ/>
       </div>
          <Footer/>
        
    </div>
  )
}

export default Home
