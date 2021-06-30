select [dbo].[Group].groupId, groupName, userId, thumbnail, email from [dbo].[Group] left join 
(select * from [dbo].[UserGroup] where userId = @userId) as Table1 
on
[dbo].[Group].groupId = Table1.groupId
left join (select * from [dbo].[join_request] where email = @userId ) as table3
	on table3.groupId = [dbo].[Group].groupId
WHERE [dbo].[Group].groupName LIKE @like_ as tableFinal 
-- ORDER BY groupId OFFSET @offeset_ ROWS FETCH NEXT @number ROWS ONLY 