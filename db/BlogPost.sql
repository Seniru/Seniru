CREATE TABLE BlogPost (
	id SERIAL PRIMARY KEY,
	title VARCHAR(250) NOT NULL,
	content VARCHAR(5000) NOT NULL,
	publishedDate DATE NOT NULL,
	lastEdittedDate DATE
);
