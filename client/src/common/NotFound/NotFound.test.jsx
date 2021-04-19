import React from "react";
import { NotFound } from "./NotFound";
import { fireEvent } from "@testing-library/react";
import { renderWithRouter } from "utils/tests/renderWithRouter";
import { createMemoryHistory } from "history";

describe("GIVEN NotFound component", () => {
  describe("WHEN rendered", () => {
    it("THEN should match snapshot", () => {
      const { asFragment } = renderWithRouter(<NotFound />);
      expect(asFragment()).toMatchSnapshot();
    });
    it("THEN should return back to home", () => {
      const historyStub = createMemoryHistory({ initialEntries: ["/foo/bar"] });
      const { getByTestId } = renderWithRouter(<NotFound />, {
        history: historyStub,
      });
      fireEvent.click(getByTestId("link-back"));
      expect(historyStub.location.pathname).toBe("/");
    });
  });
});
