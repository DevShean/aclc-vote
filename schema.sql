-- ACLC Voting System Database Schema
-- You can import this file directly into phpMyAdmin (http://localhost/phpmyadmin) in XAMPP.

CREATE DATABASE IF NOT EXISTS aclc_vote;
USE aclc_vote;

-- Drop table if exists to ensure schema resets perfectly
DROP TABLE IF EXISTS students;

CREATE TABLE IF NOT EXISTS students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usn VARCHAR(50) UNIQUE NOT NULL,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  middle_name VARCHAR(50) DEFAULT NULL,
  course VARCHAR(100) NOT NULL,
  section VARCHAR(50) NOT NULL,
  password VARCHAR(255) DEFAULT NULL, -- NULL initially, set during registration!
  has_voted TINYINT(1) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert default mock students in the school directory
-- Since they haven't registered yet, their passwords are NULL.
-- They can search for their USN, view their info, and set a password to register!
INSERT INTO students (usn, first_name, last_name, middle_name, course, section, password, has_voted) VALUES
('2023-00001', 'Juan', 'Dela Cruz', 'Perez', 'BSCS', 'CS3A', NULL, 0),
('2023-00002', 'Maria', 'Santos', 'Reyes', 'BSIT', 'IT2B', NULL, 0),
('2023-00003', 'John', 'Doe', 'Smith', 'BSBA', 'BA4C', NULL, 0);
