import { ArrowDown } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section
      data-aos="fade-up"
      data-aos-duration="750"
      className="relative rounded-3xl h-130 bg-[#FFEBB8] flex flex-row px-10 pt-10 pb-5"
    >
      <img
        src="/src/assets/decoratives/Rope.svg"
        className="absolute w-30 object-contain -top-3 -left-3 -rotate-40 select-none"
      />
      <div className="flex flex-col gap-10 text-start font-Outfit w-1/2 justify-center">
        <div className="flex flex-col gap-2">
          <h1 className="text-black! font-bold! text-[64px]!">Quiz Arena</h1>
          <div className="flex flex-col gap-5">
            <p className="text-black/70">
              Think you know it all? Put your knowledge to the test, challenge
              your friends, and race against the clock to become the Quiz Arena
              champion.
            </p>
            <p className="text-black/70">
              Challenge yourself or compete with others in real-time quizzes.
            </p>
          </div>
        </div>
        <div className="flex flex-row gap-5 items-center">
          <Button variant="default" onClick={() => navigate(`/play`)}>
            Play Now
          </Button>
          <Button variant="default" onClick={() => navigate(`/quiz`)}>
            Create Game
          </Button>
        </div>
        <span className="flex mt-5 items-center gap-2 text-sm text-black/70">
          Explore More <ArrowDown className="w-4 h-4" />
        </span>
      </div>
      <div className="">
        <img />
      </div>
    </section>
  );
};

export default HeroSection;
