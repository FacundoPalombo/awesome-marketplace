import React from "react";
import { Breadcrumb } from "./Breadcrumb";
import { render } from "@testing-library/jest-dom";

describe("GIVEN Breadcrumb component", () => {
  describe("WHEN rendered", () => {
    it("THEN should match snapshot", () => {
      const { asFragment } = render(<Breadcrumb category="panchitos" />);
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
