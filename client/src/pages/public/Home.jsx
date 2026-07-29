import React from 'react'
import Navbar from '../../components/common/Navbar'
import Footer from '../../components/common/Footer'
import Hero from './Hero'
import Contact from './Contact'
import About from './About'
import FAQ from './FAQ'
import Privacy from './Privacy'
import Terms from './Terms'

function Home() {
  return (
    <div className='min-h-screen flex flex-col'>
      <Navbar/>
       <div className='flex-1'>
       <Hero/>
       <About/>
       <Contact/>
       <FAQ/>
       <Privacy/>
       <Terms/>
       </div>
          <Footer/>
        
    </div>
  )
}

export default Home
