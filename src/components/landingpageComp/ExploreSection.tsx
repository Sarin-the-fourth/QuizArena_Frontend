import { useRef, useState } from "react";
import gsap from "gsap";
import { Target, Trophy } from "lucide-react";

const cards = [
  {
    id: 0,
    title: "Build Quizzes",
    description:
      "Got questions? Turn them into a quiz. Create custom challenges, choose your category, and make something your friends will love to play.",
    symbol: "!?",
    symbolColor: "#C0392B",
    bg: "bg-primary",
  },
  {
    id: 1,
    title: "Invite Friends",
    description:
      "Create a game room and invite your friends. Share the room code and get everyone ready for the challenge.",
    symbol: <Target className="w-35 h-35" />,
    symbolColor: "#2471A1",
    bg: "bg-[#F5D6A6]",
  },
  {
    id: 2,
    title: "Play & Compete",
    description:
      "Answer questions, earn points, climb the leaderboard, and prove who really knows their stuff.",
    symbol: <Trophy className="w-35 h-35" />,
    symbolColor: "#B9770E",
    bg: "bg-[#F2B8B5]",
  },
];

const ExploreSection = () => {
  const [activeCard, setActiveCard] = useState<number>(0);
  const symbols = useRef<Record<number, HTMLSpanElement | null>>({});
  const handleCardClick = (id: number) => {
    if (id === activeCard) return;
    setActiveCard(id);
  };

  const handleMouseEnter = (id: number) => {
    const symbol = symbols.current[id];

    if (!symbol) return;

    gsap.killTweensOf(symbol);

    gsap.to(symbol, {
      y: -15,
      yoyo: true,
      repeat: -1,
      duration: 0.5,
      ease: "power1.out",
    });
  };

  const handleMouseLeave = (id: number) => {
    const symbol = symbols.current[id];

    if (!symbol) return;

    gsap.killTweensOf(symbol);

    gsap.to(symbol, {
      y: 0,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  return (
    <section className="flex items-center justify-center font-Outfit">
      <div className="relative h-50 w-full max-w-5xl">
        {cards.map((card) => {
          const position = (card.id - activeCard + cards.length) % cards.length;
          return (
            <div
              onMouseEnter={() => handleMouseEnter(card.id)}
              onMouseLeave={() => handleMouseLeave(card.id)}
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className={`absolute inset-0 cursor-pointer ${card.bg} rounded-3xl border-3 p-10 transition-all duration-500 ease-out`}
              style={{
                zIndex: cards.length - position,
                transform: ` translateX(${position * 45}px) scale(${
                  1 - position * 0.025
                }) `,
                filter:
                  position === 0
                    ? "none"
                    : `brightness(${1 - position * 0.04})`,
              }}
            >
              <div className="flex h-full flex-row items-center justify-between">
                <div className="flex max-w-2xl flex-col gap-5 text-start">
                  <span className="text-[52px] font-bold">{card.title}</span>
                  <p className="w-3/4 text-gray-700">{card.description}</p>
                </div>
                <span
                  ref={(el) => {
                    symbols.current[card.id] = el;
                  }}
                  className="text-[150px] opacity-90"
                  style={{ color: card.symbolColor }}
                >
                  {card.symbol}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ExploreSection;
