import { useGetCategory } from "@/hooks/useQuiz";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { useSearchParams } from "react-router-dom";

type CategoryCarouselProps = {
  onCategorySelect: (category: string) => void;
};

const CategoryCarousel = ({ onCategorySelect }: CategoryCarouselProps) => {
  const { data } = useGetCategory();
  const categories = data?.data?.categories ?? [];
  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category");

  // Three identical sets.
  // We animate by the width of one set.
  const duplicate = [...categories, ...categories, ...categories];

  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;

    if (!container || !track || categories.length === 0) return;

    // Since we have 3 identical sets,
    // one set is 1/3 of the total track width.
    const totalWidth = track.scrollWidth / 3;

    const animation = gsap.to(track, {
      x: -totalWidth,
      duration: 20,
      ease: "none",
      repeat: -1,
    });

    const pauseAnimation = () => {
      animation.pause();
    };

    const resumeAnimation = () => {
      animation.resume();
    };

    container.addEventListener("mouseenter", pauseAnimation);
    container.addEventListener("mouseleave", resumeAnimation);

    return () => {
      animation.kill();

      container.removeEventListener("mouseenter", pauseAnimation);
      container.removeEventListener("mouseleave", resumeAnimation);
    };
  }, [categories]);

  if (categories.length === 0) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="relative flex w-full items-center overflow-hidden h-15"
    >
      <div className="absolute w-[0%] md:w-[5%] h-full z-10 left-0 bg-linear-to-r from-[#F7F6F2] via-30% to-transparent" />
      <div className="absolute w-[0%] md:w-[5%] h-full z-10 right-0 bg-linear-to-l from-[#F7F6F2] via-30% to-transparent" />
      <div ref={trackRef} className="flex w-max flex-row items-center gap-8">
        {duplicate.map((category, index) => (
          <Button
            key={`${category}-${index}`}
            className={`w-40 shrink-0 rounded-xl p-2 font-Outfit text-sm transition-color duraiton-300 ${
              selectedCategory === category && `bg-black! text-white!`
            }`}
            onClick={() => {
              onCategorySelect(category);
            }}
          >
            {category}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CategoryCarousel;
