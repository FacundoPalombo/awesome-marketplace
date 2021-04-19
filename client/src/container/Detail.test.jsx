import React from "react";
import { Detail } from "./Detail";
import mockItem from "utils/tests/fixtures/item";
import { useItem } from "services/hooks/useItem";
import { renderWithRouter } from "../utils/tests/renderWithRouter";

jest.mock("services/hooks/useItem", () => ({
  useItem: jest.fn(),
}));

describe("GIVEN Detail Component", () => {
  describe("WHEN page is rendered", () => {
    it("THEN should match to snapshot", () => {
      useItem.mockReturnValue([mockItem, false, null]);
      const { asFragment } = renderWithRouter(<Detail />);
      expect(asFragment()).toMatchSnapshot();
    });
    it("THEN should render the loader", () => {
      useItem.mockReturnValue([{ categories: [] }, true, null]);
      const { asFragment } = renderWithRouter(<Detail />);
      expect(asFragment()).toMatchSnapshot();
    });
    it("THEN should render the empty state", () => {
      useItem.mockReturnValue([{}, false, null]);
      const { asFragment } = renderWithRouter(<Detail />);
      expect(asFragment()).toMatchSnapshot();
    });
    it("THEN should render the error", () => {
      useItem.mockReturnValue([
        { categories: [] },
        false,
        { message: "Oops. Snoop error", code: "420" },
      ]);
      const { asFragment } = renderWithRouter(<Detail />);
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
