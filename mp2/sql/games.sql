CREATE SCHEMA IF NOT EXISTS `games`;
use `games`;
CREATE TABLE IF NOT EXISTS `games`.`User`
(
    `id` INT NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(45) NOT NULL,
    `firstname` VARCHAR(45) NOT NULL,
    `lastname` VARCHAR(45) NOT NULL,
    `phonenumber` VARCHAR(45) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `user_id_UNIQUE` (`id` ASC)
) ENGINE=InnoDB CHARSET=utf8 COLLATE utf8_unicode_ci;

CREATE TABLE IF NOT EXISTS `games`.`Game`
(
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NOT NULL,
    `description` VARCHAR(45) NOT NULL,
    `release_date` DATE NOT NULL,
    `length` INT NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `game_id_UNIQUE` (`id` ASC)
) ENGINE = InnoDB CHARSET=utf8 COLLATE utf8_unicode_ci;

CREATE TABLE IF NOT EXISTS `games_user`
(
    `id` INT NOT NULL AUTO_INCREMENT,
    `user_id` INT NOT NULL,
    `game_id` INT NOT NULL,
    `game_count` INT NOT NULL,
    `to_when` DATE NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `games_user_id_UNIQUE` (`id` ASC),
    CONSTRAINT `user_fk` FOREIGN KEY (`user_id`) REFERENCES `games`. `User` (`id`),
	CONSTRAINT `game_fk` FOREIGN KEY (`game_id`) REFERENCES `games`. `Game` (`id`)
) ENGINE=InnoDB CHARSET=utf8 COLLATE utf8_unicode_ci;

drop table games_user;

INSERT IGNORE INTO `games`.`User` (`id`, `email`, `firstname`, `lastname`, `phonenumber`) VALUES
(1, 'jan.kowalski@pjwstk.edu.pl', 'Jan', 'Kowalski', '123456789'),
(2, 'anna.kowalska@pjwstk.edu.pl', 'Anna', 'Kowalska', '987654321'),
(3, 'apietruszka@pjwstk.edu.pl', 'Andrzej', 'Pietruszka', '145234678'),
(4, 'j.zakowska01@pjwstk.edu.pl', 'Jadwiga', 'Zakowska', '876453231');

INSERT IGNORE INTO `games`.`Game` (`id`, `name`, `description`, `release_date`, `length`) VALUES
(1, 'Wiedźmin 3 dziki gon', 'Gra action RPG, stanowiąca trzecią część przygód Geralta z Rivii. Podobnie jak we wcześniejszych odsłonach cyklu, Wiedźmin 3: Dziki Gon bazuje na motywach twórczości literackiej Andrzeja Sapkowskiego, jednak nie jest bezpośrednią adaptacją żadnej z jego książek.', '2015-05-18', 100),
(2, 'Grand theft auto v', 'GTA 5 to piąta pełnoprawna odsłona niezwykle popularnej serii gier akcji, nad której rozwojem pieczę sprawuje studio Rockstar North we współpracy z koncernem Take Two Interactive. Miejscem akcji Grand Theft Auto V jest fikcyjne miasto Los Santos wzorowane na Los Angeles.', '2013-09-13', 50),
(3, 'Horizon zero dawn', 'Trzecioosobowa gra akcji z elementami RPG od Guerrilla Games. Akcja Horizon: Zero Dawn toczy się w odległej przyszłości, w której dominującą rolę w ekosystemie pełnią inteligentne, przypominające zwierzęta maszyny', '2017-02-28', 50),
(4, 'Uncharted 4: Kres Złodzieja', 'Bohaterem Uncharted 4 studia Naughty Dog jest sympatyczny awanturnik i poszukiwacz przygód Nathan Drake – spadkobierca Indiany Jonesa i męska alternatywa dla legendarnej Lary Croft.', '2016-05-16', 40);

INSERT IGNORE INTO `games`.`games_user` (`id`, `user_id`, `game_id`, `game_count`, `to_when`) VALUES
(1, 1, 1, 1, '2021-12-15'),
(2, 1, 2, 2, '2022-01-10'),
(3, 1, 3, 2, '2022-01-02'),
(4, 1, 4, 4, '2021-12-08'),
(5, 2, 1, 1, '2022-02-04'),
(6, 2, 2, 3, '2021-12-13'),
(7, 2, 3, 2, '2022-05-05'),
(8, 2, 4, 1, '2022-04-08'),
(9, 3, 1, 4, '2021-12-20'),
(10, 3, 2, 1, '2022-01-18'),
(11, 3, 3, 3, '2022-02-14'),
(12, 3, 4, 2, '202-03-22'),
(13, 4, 1, 1, '2022-02-01'),
(14, 4, 2, 1, '2022-04-04'),
(15, 4, 3, 3, '2022-06-07'),
(16, 4, 4, 5, '2022-01-12');