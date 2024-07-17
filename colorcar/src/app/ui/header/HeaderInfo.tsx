'use client'
import React from 'react'
import MainButton from '../utils/MainButton'
import Counter from '../utils/Count'
import SearchIcon from '@/app/_assets/search.svg'
import ShopIcon from '@/app/_assets/shop.svg'
const HeaderInfo = () => {
  return (
    <div className='flex justify-center items-center'>
        <MainButton title='ЗАКАЗАТЬ ЗВОНОК'/>
        <button className='mr-3 ml-6'>
          <SearchIcon/>
        </button>
        <button>
        <ShopIcon/>
        </button>
        <Counter count={0} className=''/>
    </div>
  )
}

export default HeaderInfo
