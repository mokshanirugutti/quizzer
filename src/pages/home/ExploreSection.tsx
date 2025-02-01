import { BookIcon } from "lucide-react";
import React from "react";
import { Link } from "react-router";

const ExploreSection: React.FC = () => {
  return (
    <div className="pagePadding h-96">
      <div className="text-center w-fit mx-auto">
        <h1 className="text-xl md:text-4xl font-semibold my-1 tracking-normal">
          Need time for preparation
        </h1>
        <p className="text-foreground/80 my-2 mx-auto mb-5">
          We got you covered with <b>Study Material</b> and{" "}
          <b>Pratice Questions</b> <br />
          Use material to prepare for quizz and test your knowledge with pratice
          set. <br />
        </p>
        <Link to="/study">
          <button className="flex gap-3 w-fit mx-auto border rounded-md px-5 py-2 items-center bg-gradient-to-r from-[#0033FF] via-[#977DFF] via-65% to-[#60519B]  text-white/95 mt-3 font-semibold shadow-lg hover:rotate-1 hover:scale-95 transition-all duration-150">
            Explore Material <BookIcon />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ExploreSection;
