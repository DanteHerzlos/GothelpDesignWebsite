import React, { useEffect, useRef } from 'react'
import cl from './AdminsInput.module.css'

function AdminsInput({...props}) {
  const inputRef = useRef()
  const labelRef = useRef()
  
  useEffect(() => {
    if(props.value){
      labelRef.current.className += ` ${cl.active}`
    } else{
      labelRef.current.className = cl.inputLabel
    }
  }, [props.value]) 


  const onChangeHandler = () => {
    inputRef.current.value ? labelRef.current.className += ` ${cl.active}` : labelRef.current.className = cl.inputLabel
  }

  return (        
    <div className={cl.inputField}>
      <label ref={labelRef} className={cl.inputLabel} htmlFor={props.id}>{props.name}</label>
      <input 
        className={cl.loginInput}
        {...props} 
        ref={inputRef} 
        onChange={(e) => {
          onChangeHandler() 
          props.onChange(e)
        }} 
        />
    </div>
  )
}

export default AdminsInput