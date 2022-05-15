import React from 'react'
import AboutPage from '../../components/AboutPage/AboutPage'
import '../../styles/App.css'
import ContactPage from '../../components/ContactPage/ContactPage'
import GalleryPage from '../../components/GalleryPage/GalleryPage'
import LogoPage from '../../components/LogoPage/LogoPage'
import NavBar from '../../components/UI/Navbar/NavBar'
import PhotoLine from '../../components/PhotoLine/PhotoLine'
import ServicesPage from '../../components/ServicesPage/ServicesPage'
import Socials from '../../components/Socials/Socials'


function Home() {
  return (
    <div className="App">
        <Socials/>
        <LogoPage/>
        <ServicesPage/>
        <GalleryPage/>
        <AboutPage/>
        <PhotoLine/>
        <ContactPage/>
        <NavBar/>
    </div>
  )
}

export default Home