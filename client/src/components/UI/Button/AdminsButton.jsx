import React from 'react'
import cl from './AdminsButton.module.css'

function AdminButton({ ...props }) {
  let styles = cl.btn

  if (props.isred === 'true'){
    styles += ` ${cl.clrRed}`
  }
  if(props.isdisabled === 'true'){
    styles += ` ${cl.isdisabled}`
  }

  return (
    <div {...props} className={styles}>{props.children}</div>
  )
}

export default AdminButton