/* eslint-env jest */
const modules = require('../models/voteValidation')
const request = require('supertest')
const express = require('express')
const app = express()
const voteManager = require('../controllers/voteManager')
const votesRepository = require('../db/voting')

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


jest.mock('../db/voting/')
beforeEach(() => {
    votesRepository.mockClear();
});

describe ('vote repository', () => {
 test('test that voteManager does not the call the voteRepository constructor ',  () => {
     const manager = new voteManager(votesRepository)
     manager.joinRequests.bind(manager)
     expect(votesRepository).toHaveBeenCalledTimes(0)
    // expect(_mockgetVoterGroup).toHaveBeenCalledWith(votee)
 })
})



  
