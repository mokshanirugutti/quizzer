import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import NextButton from '@/components/ui/NextButton';
import { motion } from 'framer-motion';

interface QuestionComponentProps {
  question: {
    id: number;
    description: string;
    options: { id: number; description: string }[];
  };
  onNext: () => void;
  isLastQuestion: boolean;
  onAnswerSelect: (questionId: number, optionId: number) => void;
  selectedAnswer: number | undefined;
}

const QuestionComponent: React.FC<QuestionComponentProps> = ({
  question,
  onNext,
  isLastQuestion,
  onAnswerSelect,
  selectedAnswer,
}) => {
  const [error, setError] = useState<string | null>(null);

  const handleNext = () => {
    if (selectedAnswer === undefined) {
      setError('Please select an answer before proceeding.');
    } else {
      setError(null);
      onNext();
    }
  };

  return (
    <motion.div
      key={question.id} 
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }} 
      exit={{ opacity: 0, x: 50 }} 
      transition={{ duration: 0.3 }}
      className="py-5 border rounded-md shadow-md min-w-96 max-w-2xl px-10 mx-auto flex flex-col"
    >
      <h1 className="text-lg font-medium pb-3">{question.description}</h1>

      <div className="px-5 py-3">
        <RadioGroup
         value={selectedAnswer ? String(selectedAnswer) : undefined}
         onValueChange={(value) => onAnswerSelect(question.id, Number(value))}
        >
        {question.options.map((option) => (
            <div key={option.id} className="flex items-center gap-2 my-1">
              <RadioGroupItem value={String(option.id)} id={`${question.id}-${option.id}`} />
              <Label htmlFor={`${question.id}-${option.id}`}>{option.description}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      
      {/* Ensure NextButton stays at the bottom */}
      <div className="mt-auto self-end">
        <NextButton onClick={handleNext} isLastQuestion={isLastQuestion} />
      </div>
    </motion.div>
  );
};

export default QuestionComponent;