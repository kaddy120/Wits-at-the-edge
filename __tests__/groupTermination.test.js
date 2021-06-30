/* eslint-env jest */
const model = require('../models/voteValidation')

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
const Requests = [
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
        terminationIdId: 19
    }
]


describe ('tests associated with termination logic', function () {
    test('test that relevant terminate request are filtered so that requests that have been voted for do not appear', ()=>{
        const requests = model.relevantTerminateRequest(Requests, votes)
        expect(requests.length).toBe(1)
    })
})
