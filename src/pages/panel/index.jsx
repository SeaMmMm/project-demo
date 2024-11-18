import styled from "styled-components";
import useWindowSize from "../../hooks/useWindowSize";
import Card from "./Card";
import cardsInfo from "./cards";

const Panel = () => {
  const { height } = useWindowSize();

  return (
    <>
      <Wrapper $height={height}>
        {cardsInfo.map((info, index) => (
          <Card key={index} info={info} />
        ))}
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: ${(props) => `calc(${props.$height}px - 80px)`};
  padding: 20px;

  display: grid;
  grid-template-columns: repeat(6, 1fr);
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    height: ${(props) => `calc(${props.$height}px - 60px)`};
  }
`;

export default Panel;
