const app = require('../app')
const request = require('supertest')

describe('GET /dashboard', () => {
    test('should respond with a 302 status code if the user is not logged in', async (done) => {
        const response = await request(app).get('/dashboard')
        expect(response.status).toBe(302)
        done()
    })
})