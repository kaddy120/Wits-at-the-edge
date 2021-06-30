INSERT INTO [dbo].[join_request] ( email,groupId, time_Stamp)
VALUES (@email,@groupId, DATEADD(HOUR,+2, GETDATE()))