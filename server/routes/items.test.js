const items = require("./items");
const app = require("../app");
const request = require("supertest");
const axios = require("axios");

jest.mock("axios", () => ({ get: jest.fn() }));

describe("GIVEN Items endpoints", () => {
  describe("WHEN GET - /items", () => {
    it("THEN should return data", async () => {
      axios.get.mockResolvedValue({ foo: "bar" });

      await request(app)
        .get("/api/items?q=asd")
        .status(200)
        .then((response) => {
          expect(response).not.toBeFalsy();
        });
    });
  });
});
