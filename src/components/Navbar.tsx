import React from 'react'
import { ModeToggle } from './mode-toggle'
import { Link } from 'react-router'

const Navbar : React.FC = () => {
  return (
    <div className='pagePadding flex justify-between items-center py-6'>
      <Link
        to="/"
      >
        <img src="/quizzer_logo.webp" alt="" className='w-20 h-20'/>
      </Link>

      <ModeToggle/>
    </div>
  )
}

export default Navbar