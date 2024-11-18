import { useEffect, useState } from "react";
import styled from "styled-components";
import Vivus from "vivus";
import Svg from "./Svg";

const Animate = () => {
  const [camera, setCamera] = useState(null);

  useEffect(() => {
    const rect = new Vivus("polaroid", {
      type: "oneByOne",
      duration: 250,
      forceRender: false,
    });

    setCamera(rect);
  }, []);

  const handleClick = () => {
    camera.reset().play();
  };
  return (
    <>
      <Content onClick={handleClick}>
        <Svg />
      </Content>
    </>
  );
};

const Content = styled.div`
  position: absolute;
  width: 400px;
  height: 400px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  #polaroid {
    width: 100%;
    height: 100%;
    fill: none;
    stroke: #000;
    stroke-width: 3;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-miterlimit: 10;
  }
`;

export default Animate;
