import React from 'react'
import { ModeToggle } from './mode-toggle'

const Navbar : React.FC = () => {
  return (
    <div className='pagePadding flex justify-between items-center py-6'>
      <img src="/quizzer_logo.webp" alt="" className='w-20 h-20'/>
      <ModeToggle/>
    </div>
  )
}

export default Navbar