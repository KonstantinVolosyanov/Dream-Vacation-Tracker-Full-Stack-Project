-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 26, 2023 at 08:02 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vacationsdatabase`
--
CREATE DATABASE IF NOT EXISTS `vacationsdatabase` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `vacationsdatabase`;

-- --------------------------------------------------------

--
-- Table structure for table `followers`
--

CREATE TABLE `followers` (
  `userId` int(11) NOT NULL,
  `vacationId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `followers`
--

INSERT INTO `followers` (`userId`, `vacationId`) VALUES
(2, 74),
(2, 81),
(2, 85),
(7, 74),
(7, 75),
(7, 76),
(7, 77),
(7, 78),
(7, 79),
(7, 80),
(7, 81),
(7, 82),
(7, 83),
(7, 84),
(7, 85),
(7, 86),
(7, 87),
(7, 88),
(8, 74),
(8, 75),
(8, 76),
(8, 80),
(8, 81),
(8, 83),
(8, 84),
(8, 85),
(8, 86),
(8, 88),
(10, 78),
(10, 79),
(10, 80),
(10, 81),
(10, 83),
(10, 84),
(10, 86),
(11, 76),
(11, 77),
(11, 78),
(11, 79),
(11, 83),
(11, 85),
(11, 87),
(11, 88),
(13, 74),
(13, 76),
(13, 77),
(13, 79),
(13, 82),
(13, 84),
(13, 85),
(13, 87),
(13, 88),
(14, 74),
(14, 75),
(14, 76),
(14, 79),
(14, 81),
(14, 83),
(14, 86),
(15, 75),
(15, 76),
(15, 77),
(15, 78),
(15, 85),
(15, 87),
(15, 88),
(16, 74),
(16, 78),
(16, 85),
(17, 74),
(17, 75),
(17, 76),
(17, 77),
(17, 78),
(17, 79),
(17, 80),
(17, 81),
(17, 82),
(17, 83),
(17, 84),
(17, 85),
(17, 86),
(17, 87),
(17, 88),
(19, 74),
(19, 75),
(19, 76),
(19, 80),
(19, 81),
(19, 82),
(19, 83),
(19, 87),
(19, 88),
(21, 74),
(21, 76),
(21, 78),
(21, 79),
(21, 81),
(21, 87);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `firstName` varchar(20) NOT NULL,
  `lastName` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(256) NOT NULL,
  `role` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `firstName`, `lastName`, `email`, `password`, `role`) VALUES
