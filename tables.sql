IF OBJECT_ID(N'[dbo].[Gestores]','U') IS NULL
CREATE TABLE Gestores(
	id INT IDENTITY(1,1),
	nombre NVARCHAR(55) NOT NULL,
	lanzamiento INT NOT NULL,
	desarrollador NVARCHAR(55) NOT NULL,
	CONSTRAINT pk_Gestores PRIMARY KEY (id)
);

INSERT INTO Gestores (nombre, lanzamiento, desarrollador) VALUES
('Microsoft SQL Server', 1989, 'Microsoft'),
('MySQL', 1995, 'MySQL AB, Sun Mycrosystems y Oracle Corporation'),
('PostgreSQL', 1996, 'PostgreSQL Global Development Group'),
('Oracle Database', 1977, 'Oracle Corporation'),
('IBM DB2', 1983, 'IBM'),
('SQLite', 2000, 'D. Richard Hipp'),
('MariaDB', 2009, 'Monty Program Ab'),
('Microsoft Access', 1992, 'Microsoft'),
('MongoDB', 2009, 'MongoDB, Inc.'),
('Redis', 2009, 'Redis Labs'),
('Amazon Aurora', 2014, 'Amazon Web Services'); 

