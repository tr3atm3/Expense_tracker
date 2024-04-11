import UserExpenses from "./UserExpenses";
import { render, screen } from "@testing-library/react";
describe("is user expenses visible", () => {
  test("add to expenses", () => {
    render(<UserExpenses />);
    const htmlElement = screen.getByText("Add to Expenses", { exact: false });
    expect(htmlElement).toBeInTheDocument();
  });
});
