import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Form from "../Form/Form";
import { useAppContext } from "../Context/StateManger";
import Filters from "../Filters/Filters";

//Some styled components to make it look pretty
const TabelContainer = styled.div`
  padding: 0 10%;
  margin: 3rem auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
  @media (max-width: 764px) {
    display: block;
    width: 100%;
  }
`;

const TableHead = styled.thead`
  background-color: #ffd369;
  color: "#000";
  tr th {
    font-size: 1.1rem;
    font-weight: 600;
    letter-spacing: 0.35px;
    color: #222831;
    opacity: 1;
    padding: 0.5rem;
    vertical-align: top;
    border: 1px solid #eeeeee;
  }
  @media (max-width: 764px) {
    display: none;
  }
`;

const TableBody = styled.tbody`
  tr td {
    font-size: 1.1rem;
    font-weight: 600;
    letter-spacing: 0.35px;
    color: #f2f2f2;
    background-color: #393e46;
    padding: 0.4rem;
    vertical-align: top;
    border: 1px solid #eeeeee;
    text-align: center;
  }
  @media (max-width: 764px) {
    display: block;
    width: 100%;
    tr td {
      text-align: right;
      padding-left: 50%;
      position: relative;
    }
  }
`;

const TabelRow = styled.tr`
  @media (max-width: 764px) {
    display: block;
    width: 100%;
    margin-bottom: 1.2rem;
  }
`;

const Button = styled.button`
  outline: 0;
  background: #ff0000;
  border: 0;
  padding: 0.3rem;
  color: #ffffff;
  font-size: 1rem;
  transition: all 0.3s ease;
  cursor: pointer;
  &:hover,
  &:active,
  &:focus {
    background: #d65757;
  }
`;

const TabelData = styled.td`
  @media (max-width: 764px) {
    display: block;
    width: 100%;
    &:before {
      content: attr(aria-label);
      position: absolute;
      left: 0;
      width: 50%;
      padding-left: 0.4rem;
      font-weight: 600;
      font-size: 1.2rem;
      text-align: left;
    }
  }
`;

const TablelHeader = styled.th``;

const Tabel = () => {
  const { data, error, deleteItem, inputValue, selectColumn, selectCondition } =
    useAppContext();

  if (error) return "An error has occurred.";
  if (!data)
    return (
      <div
        style={{
          width: "100%",
          height: "100vh",
          display: "felx",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1 style={{ fontWeight: 700, color: "#fff" }}>LOADING</h1>
      </div>
    );

  return (
    <TabelContainer>
      <Form />
      <Filters />
      <Table>
        <TableHead>
          <TabelRow>
            <TablelHeader>Date</TablelHeader>
            <TablelHeader>Title</TablelHeader>
            <TablelHeader>Quantity</TablelHeader>
            <TablelHeader>Distance</TablelHeader>
            <TablelHeader>Remove</TablelHeader>
          </TabelRow>
        </TableHead>
        <TableBody>
          {data.items
            .filter((item) => {
              if (inputValue !== "") {
                if (selectColumn === "title") {
                  return selectCondition === "equal"
                    ? item.title === inputValue
                    : selectCondition === "contian"
                    ? item.title
                        .toLowerCase()
                        .search(inputValue.toLowerCase().trim()) !== -1
                    : null;
                }
                if (selectColumn === "quantity") {
                  return selectCondition === "equal"
                    ? item.quantity === inputValue
                    : selectCondition === "contian"
                    ? item.quantity.includes(Number(inputValue))
                    : selectCondition === "greater"
                    ? item.quantity > Number(inputValue)
                    : selectCondition === "less"
                    ? item.quantity < Number(inputValue)
                    : null;
                }
                if (selectColumn === "distance") {
                  return selectCondition === "equal"
                    ? item.distance === inputValue
                    : selectCondition === "contian"
                    ? item.distance.includes(Number(inputValue))
                    : selectCondition === "greater"
                    ? item.distance > Number(inputValue)
                    : selectCondition === "less"
                    ? item.distance < Number(inputValue)
                    : null;
                }
              } else {
                return item;
              }
            })
            .map((item) => {
              return (
                <TabelRow key={item._id}>
                  <TabelData aria-label="Date">{item.date}</TabelData>
                  <TabelData aria-label="Title">
                    <q>{item.title}</q>
                  </TabelData>
                  <TabelData aria-label="Quantity">
                    {item.quantity} pcs
                  </TabelData>
                  <TabelData aria-label="Distance">
                    {item.distance} km?
                  </TabelData>
                  <TabelData style={{ color: "red" }} aria-label="Delete">
                    <Button
                      onClick={() => {
                        deleteItem(item.id);
                      }}
                    >
                      X
                    </Button>
                  </TabelData>
                </TabelRow>
              );
            })}
        </TableBody>
      </Table>
    </TabelContainer>
  );
};

export default Tabel;
