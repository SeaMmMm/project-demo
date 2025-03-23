import { Suspense, useState } from "react";
import styled from "styled-components";
import useDebouncedFn from "../../hooks/useDebouncedFn";
import Controler from "./Controler";
import Loading from "@/components/Loading";

const Frame = ({ children = null, ...props } = {}) => {
  const [spacing, setSpacing] = useState(0);
  const [blur, setBlur] = useState(0);
  const [color, setColor] = useState("#000000");
  const debouncedSetColor = useDebouncedFn(setColor, 100);

  const handleColorChange = (e) => {
    debouncedSetColor(e.target.value);
  };

  return (
    <>
      <Wrapper $color={color} $spacing={spacing} $blur={blur} {...props}>
        <p>
          Update CSS Variables with <span>JS</span>
        </p>
        <Content>
          <Controler
            label="Spacing:"
            value={spacing}
            callback={(e) => {
              setSpacing(e.target.value);
            }}
          />
          <Controler
            label="Blur:"
            value={blur}
            callback={(e) => {
              setBlur(e.target.value);
            }}
          />
          <div>
            Base color: <input type="color" value={color} onChange={handleColorChange} />
          </div>
        </Content>
        <Suspense fallback={<Loading />}>
          <img src="https://opendoodles.s3-us-west-1.amazonaws.com/running.svg" alt="woman-run" />
        </Suspense>
        {children}
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: grid;
  align-content: center;
  justify-items: center;
  gap: 30px;

  span {
    color: ${({ $color }) => $color};
  }

  img {
    width: 500px;
    border: ${({ $spacing }) => $spacing}px solid ${({ $color }) => $color};
    filter: blur(${({ $blur }) => $blur}px);
    pointer-events: none;
  }

  @media (max-width: 768px) {
    img {
      width: 300px;
    }

    p,
    span {
      font-size: 20px;
    }
  }
`;

const Content = styled.div`
  display: flex;
  gap: 30px;
  align-items: center;

  @media (max-width: 768px) {
    display: grid;
    place-items: center;
    gap: 20px;
  }
`;

export default Frame;
