import styled from "styled-components";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import usePopupKey from "../../hooks/usePopupKey";
import useDrumInfo from "../../store/drum";
import DrumButton from "./DrumButton";

const drums = [
  { index: 0, letter: "A", description: "CLAP" },
  { index: 1, letter: "S", description: "HIHAT" },
  { index: 2, letter: "D", description: "KICK" },
  { index: 3, letter: "F", description: "OPENHAT" },
  { index: 4, letter: "G", description: "BOOM" },
  { index: 5, letter: "H", description: "RIDE" },
  { index: 6, letter: "J", description: "SNARE" },
  { index: 7, letter: "K", description: "TINK" },
  { index: 8, letter: "L", description: "TOM" },
];

const Drum = () => {
  const date = { year: 2024, month: 4, day: 29 };
  const drumsInfo = useDrumInfo((state) => state.description);
  const { showNum } = usePopupKey();

  return (
    <>
      <Header date={date} />
      <Wrapper>
        {drums.map((drum, idx) => (
          <DrumButton
            key={idx}
            index={idx}
            showNum={showNum}
            letter={drum.letter}
            description={drum.description}
          />
        ))}
      </Wrapper>
      <Footer index={1} data={drumsInfo} />
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
