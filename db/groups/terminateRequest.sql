INSERT INTO [dbo].[termination] (groupId, memberToBeTerminated, terminatingMember, terminationReason, time_Stamp)
VALUES (@groupId, @email, @userId, @reason, DATEADD(HOUR,+2, GETDATE()))