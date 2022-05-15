import React from 'react'
import cl from './LogoPage.module.css'

function LogoPage() {
  return (
    <div className={cl.mainPage}>
        <div className='container'>
            <img 
              className={cl.logo} 
              src={"/logo.png"} 
              alt="Gothelf Design Logo"
            />
            <br />
            <img 
              className={cl.logoText} 
              src={"/Text_logo_White2.png"} 
              alt="Gothelf Design"
            />
        </div>
    </div>
  )
}

export default LogoPage