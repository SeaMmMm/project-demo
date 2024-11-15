import { useEffect, useState } from "react";
import styled from "styled-components";
import Vivus from "vivus";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import svgInfo from "./description";
import Svg from "./Svg";

const Animate = () => {
  const date = { year: 2024, month: 5, day: 22 };
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
      <Header date={date} />
      <Content onClick={handleClick}>
        <Svg />
      </Content>
      <Footer index={11} data={svgInfo} />
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
