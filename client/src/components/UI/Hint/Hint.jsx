import React from 'react'
import cl from './Hint.module.css'

function Hint({imgPath, position}) {
  const style = { left: position.x, top: position.y }
  const classCss = [cl.hint]
  if (imgPath){
    classCss.push(cl.active)
  }

  return (
    <img src={imgPath} className={classCss.join(' ')} style={style}>

    </img>
  )
}

export default Hint