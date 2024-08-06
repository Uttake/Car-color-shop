import React from 'react'

type titleType = {
    title: string,
    color: string
}

const Title = ({title, color} : titleType) => {
    return (
  <>
    <h2 className={`text-4xl uppercase text-center text-[${color}] font-bold`}>
        {title}
        <div className='bg-[#C53720] h-[4px] mb-8 mt-2'/>   
    </h2>
      
  </>
  )
}

export default Title
