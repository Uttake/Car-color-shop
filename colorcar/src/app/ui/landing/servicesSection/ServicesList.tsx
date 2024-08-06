import React from 'react'
import { v1 } from 'uuid'

import InfoHelp from '@/app/_assets/info-help.svg'
import InfoBag from '@/app/_assets/services-bag.svg'
import InfoConnection from '@/app/_assets/info-connection.svg'
import ServicesItem from './ServicesItem'
import Image from 'next/image'
import s from './servicesSection.module.css'

const ServicesData = [
    {
        id: v1(),
        title: 'Наличный и безналичный расчет',
        subtitle: 'Поможем с выбором аккумулятора, моторного масла и аксессуаров для автомобиля под ваши требования. ',
    },
    {
        id: v1(),
        title: 'Техническая помощь и консультация',
        subtitle: 'Принесите нам старую АКБ для легкового автомобиля, и мы предоставим Вам скидку на новый аккумулятор!',

    },
    {
        id: v1(),
        title: 'Только качественная и проверенная продукция',
        subtitle: 'Приезжайте к нам и мы бесплатно проведём диагностику вашего аккумулятора!',
    },
]

const ServicesList = () => {
  return (
    <div className='flex justify-between flex-wrap xl:justify-center'>
       <div>
       {ServicesData.map(item => (
        <ServicesItem item={item}/>
       ))} 
      </div>
      <div className={s.listImage}>
       <Image src={'/servicesMech.png'} width={460} height={500} alt='mech'/>
       <div className={s.afterBlock}></div>
      </div>
    </div>
  )
}

export default ServicesList
