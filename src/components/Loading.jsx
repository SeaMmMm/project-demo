import styled from "styled-components";
import bunce from "@/assets/svg/bounce.svg";

const Loading = () => {
  return (
    <Wrapper>
      <img src={bunce} alt="loading" />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
export default Loading;
