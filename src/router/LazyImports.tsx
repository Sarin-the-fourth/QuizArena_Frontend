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
