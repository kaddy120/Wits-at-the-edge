SELECT COUNT(requestId)   as numOfPeopleVoted
FROM group_votes
WHERE requestId=@request_id