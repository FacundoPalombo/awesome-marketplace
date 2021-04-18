import React from "react";

import { App } from "./App";
import { renderWithRouter } from "./utils/tests/renderWithRouter";

describe("GIVEN App", () => {
  describe("WHEN render", () => {
    it("THEN should match to snapshot", () => {
      const { asFragment } = renderWithRouter(<App />);
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
