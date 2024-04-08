import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteExpenseItem, setExpenseList } from "./context/expenseSlice";

const UserExpenses = () => {
  const [amountValue, setAmountValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");
  const [categoryValue, setCategoryValue] = useState("fees");

  const auth = useSelector((store) => store.auth);
  const expenses = useSelector((store) => store.expenses);
  console.log(expenses);
  const dispatch = useDispatch();

  console.log(auth);
  const userEmail = auth.userLoginInfo?.email
    .split("")
    .filter((word) => word.charCodeAt(0) >= 97 && word.charCodeAt(0) <= 122)
    .join("");

  const gettingData = useCallback(async () => {
    try {
      const response = await fetch(
        `https://react-deployment-demo-f24d5-default-rtdb.asia-southeast1.firebasedatabase.app/${userEmail}/expenses.json`
      );
      if (!response.ok) {
        throw new Error(response.message);
      }
      const data = await response.json();

      const dataArr = [];
      for (const [key, value] of Object.entries(data)) {
        dataArr.push({
          ...value,
          id: key,
        });
      }
      dispatch(setExpenseList());
    } catch (err) {
      console.log(err.message);
    }
  }, [userEmail]);
  useEffect(() => {
    gettingData();
  }, [gettingData]);

  const postingData = async () => {
    try {
      const response = await fetch(
        `https://react-deployment-demo-f24d5-default-rtdb.asia-southeast1.firebasedatabase.app/${userEmail}/expenses.json`,
        {
          method: "POST",
          body: JSON.stringify({
            amount: amountValue,
            description: descriptionValue,
            category: categoryValue,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error(response.message);
      }
      const data = await response.json();
      console.log(data);
      dispatch(
        setExpenseList({
          id: data.name,
          amount: amountValue,
          description: descriptionValue,
          category: categoryValue,
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    postingData();
    setAmountValue("");
    setCategoryValue("fees");
    setDescriptionValue("");
  };
  const deletingData = async (id) => {
    try {
      const response = await fetch(
        `https://react-deployment-demo-f24d5-default-rtdb.asia-southeast1.firebasedatabase.app/${userEmail}/expenses/${id}.json`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error(response.message);
      }
      // const data = await response.json();
      dispatch(deleteExpenseItem(id));
      console.log("Item Deleted Succesfully");
    } catch (err) {
      console.log(err);
    }
  };
  const handleEditBtn = (id) => {
    const [editItem] = expenses.filter((item) => item.id === id);
    console.log(editItem);
    setAmountValue(editItem.amount);
    setCategoryValue(editItem.category);
    setDescriptionValue(editItem.description);
    handleDeleteBtn(id);
  };

  const handleDeleteBtn = (id) => {
    deletingData(id);
  };
  return (
    <div className="flex w-[80%] mx-auto mt-20">
      <div className="w-1/3 text-center mr-4">
        <h2 className="font-bold text-xl">Add to Expenses</h2>
        <form
          className="border border-gray-300 flex flex-col p-4"
          onSubmit={handleFormSubmit}
        >
          <input
            type="number"
            placeholder="Amount"
            className="w-full border border-gray-300 p-2 rounded-lg my-4"
            value={amountValue}
            onChange={(e) => setAmountValue(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Description"
            className="w-full border border-gray-300 p-2 rounded-lg my-4"
            value={descriptionValue}
            onChange={(e) => setDescriptionValue(e.target.value)}
            maxLength="50"
            required
          />
          <label htmlFor="cateory" className="text-left mb-1 pl-3">
            Category
          </label>
          <select
            id="category"
            className="w-full border border-gray-300 p-2 rounded-lg mb-6"
            value={categoryValue}
            onChange={(e) => setCategoryValue(e.target.value)}
            required
          >
            <option value="Fees">Fees</option>
            <option value="Grocery">Grocery</option>
            <option value="Electicity Bill">Electicity Bill</option>
            <option value="Gas">Gas</option>
            <option value="Others">Others</option>
          </select>
          <button className="bg-blue-300 p-2 rounded-lg">Add</button>
        </form>
      </div>
      <div className="flex-1 text-center bg-slate-300">
        <h2 className="font-bold text-xl">Expenses</h2>
        <div className="flex justify-between p-4 w-[80%]">
          <h3 className="text-lg font-bold">Amount</h3>
          <h3 className="text-lg font-bold">Description</h3>
          <h3 className="text-lg font-bold">Category</h3>
        </div>
        <ul className="w-full p-4">
          {expenses.map((item) => (
            <li
              key={item.id}
              className="flex justify-between items-center my-2"
            >
              <div className=" flex w-[80%] justify-between">
                <p>₹{item.amount}</p>
                <p className="">{item.description}</p>
                <p>{item.category}</p>
              </div>
              <button
                className="bg-green-400 py-1 px-2 rounded-lg"
                onClick={() => handleEditBtn(item.id)}
              >
                Edit
              </button>
              <button
                className="bg-red-600 py-1 px-2 rounded-lg"
                onClick={() => handleDeleteBtn(item.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserExpenses;
