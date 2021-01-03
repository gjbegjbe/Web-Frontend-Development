set names utf8mb4;
drop table if exists `user`;
create table `user`
(
    id    int(20) not null auto_increment,
    phone varchar(255) not null unique,
    password varchar(255) NOT NULL,
    username varchar(255) NOT NULL,
    salt varchar(255) not NULL,
    primary key (id)
);