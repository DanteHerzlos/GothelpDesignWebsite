import React, {useRef, useEffect} from 'react'
import cl from './ServiceColumn.module.css'

function ServiceColumn(service) {
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
    <div ref={animElement}>
        <img className={cl.serviceLogo} src={service.img} alt={service.title}/>
        <div className={cl.serviceText}>
            <h3>{service.title}</h3>
            <div>
              {service.body.map((description, index) => {
                return <p key={index}>{description}</p>
              })}
            </div>
        </div>
    </div>
  )
}

export default ServiceColumn