INSERT INTO [dbo].[LinkTopic](groupId, topic, userId, timeCreated) 
OUTPUT Inserted.topicId
VALUES (@groupId, @topic, @userId, @timeCreated)
