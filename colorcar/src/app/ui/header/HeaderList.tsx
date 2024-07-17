import React from 'react'
import HeaderLink from './HeaderLink'

type headerList = {
    title: string,
    href: string
}
const HeaderList = () => {
  let lists: headerList[]  = [
    {title: 'КОМПАНИЯ', href: '/company'},
    {title: 'КАТАЛОГ', href: '/catalog'},
    {title: 'УСЛУГИ', href: '/services'},
    {title: 'ИНФОРМАЦИЯ', href: '/info'},
    {title: 'КОНТАКТЫ', href: '/contacts'},
  ]
  return (
    <div>
      <ul className='flex gap-3'>
       {lists?.map(item => (
          <HeaderLink item={item}/>
        ))}   
      </ul>
    </div>
  )
}

export default HeaderList
