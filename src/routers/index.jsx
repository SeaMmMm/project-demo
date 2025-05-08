import ContentPage from "@/pages/ContentPage";
import NotFound from "../pages/404";
import HomePage from "../pages/HomePage";
import projects from "./projects";

const routes = [
  { path: "/", element: <HomePage /> },
  {
    path: "/content",
    element: <ContentPage />,
    children: projects,
  },
  { path: "*", element: <NotFound /> },
];

export default routes;
