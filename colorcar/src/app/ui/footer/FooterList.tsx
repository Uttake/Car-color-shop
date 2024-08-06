import React from 'react'
import FooterItem from './FooterItem'

const footerData = [
    {
        maintitle: 'КОМПАНИЯ',
        subtitle: [
        {title: 'О КОМПАНИИ'},
        {title:'ОТЗЫВЫ КЛИЕНТОВ'},
        {title:'РЕКВИЗИТЫ'},
    ]
    },
    {
        maintitle: 'КАТАЛОГ',
        subtitle: [
        {title: 'АККУМУЛЯТОРЫ'},
        {title: 'АВТОМАСЛА'},
        {title: 'АКСЕССУАРЫ'},
        {title:'АВТОХИМИЯ'},
    ]
    },
    {
        maintitle: 'УСЛУГИ',
        subtitle: [
        {title: 'ДИАГНОСТИКА АККУМУЛЯТОРА'},
        {title: 'ПРИЕМ АККУМУЛЯТОРОВ'},
    ]
    },
    {
        maintitle: 'ИНФОРМАЦИЯ',
        subtitle: [
        {title: 'АКЦИИ'},
        {title: 'НОВОСТИ'},
        {title: 'СТАТЬИ'},
        {title: 'ВОПРОС - ОТВЕТ'},
    ]
    }

]

const FooterList = () => {
  return (
    <div className='flex justify-between basis-[60%]'>
        {footerData.map(item => (
            <FooterItem item={item}/>
        ))}
    </div>
  )
}

export default FooterList
