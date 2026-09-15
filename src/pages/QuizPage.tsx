import CategoryCarousel from "@/components/CategoryCarousel";
import EmptyData from "@/components/EmptyData";
import Heading from "@/components/Heading";
import QuizCard from "@/components/QuizCard";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { useGetQuiz } from "@/hooks/useQuiz";
import { CornerDownLeft, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const QuizPage = () => {
  const { data, isLoading } = useGetQuiz();

  const [debounce, setDebounce] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCategory = searchParams.get("category") ?? "";
  const quizzes = data?.data?.quiz ?? [];

  const ITEMS_PER_PAGE = 9;

  const handleCategorySelect = (category: string) => {
    if (!category) {
      setSearchParams({});
      return;
    }

    setSearchParams({
      category,
    });
  };

  // Search debounce
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

  // Filter quizzes
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

  // Pagination
  const totalPages = Math.ceil(filteredList.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const paginatedList = filteredList.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  // Reset pagination when search/category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchKeyword, selectedCategory]);

  return (
    <div
      data-aos="fade-up"
      data-aos-duration="750"
      className="flex flex-col gap-10"
    >
      {/* Header */}
      <div className="flex justify-between items-center px-5">
        <Heading
          heading="Explore Quizzes"
          description="Discover something new, test your knowledge, and keep learning."
        />

        <InputGroup className="w-80 font-Outfit">
          <InputGroupInput
            value={search}
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

      {/* Categories */}
      <CategoryCarousel onCategorySelect={handleCategorySelect} />

      {/* Quiz List */}
      {filteredList.length <= 0 ? (
        <EmptyData
          title="No Quiz Found!"
          description="We couldn't find any quizzes matching your search."
        />
      ) : (
        <>
          <div
            data-aos="fade-up"
            data-aos-duration="750"
            className="grid grid-cols-3 gap-5 2xl:gap-10 mx-auto justify-items-center"
          >
            {paginatedList.map((quiz) => (
              <QuizCard
                key={quiz._id}
                quiz={quiz}
                loading={isLoading || loading}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination className="">
              <PaginationContent>
                {/* Previous */}
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();

                      if (currentPage > 1) {
                        setCurrentPage((prev) => prev - 1);
                      }
                    }}
                    className="font-Outfit!"
                  />
                </PaginationItem>

                {/* Page numbers */}
                {Array.from({ length: totalPages }, (_, index) => {
                  const page = index + 1;

                  return (
                    <PaginationItem key={page}>
                      <PaginationLink
                        href="#"
                        isActive={currentPage === page}
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentPage(page);
                        }}
                        className="font-Outfit!"
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}

                {/* Next */}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();

                      if (currentPage < totalPages) {
                        setCurrentPage((prev) => prev + 1);
                      }
                    }}
                    className="font-Outfit!"
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </>
      )}
    </div>
  );
};

export default QuizPage;
