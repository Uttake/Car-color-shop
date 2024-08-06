import Image from 'next/image'
import React from 'react'
import FooterList from './FooterList'
import FooterContact from './FooterContact'

const Footer = () => {
  return (
    <footer className='pt-14 pb-16 xl:px-5'>
      <div className='wrapper flex w-full justify-between flex-wrap md:gap-8'>
      <div>
        <Image src={'/logo.png'} alt="logo" width={200} height={100} className=' mb-12'/>
        <h3 className=' text-base opacity-50 text-white font-medium'>© 2019 PRO Auto.<br /> 
        Все права защищены.</h3>
      </div>
      <FooterList/>
      <FooterContact/>
      </div>
    </footer>
  )
}

export default Footer
