import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-blue-300 p-2 fixed top-0 left-0 w-full">
      <nav className="flex ">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold mx-4 my2">MyWebLink</h1>
          <ul className="flex">
            <Link to="/home">
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
      </nav>
    </header>
  );
};

export default Header;
