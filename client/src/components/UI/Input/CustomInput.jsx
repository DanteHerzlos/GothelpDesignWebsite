import React from 'react'
import cl from './CustomInput.module.css'

function CustomInput({...props}) {
  return (
    <input {...props} className={cl.customInput}>

    </input>
  )
}

export default CustomInput