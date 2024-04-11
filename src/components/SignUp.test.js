import { render, screen } from "@testing-library/react";
import SignUp from "./SignUp";
import userEvent from "@testing-library/user-event";

describe("checking tests inside sign up functions", () => {
  test("is forgot password rendered", () => {
    render(<SignUp />);

    const ElementToCheck = screen.getByText("forgot password?", {
      exact: false,
    });
    expect(ElementToCheck).toBeInTheDocument();
  });
  test("is Signup rendered", () => {
    render(<SignUp />);

    const ElementToCheck = screen.getByText("SignUp", {
      exact: false,
    });
    expect(ElementToCheck).toBeInTheDocument();
  });
  test("is Signin rendered", () => {
    render(<SignUp />);

    const buttonElement = screen.getByRole("button");
    userEvent.click(buttonElement);
    const ElementToCheck = screen.getByText("SignIn", {
      exact: false,
    });
    expect(ElementToCheck).toBeInTheDocument();
  });
});
