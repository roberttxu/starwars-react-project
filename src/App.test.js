import {
  render,
  screen,
  fireEvent,
  getByTestId,
  waitFor,
  findByText,
} from "@testing-library/react";
import App from "./App";
import RetrieveData from "./helpers/RetrieveData";
import ChartSection from "./ChartSection";
test("Validate that title is present", () => {
  global.URL.createObjectURL = jest.fn();

  render(<App />);
  const linkElement = screen.getByText(/Starwars Dashboard/i);
  expect(linkElement).toBeInTheDocument();
});

test("Validate that loader is present", () => {
  global.URL.createObjectURL = jest.fn();

  render(<App />);

  let oval = screen.getByTestId("oval-loading");
  expect(oval).toBeInTheDocument();
});