import React from 'react'
import s from './servicesSection.module.css'
import Image from 'next/image'


type servicesItems = {
    id: string,
    title: string,
    subtitle: string,
    href: any
}
const ServicesItem = ({item} : {item: servicesItems}) => {
  return (
    <div key={item.id} className={s.item}>
       <div className={s.itemImage}>
       {item.href}
       </div>
       <div>
        <h2 className='text-lg font-bold text-white mb-4'>
            {item.title}
        </h2>
        <h3 className=' font-medium text-base text-white'>
            {item.subtitle}
        </h3>
       </div>
    </div>
  )
}

export default ServicesItem
