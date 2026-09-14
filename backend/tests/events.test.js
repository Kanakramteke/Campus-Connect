const request = require('supertest')
const app = require('../src/app')

describe('Events & Enrollment REST APIs', () => {
  let token = ''
  let createdEventId = ''

  beforeAll(async () => {
    // Login seed user
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'kanak.ramteke@vnit.ac.in',
        password: 'password123'
      })
    token = res.body.access_token
  })

  it('should list all published events', async () => {
    const res = await request(app).get('/api/events')
    expect(res.statusCode).toEqual(200)
    expect(Array.isArray(res.body)).toBe(true)
    expect(res.body.length).toBeGreaterThan(0)
  })

  it('should create a new technical event draft', async () => {
    const res = await request(app)
      .post('/api/events')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Test Tech Workshop 2026',
        category: 'TECHNICAL',
        tagline: 'Hands-on Cloud Workshop',
        description: 'Learn Docker and Kubernetes for high-performance applications.',
        date: '2026-11-20',
        time: '10:00 AM',
        location: 'VNIT Computer Lab',
        venue: 'Lab 3, VNIT Nagpur',
        registrationFee: 0,
        isFree: true,
        seats: 50,
        status: 'DRAFT'
      })

    expect(res.statusCode).toEqual(201)
    expect(res.body.title).toEqual('Test Tech Workshop 2026')
    createdEventId = res.body.id
  })

  it('should publish draft event', async () => {
    const res = await request(app)
      .post(`/api/events/${createdEventId}/publish`)
      .set('Authorization', `Bearer ${token}`)

    expect(res.statusCode).toEqual(200)
    expect(res.body.status).toEqual('published')
  })

  it('should enroll user in event', async () => {
    const res = await request(app)
      .post(`/api/events/${createdEventId}/register`)
      .set('Authorization', `Bearer ${token}`)
      .send({})

    expect(res.statusCode).toEqual(201)
    expect(res.body).toHaveProperty('registrationId')
  })

  it('should prevent duplicate enrollment', async () => {
    const res = await request(app)
      .post(`/api/events/${createdEventId}/register`)
      .set('Authorization', `Bearer ${token}`)
      .send({})

    expect(res.statusCode).toEqual(400)
    expect(res.body.message).toContain('already enrolled')
  })
})
