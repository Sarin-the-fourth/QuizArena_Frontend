import { createBrowserRouter } from "react-router-dom";
import {
  LandingPage,
  LoginPage,
  MainLayout,
  QuizPage,
  SignUpPage,
  QuickPlayPage,
  MyQuizzesPage,
  NotFound,
  GamePage,
  WaitingPage,
  InProgressPage,
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
      {
        path: "/game/:roomCode",
        element: <GamePage />,
        children: [
          {
            index: true,
            element: <WaitingPage />,
          },
          {
            path: "play",
            element: <InProgressPage />,
          },
        ],
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
  {
    path: "*",
    element: <NotFound />,
  },
]);
