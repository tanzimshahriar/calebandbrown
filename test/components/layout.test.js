import React from "react";
// Using render and screen from test-utils.js instead of
// @testing-library/react
import { render, screen } from "../test-utils";
import Layout from "@components/layout";

describe("Layout", () => {
    it("should render navigation bar", () => {
        render(<Layout />)

        const homeLink = screen.getByText(
            /Home/i
        );

        const trendsLink = screen.getByText(
            /Trends/i
        );

        expect(homeLink).toBeInTheDocument();
        expect(trendsLink).toBeInTheDocument();

    });
    it("should render footer", () => {
        render(<Layout />)

        const footer = screen.getByText(
            /@Copyright Crypto Tracker/i
        );

        expect(footer).toBeInTheDocument();

    });
    it("should navigate between pages", () => {
        render(<Layout />)

        const url = window.location.origin;

        const homeLink = screen.getByText('Home').href;

        const trendsLink = screen.getByText('Trends').href;

        expect(homeLink).toBe(url + '/');
        expect(trendsLink).toBe(url + '/trends');

    });
});