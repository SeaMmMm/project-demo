import back from "@/assets/svg/back.svg";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useHref, useNavigate } from "react-router-dom";
import styled from "styled-components";
import useCurrentTime from "../hooks/useCurrentTime";
import getFormattedDate from "../utils/getFormatedDate";

const Header = ({ date = null, isFixed }) => {
  const title = useHref().split("/").pop();
  const navigate = useNavigate();
  const currentTime = useCurrentTime();

  const goHome = () => navigate("/");

  const formattedDate = date
    ? getFormattedDate(date.year, date.month, date.day)
    : getFormattedDate(currentTime?.year, currentTime?.month, currentTime?.day);

  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <Head $isFixed={isFixed}>
      <img src={back} alt="back" onClick={goHome} />
      <p>{title}</p>
      <h1>{formattedDate}</h1>
    </Head>
  );
};

Header.propTypes = {
  isFixed: PropTypes.bool,
  date: PropTypes.shape({
    year: PropTypes.number,
    month: PropTypes.number,
    day: PropTypes.number,
  }),
};

const Head = styled.header`
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${({ $isFixed }) => $isFixed && "position: fixed; top: 0; left: 0; width: 100%;"}

  img {
    padding: 4px 8px;
    color: #374151d2;
    font-size: 18px;
    font-weight: lighter;
    cursor: pointer;
    border-radius: 10px;
    transition: all 0.2s ease-in-out;

    &:hover {
      background-color: #f9fafb;
    }
  }

  @media (max-width: 768px) {
    p,
    h1 {
      font-size: 12px;
    }
  }
`;

export default Header;
