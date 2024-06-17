USE Assignment1;
GO
CREATE OR ALTER PROCEDURE addCategory (
@Id VARCHAR(255),
@Name VARCHAR(255))

AS 
BEGIN 
INSERT INTO categories(Id, Name)
VALUES (@Id, @Name)
END