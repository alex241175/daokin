CREATE TABLE IF NOT EXISTS `daokins`(
  `id`varchar(10) NOT NULL PRIMARY KEY,
  `rite_id` varchar(10) NOT NULL,
  `name` varchar(50) NOT NULL COMMENT '姓名',
  `gender` varchar(5) NOT NULL COMMENT '性別',
  `age` varchar(50) NOT NULL COMMENT '年齡',
  `occupation` varchar(50) NOT NULL COMMENT '職業',
  `religion` varchar(50) NOT NULL COMMENT '宗教',
  `introducer` varchar(50) NOT NULL COMMENT '引師',
  `mentor` varchar(50) NOT NULL COMMENT '輔導員',
  `contact` varchar(200) NOT NULL COMMENT '聯絡',
  `remark` varchar(200) NOT NULL COMMENT '備註',
  `temple_id` varchar(10) NOT NULL COMMENT '學習佛壇',
   FOREIGN KEY (rite_id) REFERENCES rites(id)
  );


-- id format  [2001MDA001] first 4 - 農曆年份, next 3 - temple id, last 3 - sequence