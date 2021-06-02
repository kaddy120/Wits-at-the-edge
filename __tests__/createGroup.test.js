/* eslint-env jest */
const GroupCreater = require('../models/creater')
const verify = require('../models/verification')
const Users = require('../models/user')
const userTable = []
const user1 = new Users('kad@gmail.com', 'Lebo', 'Hello', 'King', 'first year')
const user2 = new Users('kadt@gmail.com', 'Lebog', 'Hello', 'Kingk', 'first year')
const user3 = new Users('leb@gmail.com', 'Lebio', 'Hellko', 'Kikng', 'first year')
const user4 = new Users('lop@gmail.com', 'Lebpo', 'Hel', 'Kingkop', 'first year')
const user5 = new Users('liop@gmail.com', 'Lebmo', 'Hello', 'Kinglap', 'first year')
const groups = []
userTable.push(user1)
userTable.push(user2)
userTable.push(user3)
userTable.push(user4)
userTable.push(user5)

const getLength = function (user) {
  return user.length
}
describe('Authenticated and unauthenticated person', () => {
  test('An authenticated person can create a group', async () => {
    const creater = new GroupCreater('Kingdom', 'leb@gmail.com', 'EIE', 'Hello')
    const length = groups.length
    if (verify.userFound(userTable, creater.email)) {
      groups.push(creater)
    }
    expect(getLength(groups)).toBe(length + 1)
  })

  test('An unathenticated person cannot create a group', async () => {
    const creater = new GroupCreater('Kingdom', 'le@gmail.com', 'EIE', 'Hello')
    const length = groups.length
    if (verify.userFound(userTable, creater.email)) {
      groups.push(creater)
    }
    expect(getLength(groups)).toBe(length)
  })
})

describe('Creating groups', () => {
  groups.splice(0, groups.length)
  let length = groups.length
  test('a person cannot create more than 10 groups', () => {
    const creater = new GroupCreater('Kingdom', 'leb@gmail.com', 'EIE', 'Hello')
    for (let i = 0; i < 10; i++) {
      groups.push(creater)
    }
    length = groups.length
    const NumberofGroups = groups.filter((element) => {
      return element.email === creater.email
    })
    if (verify.canCreateGroup(NumberofGroups)) {
      groups.push(creater)
    }

    expect(getLength(groups)).toBe(length)
  })

  test('a person can create less than 10 groups', () => {
    const creater = new GroupCreater('Kingdom', 'kad@gmail.com', 'EIE', 'Hello')
    for (let i = 0; i < 5; i++) {
      groups.push(creater)
    }
    length = groups.length
    const numberOfGroups = groups.filter((element) => {
      return element.email === creater.email
    })
    if (verify.canCreateGroup(numberOfGroups)) {
      groups.push(creater)
    }
    expect(getLength(groups)).toBe(length + 1)
  })
})
