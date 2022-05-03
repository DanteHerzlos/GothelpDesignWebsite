import React from 'react'
import cl from './CustomButton.module.css'

function CustomButton({children, ...props}) {
  return (
    <button {...props} className={cl.customButton}>
        {children}
    </button>
  )
}

export default CustomButton