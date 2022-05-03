import React, { useEffect, useState } from 'react'
import { useHttp } from '../../../hooks/http.hook'
import useInput from '../../../hooks/useInput'
import CustomButton from '../../UI/Button/CustomButton'
import CustomInput from '../../UI/Input/CustomInput'
import CustomTextArea from '../../UI/TextArea/CustomTextArea'
import cl from './ContactForm.module.css'
 
function ContactForm({infoMessage, setInfoMessage}) {

  const {loading, request} = useHttp()
  const email = useInput('', {isEmpty: true, isEmail: true})
  const phoneNumber = useInput('', {isEmpty: true, isPhoneNumber: true})
  const name = useInput('', {isEmpty: true})
  const [form, setForm] = useState({
    fname: '', lname: '', email: '', tel: '', message: ''
  })

  const sendMessage = async () => {
    try {
      const data = await request('/sendMessage', 'POST', {...form})
      setInfoMessage({...infoMessage, message: data.message, status: data.status})
    } catch (e) {
      setInfoMessage({...infoMessage, message: e.message, status: 'warning'})
    }
  }

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  useEffect(()=>{
    if (email.isEmpty && email.isDirty){
      setInfoMessage({...infoMessage, message: 'Поле "Email" не может быть пустым!', status: 'warning'})
    } else if (email.isEmailError && email.isDirty){
      setInfoMessage({...infoMessage, message: 'Email введен неверно!', status: 'warning'})
    } else if (phoneNumber.isEmpty && phoneNumber.isDirty){
      setInfoMessage({...infoMessage, message: 'Поле "Телефон" не может быть пустым!', status: 'warning'})
    } else if (phoneNumber.isPhoneNumError && phoneNumber.isDirty){
      setInfoMessage({...infoMessage, message: 'Неверно введен номер телефона!', status: 'warning'})
    } else if (name.isEmpty && name.isDirty){
      setInfoMessage({...infoMessage, message: 'Поле "Имя" не может быть пустым!', status: 'warning'})
    } else {
      setInfoMessage({...infoMessage, message: ''})
    }
  }, [email.isEmpty, email.isDirty, email.isEmailError, 
      phoneNumber.isEmpty, phoneNumber.isDirty, phoneNumber.isPhoneNumError,
      name.isDirty, name.isEmpty])

  const clickSubmit = (e) => {
    if (email.isEmpty){
      e.preventDefault()
      setInfoMessage({...infoMessage, message: 'Поле "Email" не может быть пустым!', status: 'warning'})
    } else if (email.isEmailError){
      e.preventDefault()
      setInfoMessage({...infoMessage, message: 'Email введен неверно!', status: 'warning'})
    } else if (phoneNumber.isEmpty){
      e.preventDefault()
      setInfoMessage({...infoMessage, message: 'Поле "Телефон" не может быть пустым!', status: 'warning'})
    } else if (phoneNumber.isPhoneNumError){
      e.preventDefault()
      setInfoMessage({...infoMessage, message: 'Неверно введен номер телефона!', status: 'warning'})
    } else if (name.isEmpty){ 
      e.preventDefault()
      setInfoMessage({...infoMessage, message: 'Поле "Имя" не может быть пустым!', status: 'warning'})
    } else {
      setInfoMessage({...infoMessage, message: ''})
      sendMessage()
    }
  }

  return (
    <div className={cl.contactForm}>
        <label htmlFor="fname">ИМЯ<span>*</span></label>
        <CustomInput 
          value={name.value} 
          onChange={e => {
            changeHandler(e)
            name.onChange(e)
          }} 
          onBlur={e => name.onBlur(e)} 
          name="fname"
          id="fname" type="text" autoComplete="on"
        />

        <label htmlFor="lname">ФАМИЛИЯ</label>
        <CustomInput onChange={changeHandler}  name="lname" id="lname" type="text" autoComplete="on"/>

        <label htmlFor="email">Email<span>*</span></label>
        <CustomInput 
          value={email.value} 
          onChange={e => {
            changeHandler(e)
            email.onChange(e)
          }} 
          onBlur={e => email.onBlur(e)} 
          name="email"
          id="email" type="email" autoComplete="on"
        />
        
        <label htmlFor="tel">ТЕЛЕФОН<span>*</span></label>
        <CustomInput 
          value={phoneNumber.value} 
          onChange={e => {
            phoneNumber.onChange(e)
            changeHandler(e)
          }} 
          onBlur={e => phoneNumber.onBlur(e)}
          name="tel" 
          id="tel" type="tel" autoComplete="on"
        />

        <label htmlFor="message">СООБЩЕНИЕ</label>
        <CustomTextArea name="message" id="message" onChange={changeHandler} type="text" maxLength="255" rows="5"/>
        <CustomButton disabled={loading} onClick={e => clickSubmit(e)}  type="submit">Отправить</CustomButton>
    </div>
  )
}

export default ContactForm