import React from 'react';
import { useLocation, useNavigate } from 'react-router';
import { QuizData, } from '../types';

import DetailedSolutionPopup from '@/components/quiz/DetailedSolutionPopup';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';


import perfectScore from '@/assets/perfectScore.webp';
import Learned from '@/assets/learned.webp';
import speedSter from '@/assets/speedster.webp';

interface ResultsPageProps {
  quiz: QuizData;
  userAnswers: { [key: number]: number };
  score: number;
  timeLeft: number;
}

interface Badge {
  name: string;
  description: string;
  image: string;
  condition: (quiz: QuizData, userAnswers: { [key: number]: number }, timeLeft: number) => boolean;
}

const ResultsPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // if  not answered then redirect to home
  // something like if accessed directly from url
  if (!location.state) {
    navigate('/'); 
    return null;
  }

  const { quiz, userAnswers, score, timeLeft } = location.state as ResultsPageProps;


  
  const badges: Badge[] = [
    {
      name: 'Perfect Score',
      description: 'Answered all questions correctly!',
      image: perfectScore,
      condition: (quiz, userAnswers, _timeLeft) => {
        const correctAnswers = quiz.questions.filter(
          (question) => userAnswers[question.id] === question.options.find((option) => option.is_correct)?.id
        ).length;
        return correctAnswers === quiz.questions.length;
      },
    },
    {
      name: 'Speedster',
      description: 'Finished the quiz with more than 5 minutes left!',
      image: speedSter,
      condition: (_score, _streak, timeLeft) => timeLeft > 300,
    },
    {
      name: 'Streak Master',
      description: 'Achieved a streak of 5 or more correct answers!',
      image: Learned,
      condition: (quiz, userAnswers, _timeLeft) => {
        let currentStreak = 0;
        let maxStreak = 0;
  
        quiz.questions.forEach((question) => {
          const selectedOptionId = userAnswers[question.id];
          const correctOption = question.options.find((option) => option.is_correct);
  
          if (selectedOptionId === correctOption?.id) {
            currentStreak++;
            maxStreak = Math.max(maxStreak, currentStreak);
          } else {
            currentStreak = 0;
          }
        });
  
        return maxStreak >= 5;
      },
    },
  ];

    // Calculate earned badges
    const earnedBadges = badges.filter((badge) =>
      badge.condition(quiz, userAnswers, timeLeft)
    );

    
  return (
    <div className="pagePadding">
      <h1 className="text-2xl font-bold text-center my-5">Quiz Results</h1>
      <div className="bg-foreground p-6 rounded-lg shadow-md text-background max-w-2xl mx-auto">
        
        <div className='flex flex-col gap-3 justify-around'>

          {/* Score  */}
          <h2 className="text-xl font-semibold mb-4">Score</h2>
          <div className='flex gap-3'>
            <p className="text-base">
              Total : <span className="font-bold">{score}</span>
            </p>
            <p className="text-base">
            <span className='text-background/80'>Correct :{' '}</span>
              <span className="font-bold">
                {quiz.questions.filter(
                  (question) => userAnswers[question.id] === question.options.find((option) => option.is_correct)?.id
                ).length}
              </span>
            </p>
            <p className="text-base">
              <span className='text-background/80'>Incorrect :{' '}</span>
              <span className="font-bold">
                {quiz.questions.filter(
                  (question) => userAnswers[question.id] !== question.options.find((option) => option.is_correct)?.id
                ).length}
              </span>
            </p>
          </div>

          {/* Badges Section */}
          <h2 className="text-xl font-semibold mb-4">Badges</h2>
          <div className="flex justify-around gap-3 mb-6 flex-wrap">
            {earnedBadges.length > 0 ? (
              earnedBadges.map((badge, index) => (
                <motion.div
                key={badge.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                className="mb-4"
              >
                <img
                src={badge.image}
                alt={badge.name}
                className="w-40 cursor-pointer"
                
              />
              </motion.div>
              ))
            ) : (
              <p className="text-lg">No badges earned this time. Try again!</p>
            )}
          </div>
          
        </div>
      </div>

      <div className="mt-8 max-w-2xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Detailed Results</h2>
        {quiz.questions.map((question) => {
          const selectedOptionId = userAnswers[question.id];
          const correctOption = question.options.find((option) => option.is_correct);
          const isCorrect = selectedOptionId === correctOption?.id;

          return (
            <div key={question.id} className="mb-6 p-4 border rounded-lg shadow-sm">
              <h3 className="text-base md:text-lg font-medium">{question.description}</h3>
              <div className='flex justify-between'>
                <div>
                  <p className={`text-sm ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                    Your Answer: {question.options.find((option) => option.id === selectedOptionId)?.description || 'Not answered'}
                  </p>
                  <p className="text-sm text-gray-600">
                    Correct Answer: {correctOption?.description}
                  </p>
                </div>

                <div className='mt-auto'>
                <DetailedSolutionPopup detailedSolution={question.detailed_solution} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="text-center mt-8">
      <Button onClick={() => navigate('/quiz')} className="w-48">
        Retake Quiz
      </Button>
      </div>
    </div>
  );
};

export default ResultsPage;