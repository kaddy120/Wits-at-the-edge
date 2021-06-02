/* eslint-env jest */
const app = require('../app')
const request = require('supertest')

describe('GET /log-in', () => {
  test('request login form', async (done) => {
    const response = await request(app).get('/login')
    expect(response.status).toBe(200)
    done()
  })
})

describe('POST /login', () => {
  const correctFormInput = {
    email: 'kaddy@gmail.com',
    password: 'password'
  }

  test('Password must be correct', async () => {
    const WrongPassword = { ...correctFormInput }
    WrongPassword.password = 'wrong password'
    const response = await request(app).post('/login')
      .send(WrongPassword)
      .set('Accept', 'application/json')
    expect(response.redirect).toBe('/login')
  })

  test('Password is correct', async () => {
    const CorrectPassword = { ...correctFormInput }
    CorrectPassword.password = 'password'
    const response = await request(app).post('/login')
      .send(CorrectPassword)
      .set('Accept', 'application/json')
    expect(response.redirect).toBe('/')
  })
})
