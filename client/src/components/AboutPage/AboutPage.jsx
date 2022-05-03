import React, {useRef, useEffect} from 'react'
import cl from './AboutPage.module.css'

function AboutPage() {
  const animElement = useRef()
  const observer = useRef()

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
    <div className={cl.about} id="about">
        <div ref={animElement} className={cl.container}>
            <h2>Кто мы</h2>
            <hr className='blk'/>
            <p> Автоателье нового поколения. Для тех, кто хочет реализовать бурзумные идеи в салоне своего автомобиля. Автоаксессуары производятся только по индивидуальному заказу - от эскиза и чертежа до готового изделия.</p>
        </div>
    </div>
  )
}

export default AboutPage