import { heroDecorations } from "@/assets/decoratives";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

const HeroSection = () => {
  const navigate = useNavigate();
  const quizheadingRef = useRef<HTMLHeadingElement | null>(null);
  const arenaheadingRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    const splitTextQuiz = new SplitText(quizheadingRef.current, {
      type: "chars",
    });
    const splitTextArena = new SplitText(arenaheadingRef.current, {
      type: "words",
    });

    const tl = gsap.timeline();

    tl.from(splitTextQuiz.chars, {
      y: -500,
      duration: 0.1,
      opacity: 0,
      ease: "power3.inOut",
      stagger: { each: 0.5 },
    })
      .from(splitTextArena.words, {
        x: 500,
        duration: 1,
        opacity: 0,
        ease: "bounce.out",
      })
      .to(splitTextArena.words, {
        color: "#ffbd59",
        duration: 0.5,
        ease: "power3.inOut",
      });

    gsap.utils
      .toArray<HTMLDivElement>(".hero-decoration")
      .forEach((item, index) => {
        // one-time fade in, plays once and stays at 1
        gsap.fromTo(
          item,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 1,
            delay: Math.random() * 0.8,
            ease: "power1.out",
          }
        );

        // separate infinite float, never touches opacity
        gsap.to(item, {
          y: index % 2 === 0 ? -17 : 17,
          rotation: index % 2 === 0 ? 5 : -5,
          duration: 1.5 + Math.random() * 0.8,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: Math.random() * 0.8,
        });
      });

    return () => {
      splitTextQuiz.revert();
      splitTextArena.revert();
    };
  }, []);

  return (
    <section className="relative flex justify-center items-center h-screen mt-[-60px]! overflow-none">
      {heroDecorations.map((decoration, index) => {
        const Icon = decoration.Icon;

        return (
          <div
            key={index}
            className="absolute hero-decoration"
            style={{
              top: decoration.top,
              right: decoration.right,
              color: decoration.color,
              transform: `rotate(${decoration.rotate}deg)`,
            }}
          >
            {Icon ? (
              <Icon size={decoration.size} />
            ) : (
              <span className="font-bold" style={{ fontSize: decoration.size }}>
                {decoration.symbol}
              </span>
            )}
          </div>
        );
      })}
      <div className="flex flex-col gap-3 text-center items-center justify-center">
        <h1 className="text-black! font-bold! text-[90px]!">
          <span ref={quizheadingRef} className="inline-block">
            Quiz
          </span>{" "}
          <span ref={arenaheadingRef} className="inline-block">
            Arena
          </span>
        </h1>
        <p
          data-aos="fade-up"
          data-aos-duration="750"
          className="text-muted-foreground w-[70%] font-Outfit"
        >
          Think you know it all? Put your knowledge to the test, challenge your
          friends, and race against the clock to become the Quiz Arena champion.
        </p>
        <div
          data-aos="fade-up"
          data-aos-duration="750"
          className="flex flex-row font-Outfit justify-between w-[20%] mt-2"
        >
          <Button
            variant="outline"
            onClick={() => navigate(`/play`)}
            className="cursor-pointer hover:bg-black! hover:text-white! transition-colors duration-300"
          >
            Play Now
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate(`/quiz`)}
            className="cursor-pointer hover:bg-[#ffbd59]! hover:text-black! transition-colors duration-300"
          >
            Create Game
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
