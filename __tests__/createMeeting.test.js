/* eslint-env jest */
const app = require('../app')
const request = require('supertest')

describe('GET /group/createMeeting', () => {
  test('request create a meeting form', async (done) => {
    const response = await request(app).get('/group/createMeeting')
    expect(response.status).toBe(200)
    done()
  })
})

describe('POST /group/createMeeting', () => {
  test('an empty form return 400', async () => {
    const response = await request(app).post('/group/createMeeting')
      .send({
        time: null,
        agenda: null
      })
      .set('Accept', 'application/json')
    expect(response.statusCode).toBe(400)
  })

  test('a form with a missing input return 404', async () => {
    const response = await request(app).post('/signup')
      .send({ time: null, agenda: 'The purspose of the meeting' })
      .set('Accept', 'application/json')
    expect(response.statusCode).toBe(400)
    // expect(response.body)
  })

  test('The user creating a meeting must be a member of the group', async () => {
    // this teste will be implemeted in the next sprint

    // const response = await request(app).post('/signup')
    //   .send({ time: '05-06-2050T04:00', agenda: 'srint retrospect' })
    //   .set('Accept', 'application/json')
    // expect(response.statusCode).toBe(400)
    // expect(response.body).toStrictEqual({ errors: [{ value: 'password', msg: 'Password confirmation does not match password', param: 'password1', location: 'body' }] })
  })
})
