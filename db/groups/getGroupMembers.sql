select [User].firstName, [User].surname, [User].email
from [User]
inner join UserGroup  on [User].email = [UserGroup].userId and [User].email != @email
where [UserGroup].groupId=@groupId