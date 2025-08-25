const request = require('supertest');
const app = require('../index');

describe('Todo API', () => {
  it('GET /todos should return empty array initially', async () => {
    const res = await request(app).get('/todos');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });

  it('POST /todos should create a todo', async () => {
    const res = await request(app)
      .post('/todos')
      .send({ text: 'Learn DevOps' });
    expect(res.statusCode).toBe(201);
    expect(res.body.text).toBe('Learn DevOps');
  });

  it('DELETE /todos/:id should delete a todo', async () => {
    const todo = await request(app)
      .post('/todos')
      .send({ text: 'Temp Todo' });
    const res = await request(app).delete(`/todos/${todo.body.id}`);
    expect(res.statusCode).toBe(204);
  });

  // Close server/connections after tests
  afterAll(async () => {
    // If your app creates any servers manually in tests, close them here
    await new Promise(resolve => setTimeout(resolve, 500)); // allow pending handles to finish
  });
});
