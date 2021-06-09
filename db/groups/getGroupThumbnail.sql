select [Group].thumbnail
from [Group]
inner join UserGroup on [Group].groupId=UserGroup.groupId
where userId = @user