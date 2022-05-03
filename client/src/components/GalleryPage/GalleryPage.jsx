import React, { useState, useEffect, useRef }  from 'react'
import ImgBox from './ImgBox/ImgBox'
import cl from './GalleryPage.module.css'
import data from '../../data.json'
import Modal from '../UI/Modal/Modal'


function GalleryPage() {
  const [photoData] = useState(data.gallery)
  const [modal, setModal] = useState(false)
  const [modalImg, setModalImg] = useState(0)
  const animElement = useRef()
  const observer = useRef()


  const openImg = (id) => {
    setModalImg(id)
    setModal(true)
  }


  useEffect(() => {
    let options = {
      threshold: 0.3
    }
    let callback = function(entries, observer) {
      if(entries[0].isIntersecting){
        animElement.current.className += ` ${cl._active}`
        observer.unobserve(animElement.current)
      }
    };
    observer.current = new IntersectionObserver(callback, options);
    observer.current.observe(animElement.current)
  }, [])


  return (
    <div className={cl.gallery} id="gallery">
        <div>
            <h2 >Наши работы</h2>
            <hr className='blk'/>
            <p >Коллекция автомобилей, преобразившихся благодаря нам</p>
        </div>
        <div ref={animElement} className={cl.imgGrid} >
          {photoData.map((data,index) => {
            return <ImgBox  key={data.id} {...data} customClickEvent={() => openImg(index)}/>
          })}
        </div>
        <Modal visible={modal} setVisible={setModal}>
            <img className={cl.modalImg} src={photoData[modalImg].img} alt={photoData[modalImg].title} />
            <p className={cl.modalDescription}>{photoData[modalImg].modalBody}</p>
        </Modal>
    </div>
  )
}

export default GalleryPage