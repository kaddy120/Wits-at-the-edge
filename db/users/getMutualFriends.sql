select  TOP(6) * from MutualFriends where userId1 = @userId or userId2 = @userId
order by relationship 