import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { marked } from "marked";

interface DetailedSolutionPopupProps {
  detailedSolution: string;
}


export default function DetailedSolutionPopup({ detailedSolution }: DetailedSolutionPopupProps) {

  // for solution description few contains explation and answer at start and few does not contain 
  // trimmed the starting to keep consistancy
  const cleanedSolution = detailedSolution.replace(/.*?(?:\*\*Explanation:\*\*|The answer is correct because:\*\*)/s, "").trim();

  // Convert Markdown to HTML
  const htmlContent = marked(cleanedSolution);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Detailed Solution</Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-0 p-0 sm:max-h-[min(640px,80vh)] sm:max-w-lg [&>button:last-child]:top-3.5">
        <DialogHeader className="contents space-y-0 text-left">
          <DialogTitle className="border-b border-border px-6 py-4 text-base">
            Explanation 
          </DialogTitle>
          <div className="overflow-y-auto">
          <DialogDescription asChild>
              <div className="px-6 py-4">
                <div
                  className="space-y-4 [&_strong]:font-semibold [&_strong]:text-foreground"
                  dangerouslySetInnerHTML={{ __html: htmlContent }}
                />
              </div>
            </DialogDescription>
            <DialogFooter className="px-6 pb-6 sm:justify-start">
              <DialogClose asChild>
                <Button type="button">Okay</Button>
              </DialogClose>
            </DialogFooter>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
