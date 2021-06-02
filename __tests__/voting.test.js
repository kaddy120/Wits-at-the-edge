/* eslint-env jest */
const modules = require('../models/voteValidation')
const Voters =
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

const Requester = {
    groupRequested: 3,
    email: "roch@gmail.com"
}

test('Users can only vote if they belong to the requested group', () => {
    const validate = modules.relevantRequest(Voters[0].group, Requester.groupRequested)
    expect(validate).toBe(0)
})

test('If more than 49% are in favour, the user can join', () => {
    const membersInAGroup = 4
    const validate = modules.countVotes(Voters, 4)
    expect(validate).toBe(true)
})

  
