import styled from "styled-components";
import Dial from "./Dial";

const Clock = () => {
  const date = { year: 2024, month: 4, day: 30 };

  return (
    <>
      <Wrapper>
        <Dial />
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

  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

export default Clock;
