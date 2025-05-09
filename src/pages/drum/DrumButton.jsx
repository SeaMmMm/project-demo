import styled from "styled-components";

const DrumButton = ({ letter, description, showNum, index, ...props }) => {
  return (
    <Wrapper {...props}>
      <h1 className={showNum === index ? "show" : ""}>{letter}</h1>
      <span className={showNum === index ? "show" : ""}>{description}</span>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  h1 {
    font-size: 100px;
    font-weight: 800;
    color: #d1d5db;
  }

  span {
    font-size: 20px;
    font-weight: 800;
    color: #d1d5db;
  }

  .show {
    transform: scale(1.1);
    color: #9ca3af;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 60px;
    }

    span {
      font-size: 15px;
    }
  }

  @media (max-width: 480px) {
    h1 {
      font-size: 40px;
    }

    span {
      font-size: 12px;
    }
  }
`;

export default DrumButton;
