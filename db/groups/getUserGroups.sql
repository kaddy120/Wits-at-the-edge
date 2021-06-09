select [Group].groupName
from [Group]
inner join UserGroup on [Group].groupId=UserGroup.groupId
where userId = @user