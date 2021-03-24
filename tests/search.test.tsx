import {render, screen} from "@testing-library/react";
import Home from "../pages";

describe("Search", () => {
    it("renders without crashing", () => {
        render(<Home/>)
        expect(
            screen.getByText("Search for a book")
        ).toBeInTheDocument();
    });
});