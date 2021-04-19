import React from "react";
import { Breadcrumbs } from "./Breadcrumbs";
import { render } from "@testing-library/react";

describe("GIVEN Breadcrumb component", () => {
  describe("WHEN rendered", () => {
    it("THEN should match snapshot", () => {
      const categoriesFixture = [
        {
          id: "MLA1182",
          name: "Instrumentos Musicales",
          results: 21327,
        },
        {
          id: "MLA1747",
          name: "Repuestos Autos y Camionetas",
          results: 44080,
        },
      ];
      const { asFragment } = render(
        <Breadcrumbs categories={categoriesFixture} />
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
