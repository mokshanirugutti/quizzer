import React from "react";
import StudyAnimation from "@/components/lottieAnimations/StudyAnimation";
import { Link } from "react-router";
import ExploreSection from "./ExploreSection";
const HeroSection: React.FC = () => {
  return (
    <div>
      <div className="pagePadding flex md:flex-row flex-col justify-around items-center w-full md:mb-20 md:pb-20 mt-20 md:mt-0 ">
        <div className="flex flex-col gap-3 md:w-1/2 h-80 py-20 mb-5">
          <h1 className="text-4xl font-bold">
            Welcome to <span className="text-[#00b8ff]">Quizzer</span>
          </h1>
          <p className="md:w-2/3 text-primary/80">
            Enhance your learning experience with Quizzer. Test your knowledge
            and boost your skills with our interactive quizzes.
          </p>

          <div className="flex  gap-3 ">
            <Link to="/quiz">
              <button className="px-3 py-2 rounded-md border-2 border-foreground bg-foreground text-background w-40 font-semibold cursor-pointer hover:-translate-y-1 transition duration-150 ease-in-out">
                Start Quiz
              </button>
            </Link>
            <a href="#explore">
              <button className="px-3 py-2 rounded-md border-2 border-foreground/45  w-40 font-semibold cursor-pointer hover:-translate-y-1 transition duration-150 ease-in-out">
                Explore
              </button>
            </a>
          </div>
        </div>

        <StudyAnimation />
      </div>
      <div id="explore">
        <ExploreSection />
      </div>
    </div>
  );
};

export default HeroSection;
