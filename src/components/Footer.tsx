import { Trophy } from "lucide-react";
import { Button } from "./ui/button";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden border-t border-black/10 bg-white/40 backdrop-blur-xl">
      {/* Decorative glow */}
      <div className="pointer-events-none absolute -top-32 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-[#ffbd59]/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-8 py-10">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Brand */}
          <div className="space-y-5">
            <div className="flex items-center gap-2">
              <img
                src="/QuizArenaTransparent.svg"
                alt="Quiz Arena Logo"
                className="w-20 h-20 object-contain"
              />
            </div>

            <p className="max-w-sm text-start font-Outfit text-sm leading-6 text-muted-foreground">
              Challenge your knowledge, compete with your friends, and prove
              you're the ultimate Quiz Arena champion.
            </p>
          </div>

          {/* Navigation */}
          <div className="grid grid-cols-2 gap-8 font-Outfit">
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest">
                Explore
              </h3>

              <div className="flex flex-col gap-3 text-sm text-muted-foreground">
                <a href="/" className="transition-colors hover:text-black">
                  Home
                </a>
                <a href="/quiz" className="transition-colors hover:text-black">
                  Quizzes
                </a>
                <a href="/play" className="transition-colors hover:text-black">
                  Play
                </a>
                <a
                  href="/my-quiz"
                  className="transition-colors hover:text-black"
                >
                  My Quizzes
                </a>
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest">
                Community
              </h3>

              <div className="flex flex-col gap-3 text-sm text-muted-foreground">
                <a
                  href="/under-construction"
                  className="transition-colors hover:text-black"
                >
                  About
                </a>
                <a
                  href="/under-construction"
                  className="transition-colors hover:text-black"
                >
                  Contact
                </a>
                <a
                  href="/under-construction"
                  className="transition-colors hover:text-black"
                >
                  Privacy
                </a>
                <a
                  href="/under-construction"
                  className="transition-colors hover:text-black"
                >
                  Terms
                </a>
              </div>
            </div>
          </div>

          {/* Social / CTA */}
          <div className="flex flex-col justify-between gap-8 md:items-end">
            <div className="text-left md:text-right">
              <h3 className="font-Outfit text-lg font-semibold">
                Ready to test yourself?
              </h3>

              <p className="mt-2 font-Outfit text-sm text-muted-foreground">
                Jump into a quiz and see where you stand.
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 h-px w-full bg-black/10" />

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-3 font-Outfit text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Quiz Arena. All rights reserved.</p>

          <p>
            Built to <span className="font-semibold text-black">challenge</span>{" "}
            your brain.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
