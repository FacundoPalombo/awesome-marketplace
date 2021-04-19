import { render } from "@testing-library/jest-dom";
import { renderWithRouter } from "../../utils/tests/renderWithRouter";
import { Detail } from "./Detail";
import mockItem from "utils/tests/fixtures/detail";
import React from "react";

describe("GIVEN Detail Component", () => {
  describe("WHEN detail was retrieved", () => {
    it("AND product is new THEN should match to snapshot", () => {
      const { asFragment } = renderWithRouter(<Detail {...mockItem} />);
      expect(asFragment()).toMatchSnapshot();
    });
    it("AND product is used THEN should match to snapshot", () => {
      const { asFragment } = renderWithRouter(
        <Detail {...{ mockItem, condition: "new" }} />
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });
  describe("WHEN results was NOT retrieved", () => {
    it("THEN should match to snapshot", () => {
      const mockItemNull = { categories: [] };
      const { asFragment } = renderWithRouter(<Detail {...mockItemNull} />);
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
