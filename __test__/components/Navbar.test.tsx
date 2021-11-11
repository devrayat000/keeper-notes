/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import Navbar from "../../src/components/Navbar";

describe("Navbar", () => {
  it("should render the heading", async () => {
    render(<Navbar />);

    const heading = await screen.findByTestId("heading");

    expect(heading).toBeInTheDocument();
  });

  it("should have the title correctly", async () => {
    render(<Navbar />);

    const heading = await screen.findByTestId("heading");

    expect(heading).toHaveTextContent("Keeper");
  });
});
