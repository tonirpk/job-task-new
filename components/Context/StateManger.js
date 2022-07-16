import React, { createContext, useContext, useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

const AppContext = createContext();

const StateWrapper = ({ children }) => {
  // Pagination functions
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(5);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  //Input text feild value for filtering
  const [inputValue, setInputValue] = useState("");

  //Getting values of form's inputs
  const dateRef = useRef();
  const titleRef = useRef();
  const quantityRef = useRef();
  const distanceRef = useRef();

  //Post item to the database function
  const addItemToTheDB = async () => {
    const enteredDate = dateRef.current.value;
    const enteredTitle = titleRef.current.value;
    const enteredQuantity = quantityRef.current.value;
    const enteredDistance = distanceRef.current.value;

    const res = await fetch("/api/table", {
      method: "POST",
      body: JSON.stringify({
        id: uuidv4(),
        date: enteredDate,
        title: enteredTitle,
        quantity: enteredQuantity,
        distance: enteredDistance,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  //Delete item from the database
  const deleteItem = async (itemId) => {
    const res = await fetch(`/api/table/${itemId}`, {
      method: "DELETE",
    });
    const data = await res.json();
  };

  //On add item submit form functions
  const submitFormHandler = (e) => {
    e.preventDefault();
    addItemToTheDB();
    e.target.reset();
  };

  //Table filtering funcations
  const [selectColumn, setSelectColumn] = useState("default");
  const [selectCondition, setSelectCondition] = useState("default");

  const selectColumnHandler = (e) => {
    setSelectColumn(e.target.value);
  };
  const selectConditionHandler = (e) => {
    setSelectCondition(e.target.value);
  };
  const inputValueChangeHandler = (e) => {
    const { value } = e.target;
    setInputValue(value);
  };

  //Context React values for using everywhere
  let values = {
    dateRef,
    titleRef,
    quantityRef,
    distanceRef,
    submitFormHandler,
    inputValue,
    deleteItem,
    inputValueChangeHandler,
    selectColumn,
    selectCondition,
    selectColumnHandler,
    selectConditionHandler,
    currentPage,
    setCurrentPage,
    indexOfFirstRecord,
    indexOfLastRecord,
    recordsPerPage,
  };
  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

export default StateWrapper;

export const useAppContext = () => {
  return useContext(AppContext);
};
