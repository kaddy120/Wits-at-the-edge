INSERT INTO [dbo].[Links](title, linkURL, topicId, timePosted, userId, groupId)
OUTPUT Inserted.linkId
VALUES(@title, @linkURL, @topicId, @timePosted, @userId, @groupId)
