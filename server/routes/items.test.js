const app = require("../app");
const http = require("http");
const supertest = require("supertest");
const axios = require("axios");
const createHttpError = require("http-errors");
const { response } = require("../app");

const httpServer = http.createServer(app);
const request = supertest(httpServer);

jest.mock("axios", () => ({ get: jest.fn() }));

afterAll(() => {
  httpServer.close();
});

describe("GIVEN Items endpoints", () => {
  describe("WHEN GET - /items", () => {
    it("THEN should return data", async () => {
      const itemFixture = { it: "works", very: "good" };
      axios.get.mockResolvedValueOnce({
        status: 200,
        data: { results: [itemFixture] },
      });

      await request
        .get("/api/items")
        .query({ q: "asda" })
        .expect(200)
        .then((response) => {
          // It should return the correct schema
          expect(response.body.items[0]).toEqual(itemFixture);
        });
    });
    it("THEN should return an error when service communication fails", async () => {
      axios.get.mockResolvedValueOnce({ status: 404, data: {} });

      await request.get("/api/items?q=example").then((response) => {
        const httpErrorServer = createHttpError(502);
        expect(response.body).toEqual({
          error: httpErrorServer.message,
          code: httpErrorServer.statusCode,
        });
      });
    });
  });
  describe("WHEN GET - /item", () => {
    it("THEN should return data", async () => {
      const itemWithoutDescriptionFixture = {
        id: "foo",
        title: "foo",
        price: "foo",
        picture: "foo",
        condition: "foo",
        free_shipping: "foo",
        sold_quantity: "foo",
      };
      const descriptionFixture = {
        description: "lorem ipsum dolor sit amet consectetur adipiscing elit",
      };

      const itemFixture = {
        author: { name: "Facundo", lastname: "Palombo" },
        item: {
          ...itemWithoutDescriptionFixture,
          description: descriptionFixture,
        },
      };

      axios.get
        .mockResolvedValueOnce({
          status: 200,
          data: { ...itemWithoutDescriptionFixture },
        })
        .mockResolvedValueOnce({
          status: 200,
          data: { plain_text: descriptionFixture },
        });
      await request.get("/api/item/1234").then((response) => {
        // It should return the correct schema
        expect(response.body).toEqual(itemFixture);
      });
    });
    it("THEN should return an error when service communication fails", async () => {
      axios.get
        .mockResolvedValueOnce({ status: 404, data: {} })
        .mockResolvedValueOnce({ status: 404, data: {} });

      await request.get("/api/item/pepito").then((response) => {
        const httpErrorServer = createHttpError(502);
        expect(response.body).toEqual({
          error: httpErrorServer.message,
          code: httpErrorServer.statusCode,
        });
      });
    });
  });
});
