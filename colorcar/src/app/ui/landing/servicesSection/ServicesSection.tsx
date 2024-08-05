import React from 'react'
import Title from '../../components/Title'
import s from './servicesSection.module.css'
import ServicesList from './ServicesList'


const ServicesSection = () => {
  return (
    <section className={s.section}>
        <div className='wrapper'>
        <Title title='услуги' color='#ffff'/>
        <h3 className='text-[#ffff] text-2xl text-center font-medium mb-9'> Менеджеры компании с радостью ответят на ваши вопросы и помогут с выбором продукции. </h3>
        <ServicesList/>
        </div>
    </section>  
  )
}

export default ServicesSection
