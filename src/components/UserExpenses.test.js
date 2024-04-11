import UserExpenses from "./UserExpenses";
import { render, screen } from "@testing-library/react";
describe("is user expenses visible", () => {
  test("add to expenses", () => {
    render(<UserExpenses />);
    const htmlElement = screen.getByText("Add to Expenses", { exact: false });
    expect(htmlElement).toBeInTheDocument();
  });
});

describe("async code", () => {
  test("renders posts if request succeed", async () => {
    window.fetch = jest.fn();
    window.fetch.mockResolveValueOnce({
      json: async () => [],
    });
    render(<UserExpenses />);
    const listItemEl = await screen.findAllByRole("listitem");
    expect(listItemEl).not.toHaveLength(0);
  });
});
