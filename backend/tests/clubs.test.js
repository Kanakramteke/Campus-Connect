const request = require('supertest')
const app = require('../src/app')

describe('Clubs REST APIs', () => {
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

  it('should list all published clubs', async () => {
    const res = await request(app).get('/api/clubs')
    expect(res.statusCode).toEqual(200)
    expect(Array.isArray(res.body)).toBe(true)
    expect(res.body.length).toBeGreaterThan(0)
  })

  it('should join and leave a club', async () => {
    const clubs = await request(app).get('/api/clubs')
    const clubId = clubs.body[0].id

    const joinRes = await request(app)
      .post(`/api/clubs/${clubId}/join`)
      .set('Authorization', `Bearer ${token}`)

    expect(joinRes.statusCode).toEqual(200)
    expect(joinRes.body.joined).toBe(true)

    const leaveRes = await request(app)
      .delete(`/api/clubs/${clubId}/leave`)
      .set('Authorization', `Bearer ${token}`)

    expect(leaveRes.statusCode).toEqual(200)
    expect(leaveRes.body.joined).toBe(false)
  })
})
