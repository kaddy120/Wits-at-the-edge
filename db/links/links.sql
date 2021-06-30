select GroupTopic.topicId, timePosted, linkId, linkURL, title, topic from dbo.[Links] right join (select topicId, topic from dbo.[LinkTopic] where groupId = 2) as GroupTopic
on groupTopic.topicId = dbo.[Links].topicId 
ORDER BY GroupTopic.topicId , timePosted ;