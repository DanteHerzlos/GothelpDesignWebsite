import React, {useEffect, useState} from 'react'
import ServiceColumn from './ServiceColumn/ServiceColumn'
import cl from './ServicesPage.module.css'
import axios from 'axios'


function ServicesPage() {
  const [ services, setServices ] = useState([{}])

  useEffect(() => {
    const getData = async () => {
        try {
          const { data } = await axios.get('/api/services')
          setServices(data.data)
        } catch (error) {
          console.log(error.message);
        }
    }
    getData()
  }, [])

  
  return (
    <div className={cl.services} style={{backgroundImage: "url(/Services_Cover.jpg)"}} id="services">
        <div className={cl.container}>
            <div>
                <h2>Услуги</h2>
                <hr className='wht'/>
            </div>
            <div className={cl.col3}>
                {services.map((service, index) => {
                    return <ServiceColumn key={index} {...service}/>
                })}
            </div>
        </div>
    </div>
  )
}

export default ServicesPage