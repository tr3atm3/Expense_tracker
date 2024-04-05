import React, { useContext } from "react";
import { Link } from "react-router-dom";
import appContext from "./context/appContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const ctx = useContext(appContext);
  const nav = useNavigate();
  const handleLogout = () => {
    ctx.removeUserTokenId();
    nav("/login");
  };
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
        {ctx.userLoginTokenId && (
          <div>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
