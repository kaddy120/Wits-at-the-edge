select groupName, [Group].groupId, thumbnail, adminId, school, YOS, userId
from [Group]
inner join UserGroup on [Group].groupId=UserGroup.groupId
where userId = @user