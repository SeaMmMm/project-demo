import { Skeleton } from "@/components/ui/skeleton";
import PropTypes from "prop-types";
import { useState } from "react";
import styled from "styled-components";

const Card = ({ inventor, num }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <Div $delay={num}>
      {!loaded && <Skeleton className="w-[60px] h-[60px] rounded-full" />}
      <img
        src={inventor.avatar}
        alt="person-image"
        style={{ display: loaded ? "block" : "none" }}
        onLoad={() => setLoaded(true)}
      />
      <h2>
        {inventor.first} {inventor.last}
      </h2>
      <p>
        {inventor.year} - {inventor.passed}
      </p>
    </Div>
  );
};

Card.propTypes = {
  inventor: PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    first: PropTypes.string.isRequired,
    last: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    passed: PropTypes.number.isRequired,
  }),
  num: PropTypes.number.isRequired,
};

const Div = styled.div`
  @keyframes show {
    0% {
      opacity: 0;
      transform: scale(0);
    }
    50% {
      opacity: 0.8;
      transform: scale(1.1);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  opacity: 0;
  border: 1px solid #9ca3af;
  padding: 8px;
  min-width: 180px;
  border-radius: 18px;
  color: #374151d2;
  transition: all 0.2s ease-in-out;
  animation: show 0.5s cubic-bezier(0.39, 0.575, 0.565, 1) forwards;
  animation-delay: ${({ $delay }) => `${$delay * 0.1}s`};

  display: grid;
  justify-items: center;
  align-items: center;

  &:hover {
    background-color: #f3f4f6;
    border: 1px solid #f3f4f6;
  }

  img {
    pointer-events: none;
    width: 60px;
  }
`;

export default Card;
