import CategoryCarousel from "@/components/CategoryCarousel";
import EmptyData from "@/components/EmptyData";
import Heading from "@/components/Heading";
import QuizCard from "@/components/QuizCard";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useGetQuiz } from "@/hooks/useQuiz";
import { CornerDownLeft, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const QuizPage = () => {
  const { data, isLoading } = useGetQuiz();
  const [debounce, setDebounce] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category") ?? "";
  const quizzes = data?.data?.quiz ?? [];

  const handleCategorySelect = (category: string) => {
    if (!category) {
      setSearchParams({});
      return;
    }

    setSearchParams({
      category,
    });
  };

  useEffect(() => {
    if (!search.trim()) {
      setDebounce("");
      setLoading(false);
      return;
    }

    setLoading(true);
    const timer = setTimeout(() => {
      setDebounce(search);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const searchKeyword = debounce.toLowerCase().trim();

  const filteredList = [...quizzes].filter((quiz) => {
    // Search takes priority
    if (searchKeyword) {
      return (
        quiz.title.toLowerCase().includes(searchKeyword) ||
        quiz.category.toLowerCase().includes(searchKeyword)
      );
    }

    // Otherwise category
    if (selectedCategory) {
      return quiz.category === selectedCategory;
    }

    return true;
  });

  return (
    <div
      data-aos="fade-up"
      data-aos-duration="750"
      className="flex flex-col gap-10"
    >
      <div className="flex justify-between items-center px-5">
        <Heading
          heading="Explore Quizzes"
          description="Discover something new, test your knowledge, and keep learning."
        />
        <InputGroup className="w-80 font-Outfit">
          <InputGroupInput
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Quiz..."
          />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
          <InputGroupAddon align="inline-end">
            <CornerDownLeft />
          </InputGroupAddon>
        </InputGroup>
      </div>
      <CategoryCarousel onCategorySelect={handleCategorySelect} />

      {filteredList.length <= 0 ? (
        <EmptyData
          title="No Quiz Found!"
          description="We couldn't find any quizzes matching your search."
        />
      ) : (
        <div
          data-aos="fade-up"
          data-aos-duration="750"
          className="flex flex-wrap gap-5"
        >
          {filteredList.map((quiz) => (
            <QuizCard
              key={quiz._id}
              quiz={quiz}
              loading={isLoading || loading}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default QuizPage;
