import React from "react";
import { renderWithRouter } from "utils/tests/renderWithRouter";
import { Detail } from "./Detail";

describe("GIVEN Detail Component", () => {
  describe("WHEN page is rendered", () => {
    it("THEN should match to snapshot", () => {
      const { asFragment } = renderWithRouter(<Detail />);
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
