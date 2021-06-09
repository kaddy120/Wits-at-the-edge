
const mockgetVoterGroup = jest.fn();
const mock = jest.fn().mockImplementation(() => {
  return {getVoterGroup: mockgetVoterGroup};
});

mock.mockgetVoterGroup = mockgetVoterGroup
module.exports = mock;