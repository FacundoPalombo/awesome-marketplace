const app = require("../app");
const http = require("http");
const supertest = require("supertest");

const httpServer = http.createServer(app);
const request = supertest(httpServer);

afterAll(() => {
  httpServer.close();
});

describe("GIVEN healthcheck endpoints", () => {
  describe("WHEN called THEN should work.", () => {
    it("GET - /ping", async () => {
      await request
        .get("/ping")
        .expect(200)
        .then((response) => {
          expect(response.text).toEqual("pong");
        });
    });
    it("GET - /pingui", async () => {
      await request
        .get("/pingui")
        .expect(200)
        .then((response) => {
          expect(response.body).toEqual({ fancy: "pongo" });
        });
    });
  });
});
