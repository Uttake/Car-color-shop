
import React from 'react'
import InfoMoney from '@/app/_assets/info-money.svg'
import InfoHelp from '@/app/_assets/info-help.svg'
import InfoQuality from '@/app/_assets/info-quality.svg'
import InfoConnection from '@/app/_assets/info-connection.svg'
import {v1} from 'uuid'
import InfoItem from './InfoItem'

const infoData = [
    {
        id: v1(),
        title: 'Наличный и безналичный расчет',
        href: <InfoMoney/>
    },
    {
        id: v1(),
        title: 'Техническая помощь и консультация',
        href: <InfoHelp/>
    },
    {
        id: v1(),
        title: 'Только качественная и проверенная продукция',
        href: <InfoQuality/>
    },
    {
        id: v1(),
        title: 'Мы всегда на связи с 9:00 до 18:00!',
        href: <InfoConnection/>
    },
]

const InfoList = () => {
  return (
    <ul className='flex'>
        {infoData.map(item => (
            <InfoItem item={item}/>
        ))}
    </ul>
  )
}

export default InfoList
