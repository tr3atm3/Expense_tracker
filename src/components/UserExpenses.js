import React, { useState } from "react";

const UserExpenses = () => {
  const [amountValue, setAmountValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");
  const [categoryValue, setCategoryValue] = useState("fees");

  const [expenseList, setExpenseList] = useState([]);
  console.log(expenseList);
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setExpenseList((prev) => [
      ...prev,
      {
        id: Math.random(),
        amount: amountValue,
        description: descriptionValue,
        category: categoryValue,
      },
    ]);
    setAmountValue("");
    setCategoryValue("fees");
    setDescriptionValue("");
  };
  return (
    <div className="flex w-[80%] mx-auto mt-20">
      <div className="w-1/2 text-center">
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
      <div className="w-1/2 text-center bg-slate-300">
        <h2 className="font-bold text-xl">Expenses</h2>
        <div className="flex justify-between p-4">
          <h3>Amount</h3>
          <h3>Description</h3>
          <h3>Category</h3>
        </div>
        <ul className="w-full p-4">
          {expenseList.map((item) => (
            <li
              key={item.id}
              className="flex justify-between items-center my-2"
            >
              <p>₹{item.amount}</p>
              <p className="max-w-[30%]">{item.description}</p>
              <p>{item.category}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserExpenses;
