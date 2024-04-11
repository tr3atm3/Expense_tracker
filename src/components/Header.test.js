import { render, screen } from "@testing-library/react";
import Header from "./Header";

describe("Testing headers", () => {
  test("Myweblink is rendered with different nav bars", () => {
    render(<Header />);
    const htmlElement = screen.getByText("Myweblink", { exact: false });
    expect(htmlElement).toBeInTheDocument();
  }),

});