(1, 'Bart', 'Simpson', 'bart@gmail.com', 'dd6ff49baeb6802c954201a4216f690810451a9991247ebe7fd62556bc68218071c7e27de059fecde889215a9a5c17f30d8c87f03c339818fbaa61ca18cd756b', 'Admin'),
(2, 'Lisa', 'Simpson', 'lisa@gmail.com', 'dd6ff49baeb6802c954201a4216f690810451a9991247ebe7fd62556bc68218071c7e27de059fecde889215a9a5c17f30d8c87f03c339818fbaa61ca18cd756b', 'User'),
(7, 'Homer', 'Simpson', 'homer@gmail.com', 'dd6ff49baeb6802c954201a4216f690810451a9991247ebe7fd62556bc68218071c7e27de059fecde889215a9a5c17f30d8c87f03c339818fbaa61ca18cd756b', 'User'),
(8, 'Morty', 'Smith', 'morty@gmail.com', 'dd6ff49baeb6802c954201a4216f690810451a9991247ebe7fd62556bc68218071c7e27de059fecde889215a9a5c17f30d8c87f03c339818fbaa61ca18cd756b', 'User'),
(10, 'Rick', 'Sanchez', 'rick@gmail.com', 'dd6ff49baeb6802c954201a4216f690810451a9991247ebe7fd62556bc68218071c7e27de059fecde889215a9a5c17f30d8c87f03c339818fbaa61ca18cd756b', 'User'),
(11, 'Marge', 'Simpson', 'marge@gmail.com', 'dd6ff49baeb6802c954201a4216f690810451a9991247ebe7fd62556bc68218071c7e27de059fecde889215a9a5c17f30d8c87f03c339818fbaa61ca18cd756b', 'User'),
(13, 'Beth', 'Smith', 'beth@gmail.com', 'dd6ff49baeb6802c954201a4216f690810451a9991247ebe7fd62556bc68218071c7e27de059fecde889215a9a5c17f30d8c87f03c339818fbaa61ca18cd756b', 'User'),
(14, 'Summer', 'Smith', 'summer@gmail.com', 'dd6ff49baeb6802c954201a4216f690810451a9991247ebe7fd62556bc68218071c7e27de059fecde889215a9a5c17f30d8c87f03c339818fbaa61ca18cd756b', 'User'),
(15, 'Jerry', 'Smith', 'gotapples@gmail.com', 'dd6ff49baeb6802c954201a4216f690810451a9991247ebe7fd62556bc68218071c7e27de059fecde889215a9a5c17f30d8c87f03c339818fbaa61ca18cd756b', 'User'),
(16, 'Frodo', 'Baggins', 'frodo@gmail.com', 'dd6ff49baeb6802c954201a4216f690810451a9991247ebe7fd62556bc68218071c7e27de059fecde889215a9a5c17f30d8c87f03c339818fbaa61ca18cd756b', 'User'),
(17, 'Squanchy', 'Squanch', 'squanchy@gmail.com', 'dd6ff49baeb6802c954201a4216f690810451a9991247ebe7fd62556bc68218071c7e27de059fecde889215a9a5c17f30d8c87f03c339818fbaa61ca18cd756b', 'User'),
(18, 'Sam', ' Gamgee', 'sam@gmail.com', 'dd6ff49baeb6802c954201a4216f690810451a9991247ebe7fd62556bc68218071c7e27de059fecde889215a9a5c17f30d8c87f03c339818fbaa61ca18cd756b', 'User'),
(19, 'Crazy Rick', 'Sanchez', 'crazy-rick@gmail.com', 'dd6ff49baeb6802c954201a4216f690810451a9991247ebe7fd62556bc68218071c7e27de059fecde889215a9a5c17f30d8c87f03c339818fbaa61ca18cd756b', 'User'),
(20, 'Bart1', 'Simpson', 'bart1@gmail.com', 'dd6ff49baeb6802c954201a4216f690810451a9991247ebe7fd62556bc68218071c7e27de059fecde889215a9a5c17f30d8c87f03c339818fbaa61ca18cd756b', 'User'),
(21, 'Bobo', 'Bobo', 'bobo@gmail.com', 'dd6ff49baeb6802c954201a4216f690810451a9991247ebe7fd62556bc68218071c7e27de059fecde889215a9a5c17f30d8c87f03c339818fbaa61ca18cd756b', 'User');

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `vacationId` int(11) NOT NULL,
  `destination` varchar(50) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `imageName` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`vacationId`, `destination`, `description`, `startDate`, `endDate`, `price`, `imageName`) VALUES
