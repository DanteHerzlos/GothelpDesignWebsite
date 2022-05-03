import React, {useState} from 'react'
import ServiceColumn from './ServiceColumn/ServiceColumn'
import cl from './ServicesPage.module.css'
import data from '../../data.json'

function ServicesPage() {
  const [ services ] = useState(data.services)

  return (
    <div className={cl.services} id="services">
        <div className={cl.container}>
            <div>
                <h2>Услуги</h2>
                <hr className='wht'/>
            </div>
            <div className={cl.col3}>
                {services.map(service => {
                    return <ServiceColumn key={service.id} {...service}/>
                })}
            </div>
        </div>
    </div>
  )
}

export default ServicesPage