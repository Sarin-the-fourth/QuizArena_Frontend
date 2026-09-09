import React from "react";

export const LoginPage = React.lazy(() => import("./../pages/LoginPage"));
export const SignUpPage = React.lazy(() => import("./../pages/SignUpPage"));
export const MainLayout = React.lazy(() => import("./../layout/MainLayout"));
export const LandingPage = React.lazy(() => import("./../pages/LandingPage"));
export const QuizPage = React.lazy(() => import("./../pages/QuizPage"));
export const QuickPlayPage = React.lazy(
  () => import("./../pages/QuickPlayPage")
);
export const MyQuizzesPage = React.lazy(
  () => import("./../pages/MyQuizzesPage")
);
export const NotFound = React.lazy(() => import("./../pages/NotFound"));
export const GamePage = React.lazy(() => import("./../pages/GamePage"));
export const WaitingPage = React.lazy(
  () => import("./../components/gamePageComp/WaitingPage")
);
export const InProgressPage = React.lazy(
  () => import("./../components/gamePageComp/InProgressPage")
);
export const ScoreBoard = React.lazy(
  () => import("./../components/gamePageComp/ScoreBoard")
);
export const UnderConstruction = React.lazy(
  () => import("./../pages/UnderConstruction")
);
