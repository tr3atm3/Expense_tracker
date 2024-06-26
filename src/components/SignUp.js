import React, { useRef, useState } from "react";

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { saveUserInfo, updatingProfile } from "./context/authSlice";

const SignUp = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const [isLoginForm, setIsLoginForm] = useState(false);

  const auth = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [isForgetPassword, setIsForgetPassword] = useState(false);

  console.log(auth);
  const signUpFunction = async () => {
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC7sVHD3PsWo_Lma3A_MJKwkcCo-BjiFm8",
        {
          method: "POST",
          body: JSON.stringify({
            email: emailRef.current.value,
            password: passwordRef.current.value,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data);
      }
      console.log("User has succesfully signed up");
      setIsLoginForm(true);
    } catch (err) {
      alert(err.message);
    }
  };

  const signInFunction = async () => {
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC7sVHD3PsWo_Lma3A_MJKwkcCo-BjiFm8",
        {
          method: "POST",
          body: JSON.stringify({
            email: emailRef.current.value,
            password: passwordRef.current.value,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(response.message);
      }
      console.log(data);
      dispatch(
        saveUserInfo({
          loginId: data.idToken,
          email: data.email,
        })
      );

      if (data.displayName && data.profilePicture) {
        dispatch(updatingProfile());
      }

      nav("/");
    } catch (err) {
      console.log(err);
      alert(err);
    }
  };
  const resetPassword = async () => {
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyC7sVHD3PsWo_Lma3A_MJKwkcCo-BjiFm8",
        {
          method: "POST",
          body: JSON.stringify({
            requestType: "PASSWORD_RESET",
            email: emailRef.current.value,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      alert("A link has been send to your email to reset password");
      console.log(data);
      setIsForgetPassword(false);
      if (!response.ok) {
        throw new Error(response.message);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isForgetPassword) {
      resetPassword();
    } else {
      if (isLoginForm) {
        signInFunction();
      } else {
        if (passwordRef.current.value === confirmPasswordRef.current.value) {
          signUpFunction();
        } else {
          alert("Different password input");
        }
      }
    }
  };

  const handleForgot = () => {
    setIsForgetPassword(true);
  };
  return (
    <div className="w-[40%] mx-auto shadow-lg p-8 my-24">
      <h1 className="font-bold text-2xl my-4">
        {!isForgetPassword
          ? isLoginForm
            ? "Login"
            : "SignUp"
          : "Reset Password"}
      </h1>
      <form className="flex flex-col " onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          className="border border-gray-400 p-2 text-lg rounded-lg my-3"
          ref={emailRef}
          required
        />
        {!isForgetPassword && (
          <input
            type="password"
            placeholder="Password"
            className="border border-gray-400 p-2 text-lg rounded-lg my-3"
            required
            ref={passwordRef}
          />
        )}
        {!isForgetPassword && !isLoginForm && (
          <input
            type="password"
            placeholder="Confirm Password"
            className="border border-gray-400 p-2 text-lg rounded-lg my-3"
            required
            ref={confirmPasswordRef}
          />
        )}
        <button className="bg-blue-300 p-2 rounded-lg text-lg my-4">
          {isForgetPassword ? "Send Link" : isLoginForm ? "Login" : "Sign Up"}
        </button>
      </form>
      {!isForgetPassword && (
        <p
          className="cursor-pointer hover:text-blue-500"
          onClick={handleForgot}
        >
          Forgot Password?
        </p>
      )}

      <p className="my-12 bg-gray-300 p-3 rounded-lg">
        {isLoginForm ? "Don't have an Account?" : "Already Have an Account! "}{" "}
        <span
          className="font-bold cursor-pointer hover:text-blue-400"
          onClick={() => {
            setIsLoginForm((prev) => !prev);
            setIsForgetPassword(false);
          }}
        >
          {isLoginForm ? "Sign Up" : "Sign in"}
        </span>
      </p>
    </div>
  );
};

export default SignUp;
