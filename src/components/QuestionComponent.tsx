import React from 'react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useId } from 'react';
import NextButton from './ui/NextButton';
import { motion } from 'framer-motion';

interface QuestionComponentProps {
  question: string;
  options: { id: number; description: string }[];
  onNext: () => void;
  isLastQuestion: boolean;
}

const QuestionComponent: React.FC<QuestionComponentProps> = ({
  question,
  options,
  onNext,
  isLastQuestion,
}) => {
  const id = useId();

  return (
    <motion.div
      key={question} // Use the question text as the key to trigger animations
      initial={{ opacity: 0, x: -50 }} // Initial state (hidden and slightly to the left)
      animate={{ opacity: 1, x: 0 }} // Animate to visible and centered
      exit={{ opacity: 0, x: 50 }} // Exit state (hidden and slightly to the right)
      transition={{ duration: 0.3 }} // Animation duration
      className="py-5 border rounded-md shadow-md min-w-96 max-w-2xl px-10 mx-auto flex flex-col"
    >
      <h1 className="text-lg font-medium pb-3">{question}</h1>

      <div className="px-5 py-3">
        <RadioGroup>
          {options.map((option) => (
            <div key={option.id} className="flex items-center gap-2 my-1">
              <RadioGroupItem value={String(option.id)} id={`${id}-${option.id}`} />
              <Label htmlFor={`${id}-${option.id}`}>{option.description}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Ensure NextButton stays at the bottom */}
      <div className="mt-auto self-end">
        <NextButton onClick={onNext} isLastQuestion={isLastQuestion} />
      </div>
    </motion.div>
  );
};

export default QuestionComponent;