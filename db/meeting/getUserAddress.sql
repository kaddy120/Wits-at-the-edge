select * from dbo.meetingTracking inner join
  (select * from [dbo].[UserAddress] where email =@userId) as table2
  on meetingTracking.userId = table2.email 