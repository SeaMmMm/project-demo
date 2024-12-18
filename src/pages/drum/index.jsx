import styled from "styled-components";
import usePopupKey from "../../hooks/usePopupKey";
import DrumButton from "./DrumButton";
import drumsData from "./drums";

const Drum = () => {
  const { showNum } = usePopupKey();
  return (
    <>
      <Wrapper>
        {drumsData.map((drum, idx) => (
          <DrumButton
            key={idx}
            index={idx}
            showNum={showNum}
            letter={drum.letter}
            description={drum.description}
          />
        ))}
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

  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    row-gap: 10px;
    justify-items: center;
    align-items: center;
    justify-content: space-around;
    align-content: center;
  }
`;

export default Drum;