(74, 'Mordor', 'If you\'re feeling adventurous and don\'t mind a little danger, a trip to Mordor might be just the vacation for you! Hike through the fiery, treacherous terrain and brave the wrath of Sauron\'s armies. Take a guided tour through Mount Doom and witness the power of the One Ring firsthand. For a truly unique experience, join the Fellowship of the Ring and help save Middle Earth from certain doom. Just remember to pack your walking boots and plenty of sunscreen - it gets hot in Mordor!', '2023-02-23', '2024-02-28', '1280.00', 'e36b27f1-58af-40ef-9c20-f691cd40e596.jpg'),
(75, 'Hogwarts', 'Welcome to Hogwarts School of Witchcraft and Wizardry, where magic is real and your vacation is sure to be unforgettable! Attend classes in Potions, Defense Against the Dark Arts, and even Care of Magical Creatures. Explore the magical castle and its secret passageways, and even enjoy a game of Quidditch with your new wizarding friends. For a truly unique experience, attend the famous Yule Ball and dance the night away in style.', '2023-02-24', '2023-03-10', '1850.00', 'd7fe0854-0717-4379-8a85-e3c27a507844.avif'),
(76, 'Narnia', 'Step into the magical world of Narnia, where animals talk and the White Witch reigns supreme. Take a ride on a talking horse or even meet Aslan, the great lion himself. Explore the beautiful, snow-covered landscapes and witness the magic of the Stone Table. For a truly unique experience, join the battle against the White Witch and help save Narnia from eternal winter.', '2023-03-08', '2023-03-22', '1260.00', '4c8f05db-c0c6-4750-9892-e5614f27a2cc.jpg'),
(77, 'Hogsmead', 'Looking for a quaint, picturesque village straight out of a storybook? Hogsmead is the perfect vacation destination for you! Take a stroll down the cobblestone streets and visit the famous Three Broomsticks Inn. Sample the famous Butterbeer and even try your hand at some wizarding games. For a truly unique experience, attend the Hogsmead Christmas market and experience the magic of the holiday season like never before.', '2023-03-23', '2023-04-06', '850.50', '11654bba-3551-4d0c-90b0-96ec6d5f5a1a.jpg'),
(78, 'Rivendell', 'Experience the beauty and tranquility of the Elven city of Rivendell. Take a guided tour through the stunning architecture and witness the incredible craftsmanship of the Elven artisans. Relax in the lush gardens and even attend a feast with the Elves. For a truly unique experience, meet with the famous Ring-bearer Frodo Baggins and hear tales of his epic journey through Middle Earth.', '2023-02-24', '2023-03-09', '2550.00', '7d3037a2-5ca0-41c9-b34c-53a06739a545.webp'),
(79, 'Wakanda', 'Discover the secrets of the hidden African nation of Wakanda. Explore the futuristic city and witness the incredible technology of the Wakandans. Visit the famous Vibranium mines and even try on a Black Panther suit. For a truly unique experience, join the ranks of the Dora Milaje and help protect the kingdom from the most dangerous threats.', '2023-03-29', '2023-04-12', '1640.00', 'b267453a-1ba2-4fdd-8a4d-3ae603320222.png'),
(80, 'Naboo', 'Escape to the beautiful, idyllic planet of Naboo. Take a guided tour through the stunning architecture and witness the incredible craftsmanship of the Naboo artisans. Relax by the beautiful waterfalls and even attend a grand celebration with the Naboo people. For a truly unique experience, meet with the famous Naboo leader Padmé Amidala and hear tales of her adventures throughout the galaxy.', '2023-04-26', '2023-06-07', '3360.00', 'e5b068ed-77a3-46ec-ae46-b5c0afcd20d1.webp'),
(81, 'Gotham City', 'Welcome to Gotham City, where the nights are dark, and the hero is darker! Take a ride on the Batmobile, and feel the wind in your hair as you fight crime alongside Batman. Be sure to visit the iconic Gotham City Police Department, where the Commissioner and his team work tirelessly to keep the city safe. If you\'re feeling adventurous, head to Arkham Asylum and visit the Joker, Harley Quinn, and other notorious villains. And, for a true Gotham City experience, explore the Batcave, where you\'ll find Batman\'s state-of-the-art crime-fighting technology.', '2023-02-11', '2023-02-20', '985.00', 'bc54731f-6485-47b7-8dff-1805e5c8403d.jpg'),
(82, 'Asgard', 'Welcome to Asgard, home of the mighty Norse gods! Take a tour of Odin\'s grand palace and witness the power of the Allfather. Visit Thor\'s hammer, Mjolnir, and test your worthiness to lift it. Catch a glimpse of Loki\'s mischief and be entertained by his tricks. Take a stroll through the rainbow bridge, Bifrost, and see the nine realms. Experience the thrill of gladiator battles in the arena, where the bravest of warriors battle for glory. And, if you\'re lucky, you might even catch a glimpse of the alluring Valkyries flying across the sky. Don\'t miss the chance to experience the world of Norse mythology in Asgard!', '2023-03-28', '2023-04-22', '4500.00', '7937a57c-101a-4234-903c-2bb5f1c99429.webp'),
(83, 'Pandora', 'Visit the breathtaking world of Pandora, featured in the blockbuster movie, Avatar. Explore the floating mountains and take a ride on a Banshee through the lush forests. Go on a night safari and marvel at the glowing flora and fauna. Meet the friendly Na\'vi people and learn about their culture and traditions. Be sure to try the local delicacy, a juicy piece of Viperwolf steak. Don\'t forget to take plenty of photos to show off to your jealous friends back home.', '2023-03-28', '2023-04-11', '3680.00', '939da397-c1e9-4688-a78e-a8874ba058fc.jpg'),
(84, 'King\'s Landing', 'Step into the world of Game of Thrones with a visit to King\'s Landing. Explore the iconic Red Keep and imagine yourself as the ruler of the Seven Kingdoms. Walk the streets of Flea Bottom and meet the locals, but be careful not to cross paths with any Lannisters. Go for a horseback ride through the surrounding countryside and take in the stunning views of the Blackwater Bay. Enjoy a feast fit for a king at a local tavern, but beware of any poisoned wine.', '2023-02-28', '2023-03-07', '755.50', '6de42792-f0c8-4401-aca3-f32df0fc364f.jpeg'),
(85, 'Hobbiton', 'Experience the cozy and charming world of Hobbiton, made famous by J.R.R. Tolkien\'s The Lord of the Rings. Take a guided tour of the hobbit holes and enjoy a pint of ale at the Green Dragon Inn. Wander through the rolling hills and lush gardens, and keep an eye out for the pesky Sackville-Bagginses. Don\'t forget to visit Bilbo\'s house and check out his treasure trove. And if you\'re lucky, you might just catch a glimpse of Frodo and Sam on their way to Mount Doom.', '2023-01-24', '2023-01-25', '365.60', '3904c978-d562-43b1-954f-19f68d607de9.webp'),
(86, 'Westworld', 'Indulge in your wildest fantasies with a trip to Westworld, the ultimate vacation destination for thrill-seekers. Enter a world of cowboys, saloons, and shootouts. Go on a horseback ride through the wild west and catch a bandit. Visit the brothel and indulge in some forbidden pleasures. But be careful, the robots may not be as friendly as they seem.', '2023-03-11', '2023-04-08', '1690.00', 'b055e09a-e1b4-4777-837b-7e6279c65fa8.jpg'),
(87, 'Stars Hollow', 'Looking for a cozy getaway in a charming small town? Look no further than Stars Hollow! Visit the famous gazebo in the town square, grab a cup of coffee at Luke\'s Diner, and even take a tour of the local sites on a bike ride with your new best friend, Lorelai Gilmore. If you\'re feeling adventurous, take a trip to the infamous Dragonfly Inn, where you can experience the life of an innkeeper, complete with hilarious mishaps and heartwarming moments. For a truly unique experience, attend a town meeting and get to know the colorful characters that call Stars Hollow home.', '2023-02-27', '2023-03-13', '775.90', 'e0cac498-0834-4160-b138-44e0914a68c6.jpg'),
(88, 'San Fransokyo', 'Explore the bustling metropolis of San Fransokyo, where modern technology meets traditional Japanese culture. Take a ride on the high-tech monorail or explore the bustling streets on a hoverboard. Visit the famous Lucky Cat Café and sample the most delicious sushi and ramen dishes. For a truly unique experience, join the ranks of the Big Hero 6 team and help save the city from the most dastardly villains. No matter what you choose to do in San Fransokyo, your vacation is sure to be full of excitement and adventure.', '2023-03-23', '2023-04-13', '964.90', 'b1e28d2c-48c0-415d-8047-3b85a8a9f137.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `followers`
--
ALTER TABLE `followers`
  ADD PRIMARY KEY (`userId`,`vacationId`),
  ADD KEY `vacationId` (`vacationId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`vacationId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `vacationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=95;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `followers`
--
ALTER TABLE `followers`
  ADD CONSTRAINT `followers_ibfk_1` FOREIGN KEY (`vacationId`) REFERENCES `vacations` (`vacationId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
