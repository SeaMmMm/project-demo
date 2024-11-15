import { useState } from "react";
import styled from "styled-components";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import useDebouncedFn from "../../hooks/useDebouncedFn";
import Card from "./Card";
import { inventors } from "./array-cardio";
import description from "./description";

const Cardio = () => {
  const date = { year: 2024, month: 5, day: 6 };
  const [people, setPeople] = useState(inventors);

  const handleSearchName = (e) => {
    const name = e.target.value;

    if (name === "") {
      setPeople(inventors);
      return;
    }

    const filteredPeople = inventors.filter((inventor) => {
      const { first, last } = inventor;
      return (
        first.toLowerCase().includes(name.toLowerCase()) ||
        last.toLowerCase().includes(name.toLowerCase())
      );
    });

    setPeople(filteredPeople);
  };
  const debouncedHandleSeearchName = useDebouncedFn(handleSearchName, 500);

  const reset = () => {
    setPeople(inventors);
  };

  return (
    <>
      <Header date={date} />
      <Wrapper>
        <input type="text" placeholder="Search Name" onChange={debouncedHandleSeearchName} />
        <Cards>
          {people.length ? (
            people.map((inventor, index) => <Card key={index} inventor={inventor} num={index} />)
          ) : (
            <div className="not-found">
              <p>No Inventor Found</p>
              <h1 onClick={reset}>clear</h1>
              <h2 onClick={reset}>clear</h2>
            </div>
          )}
        </Cards>
      </Wrapper>
      <Footer index={5} data={description} />
    </>
  );
};

const Wrapper = styled.div`
  padding: 50px 100px;
  display: grid;
  align-items: center;
  justify-items: center;
  justify-content: center;
  gap: 20px;

  input {
    border-radius: 10px;
    background: rgba(118, 118, 128, 0.12);
    border: none;
    padding: 10px;
    font-size: 1.1rem;
    font-weight: 500;
  }

  @media (max-width: 768px) {
    padding: 50px 20px;

    input {
      width: 100%;
      &::placeholder {
        font-size: 0.9rem;
      }
      font-size: 1rem;
      padding: 10px;
    }
  }
`;

const Cards = styled.div`
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(4, auto);
  justify-content: center;
  justify-items: center;
  align-content: center;
  text-align: center;
  row-gap: 40px;
  column-gap: 20px;

  .not-found {
    grid-column: 1 / -1;
    p {
      font-size: 2rem;
      font-weight: 500;
    }

    h1,
    h2 {
      border: 1px solid #9ca3af;
      margin-top: 20px;
      color: #9ca3af;
      cursor: pointer;
      transition: all 0.2s ease-in-out;
      border-bottom: none;
      padding: 2px;

      &:hover {
        color: #d1d5db;
      }
    }

    h2 {
      border: 1px solid #9ca3af;
      margin-top: 10px;
      border-top: none;
    }
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    row-gap: 20px;
    column-gap: 10px;

    .not-found {
      p {
        font-size: 1.5rem;
      }
      h1,
      h2 {
        font-size: 1rem;
      }
    }
  }
`;

export default Cardio;
