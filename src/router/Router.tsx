import { createBrowserRouter } from "react-router-dom";
import {
  LandingPage,
  LoginPage,
  MainLayout,
  QuizPage,
  SignUpPage,
  QuickPlayPage,
  MyQuizzesPage,
} from "./LazyImports";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "/quiz",
        element: <QuizPage />,
      },
      {
        path: "/play",
        element: <QuickPlayPage />,
      },
      {
        path: "/my-quiz",
        element: <MyQuizzesPage />,
      },
    ],
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);
