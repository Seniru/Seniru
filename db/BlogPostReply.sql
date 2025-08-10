CREATE TABLE BlogPostReply (
	id SERIAL NOT NULL,
    blogpostId SERIAL NOT NULL,
	nickname VARCHAR(20) NOT NULL,
	content VARCHAR(250) NOT NULL,
    PRIMARY KEY (id, blogpostId),
    FOREIGN KEY (blogpostId) REFERENCES BlogPost (id)
);
