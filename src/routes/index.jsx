import { lazy, Suspense } from "react";
import NotFound from "../pages/404";
import HomePage from "../pages/HomePage";

const Drum = lazy(() => import("../pages/drum/Drum"));
const Clock = lazy(() => import("../pages/clock/Clock"));
const Slider = lazy(() => import("../pages/slider/Slider"));
const Frame = lazy(() => import("../pages/frame/Frame"));
const Cardio = lazy(() => import("../pages/cardio/Cardio"));
const Panel = lazy(() => import("../pages/panel/Panel"));
const CssTopicPage = lazy(() => import("../pages/css-topics"));
const Canvas = lazy(() => import("../pages/canvas/Canvas"));
const Console = lazy(() => import("../pages/consoles/Console"));
const Scope = lazy(() => import("../pages/scope/Scope"));
const Animate = lazy(() => import("../pages/animate/Animate"));
const TicToc = lazy(() => import("../pages/tic-toc/TicToc"));
const Draft = lazy(() => import("../pages/draft/Draft"));

// 项目路由配置
export const projects = [
  { path: "/drum", element: <Drum />, name: "drum" },
  { path: "/clock", element: <Clock />, name: "clock" },
  { path: "/slider", element: <Slider />, name: "slider" },
  { path: "/frame", element: <Frame />, name: "frame" },
  { path: "/cardio", element: <Cardio />, name: "cardio" },
  { path: "/panel", element: <Panel />, name: "panel" },
  { path: "/css", element: <CssTopicPage />, name: "css" },
  { path: "/canvas", element: <Canvas />, name: "canvas" },
  { path: "/console", element: <Console />, name: "console" },
  { path: "/scope", element: <Scope />, name: "scope" },
  { path: "/svg", element: <Animate />, name: "svg" },
  { path: "/tic-toc", element: <TicToc />, name: "tic-toc" },
];

// 主要路由配置
const routes = [
  { path: "/", element: <HomePage /> },
  { path: "*", element: <NotFound /> },
  { path: "/test", element: <Draft /> },
  ...projects,
];

// 包装所有路由组件，添加 Suspense 以提供加载状态
const WrappedRoutes = routes.map((route) => ({
  ...route,
  element: <Suspense fallback={<div>Loading...</div>}>{route.element}</Suspense>,
}));

export default WrappedRoutes;
