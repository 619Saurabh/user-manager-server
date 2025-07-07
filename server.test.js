const request = require('supertest');
const app = require('./server');

describe('User API', () => {
  it('GET / should return API status', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('Server is running...');
  });

  it('GET /api/users should return users array', async () => {
    const res = await request(app).get('/api/users');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toHaveProperty('name');
  });

  it('POST /api/users should add a user', async () => {
    const user = { name: 'Madhu', email: 'madhu@gmail.com' };
    const res = await request(app).post('/api/users').send(user);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe(user.name);
    expect(res.body.email).toBe(user.email);
  });

  it('PUT /api/users/:id should update a user', async () => {
    // Adding a user first
    const user = { name: 'Sanjana', email: 'sanjana@gmail.com' };
    const addRes = await request(app).post('/api/users').send(user);
    const id = addRes.body.id;
    //Updating the user
    const updated = { name: 'Sanju', email: 'sanju@example.com' };
    const res = await request(app).put(`/api/users/${id}`).send(updated);
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe(updated.name);
    expect(res.body.email).toBe(updated.email);
  });

  it('DELETE /api/users/:id should delete a user', async () => {
    // Add a user first
    const user = { name: 'Sher', email: 'sher@yahoo.com' };
    const addRes = await request(app).post('/api/users').send(user);
    const id = addRes.body.id;

    const res = await request(app).delete(`/api/users/${id}`);
    expect(res.statusCode).toBe(204);
  });
});