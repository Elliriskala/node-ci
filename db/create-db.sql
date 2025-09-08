DROP DATABASE IF EXISTS cicdtest;
CREATE DATABASE cicdtest;
CREATE USER 'myusername'@'localhost' IDENTIFIED BY 'mypassword';
GRANT ALL PRIVILEGES ON `cicdtest`.* TO 'myusername'@'localhost';
FLUSH PRIVILEGES;

USE cicdtest;

CREATE TABLE `students` (
  `student_id` int(11) NOT NULL,
  `student_name` text NOT NULL,
  `filename` text NOT NULL,
  `birthdate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

ALTER TABLE `students`
  ADD PRIMARY KEY (`student_id`);
  
ALTER TABLE `students`
  MODIFY `student_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;