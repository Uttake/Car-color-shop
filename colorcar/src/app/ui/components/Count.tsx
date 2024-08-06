import clsx from 'clsx'
import React from 'react'
type countType = {
    count: number,
    className: string
}
const Counter = ({count, className}: countType) => {
  return (
    <div className={clsx('bg-red-600 text-white rounded-full w-[60px] h-8 flex justify-center items-center ml-1', className)}>
        {count}
    </div>
  )
}

export default Counter
