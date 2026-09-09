import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SmoothScroll from "@/hooks/useLenis";
import { Outlet, useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useEffect, useRef } from "react";
import { useGameSessionStore } from "@/stores/useGameStore";
import { useLeaveGame } from "@/hooks/useGame";
import { socket } from "@/lib/socket";

gsap.registerPlugin(ScrollTrigger);

const MainLayout = () => {
  const leaveGame = useLeaveGame();
  const location = useLocation();
  const roomCode = useGameSessionStore((state) => state.roomCode);
  const previousPathRef = useRef(location.pathname);

  useEffect(() => {
    if (!roomCode) {
      previousPathRef.current = location.pathname;
      return;
    }

    const previousPath = previousPathRef.current;

    const wasInGame = previousPath.startsWith(`/game/${roomCode}`);
    const isInGame = location.pathname.startsWith(`/game/${roomCode}`);

    // We just entered or are still inside the game
    if (isInGame) {
      previousPathRef.current = location.pathname;
      return;
    }

    // We actually transitioned FROM the game to somewhere else
    if (wasInGame && !isInGame && !leaveGame.isPending) {
      socket.emit("leaveGame", roomCode);
      leaveGame.mutate(roomCode);
    }

    previousPathRef.current = location.pathname;
  }, [location.pathname, roomCode]);
  return (
    <div className="w-full flex flex-col">
      <SmoothScroll />
      <Navbar />
      <div className="mt-30 px-10">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
