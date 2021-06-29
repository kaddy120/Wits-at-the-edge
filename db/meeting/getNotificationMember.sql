 select * from [dbo].[sessionNotifications] right join 
  (select * from [dbo].[GroupMeeting] where userId=@userId and address is not null ) as table2
    on  sessionNotifications.meetingId =table2.meetingId 
	where sessionNotifications.response = 1 and sessionNotifications.meetingId = @meetingId