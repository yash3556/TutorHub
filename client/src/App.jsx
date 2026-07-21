import {Routes,Route} from 'react-router-dom'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import Home from './pages/public/Home'
import './styles/global.css'
function App() {
  return (
   <>
       <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
   <div>
      

   </div>
   </>
  )
}

export default App
