import React from "react";
import { useAppContext } from "../Context/StateManger";
import styled from "styled-components";

//Some styled components to make it look pretty
const FilterContainer = styled.div`
  background: #393e46;
  width: 100%;
  margin: 2rem auto;
  padding: 0.7rem 2rem;
  text-align: center;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
`;

const InputContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

const Input = styled.input`
  outline: 0;
  background: #f2f2f2;
  border: 0;
  padding: 0.6rem;
  box-sizing: border-box;
  font-size: 1rem;
  border-radius: 0.2rem;
  margin: 0.3rem;
`;

const Select = styled.select`
  outline: 0;
  background: #f2f2f2;
  border: 0;
  padding: 0.6rem;
  box-sizing: border-box;
  font-size: 1rem;
  border-radius: 0.2rem;
  margin: 0.3rem;
`;

const Filters = () => {
  const {
    inputValue,
    inputValueChangeHandler,
    selectColumn,
    selectCondition,
    selectColumnHandler,
    selectConditionHandler,
  } = useAppContext();

  return (
    <FilterContainer>
      <InputContainer>
        <Select
          value={selectColumn}
          onChange={selectColumnHandler}
          name="select a column"
        >
          <option value="default" disabled hidden>
            Select a column
          </option>
          <option value="title">Title</option>
          <option value="quantity">Quantity</option>
          <option value="distance">Distance</option>
        </Select>
        <Select
          value={selectCondition}
          onChange={selectConditionHandler}
          name="select a condition"
        >
          <option value="default" disabled hidden>
            Select a condition
          </option>
          <option value="equal">Equal to</option>
          <option value="contian">Contain</option>
          <option
            value="greater"
            disabled={selectColumn === "title" ? true : false}
          >
            Greater than
          </option>
          <option
            value="less"
            disabled={selectColumn === "title" ? true : false}
          >
            Less than
          </option>
        </Select>
        <Input
          type="text"
          value={inputValue}
          onChange={inputValueChangeHandler}
          placeholder="Enter the value"
        />
      </InputContainer>
    </FilterContainer>
  );
};

export default Filters;
