import React from 'react'
import Title from '../../components/Title'
import s from './previewSection.module.css'
import PreviewList from './PreviewList'
const PreviewSection = () => {
  return (
    <section className={s.previewSection}>
      <div className="max-w-6xl m-auto">
      <Title title='Автотовары: аксессуары, расходники и многое другое' color='#1d1d1d'/>
      <h3 className='text-[#1d1d1d] text-2xl text-center font-medium mb-9'> PROAuto - это специализированный интернет магазин востребованных товаров для автомобилей. </h3>
      <PreviewList/>
      </div>
    </section>
  )
}

export default PreviewSection
