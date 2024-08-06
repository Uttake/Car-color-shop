import React from 'react'
import s from './infoItem.module.css'
import clsx from 'clsx'
type InfoItem = {
  title: string,
  href: any
}

const InfoItem = ({item}: {item: InfoItem}) => {
  return (
    <li className={clsx(s.infoItem, 'xl:basis-[34%]')}>
      <div className={s.infoBlock}>
      {item.href}
       <h2 className='text-white text-base text-center'>
        {item.title}
       </h2>
      </div>
    </li>
  )
}

export default InfoItem
