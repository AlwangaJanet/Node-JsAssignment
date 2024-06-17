USE Assignment1;
GO
CREATE OR ALTER PROCEDURE updateProduct(
    @id VARCHAR(255),
    @name VARCHAR(255),
    @price INT
)
AS
BEGIN
UPDATE products SET name=@name, price=@price
WHERE id=@id
END
GO