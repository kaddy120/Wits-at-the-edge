-- select * from dbo.[Links] inner join (select topicId, topic from dbo.[LinkTopic] where groupId = @groupId) as GroupTopic
-- on groupTopic.topicId = dbo.[Links].topicId 
select * from Links
ORDER BY topicId , timePosted;

-- i just need to order them right