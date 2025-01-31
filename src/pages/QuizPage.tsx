import React, { useEffect, useState } from 'react';
import { fetchQuizData } from '../services/quizService';
import { QuizData, Question } from '../types';
import { LineWave } from 'react-loader-spinner';
import QuestionComponent from '@/components/QuestionComponent';
import { AnimatePresence } from 'framer-motion';
import { CircularProgress } from '@heroui/react';

const QuizPage: React.FC = () => {
  const [quiz, setQuiz] = useState<QuizData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);

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

  const handleNextQuestion = () => {
    if (quiz && currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleFinishQuiz = () => {
    // Handle quiz submission (we'll implement this later)
    console.log('Quiz finished!');
  };

  if (loading) {
    return (
      <div className="h-[calc(100vh-130px)] flex justify-center items-center">
        <LineWave
          visible={true}
          height="100"
          width="100"
          color="#4fa94d"
          ariaLabel="line-wave-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }

  if (error) {
    return <div className="pagePadding">{error}</div>;
  }

  if (!quiz) {
    return <div className="pagePadding">No quiz data available.</div>;
  }

  const currentQuestion: Question = quiz.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;

  return (
    <div className="pagePadding">
      <div className="flex justify-around items-center">
        <div>
          <h1 className="text-xl my-3 font-medium">Title: {quiz.title}</h1>
          <h1 className="text-lg my-3 font-medium text-primary/85">
            Topic: {quiz.topic}
          </h1>
        </div>
        <CircularProgress
          aria-label="Progress"
          color="primary"
          showValueLabel={true}
          size="lg"
          formatOptions={{ style: 'decimal' }}
          maxValue={quiz.questions.length}
          value={currentQuestionIndex + 1}
        />
      </div>
      <AnimatePresence mode="wait">
        <QuestionComponent
          question={currentQuestion.description}
          options={currentQuestion.options}
          onNext={isLastQuestion ? handleFinishQuiz : handleNextQuestion}
          isLastQuestion={isLastQuestion}
        />
      </AnimatePresence>
    </div>
  );
};

export default QuizPage;