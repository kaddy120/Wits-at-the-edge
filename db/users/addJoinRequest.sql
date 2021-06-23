INSERT INTO [join_request] (groupId, email, time_Stamp)
VALUES (@groupId, @email,DATEADD(HOUR,+2, GETDATE()))