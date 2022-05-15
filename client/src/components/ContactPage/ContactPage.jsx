import React, { useState } from 'react'
import ContactForm from './ContactForm/ContactForm'
import InfoBar from './InfoBar/InfoBar'
import cl from './ContactPage.module.css'

function ContactPage() {
  const [infoMessage, setInfoMessage] = useState({message: '', status: 'warning'})
  const infoClass = [cl.info]
  const infoMinClass = [cl.infoWhenMinimize]

  if (infoMessage.message){
    infoClass.push(cl._active)
    infoMinClass.push(cl._active)
    if(infoMessage.status === 'warning'){
      infoClass.push(cl.wrnBkg)
      infoMinClass.push(cl.wrnBkg)
    }
    if(infoMessage.status === 'success'){
      infoClass.push(cl.sccBkg)
      infoMinClass.push(cl.sccBkg)
    }
  }

  return (
    <div className={cl.contactPage} style={{backgroundImage: "url(/wall2.jpg)"}} id="contacts">
      <div className={cl.container}>
        <div>
          <h2>Ждем Вас</h2>
          <hr className='blk'/>
        </div>
        <div 
          onClick={() => setInfoMessage({...infoMessage, message: ''})} 
          className={infoClass.join(' ')}
          >{infoMessage.message}</div>
        <div className={cl.col2}>
          <InfoBar/>
          <div 
            onClick={() => setInfoMessage({...infoMessage, message: ''})} 
            className={infoMinClass.join(' ')}
            >{infoMessage.message}</div>
          <ContactForm infoMessage={infoMessage} setInfoMessage={setInfoMessage}/> 
        </div>
      </div>
    </div>
  )
}

export default ContactPage