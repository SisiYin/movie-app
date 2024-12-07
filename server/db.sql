
drop table if exists account;

create table account(
id serial primary key,
username varchar(20),
email varchar(50) unique not null,
password varchar(255) not null);

ALTER TABLE account ADD COLUMN share_url VARCHAR(255) UNIQUE;
ALTER TABLE account ADD COLUMN is_public BOOLEAN DEFAULT TRUE;



drop table if exists reviews;

CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  movie_id INTEGER NOT NULL,
  account_id INTEGER REFERENCES account(id),
  email varchar(50) unique not null,
  comment TEXT NOT NULL,
  rating DECIMAL(2, 1),
  time TIMESTAMP NOT NULL
);

CREATE TABLE favorites (
  id SERIAL PRIMARY KEY,
  account_id INTEGER REFERENCES account(id) ON DELETE CASCADE,
  movie_id INTEGER NOT NULL,
  UNIQUE(account_id, movie_id)
);

CREATE TABLE groups (
  id SERIAL PRIMARY KEY,             
  name VARCHAR(50) NOT NULL UNIQUE,  
  owner_id INTEGER REFERENCES account(id) ON DELETE CASCADE, 
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);

CREATE TABLE groupmembers (
  id SERIAL PRIMARY KEY,
  group_id INTEGER REFERENCES groups(id) ON DELETE CASCADE, 
  account_id INTEGER REFERENCES account(id) ON DELETE CASCADE, 
  is_owner BOOLEAN DEFAULT FALSE, 
  is_approved BOOLEAN DEFAULT FALSE, 
  UNIQUE(group_id, account_id) 
);
