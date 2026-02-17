const request = require('supertest');
const app = require('./app');

describe('Test API endpoints', () => {
  test('GET /hello should return Hello World', async () => {
    const res = await request(app).get('/hello');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: 'Hello World!' });
  });

  test('POST /echo should return the sent data', async () => {
    const res = await request(app)
      .post('/echo')
      .send({ data: 'Test Data' });
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ data: 'Test Data' });
  });
});