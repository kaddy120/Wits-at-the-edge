delete
from [UserGroup] where userId=@email and groupId=@groupId

DELETE
from [termination_votes] where requestId=@requestId

DELETE
from [termination] where  terminationId=@requestId