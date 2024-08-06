import React from 'react'

type MainButtonType = {
  title: string,
  fontSize: string
}

const MainButton = ({title, fontSize} : MainButtonType) => {
  return ( 
    <button className='px-5 py-3'>
      <span className={fontSize}>
        {title}
      </span>
    </button>
  )
}

export default MainButton
