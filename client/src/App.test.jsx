import { render } from "@testing-library/react";
import React from "react";

import { App } from "./App";

describe("GIVEN App", () => {
  describe("WHEN render", () => {
    it("THEN should match to snapshot", () => {
      const { asFragment } = render(<App />);
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
