import { useRef } from "react";
import { isMobile } from "react-device-detect";
import styled from "styled-components";
import useDragEvent from "../../hooks/useDragEvent";
import txt from "./txt";

const Scope = () => {
  const boxRef = useRef(null);
  const txtRef = useRef(null);
  useDragEvent(boxRef, txtRef);

  return (
    <>
      {!isMobile && (
        <Box ref={boxRef}>
          <Text ref={txtRef}>{txt}</Text>
        </Box>
      )}
      {isMobile && <Error>Please view on your computer</Error>}
    </>
  );
};

const Box = styled.div`
  position: fixed;
  width: 300px;
  height: 300px;
  border: 1px solid #000;
  overflow: hidden;
  background: white;
`;

const Error = styled.div`
  position: absolute;
  width: 300px;
  height: 300px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: "Input", sans-serif;
  font-size: 1.5rem;
  text-align: center;

  @media (min-width: 768px) {
    display: none;
  }
`;

const Text = styled.div`
  position: absolute;
  min-width: 100vw;
  min-height: 100vh;
  font-family: "Input", sans-serif;
  line-height: 1.5;
  font-size: 1.5rem;
  text-align: justify;

  @media (min-width: 768px) {
    font-size: 1rem;
  }

  @media (min-width: 1024px) {
    font-size: 1.5rem;
  }

  @media (min-width: 1440px) {
    font-size: 2rem;
  }

  @media (min-width: 1920px) {
    font-size: 2.5rem;
  }
`;

export default Scope;
