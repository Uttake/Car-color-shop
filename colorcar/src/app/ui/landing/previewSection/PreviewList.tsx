import React from 'react'
import { v1 } from 'uuid'
import PreviewItem from './PreviewItem'

let previewData = [
  {
   id: v1(),
   title: 'АККУМУЛЯТОРЫ',
   image: '/preview1.jpg',
  },
  { 
    id: v1(),
    title: 'АККУМУЛЯТОРЫ',
    image: '/preview2.jpg',
   },
   {
    id: v1(),
    title: 'АККУМУЛЯТОРЫ',
    image: '/preview3.jpg',
   },
   {
    id: v1(),
    title: 'АККУМУЛЯТОРЫ',
    image: '/preview4.jpg',
   },
   {
    id: v1(),
    title: 'АККУМУЛЯТОРЫ',
    image: '/preview5.jpg',
   },
   {
    id: v1(),
    title: 'АККУМУЛЯТОРЫ',
    image: '/preview6.jpg',
   },
]

const PreviewList = () => {
  return (
    <div className='flex flex-wrap gap-6'>
      {previewData.map(item => (
        <PreviewItem item={item}/>
      ))}
    </div>
  )
}

export default PreviewList
