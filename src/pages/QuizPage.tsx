import React, { useEffect, useState } from 'react';
import { fetchQuizData } from '../services/quizService';
import { QuizData } from '../types';
import { LineWave } from 'react-loader-spinner'
import QuestionComponent from '@/components/QuestionComponent';
const QuizPage: React.FC = () => {
  const [quiz, setQuiz] = useState<QuizData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadQuizData = async () => {
      try {
        const data = await fetchQuizData();
        setQuiz(data);
      } catch (err) {
        setError('Failed to fetch quiz data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadQuizData();
  }, []);

  if (loading) {
    return <div className='h-[calc(100vh-130px)]  flex justify-center items-center'><LineWave
    visible={true}
    height="100"
    width="100"
    color="#4fa94d"
    ariaLabel="line-wave-loading"
    wrapperStyle={{}}
    wrapperClass=""
    /></div>;
  }

  if (error) {
    return <div className='pagePadding'>{error}</div>;
  }

  return (
    <div className='pagePadding'>
      <h1 className='text-center text-xl  my-3 font-medium'>Title : {quiz?.title}</h1>
      <h1 className='text-center text-lg  my-3 font-medium text-primary/85'>Topic : {quiz?.topic}</h1>
      <QuestionComponent/>
    </div>
  );
};

export default QuizPage;