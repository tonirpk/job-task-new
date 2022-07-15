import React from "react";
import styled from "styled-components";
import { useAppContext } from "../Context/StateManger";

//Some styled components to make it look pretty
const FormContainer = styled.form`
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

const Button = styled.button`
  margin: 0.3rem;
  text-transform: uppercase;
  outline: 0;
  background: #ffd369;
  border: 0;
  padding: 0.6rem;
  color: #000;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 0.3rem;
  transition: all 0.3s ease;
  cursor: pointer;
  &:hover,
  &:active,
  &:focus {
    background: #d6b057;
  }
`;

const Form = () => {
  const { dateRef, titleRef, quantityRef, distanceRef, submitFormHandler } =
    useAppContext();

  //Date validation to find today's date and setting it as max
  let today = new Date();
  const dd = today.getDate();
  const mm = today.getMonth() + 1;
  const yyyy = today.getFullYear();

  if (dd < 10) {
    dd = "0" + dd;
  }

  if (mm < 10) {
    mm = "0" + mm;
  }

  today = yyyy + "-" + mm + "-" + dd;
  const minDate = "1990-01-01";

  //Prevent + - and e from number input
  const numberPreventHandler = (e) => {
    ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();
  };

  return (
    <FormContainer onSubmit={submitFormHandler}>
      <InputContainer>
        <Input
          ref={dateRef}
          type="text"
          placeholder="Date of item"
          onFocus={(e) => (e.target.type = "date")}
          onBlur={(e) => (e.target.type = "text")}
          min={minDate}
          max={today}
        />
        <Input
          ref={titleRef}
          type="text"
          id="title"
          placeholder="Title of item"
        />
        <Input
          ref={quantityRef}
          type="number"
          id="quantity"
          placeholder="Amount of pieces"
          onKeyDown={numberPreventHandler}
          min="0"
        />
        <Input
          ref={distanceRef}
          type="number"
          id="distance"
          placeholder="Distance of item"
          onKeyDown={numberPreventHandler}
          min="0"
        />
      </InputContainer>
      <Button>Add item</Button>
    </FormContainer>
  );
};

export default Form;
