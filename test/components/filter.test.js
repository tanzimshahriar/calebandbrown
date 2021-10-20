import React from "react";
// Using render and screen from test-utils.js instead of
// @testing-library/react
import { render, screen } from "../test-utils";
import Filter from "@components/filter";

describe("Filter", () => {
    it("should render navigation bar", () => {
        render(<Filter />)

        const homeLink = screen.getByText(
            /Home/i
        );

        const trendsLink = screen.getByText(
            /Trends/i
        );

        expect(homeLink).toBeInTheDocument();
        expect(trendsLink).toBeInTheDocument();

    });
});