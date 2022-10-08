import app from "../src/app";

const request = require("supertest");

describe("GET /api", () => {
  it("should return 200 OK", () => {
    return request(app).get("/api").expect(200);
  });
});
