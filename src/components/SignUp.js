import React, { useRef } from "react";

const SignUp = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

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
      console.log(data);
    } catch (err) {
      alert(err.message);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (passwordRef.current.value === confirmPasswordRef.current.value) {
      signUpFunction();
    } else {
      alert("Different password input");
    }
  };
  return (
    <div className="w-[40%] mx-auto shadow-lg p-8 my-24">
      <h1 className="font-bold text-2xl my-4">SignUp</h1>
      <form className="flex flex-col " onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          className="border border-gray-400 p-2 text-lg rounded-lg my-3"
          ref={emailRef}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="border border-gray-400 p-2 text-lg rounded-lg my-3"
          required
          ref={passwordRef}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="border border-gray-400 p-2 text-lg rounded-lg my-3"
          required
          ref={confirmPasswordRef}
        />
        <button className="bg-blue-300 p-2 rounded-lg text-lg my-4">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
