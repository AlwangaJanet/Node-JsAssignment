USE Assignment1;

GO
CREATE OR ALTER PROCEDURE addProduct (
    @id VARCHAR(255),
    @name VARCHAR(255),
    @price INT,
    @category_id VARCHAR(255)
)

AS 
BEGIN 
INSERT INTO products(id,name,price,category_id)
VALUES (@id, @name,@price,@category_id)
END