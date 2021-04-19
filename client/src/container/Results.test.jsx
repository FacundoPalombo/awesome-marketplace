import React from "react";
import mockItems from "utils/tests/fixtures/items";
import { renderWithRouter } from "utils/tests/renderWithRouter";
import { Results } from "./Results";
import { useItems } from "services/hooks/useItems";

jest.mock("services/hooks/useItems", () => ({ useItems: jest.fn() }));

describe("GIVEN Results Component", () => {
  describe("WHEN results was retrieved", () => {
    it("THEN should match to snapshot", () => {
      useItems.mockReturnValue([mockItems, false, null]);
      const { asFragment } = renderWithRouter(<Results />);
      expect(asFragment()).toMatchSnapshot();
    });
    it("THEN should render the loader", () => {
      useItems.mockReturnValue([{ categories: [], items: [] }, true, null]);
      const { asFragment } = renderWithRouter(<Results />);
      expect(asFragment()).toMatchSnapshot();
    });
    it("THEN should render the error", () => {
      useItems.mockReturnValue([
        { categories: [], items: [] },
        false,
        { message: "Oops. Snoop error", code: "420" },
      ]);
      const { asFragment } = renderWithRouter(<Results />);
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
