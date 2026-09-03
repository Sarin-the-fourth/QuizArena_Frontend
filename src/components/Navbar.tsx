import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "./ui/navigation-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { UserIcon } from "lucide-react";
import { useGetMe } from "@/hooks/useUser";

const menuItems = [
  {
    label: "Quizzes",
    path: "/quiz",
  },
  {
    label: "My Quizzes",
    path: "/my-quiz",
  },
  {
    label: "Play",
    path: "/play",
  },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  const { data } = useGetMe();
  const user = data?.data?.user;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed left-10 right-10 top-5 z-20 flex h-17 shrink-0 items-center rounded-full border border-black/5 bg-white/10 px-20 shadow-md hover:shadow-lg shadow-black/5 backdrop-blur-xl transition-all duration-300 ${
        scrolled ? "-translate-y-[calc(100%+20px)]" : "translate-y-0"
      }`}
    >
      <div className="flex items-center justify-between w-full">
        {/* Logo */}
        <img
          src="/QuizArenaTransparent.svg"
          alt="Quiz Arena"
          className="h-15 w-15 cursor-pointer object-contain transition-transform duration-300 hover:-rotate-10 hover:scale-115"
          onClick={() => navigate("/")}
        />

        {/* Navigation */}
        <NavigationMenu className="absolute left-[37%]">
          <NavigationMenuList className="gap-10">
            {menuItems.map((item) => (
              <NavigationMenuItem
                key={item.path}
                className="group/item h-15 overflow-hidden"
              >
                <div className="flex flex-col transition-transform duration-400 group-hover/item:-translate-y-1/2">
                  <Link
                    to={item.path}
                    className="flex h-15 items-center px-4 font-ComicRelief font-bold text-base"
                  >
                    {item.label}
                  </Link>

                  <Link
                    to={item.path}
                    className="flex h-10 items-center px-4 font-ComicRelief font-bold text-primary text-base"
                  >
                    {item.label}
                  </Link>
                </div>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem className="flex flex-row items-center">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full cursor-pointer flex flex-row items-center gap-4 font-ComicRelief"
                      >
                        <Avatar size="default">
                          <AvatarFallback>
                            <UserIcon />
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-semibold uppercase text-base">
                          {user.name.split(" ").slice(0, 1)}
                        </span>
                      </Button>
                    }
                  ></DropdownMenuTrigger>

                  <DropdownMenuContent className="w-46">
                    <DropdownMenuGroup>
                      <DropdownMenuItem>Profile</DropdownMenuItem>
                    </DropdownMenuGroup>

                    <DropdownMenuGroup>
                      <DropdownMenuItem
                        onClick={() => {
                          localStorage.removeItem("accessToken");
                          navigate(0);
                        }}
                        variant="destructive"
                      >
                        Log out
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex flex-row gap-2 items-center">
                  <Button
                    variant="ghost"
                    className="cursor-pointer font-Outfit font-bold"
                    onClick={() => navigate("/login")}
                  >
                    Log In
                  </Button>
                  <Button
                    variant="default"
                    className="cursor-pointer font-Outfit font-bold"
                    onClick={() => navigate("/signup")}
                  >
                    Sign Up
                  </Button>
                </div>
              )}
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
};

export default Navbar;
