import { Button } from '@/components/ui/button';
import { ArrowRight, Check } from 'lucide-react';

interface NextButtonProps {
  onClick: () => void;
  isLastQuestion: boolean;
}

export default function NextButton({ onClick, isLastQuestion }: NextButtonProps) {
  return (
    <Button className="group w-32" onClick={onClick}>
      {isLastQuestion ? 'Finish' : 'Next'}
      {isLastQuestion ? (
        <Check
          className="-me-1 ms-2 opacity-60 transition-transform group-hover:translate-x-0.5"
          size={16}
          strokeWidth={2}
          aria-hidden="true"
        />
      ) : (
        <ArrowRight
          className="-me-1 ms-2 opacity-60 transition-transform group-hover:translate-x-0.5"
          size={16}
          strokeWidth={2}
          aria-hidden="true"
        />
      )}
    </Button>
  );
}