const request = require('supertest')
const app = require('../src/app')

describe('Auth & User REST APIs', () => {
  const testEmail = `testuser_${Date.now()}@vnit.ac.in`
  let token = ''

  it('should register a new student user successfully', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        fullName: 'Test Student',
        email: testEmail,
        password: 'password123',
        college: 'VNIT Nagpur'
      })

    expect(res.statusCode).toEqual(201)
    expect(res.body).toHaveProperty('access_token')
    expect(res.body.user).toHaveProperty('email', testEmail)
    expect(res.body.user).toHaveProperty('role', 'STUDENT')
    token = res.body.access_token
  })

  it('should fail registration with 409 Conflict if email already exists', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        fullName: 'Duplicate User',
        email: testEmail,
        password: 'password123'
      })

    expect(res.statusCode).toEqual(409)
    expect(res.body.success).toBe(false)
    expect(res.body.message).toEqual('An account with this email already exists.')
  })

  it('should login successfully with valid registered credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: testEmail,
        password: 'password123'
      })

    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('access_token')
    expect(res.body.user).toHaveProperty('email', testEmail)
  })

  it('should reject login with 401 Unauthorized for wrong password', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: testEmail,
        password: 'wrongpassword'
      })

    expect(res.statusCode).toEqual(401)
    expect(res.body.message).toEqual('Invalid email or password.')
  })

  it('should reject login with 401 Unauthorized for non-existent email', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'nonexistent_user_9999@vnit.ac.in',
        password: 'password123'
      })

    expect(res.statusCode).toEqual(401)
    expect(res.body.message).toEqual('Invalid email or password.')
  })

  it('should fetch user profile from GET /api/users/me using JWT token', async () => {
    const res = await request(app)
      .get('/api/users/me')
      .set('Authorization', `Bearer ${token}`)

    expect(res.statusCode).toEqual(200)
    expect(res.body.email).toEqual(testEmail)
    expect(res.body).not.toHaveProperty('passwordHash')
  })

  it('should reject GET /api/users/me without JWT token with 401', async () => {
    const res = await request(app).get('/api/users/me')
    expect(res.statusCode).toEqual(401)
  })
})
