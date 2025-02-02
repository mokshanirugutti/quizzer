import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
  } from "@heroui/react";
  import { CircleCheck,  CircleHelpIcon, CircleX, Hourglass, InfoIcon, PartyPopperIcon } from "lucide-react"; 
  import { Link } from "react-router";
  
  interface InstructionsPopupProps {
    totalQuestions: number;
    correctPoints: string;
    incorrectPoints: string;
  }
  
  export default function InstructionsPopup({ totalQuestions, correctPoints, incorrectPoints }: InstructionsPopupProps) {
    const { isOpen, onOpen, onClose } = useDisclosure();
  
    const handleOpen = () => {
      onOpen();
    };
  
    return (
      <>
        <div>
          <Button color="primary" variant="light" onPress={handleOpen}>
            <InfoIcon />
          </Button>
        </div>
        <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">Instructions for Quiz</ModalHeader>
                <ModalBody>
                  <div className="mb-1">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="border  h-12 rounded-lg flex  gap-2 items-center text-sm px-4 ">
                        <CircleHelpIcon/> 
                        <p> Total questions: <br /> {totalQuestions} </p>
                      </div>
                      <div className="border  h-12 rounded-lg flex  gap-2 items-center text-sm px-4">
                        <Hourglass/>
                        <p> Total time:  <br />  10 minutes </p>
                      </div>
                      <div className="border  h-12 rounded-lg flex  gap-2 items-center text-sm px-4">
                        <CircleCheck/>
                        Correct answer:  <br />  {correctPoints} points
                      </div>
                      <div className="border  h-12 rounded-lg flex gap-2  items-center text-sm px-4">
                        <CircleX/>
                        Incorrect answer:  <br />  -{incorrectPoints} points
                      </div>
                      <div className="border  h-12 rounded-lg flex gap-2  items-center text-sm px-4 col-span-2">
                         <PartyPopperIcon/>  + 1 point for every 10 seconds left
                      </div>
                    </div>
                  </div>
                  <div className="mb-1">
                    <h1 className="text-lg font-medium">Badges:</h1>
                    <ul className="list-disc pl-5">
                      <li className="my-1">
                        <span className="tracking-wide">Streak Master:</span> <br />
                        <span className="text-foreground/80">Achieved a streak of 5 or more correct answers!</span>
                      </li>
                      <li className="my-1">
                        <span className="tracking-wide">Speedster:</span> <br />
                        <span className="text-foreground/80">Finished the quiz with more than 5 minutes left!</span>
                      </li>
                      <li className="my-1">
                        <span className="tracking-wide">Perfect Score:</span> <br />
                        <span className="text-foreground/80">Answered all questions correctly!</span>
                      </li>
                    </ul>
                  </div>
                  <p>
                    Visit <Link to='/study' className="text-primary-500 underline">Study</Link>, if you need help with preparation.
                  </p>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    );
  }