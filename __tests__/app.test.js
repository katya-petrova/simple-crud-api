const server = require("../app");
const supertest = require("supertest");

describe("Testing simple-crud-api", () => {
  const req = supertest(server);
  let id;
  const mockUser = { name: "Alex", age: 24, hobbies: "coding" };

  test("GET request should return an empty array and status code 200", async () => {
    const response = await req.get("/person");
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  test("POST request should create new person and return status code 201", async () => {
    const response = await req.post("/person").send(mockUser);
    id = response.body.id;
    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(mockUser);
  });

  test("GET request should return a person by id and status code 200", async () => {
    const response = await req.get(`/person/${id}`);
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(mockUser);
  });

  test("PUT request should update a person by id and return status code 200", async () => {
    mockUser.name = "Gleb";
    const response = await req.put(`/person/${id}`).send(mockUser);
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(mockUser);
  });

  test("DELETE request should delete a person by id and return status code 204", async () => {
    const response = await req.delete(`/person/${id}`);
    expect(response.status).toBe(204);
  });

  test("GET request with invalid id should return status code 200", async () => {
    const response = await req.get(`/person/${id}`);
    expect(response.status).toBe(404);
  });

  server.close();
});
