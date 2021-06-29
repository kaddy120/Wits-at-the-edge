delete
from [UserGroup] where userId=@email and groupId=@groupId

DELETE
from [termination_votes] where terminationId=@requestId

DELETE
from [termination] where requestId=@request