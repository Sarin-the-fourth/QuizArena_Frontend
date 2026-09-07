import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Home, SearchX } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <main
      data-aos="fade-up"
      data-aos-duration="750"
      className="min-h-screen w-full flex items-center justify-center bg-background px-6 font-Outfit"
    >
      <Card className="w-full max-w-lg border-none shadow-none bg-transparent">
        <CardContent className="flex flex-col items-center text-center p-0">
          {/* Icon */}
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
            <SearchX className="h-8 w-8 text-primary" />
          </div>

          {/* 404 */}
          <h1 className="text-primary! leading-none tracking-tighter">404</h1>

          {/* Heading */}
          <h2 className="mt-4 text-3xl! text-black! font-bold!">
            Looks like you got lost!
          </h2>

          {/* Description */}
          <p className="mt-3 max-w-md text-muted-foreground text-base leading-relaxed">
            This page doesn't exist. Maybe the question you're looking for
            doesn't exist either.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-col-reverse sm:flex-row gap-3">
            <Button
              variant="outline"
              onClick={() => navigate(-1)}
              className="font-Outfit"
            >
              <ArrowLeft />
              Go Back
            </Button>

            <Button onClick={() => navigate("/")} className="font-Outfit">
              <Home />
              Back to Home
            </Button>
          </div>

          {/* Small hint */}
          <p className="mt-8 text-xs text-muted-foreground">
            Don't worry — no points were lost.
          </p>
        </CardContent>
      </Card>
    </main>
  );
};

export default NotFound;
