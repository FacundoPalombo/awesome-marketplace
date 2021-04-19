import axios from "axios";
import { renderHook } from "@testing-library/react-hooks";
import { useItem } from "./useItem";

jest.mock("axios", () => ({ get: jest.fn() }));

describe("GIVEN useItems hook", () => {
  describe("WHEN service call is triggered", () => {
    it("AND is successfull THEN should return data", async () => {
      const mockResult = { item: { foo: "bar" } };
      axios.get.mockResolvedValueOnce({
        data: mockResult,
      });
      const { waitForNextUpdate, result } = renderHook(() => useItem("foo"));
      expect(result.current[0]).toEqual({});
      expect(result.current[1]).toEqual(true);
      await waitForNextUpdate();
      expect(result.current[0]).toEqual({ foo: "bar" });
      expect(result.current[1]).toEqual(false);
    });
    it("AND trigger an error THEN should return error", async () => {
      axios.get.mockRejectedValue({
        response: {
          status: 404,
          statusText: "Error 404 not found",
        },
      });
      const { waitForNextUpdate, result } = renderHook(() => useItem("foo"));
      expect(result.current[0]).toEqual({});
      expect(result.current[1]).toEqual(true);
      await waitForNextUpdate();
      expect(result.current[0]).toEqual({});
      expect(result.current[1]).toEqual(false);
      expect(result.current[2]).toEqual({
        code: 404,
        message: "Error 404 not found",
      });
    });
  });
});
