import { SmoothCursor } from "@/components/ui/smooth-cursor";
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
      <Box ref={boxRef}>
        <Text ref={txtRef}>{txt}</Text>
      </Box>
      {!isMobile && <SmoothCursor />}
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
  touch-action: none;
`;

const Text = styled.div`
  position: absolute;
  width: 100vw;
  min-height: 100vh;
  height: 100vh;
  font-family: "Noto Serif", serif;
  font-weight: 400;
  font-size: calc(100vh / 40);
  line-height: 1.5;
  letter-spacing: 1em;
  text-align: justify;
  box-sizing: border-box;
  display: flex;
  align-items: stretch;

  @media (max-width: 768px) {
    font-size: calc(100vh / 50);
    line-height: 1.2;
    letter-spacing: 0.4em;
  }
`;

export default Scope;
