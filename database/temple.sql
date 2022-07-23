CREATE TABLE IF NOT EXISTS `temples`(
  `id`varchar(5) NOT NULL PRIMARY KEY,
  `name`varchar(50) NOT NULL COMMENT '佛壇號',
  `host`varchar(50) NOT NULL COMMENT '壇主姓名',
  `school`varchar(50) COMMENT '生命體',
  `address_c` JSON COMMENT '表文地址'
  );

-- id format 戴氏 [MDA] first - Malaysia, second - host surname,  third- sequence