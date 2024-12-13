import React from 'react'
import Title from '../../components/Title'
import s from './company.module.css'
import CompanyInfo from './CompanyInfo'


const CompanySection = () => {
  return (
    <section className={s.section}>
        <div className='wrapper'>
        <Title title='о компании' color='#ffff'/>
        <CompanyInfo/>
        </div>
    </section>
  )
}

export default CompanySection
