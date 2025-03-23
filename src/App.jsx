import { useRoutes } from "react-router-dom";
import styled from "styled-components";
import routes from "./routers";

const App = () => {
  const elements = useRoutes(routes);
  document.title = "100 dm";

  return <Wrapper>{elements}</Wrapper>;
};

const Wrapper = styled.div`
  font-family: "Operator Mono", "Fira Code", Menlo, Monaco, Consolas, "Liberation Mono",
    "Courier New", monospace;
`;

export default App;
