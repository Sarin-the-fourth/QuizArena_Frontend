import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Construction, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

const UnderConstruction = () => {
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
            <Construction className="h-8 w-8 text-primary" />
          </div>

          {/* Label */}
          <p className="mt-6 text-sm font-semibold uppercase tracking-widest text-primary">
            Under Construction
          </p>

          {/* Heading */}
          <h1 className="mt-3 text-4xl! text-black! font-bold! tracking-tight">
            We're building something cool!
          </h1>

          {/* Description */}
          <p className="mt-4 max-w-md text-muted-foreground text-base leading-relaxed">
            This part of the arena is still under construction. Our builders are
            putting the finishing touches on it.
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
            🚧 No points were lost during construction.
          </p>
        </CardContent>
      </Card>
    </main>
  );
};

export default UnderConstruction;
