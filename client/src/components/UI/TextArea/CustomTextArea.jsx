import React from 'react'
import cl from './CustomTextArea.module.css'

function CustomTextArea({...props}) {
  return (
    <textarea {...props} className={cl.customTextArea}>

    </textarea>
  )
}

export default CustomTextArea