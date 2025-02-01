import React from 'react'
import StudyAnimation from '@/components/lottieAnimations/StudyAnimation'
import { Link } from 'react-router'
const HeroSection : React.FC = () => {
  return (
    <div className='pagePadding flex md:flex-row flex-col justify-around items-center w-full md:mb-20 md:pb-20'>
        <div className='flex flex-col gap-3 w-1/2'>
            <h1 className='text-4xl font-bold'>Welcome to <span className='text-[#00b8ff]'>Quizzer</span></h1>
            <p className='w-2/3 text-primary/80'>Enhance your learning experience with Quizzer. Test your knowledge and boost your skills with our interactive quizzes.</p>
            <Link
              to="/quiz"
            >
              <button className='px-3 py-2 rounded-md border bg-foreground text-background w-40 font-semibold cursor-pointer hover:-translate-y-1 transition duration-150 ease-in-out'>Start quiz</button>
            </Link>
        </div>

        <StudyAnimation/>
        
    </div>
  )
}

export default HeroSection