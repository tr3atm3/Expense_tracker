import { render, screen } from "@testing-library/react";
import Header from "./Header";

describe("Testing headers", () => {
  test("Myweblink is rendered with different nav bars", () => {
    render(<Header />);
    const htmlElement = screen.getByText("Myweblink", { exact: false });
    expect(htmlElement).toBeInTheDocument();
  });
  test("home is rendered", () => {
    render(<Header />);
    const htmlElement = screen.getByText("home", { exact: false });
    expect(htmlElement).toBeInTheDocument();
  });
  test("SignIn is rendered", () => {
    render(<Header />);
    const htmlElement = screen.getByText("signin", { exact: false });
    expect(htmlElement).toBeInTheDocument();
  });
  test("products is rendered", () => {
    render(<Header />);
    const htmlElement = screen.getByText("products", { exact: false });
    expect(htmlElement).toBeInTheDocument();
  });
});
