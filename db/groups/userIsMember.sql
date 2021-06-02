SELECT 
    CASE WHEN EXISTS(SELECT 1 FROM [dbo].[UserGroup] WHERE userId = @userId and groupId = @groupId)
       THEN 1 
       ELSE 0 
    END AS DoesUserExist