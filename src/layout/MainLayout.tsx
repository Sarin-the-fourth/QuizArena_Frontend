import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SmoothScroll from "@/hooks/useLenis";
import { Outlet } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const MainLayout = () => {
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
