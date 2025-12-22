const request = require("supertest");
const app = require("../app");

beforeEach(() => {
  app.resetTasks();
});

it("GET /tasks return array", async () => {
  const response = await request(app).get("/tasks");
  expect(response.statusCode).toBe(200);
  expect(Array.isArray(response.body)).toBe(true);
});

it("POST /tasks creates a task", async () => {
  const res = await request(app).post("/tasks").send({ name: "Learn CI/CD" });
  expect(res.statusCode).toBe(201);
  expect(res.body.name).toBe("Learn CI/CD");
});

it("PUT /tasks/:id updates a task", async () => {
  const create = await request(app).post("/tasks").send({ name: "Old title" });
  const id = create.body.id;

  const update = await request(app)
    .put(`/tasks/${id}`)
    .send({ name: "New title" });

  expect(update.statusCode).toBe(200);
  expect(update.body.name).toBe("New title");
});

it("DELETE /tasks/:id removes a task", async () => {
  const create = await request(app)
    .post("/tasks")
    .send({ name: "To delete" });
  const id = create.body.id;

  const del = await request(app)
    .delete(`/tasks/${id}`);
  expect(del.statusCode).toBe(204);

  const list = await request(app).get("/tasks");
  expect(list.body.length).toBe(0);
});

it("PUT /tasks/:id returns 404 if task does not exist", async () => {
  const res = await request(app)
    .put("/tasks/999")
    .send({ name: "Not found" });
  expect(res.statusCode).toBe(404);
});