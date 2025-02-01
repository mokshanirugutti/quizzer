import { useEffect, useState } from 'react';
import { QuizData, } from '../types';
import { fetchQuizData } from '@/services/quizService';
import TabedCard from '@/components/TabedCard';
import { ArrowLeftCircle, ArrowRightCircle } from 'lucide-react';
import { LineWave } from 'react-loader-spinner';


const StudyPage = () => {
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

  const handleNext = () => {
    if (quiz && currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
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


  const currentQuestion = quiz.questions[currentQuestionIndex];

  return (
    <div className="pagePadding">
      <div className="max-w-3xl mx-auto">
        <h1>{quiz.title}</h1>
        <p>{quiz.description}</p>
        <div>
          <div className="bg-foreground/10 p-2 rounded-md my-2 flex justify-between items-center gap-3" >
            <ArrowLeftCircle
                onClick={handleBack}
                className={currentQuestionIndex === 0 ? 'invisible' : 'block' +'h-12 w-12'}
            />
            <p className='mx-3'>{currentQuestionIndex + 1}. {currentQuestion.description}</p>
            <ArrowRightCircle
                onClick={handleNext}
                className={currentQuestionIndex === quiz.questions.length - 1 ? 'invisible' : 'block' +'h-12 w-12'}
            />
          </div>
          <TabedCard
            studyMaterial={currentQuestion.reading_material?.content_sections || []}
            practiceMaterial={currentQuestion.reading_material?.practice_material?.content || []}
          />
        </div>
      </div>
    </div>
  );
};

export default StudyPage;