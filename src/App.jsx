import { useRoutes } from "react-router-dom";
import styled from "styled-components";
import routes from "./routers";
import { SmoothCursor } from "./components/ui/smooth-cursor";
import { isMobile } from "react-device-detect";

const App = () => {
  const elements = useRoutes(routes);

  return (
    <>
      <Wrapper>{elements}</Wrapper>
      {!isMobile && <SmoothCursor />}
    </>
  );
};

const Wrapper = styled.div`
  font-family: "Operator Mono", "Fira Code", Menlo, Monaco, Consolas, "Liberation Mono",
    "Courier New", monospace;
`;

export default App;
