/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react";

const Drum = lazy(() => import("../pages/drum"));
const Clock = lazy(() => import("../pages/clock"));
const Slider = lazy(() => import("../pages/slider"));
const Frame = lazy(() => import("../pages/frame"));
const Cardio = lazy(() => import("../pages/cardio"));
const Panel = lazy(() => import("../pages/panel"));
const CssTopicPage = lazy(() => import("../pages/css-topics"));
const Canvas = lazy(() => import("../pages/canvas"));
const Console = lazy(() => import("../pages/consoles"));
const Scope = lazy(() => import("../pages/scope"));
const Animate = lazy(() => import("../pages/animate"));
const TicToc = lazy(() => import("../pages/tic-toc"));
const VirtualDom = lazy(() => import("../pages/virtual-dom"));
const Lyrics = lazy(() => import("../pages/lyric"));

export default [
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
  { path: "virtual-dom", element: <VirtualDom />, name: "virtual-dom" },
  { path: "music", element: <Lyrics />, name: "music" },
];
