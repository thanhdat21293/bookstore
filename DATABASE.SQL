﻿CREATE TABLE category(
	id serial PRIMARY KEY,
    name varchar(100),
    parent int
)

﻿CREATE TABLE public.bookstore(
	id serial PRIMARY KEY,
    author varchar(100),
    id_category int,
    isnb varchar(50),
    description text,
    link_dowload varchar(255),
    file_format varchar(20),
    file_size varchar(20),
    images varchar(255),
    language varchar(50),
    name varchar(250),
    pages int,
    read_online varchar(255),
    year int,
    FOREIGN KEY (id_category) REFERENCES category (id)
);