```sql
USE recipe_db;

CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    UNIQUE INDEX `users_username_key`(`username`),
    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `roles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` ENUM('USER', 'ADMIN') NOT NULL,
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `user_profiles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `role_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    UNIQUE INDEX `user_profiles_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `posts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `recipes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `recipe_id` VARCHAR(255) UNIQUE,
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

ALTER TABLE `likes`
DROP FOREIGN KEY `likes_post_id_fkey`;

DROP TABLE `posts`;

ALTER TABLE posts
ADD COLUMN post_id VARCHAR(255) UNIQUE;

CREATE TABLE `likes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `recipe_id` VARCHAR(255),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

ALTER TABLE `likes`
ADD CONSTRAINT unique_user_recipe UNIQUE (user_id, recipe_id);

ALTER TABLE `user_profiles`
ADD CONSTRAINT `user_profiles_user_id_fkey`
FOREIGN KEY (`user_id`) REFERENCES `users`(`id`)
ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE `user_profiles`
ADD CONSTRAINT `user_profiles_role_id_fkey`
FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`)
ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE `posts`
ADD CONSTRAINT `posts_user_id_fkey`
FOREIGN KEY (`user_id`) REFERENCES `users`(`id`)
ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE `likes`
ADD CONSTRAINT `likes_user_id_fkey`
FOREIGN KEY (`user_id`) REFERENCES `users`(`id`)
ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE `likes`
ADD CONSTRAINT `likes_post_id_fkey`
FOREIGN KEY (`post_id`) REFERENCES `posts`(`id`)
ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE `roles`
ADD CONSTRAINT `roles_name_unique` UNIQUE (`name`);

INSERT INTO `roles` (`name`) VALUES
('USER'),
('ADMIN');

ALTER TABLE `users`
ADD COLUMN `password` VARCHAR(255) NOT NULL;

DELIMITER $$

CREATE PROCEDURE create_user_with_role (
  IN p_username VARCHAR(191),
  IN p_email VARCHAR(191),
  IN p_password VARCHAR(255),
  IN p_role_id INT
)
BEGIN
  DECLARE new_user_id INT;

  START TRANSACTION;

  INSERT INTO users (username, email, password)
  VALUES (p_username, p_email, p_password);

  SET new_user_id = LAST_INSERT_ID();

  INSERT INTO user_profiles (user_id, role_id)
  VALUES (new_user_id, p_role_id);

  COMMIT;
END $$

DELIMITER ;

CALL create_user_with_role('isabella', 'isabella@test.com', 'password123', 1);

DROP PROCEDURE IF EXISTS delete_user;

DELIMITER $$

CREATE PROCEDURE delete_user (
  IN p_user_id INT
)
BEGIN
  DECLARE EXIT HANDLER FOR SQLEXCEPTION
  BEGIN
    ROLLBACK;
    SELECT 0 AS success;
  END;

  START TRANSACTION;

    DELETE FROM `likes` WHERE `user_id` = p_user_id;

    DELETE l FROM `likes` l
    JOIN `posts` p ON l.post_id = p.id
    WHERE p.user_id = p_user_id;

    DELETE FROM `posts` WHERE `user_id` = p_user_id;

    DELETE FROM `user_profiles` WHERE `user_id` = p_user_id;

    DELETE FROM `users` WHERE `id` = p_user_id;

    SELECT ROW_COUNT() > 0 AS success;

  COMMIT;
END $$

DELIMITER ;

SELECT
  u.*,
  r.name AS role
FROM users u
JOIN user_profiles up ON up.user_id = u.id
JOIN roles r ON r.id = up.role_id
WHERE u.email = 'isabella@test.com'
LIMIT 1;

DROP TABLE `likes`;

INSERT INTO `likes` (`user_id`, `recipe_id`) VALUES
(6, '69ca62eefc4568da855d92fd'),
(6, '69ca62fdfc4568da855d9304'),
(6, '69ca6308fc4568da855d930b'),
(6, '69ca6554fc4568da855d9332');

TRUNCATE TABLE `recipes`;

INSERT INTO likes (user_id, recipe_id)
VALUES
  (6, '69cab4cd7663b023a8cc949f'),
  (6, '69cab4d77663b023a8cc94a6'),
  (6, '69cab4e07663b023a8cc94ad');
```
