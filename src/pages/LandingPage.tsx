import ExploreSection from "@/components/landingpageComp/ExploreSection";
import HeroSection from "@/components/landingpageComp/HeroSection";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";

gsap.registerPlugin(SplitText, ScrollTrigger);
const LandingPage = () => {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <ExploreSection />
    </div>
  );
};

export default LandingPage;
