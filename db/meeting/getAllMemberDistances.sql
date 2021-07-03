select * from [dbo].[User]  inner join 
  (
  select * from [dbo].[meetingTracking]  ) as table2
  on table2.userId= [dbo].[User].email
   