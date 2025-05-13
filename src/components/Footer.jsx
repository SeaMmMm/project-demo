import PropTypes from "prop-types";
import { useRef, useState } from "react";
import { useHref } from "react-router-dom";
import styled, { css, keyframes } from "styled-components";
import info from "../assets/icons/info.svg";
import useClickOutside from "../hooks/useClickOutside";
import useLayer from "../store/layer";
import getFilledNumber from "../utils/getFilledNumber";

const Footer = ({ index, data, children = null }) => {
  const [showDialog, setShowDialog] = useState(false);
  const isInitial = useRef(true);
  const title = useHref().split("/").pop();
  const dialogRef = useRef(null);
  const infoRef = useRef(null);

  const { isShowLayer, toggleLayer, setLayerToFalse } = useLayer((state) => ({
    isShowLayer: state.isShowLayer,
    toggleLayer: state.toggleLayer,
    setLayerToFalse: state.setLayerToFalse,
  }));

  useClickOutside(dialogRef, (e) => {
    if (e.target === infoRef.current) return;
    setShowDialog(false);
    setLayerToFalse();
  });

  const handleToggleDialog = () => {
    setShowDialog((prev) => !prev);
    toggleLayer();
    isInitial.current = false;
  };

  return (
    <>
      <Mask $isShow={isShowLayer} $initial={isInitial.current} />
      <Wrapper>
        <div className="current">
          <p>{index ? getFilledNumber(index, 3) : title}</p>
        </div>
        <Info src={info} onClick={handleToggleDialog} ref={infoRef} />
        <Content $isShow={showDialog} $initial={isInitial.current} ref={dialogRef}>
          <p>{data.description}</p>
          {children}
          {data.codeurl && (
            <a href={data.codeurl} target="_blank" rel="noopener noreferrer">
              source
            </a>
          )}
        </Content>
      </Wrapper>
    </>
  );
};

Footer.propTypes = {
  index: PropTypes.number,
  data: PropTypes.shape({
    description: PropTypes.string.isRequired,
    codeurl: PropTypes.string,
  }).isRequired,
  children: PropTypes.node,
};

const Wrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  padding: 10px;
  align-items: center;

  .current {
    display: flex;
    align-items: center;
    gap: 4px;

    p {
      color: #000;
      font-weight: bold;
    }
  }
`;

const Info = styled.img`
  position: fixed;
  background: #fff;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  border: 1px solid #000;
  border-bottom: none;
  padding: 5px;
  width: 30px;
  cursor: pointer;
`;

const moveUp = css`
  @keyframes moveUp {
    from {
      transform: translateY(100%) translateX(-50%);
    }
    to {
      transform: translateY(0) translateX(-50%);
    }
  }
`;

const moveDown = css`
  @keyframes moveDown {
    from {
      transform: translateY(0) translateX(-50%);
    }
    to {
      transform: translateY(100%) translateX(-50%);
    }
  }
`;

const Content = styled.div`
  background: #fff;
  position: fixed;
  bottom: 0;
  left: 50%;
  transition: all 0.3s ease-in-out;
  transform: translateX(-50%) translateY(100%);
  border: 1px solid #000;
  border-bottom: none;
  z-index: 1000;
  padding: 40px 20px;
  min-width: 600px;
  min-height: 140px;
  display: grid;
  align-items: center;
  justify-items: start;
  justify-content: center;
  gap: 10px;

  a {
    transition: all 0.2s;
    color: #d1d5db;
    text-decoration: none;
    &:hover {
      color: #9ca3af;
    }
  }

  ${({ $isShow, $initial }) =>
    $isShow
      ? css`
          ${moveUp}
          animation: moveUp 0.3s forwards;
        `
      : !$initial &&
        css`
          ${moveDown}
          animation: moveDown 0.3s forwards;
        `}

  @media (max-width: 768px) {
    min-height: 120px;
    width: 100%;
    padding: 20px 10px;
    border: none;
    a,
    p {
      font-size: 0.8rem;
    }
    .current p {
      font-size: 1.2rem;
    }
  }
`;

const showUp = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 0.5;
  }
`;

const showDown = keyframes`
  from {
    opacity: 0.5;
  }
  to {
    opacity: 0;
  }
`;

const Mask = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  transition: opacity 0.2s;
  opacity: 0;
  pointer-events: none;
  z-index: 0;

  ${({ $isShow, $initial }) =>
    $isShow
      ? css`
          animation: ${showUp} 0.2s forwards;
          opacity: 0.5;
          pointer-events: auto;
        `
      : !$initial &&
        css`
          animation: ${showDown} 0.2s forwards;
          opacity: 0;
          pointer-events: none;
        `}
`;

export default Footer;
