/* eslint-env jest */
const model = require('../models/voteValidation')
const request = require('supertest')
const app = require('../app')

// get votes from database
const votes = [
    {
        requestId: 24,
        email: 'lu@gmail.com'
    },
    {
        requestId: 25,
        email: 'lu@gmail.com'
    }
]

// get terminate requests
let Requests = [
    {
        memberToBeTerminated: 'ronald@gmail.com',
        terminationId: 25
    },
    {
        memberToBeTerminated: 'lucy@gmail.com',
        terminationId: 24
    },
    {
        memberToBeTerminated: 'dasy@gmail.com',
        terminationId: 19
    }
]

let terminateRequests = [
    {terminationId: 80},
    {terminationId: 80},
    {terminationId: 80}
]



test('test that relevant terminate request are filtered so that requests that have been voted for do not appear', ()=>{
    let requests = Requests
    requests = model.relevantTerminateRequest(requests, votes)
    expect(requests.length).toBe(1)
})

test('test that when a user has voted for all relevant requests, they are all filtered out', () => {
    let requests = Requests
    requests.forEach(element => {
        element.terminationId = 25
    })
    requests = model.relevantTerminateRequest(requests, votes)
    expect(requests.length).toBe(0)
})

test ('test that when a user has not voted, no requests are filtered', () => {
    let requests = terminateRequests
    requests = model.relevantTerminateRequest(requests, votes)
    expect(requests.length).toBe(3)
})




    
    

