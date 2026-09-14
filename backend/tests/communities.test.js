const request = require('supertest')
const app = require('../src/app')

describe('Communities & Notifications REST APIs', () => {
  let token = ''

  beforeAll(async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'kanak.ramteke@vnit.ac.in',
        password: 'password123'
      })
    token = res.body.access_token
  })

  it('should list all communities', async () => {
    const res = await request(app).get('/api/communities')
    expect(res.statusCode).toEqual(200)
    expect(Array.isArray(res.body)).toBe(true)
  })

  it('should fetch user notifications', async () => {
    const res = await request(app)
      .get('/api/notifications')
      .set('Authorization', `Bearer ${token}`)

    expect(res.statusCode).toEqual(200)
    expect(Array.isArray(res.body)).toBe(true)
  })

  it('should mark all notifications as read', async () => {
    const res = await request(app)
      .patch('/api/notifications/read-all')
      .set('Authorization', `Bearer ${token}`)

    expect(res.statusCode).toEqual(200)
  })
})
