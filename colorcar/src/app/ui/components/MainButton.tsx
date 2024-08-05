import { Button } from '@chakra-ui/react'
import React from 'react'

type MainButtonType = {
  title: string,
  fontSize: string
}

const MainButton = ({title, fontSize} : MainButtonType) => {
  return ( 
    <Button colorScheme='transparent' variant='outline' color='white'  border='2px' borderColor='red' borderRadius='2px' className='px-5 py-3'>
      <span className={fontSize}>
        {title}
      </span>
    </Button>
  )
}

export default MainButton
