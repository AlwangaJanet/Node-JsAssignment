Use Assignment1
GO
CREATE OR ALTER PROCEDURE addUser(
@Id VARCHAR (255),
@username VARCHAR (255),
@email VARCHAR (255),
@password VARCHAR (255)
)
AS
BEGIN
INSERT INTO users (Id,username,password,email)
VALUES (@Id, @username,@password,@email)
END