import CreateQuizDialog from "@/components/CreateQuizDialog";
import EmptyData from "@/components/EmptyData";
import Heading from "@/components/Heading";
import QuizCard from "@/components/QuizCard";
import { Button } from "@/components/ui/button";
import { useGetMyQuiz } from "@/hooks/useQuiz";
import { LayersPlus } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const MyQuizzesPage = () => {
  const { data, isLoading } = useGetMyQuiz();
  const [open, setOpen] = useState<boolean>(false);
  const quizzes = data?.data?.quiz ?? [];
  const navigate = useNavigate();
  return (
    <div
      data-aos="fade-up"
      data-aos-duration="750"
      className="flex flex-col gap-10"
    >
      <div className="flex flex-row justify-between items-center px-10">
        <Heading
          heading="Your Quizzes"
          description="Create, manage, and keep track of the quizzes you've built."
        />
        <Button
          onClick={() => setOpen(true)}
          className="font-Outfit flex items-center gap-2"
        >
          <LayersPlus />
          Create a Quiz!
        </Button>
      </div>

      {quizzes.length <= 0 ? (
        <>
          {localStorage.getItem("accessToken") ? (
            <EmptyData
              title="No Quizzes Yet"
              description="There aren't any quizzes here yet. Create your first quiz and
                  start putting your knowledge to the test!"
            />
          ) : (
            <EmptyData
              title="Explore & Learn"
              description="Sign in to explore quizzes, track your progress, and challenge
              yourself with fun questions."
            />
          )}
        </>
      ) : (
        <div className="flex flex-wrap gap-5">
          {quizzes.map((quiz) => (
            <QuizCard key={quiz._id} quiz={quiz} loading={isLoading} isMyQuiz />
          ))}
        </div>
      )}

      <CreateQuizDialog open={open} />
    </div>
  );
};

export default MyQuizzesPage;
