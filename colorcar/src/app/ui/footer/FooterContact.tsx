import Image from 'next/image'
import React from 'react'
import MainButton from '../components/MainButton'

const footerContactData = [
    {
        tumb: '/phone.svg',
        title: '+375 (29) 738-92-64'
    },
    {
        tumb: 'mail.svg',
        title: 'example@gmail.com'
    }
]

const FooterContact = () => {
  return (
    <div>
        {footerContactData.map(item => (
            <div className='flex gap-2 mb-3 last:mb-5'>
                <Image src={item.tumb} alt={item.title} width={20} height={20}/>
                <h3 className=' text-base text-white'>{item.title}</h3>
            </div>
        ))}
        <MainButton title='ЗАКАЗАТЬ ЗВОНОК' fontSize='text-xs' color='text-white' maxW='max-w-[176px]' hgt='h-[40px]'/>
    </div>
  )
}

export default FooterContact
