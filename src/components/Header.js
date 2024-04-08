import React from "react";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeUserTokenId } from "./context/authSlice";
import { toggleMode } from "./context/themeSlice";

const Header = () => {
  const auth = useSelector((store) => store.auth);
  const theme = useSelector((store) => store.theme);
  const expenseList = useSelector((store) => store.expenses.expenseList);
  const dispatch = useDispatch();
  const nav = useNavigate();
  const handleLogout = () => {
    dispatch(removeUserTokenId());
    nav("/login");
  };
  const handleDownload = () => {};
  const handleMode = () => {
    dispatch(toggleMode());
  };
  console.log(auth);
  return (
    <header className="bg-blue-300 p-2 fixed top-0 left-0 w-full">
      <nav className="flex justify-between items-center px-8">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold mx-4 my2">MyWebLink</h1>
          <ul className="flex">
            <Link to="/">
              <li className="mx-2">Home</li>
            </Link>
            <li className="mx-2">Products</li>
            <Link to="">
              <li className="mx-2">About us</li>
            </Link>
            <Link to="/login">
              <li>Sign In/up</li>
            </Link>
          </ul>
        </div>
        {theme.premiumBuyed && (
          <button onClick={handleMode}>
            {theme.darkMode ? "Light" : "Dark"}
          </button>
        )}
        {theme.premiumBuyed && (
          <a
            href={URL.createObjectURL(new Blob(expenseList))}
            download="expenses.csv"
            onClick={handleDownload}
          >
            Download Exp
          </a>
        )}
        {auth.userLoginInfo && (
          <div>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
