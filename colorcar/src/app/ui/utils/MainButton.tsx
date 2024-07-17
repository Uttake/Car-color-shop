import { Button } from '@chakra-ui/react'
import React from 'react'

type MainButtonType = {
  title: string
}

const MainButton = ({title} : MainButtonType) => {
  return ( 
    <Button colorScheme='transparent' variant='outline' color='white'  border='2px' borderColor='red' borderRadius='2px'>
      <span className='text-xs'>
        {title}
      </span>
    </Button>
  )
}

export default MainButton
