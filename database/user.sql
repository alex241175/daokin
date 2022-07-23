CREATE TABLE IF NOT EXISTS `users`(
  `id`int(3) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name`varchar(256)NOT NULL,
  `password`varchar(50) NOT NULL,
  `role`varchar(255)NOT NULL
  );

INSERT INTO `user`(`id`, `name`, `password`, `role`)VALUES 
(1, 'alex', '1234', 'admin'),
(2, 'chee yi', '1234', 'user');