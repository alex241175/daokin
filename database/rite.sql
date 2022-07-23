CREATE TABLE IF NOT EXISTS `rites`(
  `id`varchar(10) NOT NULL PRIMARY KEY,
  `temple_id` varchar(10) NOT NULL,
  `year_e` varchar(5) NOT NULL COMMENT '公元',
  `year_c` varchar(5) NOT NULL COMMENT '歲次',
  `month_c` varchar(5) NOT NULL COMMENT '月',
  `day_c` varchar(5) NOT NULL COMMENT '日',
  `hour_c` varchar(5) NOT NULL COMMENT '時',
  `date_e` date NOT NULL COMMENT '陽曆日期',
  `master` varchar(50) NOT NULL COMMENT '點傳師',
  `guarantor` varchar(50) NOT NULL COMMENT '保師',
  `upline` varchar(50) NOT NULL COMMENT '上禮',
  `downline` varchar(50) NOT NULL COMMENT '下禮',
  `three_treasure` varchar(50) NOT NULL COMMENT '三寶',
  `introduction` varchar(50) NOT NULL COMMENT '前言',
  `total` int(5) COMMENT '點數',
  `address_c` varchar(50) NOT NULL COMMENT '表文地址'
   FOREIGN KEY (temple_id) REFERENCES temples(id)
  );


-- id format  [2001MDA01] first 4 - 農曆年份, next 3 - temple id, last 2 - sequence