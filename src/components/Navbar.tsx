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
import { Menu, UserIcon, X } from "lucide-react";
import { useGetMe } from "@/hooks/useUser";
import { useMutation } from "@tanstack/react-query";
import { logout } from "@/services/auth.service";
import { showErrorToast, showSuccessToast } from "./Toast";
import { disconnectSocket } from "@/lib/socket";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "./ui/drawer";

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
  const [menuOpen, setMenuOpen] = useState(false);

  const { data } = useGetMe();
  const user = data?.data?.user;

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrolledUp = currentScrollY < lastScrollY;

      if (currentScrollY <= 100 || scrolledUp) {
        // Near the top, or scrolling up even slightly (anywhere on the page): show
        setScrolled(false);
      } else {
        // Scrolling down past the threshold: hide
        setScrolled(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: (res) => {
      showSuccessToast(res?.data?.message);
      localStorage.removeItem("accessToken");
      disconnectSocket();
      navigate(0);
    },
    onError: (error) => showErrorToast(error),
  });

  const handleLogout = () => {
    setMenuOpen(false);
    logoutMutation.mutate();
  };

  return (
    <nav
      className={`fixed left-3 right-3 top-3 z-20 flex h-16 shrink-0 items-center rounded-2xl border border-black/5 bg-white/85 px-4 shadow-md shadow-black/5 backdrop-blur-xl transition-all duration-300 sm:left-6 sm:right-6 sm:top-4 sm:px-6 sm:rounded-full lg:left-10 lg:right-10 lg:top-5 lg:h-17 lg:px-20 ${
        scrolled ? "-translate-y-[calc(100%+20px)]" : "translate-y-0"
      }`}
    >
      <div className="flex items-center justify-between w-full">
        {/* Logo */}
        <img
          src="/QuizArenaTransparent.svg"
          alt="Quiz Arena"
          className="h-12 w-12 cursor-pointer object-contain transition-transform duration-300 hover:-rotate-10 hover:scale-115 sm:h-14 sm:w-14"
          onClick={() => {
            setMenuOpen(false);
            navigate("/");
          }}
        />

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden lg:flex absolute left-[37%]">
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

        <Drawer
          swipeDirection="right"
          open={menuOpen}
          onOpenChange={setMenuOpen}
        >
          <DrawerTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                className="flex lg:hidden"
                aria-label="Open navigation menu"
              >
                <Menu className="size-5" />
              </Button>
            }
          />
          <DrawerContent className="h-full w-[min(22rem,88vw)] max-h-dvh bg-background px-5 pb-6 pt-4">
            <DrawerHeader className="flex flex-row items-center justify-between border-b border-border px-0 pb-5">
              <div>
                <span className="block text-2xl font-bold font-Outfit">
                  Quiz Arena
                </span>
                <span className="text-sm text-muted-foreground">
                  Choose where to go
                </span>
              </div>
              <DrawerClose
                render={
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Close navigation menu"
                  >
                    <X />
                  </Button>
                }
              />
            </DrawerHeader>
            <nav className="flex flex-1 flex-col gap-2 pt-6">
              <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Explore
              </p>
              <div className="flex flex-col gap-1">
                {menuItems.map((item) => (
                  <div key={item.path}>
                    <Link
                      to={item.path}
                      onClick={() => setMenuOpen(false)}
                      className="flex min-h-14 items-center rounded-xl px-3 font-ComicRelief text-xl font-bold transition-colors hover:bg-muted active:bg-muted"
                    >
                      {item.label}
                    </Link>
                  </div>
                ))}
              </div>
            </nav>
            <DrawerFooter className="border-t border-border px-0 pt-5">
              {user ? (
                <>
                  <div className="flex items-center gap-3 px-2 pb-3">
                    <Avatar size="default">
                      <AvatarFallback>
                        <UserIcon />
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="truncate font-ComicRelief font-semibold">
                        {user.name}
                      </p>
                      <p className="text-xs font-ComicRelief text-muted-foreground">
                        Signed in
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    className="w-full font-Outfit justify-start"
                    onClick={() => {
                      setMenuOpen(false);
                      navigate("/under-construction");
                    }}
                  >
                    Profile
                  </Button>
                  <Button
                    variant="destructive"
                    className="w-full font-Outfit justify-start"
                    disabled={logoutMutation.isPending}
                    onClick={handleLogout}
                  >
                    {logoutMutation.isPending ? "Logging out…" : "Log out"}
                  </Button>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    className="font-Outfit"
                    onClick={() => {
                      setMenuOpen(false);
                      navigate("/login");
                    }}
                  >
                    Log In
                  </Button>
                  <Button
                    className="font-Outfit"
                    onClick={() => {
                      setMenuOpen(false);
                      navigate("/signup");
                    }}
                  >
                    Sign Up
                  </Button>
                </div>
              )}
            </DrawerFooter>
          </DrawerContent>
        </Drawer>

        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            <NavigationMenuItem className="flex flex-row items-center">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full cursor-pointer flex flex-row items-center gap-2 font-ComicRelief"
                      >
                        <Avatar size="default">
                          <AvatarFallback>
                            <UserIcon />
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-semibold text-sm">
                          {user.name.split(" ").slice(0, 1)}
                        </span>
                      </Button>
                    }
                  ></DropdownMenuTrigger>

                  <DropdownMenuContent className="w-46">
                    <DropdownMenuGroup>
                      <DropdownMenuItem
                        onClick={() => navigate(`/under-construction`)}
                      >
                        Profile
                      </DropdownMenuItem>
                    </DropdownMenuGroup>

                    <DropdownMenuGroup>
                      <DropdownMenuItem
                        onClick={() => handleLogout()}
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
