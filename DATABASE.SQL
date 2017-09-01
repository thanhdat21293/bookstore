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

INSERT INTO category(name, parent) VALUES
('Hardware & DIY',0),
('Game Programming',0),
('Security',0),
('Marketing & SEO',0)
('Software',0),
('Programming',0),
('Web Development',0),
('Graphics & Design',0),
('Datebases',0),
('Networking & Cloud Computing',0),
('Operating Systems',0),
('Certification',0),
('Administration',0),
('Enterprise',0),
('Computers & Technology',0),
('.NET',6),
('HTML,HTML5,CSS',7),
('CMS',7),
('C #',6),
('C & C++',6),
('APS.NET',7);