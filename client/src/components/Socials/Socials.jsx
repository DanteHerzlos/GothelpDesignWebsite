import React from 'react'
import cl from './Socials.module.css'

function Socials() { 
  return (
    <div className={cl.socials}>
        <a href="https://vk.com/decepticon_34" target="parent">
            <img src="img/VK_Logo.png" alt="" height="30px" />
        </a>
        <a href="https://wa.me/79963572797" target="parent">
            <img src="img/whatsapp_Logo.png" alt="" height="30px"/>     
        </a>
    </div>
  )
}

export default Socials