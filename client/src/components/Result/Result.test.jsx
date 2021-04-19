import React from "react";

import { renderWithRouter } from "../../utils/tests/renderWithRouter";
import { Result } from "./Result";

describe("GIVEN Result Component", () => {
  describe("WHEN results was retrieved", () => {
    it("THEN should match to snapshot", () => {
      const fixtureData = {
        id: "MLA804207795",
        thumbnail:
          "http://http2.mlstatic.com/D_684489-MLA32011256128_082019-O.jpg",
        shipping: { free_shipping: true },
        title: "iPod Touch 32 Gb",
        price: 39999,
        address: { city_name: "Rosario" },
      };
      const { asFragment } = renderWithRouter(<Result {...fixtureData} />);
      expect(asFragment()).toMatchSnapshot();
    });
  });
  describe("WHEN results was NOT retrieved", () => {
    it("THEN should match to snapshot", () => {
      const fixtureData = {
        shipping: { free_shipping: null },
        address: { city_name: null },
      };
      const { asFragment } = renderWithRouter(<Result {...fixtureData} />);
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
