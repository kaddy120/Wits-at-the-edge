    SELECT 
    CASE WHEN EXISTS(SELECT 1 FROM [dbo].[User] WHERE email = @userId)
       THEN 1 
       ELSE 0 
    END AS DoesUserExist