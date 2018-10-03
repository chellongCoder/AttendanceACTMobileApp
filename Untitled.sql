#use contacts_db

#select * from contacts

#select * from category

-- select * from customers

-- CREATE DATABASE JAVA_WEB_02;

-- USE JAVA_WEB_02


-- CREATE TABLE SINHVIEN(
-- 	id int UNSIGNED  AUTO_INCREMENT,
-- 	studentId char(10) not null,
--     nameStudent varchar(50) not null,
--     email char(20) not null,
--     numberPhone char(11),
--     constraint PK_SINHVIEN primary key(studentId),
--     KEY (id)  
-- )

-- select * from SINHVIEN

-- use JAVA_WEB_02

-- DROP TABLE BAIHOC

-- DROP TABLE DIEMDANH

-- DROP TABLE SINHVIEN

-- CREATE TABLE STUDENT (
-- 	studentId char(20) not null primary key,
-- 	firstName varchar(20),
--     lastName varchar(20),
--     email char(20),
--     numberPhone char(20),
--     avatarUrl text,
--     courseId char(20)
-- )

use JAVA_WEB_02;

-- CREATE TABLE KHOAHOC (
-- 	courseid char(20) not null primary key,
-- 	courseName varchar(50),
-- 	duration timestamp,
-- 	initDay datetime,
--     endDay datetime
-- );

-- ALTER TABLE STUDENT 
-- ADD CONSTRAINT FK_courseId 
-- FOREIGN KEY (courseId) REFERENCES COURSES(courseId)

CREATE TABLE LESSON (
	lessonId char(20) not null primary key,
    courseId char(20),
    dayLerning datetime
)




