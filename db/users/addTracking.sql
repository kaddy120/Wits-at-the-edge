INSERT INTO [dbo].[userTracking] (activityTime
      ,userId
      ,activity,groupId) VALUES (getdate(),@userId,@response,@groupId)