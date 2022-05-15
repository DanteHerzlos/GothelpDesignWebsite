import React, { useState, useEffect, useRef }  from 'react'
import ImgBox from './ImgBox/ImgBox'
import cl from './GalleryPage.module.css'
import Modal from '../UI/Modal/Modal'
import axios from 'axios'


function GalleryPage() {
  const [photoData, setPhotoData] = useState([{}])
  const [modal, setModal] = useState(false)
  const [modalImg, setModalImg] = useState(0)
  const animElement = useRef()
  const observer = useRef()

  const openImg = (id) => {
    setModalImg(id)
    setModal(true)
  }

  const getData = async () => {
    try {
      const {data} = await axios.get('/api/gallery_page')
      setPhotoData(data.data)
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect( () => {
    getData()
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
          {photoData.map((data, index) => {
            return <ImgBox  key={index} {...data} customClickEvent={() => openImg(index)}/>
          })}
        </div>
        <Modal visible={modal} setVisible={setModal}>
            {photoData[modalImg].imgPath && 
              <img 
                className={cl.modalImg} 
                src={window.location.origin + '/' + photoData[modalImg].imgPath} 
                alt={photoData[modalImg].title} 
              />
            }
            <p className={cl.modalDescription}>{photoData[modalImg].modalBody}</p>
        </Modal>
    </div>
  )
}

export default GalleryPage