INSERT INTO [dbo].[groupMeeting] ( groupId, meetingTime, agenda, userId )
VALUES ( @groupId, @meetingTime, @agenda, @userId );

SELECT [meetingId] FROM [dbo].[groupMeeting] WHERE groupId=@groupId and meetingTime=@meetingTime and agenda= @agenda and userId=@userId;
