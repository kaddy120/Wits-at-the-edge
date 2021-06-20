INSERT INTO [dbo].[userTracking] (activityTime
      ,userId
      ,activity) VALUES (getdate(),@userId,@response)