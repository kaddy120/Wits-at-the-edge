/* eslint-env jest */
const app = require('../app')
const request = require('supertest')

describe('GET /sign-up', () => {
  test('request signup form', async (done) => {
    const response = await request(app).get('/signup')
    expect(response.status).toBe(200)
    done()
  })
})

describe('POST /sign-up', () => {
  test('an empty form return 400', async () => {
    const response = await request(app).post('/signup')
      .send({})
      .set('Accept', 'application/json')
    expect(response.statusCode).toBe(400)
  })
  const correctFormInput = {
    name: 'kaddy',
    surname: 'marindi',
    email: 'kaddy@gmail.com',
    password: 'password',
    password1: 'password'
  }

  test('a form with a missing input return 404', async () => {
    const missingInput = { ...correctFormInput }
    missingInput.name = null
    const response = await request(app).post('/signup')
      .send(missingInput)
      .set('Accept', 'application/json')
    expect(response.statusCode).toBe(400)
    // expect(response.body)
  })

test('Password must match', async () => {
    const unmatchingPassword = { ...correctFormInput }
    unmatchingPassword.password = 'wrong password'
    unmatchingPassword.name = 'name'
    const response = await request(app).post('/signup')
      .send(unmatchingPassword)
      .set('Accept', 'application/json')
    expect(response.statusCode).toBe(400)
    //expect(response.body).toStrictEqual({ errors: [{ value: 'password', msg: 'Password confirmation does not match password', param: 'password1', location: 'body' }] })
  })
})

// {"errors":[{"value":"","msg":"Name is required","param":"name","location":"body"}
// ,{"value":"","msg":"Surname is required","param":"surname","location":"body"},
// {"value":"","msg":"Enter a valid email address","param":"email","location":"body"},
// {"value":"","msg":"password cannot be empty","param":"password","location":"body"}]}
