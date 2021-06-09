/* eslint-env jest */
const Meeting = require('../models/meetings.js')
const UserGroup = require('../models/userGroup.js')

// Meetings in the database
const meeting1 = new Meeting(1, 2, '2021-06-15 03:24:00.000', 'hgfjh', 'kaddy120@gmail.com')
const meeting2 = new Meeting(2, 2, '2021-06-17 19:43:00.000', 'gkjd', 'kaddy120@gmail.com')
const meeting3 = new Meeting(3, 2, '2021-06-17 19:43:00.000', 'gkjd', 'kaddy120@gmail.com')
const meeting4 = new Meeting(4, 2, '2021-07-02 17:49:00.000', 'dgklgkd', 'kaddy120@gmail.com')
const meeting5 = new Meeting(5, 2, '2021-06-17 17:57:00.000', 'gfc', 'kaddy120@gmail.com')

// Meetings extracted to an array from databse
const meetingTable = []
meetingTable.push(meeting1)
meetingTable.push(meeting2)
meetingTable.push(meeting3)
meetingTable.push(meeting4)
meetingTable.push(meeting5)

// Extract agendas from the table
const agenda = ['hgfjh', 'gkjd', 'gkjd', 'dgklgkd', 'gfc']

// Functions to extract the important information from Meetings
function getAgenda (meetingTable, index) { return meetingTable[index].agenda }
function getGroup (meetingTable, index) { return meetingTable[index].groupId }
function getMeetTime (meetingTable, index) { return meetingTable[index].meetingTime }

test('Correct agendas are extracted from first meeting before an email is sent', () => {
  if (meetingTable.length >= 1) { expect(getAgenda(meetingTable, meetingTable[0].meetingId - 1)).toBe(agenda[0]) }
})

test('Correct agendas are extracted from last meeting meeting before an email is sent', () => {
  if (meetingTable.length >= 1) expect(getAgenda(meetingTable, meetingTable[4].meetingId - 1)).toBe(agenda[4])
})
test('A correct group is identified in the meeting', () => {
  if (meetingTable.length >= 1) {
    expect(getGroup(meetingTable, 0)).toBe(2)
  }
})

test('A correct meeting time is obtained', () => {
  if (meetingTable.length >= 1) {
    expect(getMeetTime(meetingTable, 0)).toBe('2021-06-15 03:24:00.000')
  }
})

// Its important to identify users for a particular groupId

// User Group In the Database
const user1 = new UserGroup('clintonletsoela724c@gmail.com', 1)
const user2 = new UserGroup('kaddy1248@gmail.com', 1)
const user3 = new UserGroup('kad@gmail.com', 2)
const user4 = new UserGroup('kaddy@gmail.com', 2)
const user5 = new UserGroup('kaddy120@gmail.com', 2)
const user6 = new UserGroup('kaddy122@gmail.com', 2)
const user7 = new UserGroup('kaddy128@gmail.com', 2)
const user8 = new UserGroup('kady120@gmail.com', 2)
const user9 = new UserGroup('clintonletsoela724c@gmail.com', 3)
const user10 = new UserGroup('kad@gmail.com', 3)

const userGroups = []
userGroups.push(user1)
userGroups.push(user2)
userGroups.push(user3)
userGroups.push(user4)
userGroups.push(user5)
userGroups.push(user6)
userGroups.push(user7)
userGroups.push(user8)
userGroups.push(user9)
userGroups.push(user10)

// Get members of a particular group
function groupMembers (userGroup, groupId) {
  if (userGroup.length > 0) return userGroup.filter(element => element.groupId === groupId)
}
const members3 = groupMembers(userGroups, 3)
const members1 = groupMembers(userGroups, 1)

test('users in group 3 can be identified so that an email is sent to them', () => {
  expect(groupMembers(userGroups, 3)).toEqual(members3)
})

test('users in group 1 can be identified so that an email is sent to them', () => {
  expect(groupMembers(userGroups, 1)).toEqual(members1)
})

// Handle invalid group Id's in future
