import { useState } from 'react'
import './App.css'
import Homepage from './startingPage/home/Homepage'
import Signup from './startingPage/signup/Signup.jsx'
import Aboutpage from './startingPage/about/Aboutpage.jsx'
import Productpage from './startingPage/products/Productpage.jsx'
import Supportpage from './startingPage/support/Supportpage.jsx'
import Navbar from './startingPage/Navbar.jsx'
import Footer from './startingPage/Footer.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<Aboutpage />} />
        <Route path="/products" element={<Productpage />} />
        <Route path="/support" element={<Supportpage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
