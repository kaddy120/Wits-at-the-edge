/* eslint-env jest */
const modules = require('../models/voteValidation')
const request = require('supertest')
const express = require('express')
const app = require('../app')
const voteManager = require('../controllers/voteManager')
const votesRepository = require('../db/voting')
const vote = require('../db/voting/user.json')



const voters =
[
    {
        email: "kad@gmail.com",
        voteCount: 1,
        group: 2
    },
    {
        email: "kaddy@gmail.com",
        voteCount:1,
        group: 1
    },
    {
        email: "kaddy120@gmail.com",
        voteCount: 1,
        group: 2
    },
    {
        email: "kaddy122@gmail.com",
        voteCount: -1,
        group: 3
    }
]

const requester = {
    groupRequested: 3,
    email: "roch@gmail.com"
}

test('Users can only vote if they belong to the requested group', () => {
    const validate = modules.relevantRequest(voters[0].group, requester.groupRequested)
    expect(validate).toBe(0)
})

test('If more than 49% are in favour, the user can join', () => {
    const validate = modules.countVotes(voters, voters.length)
    expect(validate).toBe(true)
})

describe ('HTTP Response', () => {
    test('should respond with a 302 status code if the user is not logged in', async (done) => {
        const response = await request(app).get('/join_requests')
        expect(response.status).toBe(302)
        done()
    })
    
    test('HTTP content length should be 28', async (done) => {
        const response = await request(app).get('/join_requests')
        expect(response.headers['content-length']).toBe("28")
        done()
    })
    
    test('HTTP content length should be 28', async () => {
        const response = await request(app).post(`/vote/:requestId/:userId/voteChoice/:choice`).send({
            requestId: "kaddy",
            voteChoice: 1
        })
        expect(response.headers['content-length']).toEqual("28")
    })
})


jest.mock('../db/voting')
beforeEach(() => {
    votesRepository.mockClear();
});

describe ('vote repository', () => {
 test('test that voteManager does not the call the voteRepository constructor ',  () => {
     const manager = new voteManager(votesRepository)
     manager.joinRequests.bind(manager)
     expect(votesRepository).toHaveBeenCalledTimes(0)
 })
})



  
