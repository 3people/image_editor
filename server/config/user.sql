/* 
1. install & run mysql
2. insert code
*/

CREATE DATABASE IF NOT EXISTS db;

USE db;
CREATE TABLE IF NOT EXISTS USERS (
  idx INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  userid VARCHAR(32) NOT NULL UNIQUE,
  password VARCHAR(88) NOT NULL,
  salt VARCHAR(88) NOT NULL,
  question INT NOT NULL,
  answer VARCHAR(255) NOT NULL,
  project INT NOT NULL DEFAULT 0,
  size INT NOT NULL DEFAULT 0,
  create_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  modify_date TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  login_date TIMESTAMP,
  ip INT UNSIGNED DEFAULT NULL
)

CREATE TABLE IF NOT EXISTS PROJECTS (
  idx INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(32) NOT NULL,
  useridx INT NOT NULL,
  project_data JSON NOT NULL,
  create_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  modify_date TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY(useridx) REFERENCES USERS(idx) 
);


ALTER TABLE PROJECTS DROP FOREIGN KEY projects_ibfk_1;
ALTER TABLE PROJECTS ADD CONSTRAINT projects_ibfk_1 FOREIGN KEY (useridx) REFERENCES USERS(idx) ON DELETE CASCADE ON UPDATE CASCADE;