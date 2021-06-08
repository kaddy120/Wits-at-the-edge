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
    userId VARCHAR(50) references dbo.[User](email)
);

CREATE TABLE [dbo].[sessions](
    [sid] [nvarchar](255) NOT NULL PRIMARY KEY,
    [session] [nvarchar](max) NOT NULL,
    [expires] [datetime] NOT NULL
)