/* eslint-env jest */
const request = require('supertest')
const app = require('../app')

describe('POST /searchGroup', () => {
  const correctFormInput = 'sociology'

  test('Pedirects to results page', async () => {
    const response = await request(app).post('/login')
      .send(correctFormInput)
      .set('Search', 'application/json')
    expect(response.redirect).toBe('/searchGroups')
  })
})
