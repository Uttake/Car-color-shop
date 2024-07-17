import React from 'react'
import logo from '@/../public/logo.png'
import Image from 'next/image'
import HeaderList from './HeaderList'
import HeaderInfo from './HeaderInfo'
const Header = () => {
  return (
    <>
    <header className=' max-w-6xl m-auto flex items-center justify-between'>
      <Image src={logo} alt="logo" width={120} height={58}/>
      <HeaderList/>
      <HeaderInfo/>
    </header>
    </>
  )
}

export default Header
