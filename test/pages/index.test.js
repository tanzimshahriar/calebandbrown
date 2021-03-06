import React from "react";
// Using render and screen from test-utils.js instead of
// @testing-library/react
import { render, screen } from "../test-utils";
import HomePage from "@pages/index";

describe("Homepage", () => {
    it("should render the heading", () => {
        render(<HomePage />);

        const heading = screen.getByText(
            /Top Analytics Coins By Market/i
        );

        // we can only use toBeInTheDocument because it was imported
        // in the jest.setup.js and configured in jest.config.js
        expect(heading).toBeInTheDocument();
    });
});