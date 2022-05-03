import React from 'react'
import cl from './InfoBar.module.css'

function InfoBar() {
  return (
    <div className={cl.info}>
        <p>Привольная ул., 70, корп. 1</p>
        <p>Москва, 109431, Россия</p>
        <br />
        <br />
        <a href = "mailto: zaknafein.dourden@mail.ru">zaknafein.dourden@mail.ru</a>
        <p>Телефон: +7 996 357-27-97</p>
        <br />
        <p>ЧАСЫ РАБОТЫ:</p>
        <br />
        <p>ПН–ВС: 9:00–18:00</p>
    </div>
  )
}

export default InfoBar