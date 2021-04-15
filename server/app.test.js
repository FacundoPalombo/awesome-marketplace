const app = require("./app");
const http = require("http");
const supertest = require("supertest");
const createHttpError = require("http-errors");

const httpServer = http.createServer(app);
const request = supertest(httpServer);

beforeAll(() => {
  app.set("NODE_ENV", "development");
});

afterAll(() => {
  app.set("NODE_ENV", "test");
  httpServer.close();
});

describe("GIVEN an application running", () => {
  describe("THEN should handle errors", () => {
    it("WHEN random route is fetched", async () => {
      const httpError = createHttpError(501);
      await request
        .get("/api/wololo")
        .expect(501)
        .then((response) => {
          expect(response.text).toEqual(
            JSON.stringify({
              message: httpError.message,
              status: httpError.statusCode,
            })
          );
        });
    });
  });
});
