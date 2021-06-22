INSERT INTO [dbo].[termination] (email, terminationReason, time_Stamp)
VALUES (@email, @reason, DATEADD(HOUR,+2, GETDATE()))