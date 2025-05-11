import {
  Cardio,
  Clock,
  CssTopicPage,
  Drum,
  Frame,
  Lyrics,
  Scope,
  Slider,
  TicToc,
  VirtualDom,
} from "./projects";

export default [
  { path: "drum", element: <Drum />, name: "drum" },
  { path: "clock", element: <Clock />, name: "clock" },
  { path: "slider", element: <Slider />, name: "slider" },
  { path: "frame", element: <Frame />, name: "frame" },
  { path: "cardio", element: <Cardio />, name: "cardio" },
  { path: "md", element: <CssTopicPage />, name: "md" },
  { path: "scope", element: <Scope />, name: "scope" },
  { path: "tic-toc", element: <TicToc />, name: "tic-toc" },
  { path: "virtual-dom", element: <VirtualDom />, name: "virtual-dom" },
  { path: "music", element: <Lyrics />, name: "music" },
];
