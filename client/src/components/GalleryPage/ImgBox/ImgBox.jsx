import React from 'react'
import cl from './ImgBox.module.css'

function ImgBox({customClickEvent, ...data}) {
  return (
    <div className={cl.imgBox} onClick={customClickEvent}>
        <div className={cl.imgDescription}>
            <div>
                <h2>{data.title}</h2>
                <p>{data.body}</p>
            </div>
        </div>
        {data.imgPath && <img 
          className={cl.galleryImg} 
          src={window.location.origin + '/' + data.imgPath} 
          alt={data.title} 
        /> }
    </div>
  )
}

export default ImgBox