import React from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import '../index.css'
import Main from './components/Main';

export default function Index(){
  const navigate = useNavigate();
  return (
    <main className='landing_main'>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link href="https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
      <Navbar />
      <Hero />
      <Main />
      <Footer />
    </main>
  )
}
