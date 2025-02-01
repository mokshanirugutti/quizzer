import React from 'react';
import { useLocation, useNavigate } from 'react-router';
import { QuizData, } from '../types';

interface ResultsPageProps {
  quiz: QuizData;
  userAnswers: { [key: number]: number };
  score: number;
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

  const { quiz, userAnswers, score } = location.state as ResultsPageProps;

  return (
    <div className="pagePadding">
      <h1 className="text-2xl font-bold text-center my-5">Quiz Results</h1>
      <div className="bg-foreground p-6 rounded-lg shadow-md text-background max-w-2xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Summary</h2>
        <p className="text-lg">
          Total Score: <span className="font-bold">{score}</span>
        </p>
        <p className="text-lg">
          Correct Answers:{' '}
          <span className="font-bold">
            {quiz.questions.filter(
              (question) => userAnswers[question.id] === question.options.find((option) => option.is_correct)?.id
            ).length}
          </span>
        </p>
        <p className="text-lg">
          Incorrect Answers:{' '}
          <span className="font-bold">
            {quiz.questions.filter(
              (question) => userAnswers[question.id] !== question.options.find((option) => option.is_correct)?.id
            ).length}
          </span>
        </p>
      </div>

      <div className="mt-8 max-w-2xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Detailed Results</h2>
        {quiz.questions.map((question) => {
          const selectedOptionId = userAnswers[question.id];
          const correctOption = question.options.find((option) => option.is_correct);
          const isCorrect = selectedOptionId === correctOption?.id;

          return (
            <div key={question.id} className="mb-6 p-4 border rounded-lg shadow-sm">
              <h3 className="text-lg font-medium">{question.description}</h3>
              <p className={`text-sm ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                Your Answer: {question.options.find((option) => option.id === selectedOptionId)?.description || 'Not answered'}
              </p>
              <p className="text-sm text-gray-600">
                Correct Answer: {correctOption?.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ResultsPage;