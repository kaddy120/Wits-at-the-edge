DELETE FROM [dbo].[group_votes]
WHERE requestId=@requestId

DELETE FROM [dbo].[join_request]
WHERE requestId=@requestId