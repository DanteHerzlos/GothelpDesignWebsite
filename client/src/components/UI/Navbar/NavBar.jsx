import React, { useState } from 'react'
import cl from './NavBar.module.css'

function NavBar() {
  const [navbarExpand, setNavbarExpand] = useState(false)

  const navBarClass= [cl.navbar]
  if (navbarExpand){
    navBarClass.push(cl.responsive)
  }

  return (
    <div className={navBarClass.join(' ')}>
        <a href="/#">Главная</a>
        <a href="#services">Услуги</a>
        <a href="#gallery">Работы</a>
        <a href="#about">О нас</a>
        <a href="#contacts">Контакты</a>
        <p onClick={()=> setNavbarExpand(!navbarExpand)} className={cl.icon}>&#9776;</p>
    </div>
  )
}

export default NavBar