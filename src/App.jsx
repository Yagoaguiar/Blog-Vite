import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Navbar from './pages/Navbar'
import Footer from './pages/Footer'

function App() {


  return (
   <div className='App'>
    <BrowserRouter>
    <Navbar /> 
    <div className='container'> 
    <Routes >
      <Route path="/Home" element={<Home/>} />
      <Route path='/About' element={<About />} />
    </Routes>
    </div>
    <Footer />
    </BrowserRouter>
   </div>
  )
}

export default App