DROP TABLE IF EXISTS [UserGroup]
DROP TABLE IF EXISTS [Group]
DROP TABLE IF EXISTS [User]


CREATE TABLE dbo.[User]
(
    email VARCHAR(50) PRIMARY KEY,
    firstName VARCHAR(50) NOT NULL,
    surname VARCHAR(50) NOT NULL,
    school VARCHAR(50) NOT NULL,
    thumbnail VARCHAR(MAX) NULL,
    passwordHash VARCHAR(MAX) NOT NULL,
    yearOfStudy CHAR(10) NOT NULL
);

INSERT INTO dbo.[User](email, firstName, surname, school, thumbnail, passwordHash, yearOfStudy)
VALUES ('kaddy120@gmail.com','kaddy', 'marindi', 'school of EIE', NULL, 'password', 'year 1'),
       ('test@gmail.com','masindi', 'ramushaba', 'school of EIE', NULL, 'password1', 'year 1');

CREATE TABLE dbo.[Group]
(
    groupId int IDENTITY(1,1) PRIMARY KEY CLUSTERED NOT NULL,
    groupName VARCHAR(50) NOT NULL,
    thumbnail VARCHAR(MAX) NULL,
	adminId VARCHAR(50) references dbo.[User](email),
	school VARCHAR(50) NOT NULL,
    INDEX idx_group_groupId (groupId)
);

CREATE TABLE dbo.UserGroup
(
    -- userId VARCHAR(50) references dbo.[User](email),
	-- groupId int references dbo.[Group](groupId),
    userId VARCHAR(50) references dbo.[User](email) NOT NULL,
	groupId int NOT NULL,
    PRIMARY KEY CLUSTERED ([groupId], [userId])
);

CREATE TABLE dbo.GroupMeeting
(
    meetingId int IDENTITY(1,1) PRIMARY KEY CLUSTERED NOT NULL,
	groupId int NOT NULL,
    meetingTime datetime NOT NULL, 
    agenda VARCHAR(300) NOT NULL,
    userId VARCHAR(50) references dbo.[User](email),
    address VARCHAR(250) NULL
);
CREATE TABLE dbo.[sessionNotifications](
    [notificationId] int IDENTITY(1,1) PRIMARY KEY CLUSTERED NOT NULL,
    [meetingId] [int] REFERENCES dbo.[GroupMeeting](meetingId),
    [userId] VARCHAR(250) NOT NULL,
    [response] [int]  NULL
)
CREATE TABLE dbo.[userTracking](
    [trackingId] int IDENTITY(1,1) PRIMARY KEY CLUSTERED NOT NULL,
    activityTime datetime NOT NULL,
    [userId] VARCHAR(250) NOT NULL,    
    activity VARCHAR(300) NOT NULL
)

CREATE TABLE dbo.[meetingTracking](
    [trackingId] int IDENTITY(1,1) PRIMARY KEY CLUSTERED NOT NULL,
    userId VARCHAR(250) NOT NULL,
    meetingId int not NULL,
    finishTime datetime NULL,  
    distance real NULL
)
-- modify database column
ALTER TABLE dbo.[Group] ADD YOS VARCHAR(60) NULL;

DROP TABLE IF EXISTS [Links]

CREATE Table dbo.LinkTopic(
    topicId int IDENTITY(1,1) PRIMARY KEY CLUSTERED NOT NULL,
    topic VARCHAR(100) NOT NULL,
    timeCreated datetime NOT NULL,
    groupId int references dbo.[Group](groupId),
    userId VARCHAR(50) references dbo.[User](email)
)

CREATE TABLE dbo.Links
(
    linksId int IDENTITY(1,1) PRIMARY KEY CLUSTERED NOT NULL,
    timePosted datetime NOT NULL, 
    userId VARCHAR(50) references dbo.[User](email),
    groupId int references dbo.[Group](groupId),
    topicId int references dbo.[LinkTopic](topicId),
    title VARCHAR(100) NOT NULL,
    linkURL VARCHAR(300) NOT NULL,

);
