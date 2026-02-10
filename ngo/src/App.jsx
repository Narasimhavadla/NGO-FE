import { useState } from 'react'

import './App.css'
import { Routes,Route } from "react-router-dom";
import Navbar from './components/Navbar'
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import Events from './pages/Events';
import OurTeam from './pages/OurTeam';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import DonationPage from './pages/DonationPage';
import VolunteerPage from './pages/Volunteer';
import EventDetails from "./pages/EventDetails";


function App() {

  return (
    <div>

     
     <Navbar />
       <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/our-team" element={<OurTeam />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/donation" element={<DonationPage />} />
        <Route path="/volunteer" element={<VolunteerPage />} />
      </Routes>
      <Footer />
      
    </div>
  )
}

export default App
