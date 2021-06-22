select [User].firstName, [User].surname
from [User]
inner join UserGroup  on [User].email = [UserGroup].userId
where [UserGroup].groupId=@groupId