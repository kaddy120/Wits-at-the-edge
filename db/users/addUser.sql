INSERT INTO [dbo].[User] ( email, firstName, surname, school, thumbnail, passwordHash, yearOfStudy )
VALUES ( @email , @firstName , @surname , @school , @thumbnail , @passwordHash , @yearOfStudy );

SELECT * FROM [dbo].[User] WHERE email = @email;