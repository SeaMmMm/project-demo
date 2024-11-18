import Loading from "@/components/Loading";
import ContentPage from "@/pages/ContentPage";
import { Suspense } from "react";
import NotFound from "../pages/404";
import HomePage from "../pages/HomePage";
import {
  Animate,
  Canvas,
  Cardio,
  Clock,
  Console,
  CssTopicPage,
  Draft,
  Drum,
  Frame,
  Panel,
  Scope,
  Slider,
  TicToc,
} from "./projects";

export const projects = [
  { path: "drum", element: <Drum />, name: "drum" },
  { path: "clock", element: <Clock />, name: "clock" },
  { path: "slider", element: <Slider />, name: "slider" },
  { path: "frame", element: <Frame />, name: "frame" },
  { path: "cardio", element: <Cardio />, name: "cardio" },
  { path: "panel", element: <Panel />, name: "panel" },
  { path: "md", element: <CssTopicPage />, name: "md" },
  { path: "canvas", element: <Canvas />, name: "canvas" },
  { path: "console", element: <Console />, name: "console" },
  { path: "scope", element: <Scope />, name: "scope" },
  { path: "svg", element: <Animate />, name: "svg" },
  { path: "tic-toc", element: <TicToc />, name: "tic-toc" },
];

const routes = [
  { path: "/", element: <HomePage /> },
  { path: "*", element: <NotFound /> },
  { path: "/test", element: <Draft /> },
  {
    path: "/content",
    element: <ContentPage />,
    children: projects.map((project) => ({
      ...project,
      element: <Suspense fallback={<Loading />}>{project.element}</Suspense>,
    })),
  },
];

export default routes;
