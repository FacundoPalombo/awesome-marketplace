import React from "react";
import { renderWithRouter } from "../../utils/tests/renderWithRouter";
import { InputSearch } from "./InputSearch";
import { fireEvent, waitFor } from "@testing-library/react";
import { createMemoryHistory } from "history";

describe("GIVEN InputSearch Component", () => {
  describe("WHEN searches some text", () => {
    it("THEN should match to snapshot", () => {
      const { asFragment } = renderWithRouter(<InputSearch />);
      expect(asFragment()).toMatchSnapshot();
    });
    it("THEN should change the url search params and search for items", async () => {
      let {
        history,
        getByRole,
        queryByRole,
        getByPlaceholderText,
        queryByPlaceholderText,
      } = renderWithRouter(<InputSearch />, {
        history: createMemoryHistory({ initialEntries: ["/items"] }),
      });
      history.push = jest.fn();
      await waitFor(() => {
        expect(queryByRole("button")).toBeTruthy();
        expect(queryByPlaceholderText("Nunca dejes de buscar")).toBeTruthy();
      });
      const submit = getByRole("button");
      const inputText = getByPlaceholderText("Nunca dejes de buscar");
      fireEvent.change(inputText, { target: { value: "Lord of the rings" } });
      fireEvent.submit(submit);
      await waitFor(() => {
        expect(history.push).toBeCalledWith({
          pathname: "/items",
          search: "?q=Lord of the rings",
        });
      });
    });
  });
});
