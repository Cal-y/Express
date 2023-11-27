const request = require("supertest");
const app = require("../app");

describe("GET /api/movies", () => {
  it("should return all movies", async () => {
    const response = await request(app).get("/api/movies");
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(200);
  });
});

describe("GET /api/movies/:id", () => {
  it("should return a specific movie by ID with status 200 and JSON format", async () => {
    const movies = [
      { id: 1, title: "Movie1" },
      { id: 2, title: "Movie2" },
    ];

    const response = await request(app).get("/api/movies/1");

    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body.id).toBe(1);
    expect(response.body.title).toBe("Movie 1");
  });

  it("should return a 404 status if tje movie is not found", async () => {
    const response = await request(app).get("/api/movies/999");

    expect(response.status).toBe(404);
  });
});

module.exports = app;
