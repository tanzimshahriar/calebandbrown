// import React from "react";
// Using render and screen from test-utils.js instead of
// @testing-library/react
// import { render, screen } from "../test-utils";
// import Pagination from "../../components/pagination";

// describe("Pagination", () => {
//     it("should render pagination with correct number of pages and current page", () => {
//         render(<Pagination currentPage={2} numberOfPages={6} />)

//         const one = screen.getByText(
//             /1/i
//         );
//         const two = screen.getByText(
//             /2/i
//         );
//         const three = screen.getByText(
//             /3/i
//         );
//         const four = screen.getByText(
//             /4/i
//         );
//         const five = screen.getByText(
//             /5/i
//         );
//         const six = screen.getByText(
//             /6/i
//         );

//         expect(one).toBeInTheDocument();
//         expect(two).toBeInTheDocument();
//         expect(three).toBeInTheDocument();
//         expect(four).toBeInTheDocument();
//         expect(five).toBeInTheDocument();
//         expect(six).toBeInTheDocument();

//     });

//     it("should emit callback to parent when clicked", () => {
//         var page = null;

//         const wrapper = mount(<Pagination currentPage={2} numberOfPages={6} changePage={(p) => page = p} />);

//         wrapper.find('#page-btn-4').simulate('click');

//         expect(page).to.equal(4);

//     });

// });