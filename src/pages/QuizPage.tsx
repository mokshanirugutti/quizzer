import React, { useEffect, useState } from 'react';
import { fetchQuizData } from '../services/quizService';
import { QuizData, Question } from '../types';
import { LineWave } from 'react-loader-spinner';
import QuestionComponent from '@/components/quiz/QuestionComponent';
import { AnimatePresence } from 'framer-motion';
import { CircularProgress } from '@heroui/react';
import { useNavigate } from 'react-router';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InstructionsPopup from '@/components/quiz/InstructionsPopup';


const QuizPage: React.FC = () => {
  const [quiz, setQuiz] = useState<QuizData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: number }>({});
  const [timeLeft, setTimeLeft] = useState<number>(600);
  const [streak, setStreak] = useState<number>(0); 

  const navigate = useNavigate();

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

   // Timer logic
   useEffect(() => {
    if (timeLeft === 0) {
      handleFinishQuiz(); // Automatically finish quiz when time runs out
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    if (streak === 5) {
      toast.success('🎉 You earned the Streak Master badge!', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  }, [streak]);

  const handleNextQuestion = () => {
    if (quiz && currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleFinishQuiz = () => {
    if (!quiz) return;
    
    const score = calculateScore(quiz.questions, userAnswers);

      // Award bonus points if time is left
      const bonusPoints = Math.floor(timeLeft / 10); // 1 point for every 10 seconds left
      const totalScore = score + bonusPoints;

    // Navigate to results page with quiz data, user answers, and score
    navigate('/results', {
      state: {
        quiz,
        userAnswers,
        score: totalScore,
        timeLeft,
      },
    });

    // console.log('Quiz finished!');
    // console.log('User Answers:', userAnswers);
  };

  const calculateScore = (questions: Question[], userAnswers: { [key: number]: number }) => {
    let score = 0;

    questions.forEach((question) => {
      const selectedOptionId = userAnswers[question.id];
      const correctOption = question.options.find((option) => option.is_correct);

      if (selectedOptionId === correctOption?.id) {
        score += parseFloat(quiz?.correct_answer_marks || '0'); // Add points for correct answer
      } else if (quiz?.negative_marks) {
        score -= parseFloat(quiz.negative_marks); // Deduct points for incorrect answer
      }
    });

    return score;
  };

  const handleAnswerSelect = (questionId: number, optionId: number) => {
    
    const correctOption = quiz?.questions.find((q) => q.id === questionId)?.options.find((o) => o.is_correct);

    // udpate streak values 
    if (correctOption?.id === optionId) {
      setStreak((prev) => prev + 1); 
    } else {
      setStreak(0); 
    }

    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: optionId, 
    }));
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
    <div className="pagePadding pb-20 pt-5">
      <ToastContainer />
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


      {/* Timer */}
      <div className='flex justify-around '>

        <div className="text-center my-4">
          <p className="text-lg font-medium">
            Time Left: {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60}
          </p>
        </div>
        
        <InstructionsPopup totalQuestions={quiz.questions.length} correctPoints={quiz.correct_answer_marks} incorrectPoints={quiz.negative_marks}/>

      </div>
      {/* Streak
      <div className="text-center my-4">
        <p className="text-lg font-medium">Streak: {streak}</p>
      </div> */}


      <AnimatePresence mode="wait" >
        <QuestionComponent
          question={currentQuestion}
          onNext={isLastQuestion ? handleFinishQuiz : handleNextQuestion}
          isLastQuestion={isLastQuestion}
          onAnswerSelect={handleAnswerSelect}
          selectedAnswer={userAnswers[currentQuestion.id]}
        />
      </AnimatePresence>
    </div>
  );
};

export default QuizPage;