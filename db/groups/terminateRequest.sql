INSERT INTO [dbo].[termination] (memberToBeTerminated, terminatingMember, terminationReason, time_Stamp)
VALUES (@email, @userId, @reason, DATEADD(HOUR,+2, GETDATE()))