import React from 'react'
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useId } from "react";
import NextButton from './ui/NextButton';

const QuestionComponent:React.FC = () => {
    const id = useId();
    return (
        <div className='py-5 border rounded-md shadow-md w-fit px-10 mx-auto flex flex-col'>
            <h1 className='text-lg font-medium pb-3'>
                If the base sequence in DNA is 5' AAAT 3' then the base sequence in mRNA is :
            </h1>
            
            <div className='px-5 py-3'>
                <RadioGroup>
                    {[1, 2, 3, 4].map((num) => (
                        <div key={num} className="flex items-center gap-2 my-1">
                            <RadioGroupItem value={String(num)} id={`${id}-${num}`} />
                            <Label htmlFor={`${id}-${num}`}>Option {num}</Label>
                        </div>
                    ))}
                </RadioGroup>
            </div>

            {/* Ensuring NextButton stays at the bottom */}
            <div className='mt-auto self-end'>
                <NextButton />
            </div>
        </div>
    )
}

export default QuestionComponent;
