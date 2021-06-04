/* eslint-env jest */
const modulesForTest = require('../models/addARequest')

const users = {

  userOne: {
    email: 'kaddy1248@gmail.com',
    groupId: 5
  },

  userTwo: {
    email: 'kaddy122@gmail.com',
    groupId: 6
  },
  userThree:
  {
    email: 'kad@gmail.com',
    groupId: 7
  }
}

test('A Group Join Request Is Added To The Database', () => {
  const test = modulesForTest.addARequest(users.userOne)
  expect(test).toBe(true)
})
/* Under routes fix bug in joinGroup
 Or under modules in addARequest */

/* Dont run test till bug fixed */
