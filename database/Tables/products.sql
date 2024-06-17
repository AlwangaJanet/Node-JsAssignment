USE Assignment1;

CREATE TABLE  products(
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price  INT NOT NULL,
    category_id VARCHAR(255) FOREIGN KEY REFERENCES categories(Id)
)
GO