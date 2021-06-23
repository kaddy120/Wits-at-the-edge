select * from dbo.[Group] where 
-- YSO = @YSO and 
-- school = @school 
-- AND
groupId not in (
select groupId from UserGroup where userId = @userId)