INSERT INTO [dbo].[groupMeeting] ( groupId, meetingTime, agenda, userId,address )
VALUES ( @groupId, @meetingTime, @agenda, @userId,@address);

SELECT [meetingId] FROM [dbo].[groupMeeting] WHERE groupId=@groupId and meetingTime=@meetingTime and agenda= @agenda and userId=@userId;
