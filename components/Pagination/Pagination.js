import React from "react";
import { useAppContext } from "../Context/StateManger";
import styled from "styled-components";

const PaginationContainer = styled.nav`
  text-align: center;
  max-width: 300px;
  margin: 1rem auto;
`;

const PaginationListContainer = styled.ul`
  list-style: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PaginationList = styled.li`
  border: 1px solid #ffd369;
  padding: 0.3rem 0.5rem;
  margin: 0.3rem;
`;

const PaginationBtn = styled.button`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
`;

const Pagination = ({ nPages }) => {
  const { setCurrentPage, currentPage } = useAppContext();

  //Check how many pages based on the amount of columns
  const pageNumbers = [...Array(nPages + 1).keys()].slice(1);

  return (
    <PaginationContainer>
      <PaginationListContainer>
        {pageNumbers.map((pgNumber) => (
          <PaginationList
            style={
              currentPage === pgNumber
                ? { background: "#ffd369", color: "#000" }
                : {}
            }
            key={pgNumber}
          >
            <PaginationBtn onClick={() => setCurrentPage(pgNumber)}>
              {pgNumber}
            </PaginationBtn>
          </PaginationList>
        ))}
      </PaginationListContainer>
    </PaginationContainer>
  );
};

export default Pagination;
