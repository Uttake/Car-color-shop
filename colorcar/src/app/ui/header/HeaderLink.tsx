import Link from 'next/link'
import React from 'react'

type headerLinks = {
  title: string,
  href: string
}

const HeaderLink = ({item} : {item: headerLinks}) => {
    return (
      <li className=' text-white text-base'>
      <Link href={item.href}> 
      {item.title}
      </Link>
    </li>
    )
}

export default HeaderLink
