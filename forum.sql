-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 28, 2023 at 03:36 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `forum`
--

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `slno` bigint(20) NOT NULL,
  `post_slno` bigint(20) NOT NULL,
  `comment_user_slno` bigint(20) NOT NULL,
  `comment` mediumtext NOT NULL,
  `like_amount` bigint(20) NOT NULL,
  `dislike_amount` bigint(20) NOT NULL,
  `creating_time` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`slno`, `post_slno`, `comment_user_slno`, `comment`, `like_amount`, `dislike_amount`, `creating_time`) VALUES
(66, 453, 36, 'dasdad', 0, 0, '2023-07-19'),
(67, 453, 36, 'asdasdd', 0, 0, '2023-07-19'),
(72, 453, 37, 'asdasdasd', 0, 0, '2023-07-19'),
(74, 455, 36, 'asdasdad', 0, 0, '2023-07-20'),
(76, 502, 37, 'adasd', 0, 0, '2023-07-20'),
(78, 477, 37, 'nice', 1, 0, '2023-07-21'),
(79, 488, 36, 'Jeess', 0, 0, '2023-07-21'),
(80, 503, 43, 'I can Help you to solve the issue', 1, 0, '2023-07-21'),
(82, 504, 88, 'asdasda', 0, 0, '2023-07-27'),
(83, 504, 88, 'asdas', 0, 0, '2023-07-27'),
(84, 504, 88, 'asddddd', 0, 0, '2023-07-27'),
(85, 484, 88, 'ssssssssss', 0, 0, '2023-07-27'),
(86, 494, 88, 'aaaaaaaaaaaaaaaaaaaaaaaaaa', 0, 0, '2023-07-27'),
(87, 503, 88, 'asdadasd', 0, 0, '2023-07-27'),
(88, 494, 88, 'asdasdasdd', 0, 0, '2023-07-27'),
(90, 496, 88, 'asdasd', 1, 0, '2023-07-28'),
(92, 478, 88, 'asdadad', 1, 0, '2023-07-28'),
(93, 482, 88, 'hjghjhh', 0, 1, '2023-07-28');

-- --------------------------------------------------------

--
-- Table structure for table `comment_dislike`
--

CREATE TABLE `comment_dislike` (
  `slno` bigint(20) NOT NULL,
  `comment_slno` bigint(20) NOT NULL,
  `user_email` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `comment_dislike`
--

INSERT INTO `comment_dislike` (`slno`, `comment_slno`, `user_email`) VALUES
(51, 68, 'hinata@gmail.com'),
(52, 71, 'hinata@gmail.com'),
(53, 93, 'kurosaki@gmail.com'),
(55, 91, 'kurosaki@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `comment_like`
--

CREATE TABLE `comment_like` (
  `slno` bigint(20) NOT NULL,
  `comment_slno` bigint(20) NOT NULL,
  `user_email` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `comment_like`
--

INSERT INTO `comment_like` (`slno`, `comment_slno`, `user_email`) VALUES
(46, 62, 'hinata@gmail.com'),
(47, 62, 'goku@gmail.com'),
(48, 75, 'hinata@gmail.com'),
(49, 78, 'goku@gmail.com'),
(50, 80, 'vigeta@gmail.com'),
(51, 89, 'kurosaki@gmail.com'),
(52, 86, 'kurosaki@gmail.com'),
(53, 88, 'kurosaki@gmail.com'),
(54, 90, 'kurosaki@gmail.com'),
(56, 92, 'kurosaki@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `notification`
--

CREATE TABLE `notification` (
  `slno` bigint(20) NOT NULL,
  `owner_slno` bigint(20) NOT NULL,
  `commenter_slno` bigint(20) NOT NULL,
  `commenter_email` text NOT NULL,
  `reason` text NOT NULL,
  `post_slno` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notification`
--

INSERT INTO `notification` (`slno`, `owner_slno`, `commenter_slno`, `commenter_email`, `reason`, `post_slno`) VALUES
(25, 39, 36, 'hinata@gmail.com', 'Commenter In Your Post.', 453),
(26, 39, 36, 'hinata@gmail.com', 'Commenter In Your Post.', 453),
(30, 39, 37, 'goku@gmail.com', 'Commenter In Your Post.', 453),
(33, 39, 36, 'hinata@gmail.com', 'Liked Your Post.', 455),
(34, 39, 36, 'hinata@gmail.com', 'Commenter In Your Post.', 455),
(35, 39, 36, 'hinata@gmail.com', 'Liked Your Post.', 454),
(36, 36, 37, 'goku@gmail.com', 'Disliked Your Post.', 474),
(37, 36, 37, 'goku@gmail.com', 'Liked Your Post.', 477),
(38, 36, 37, 'goku@gmail.com', 'Commenter In Your Post.', 477),
(39, 37, 36, 'hinata@gmail.com', 'Liked Your Post.', 502),
(40, 37, 36, 'hinata@gmail.com', 'Disliked Your Post.', 502),
(41, 37, 36, 'hinata@gmail.com', 'Commenter In Your Post.', 488),
(42, 42, 43, 'vigeta@gmail.com', 'Commenter In Your Post.', 503),
(43, 37, 88, 'kurosaki@gmail.com', 'Commented In Your Post.', 484),
(44, 37, 88, 'kurosaki@gmail.com', 'Commented In Your Post.', 494),
(45, 42, 88, 'kurosaki@gmail.com', 'Commented In Your Post.', 503),
(46, 37, 88, 'kurosaki@gmail.com', 'Commented In Your Post.', 494),
(47, 36, 88, 'kurosaki@gmail.com', 'Liked Your Post.', 476),
(48, 39, 88, 'kurosaki@gmail.com', 'Liked Your Post.', 455),
(49, 36, 88, 'kurosaki@gmail.com', 'Liked Your Post.', 477),
(50, 36, 88, 'kurosaki@gmail.com', 'Disliked Your Post.', 477),
(51, 36, 88, 'kurosaki@gmail.com', 'Liked Your Post.', 477),
(52, 37, 88, 'kurosaki@gmail.com', 'Liked Your Post.', 494),
(53, 37, 88, 'kurosaki@gmail.com', 'Commented In Your Post.', 496),
(54, 37, 88, 'kurosaki@gmail.com', 'Commented In Your Post.', 479),
(56, 37, 88, 'kurosaki@gmail.com', 'Commented In Your Post.', 478),
(58, 37, 88, 'kurosaki@gmail.com', 'Liked Your Post.', 482),
(59, 37, 88, 'kurosaki@gmail.com', 'Commented In Your Post.', 482),
(60, 37, 88, 'kurosaki@gmail.com', 'Disliked Your Post.', 479),
(61, 37, 88, 'kurosaki@gmail.com', 'Liked Your Post.', 479),
(62, 39, 88, 'kurosaki@gmail.com', 'Commented In Your Post.', 454);

-- --------------------------------------------------------

--
-- Table structure for table `otp_smtp`
--

CREATE TABLE `otp_smtp` (
  `slno` bigint(20) NOT NULL,
  `email` text NOT NULL,
  `otp` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `otp_smtp`
--

INSERT INTO `otp_smtp` (`slno`, `email`, `otp`) VALUES
(35, 'dolfin@gmail.com', '$2y$10$7UudjjHHyO5I1BHddOPZ0ehVEJHSAN9lywRp4zCNAmPH9Ib4Vzuom'),
(36, 'hinata@gmail.com', '$2y$10$4a3Sdfli8p3a5RWyEuRX.OwJ95MjyxlR8o6RYMZTazXz4GWdCmBni'),
(37, 'goku@gmail.com', '$2y$10$at.OWI8xePWNbdn0ZkHG..2czmB1KV4l2YEg/rcdoo/hnxQAF/zWW'),
(38, 'samin@gmail.com', '$2y$10$CImwNrHlwY2gL7ORkr628Oyq2pn122oobCDbAfRGZDpuFBYOInOEq'),
(39, 'pinata@gmail.com', '$2y$10$OO6FgD4ljVA2hJBf9wm4KumU/QiDjWpJDI/mWLKq6TI7PR4lsjeA2'),
(40, 'pikachu@gmail.com', '$2y$10$9iodquwNZ/6Vj6W9UZ9ybe.KkJ9Ndid9lIBU0bBJPCSfudEmiWPka'),
(41, 'img@gmail.com', '$2y$10$gGOw9rMwxNMhM0FBOuCviOKJHaW1pQoEkQ1O1h3w7V.dGf1ZM3FHO'),
(42, 'goku95@gmail.com', '$2y$10$0gsEZ8WNSYv1.Gaw5r2dwuSbmj/OQjtOrD779YEwKddi2uaEGsiuO'),
(43, 'vigeta@gmail.com', '$2y$10$u2gTIa4T7qbmlLbCSXPIlO/kFhjsKcER0cFvshlADf0FfNlzP8b1W'),
(44, 'dtrump@gmail.com', '$2y$10$7VhALmosF5Uu6rxXDAKm5O481y1Kk6JgxacJ.f0Y0sW6pJ9mEYn6C'),
(45, 'dtrump@gmail.com', '$2y$10$XqMY5PbG7ZrVn1aO5DGb/e9p62Co/ESmEjTTczqqJsjk8/77i0VTK'),
(46, 'apple@gmail.com', '$2b$10$pnESTgb6vP.3t9eSww9i/OKstgpO6/omHcYp0lwWkaXf3sjdRTBtW'),
(47, 'apple@gmail.com', '$2b$10$E.nwbCC.PqmimmYTODLuBOeFH/4Do0e42ed703j1ZoY8N53.rcy46'),
(48, 'apple@gmai.com', '$2b$10$PYNeO7UqMhBJ6MX2DG3If.s0xLzTxzYLWBB92UahWFm1l5ZSwKoTW'),
(49, 'apple@gmai.com', '$2b$10$7xDK67MEJkHltpO2r9/DxOoAwr0kVsGRXjDcVbBO8OLMNAFs1n.v6'),
(50, 'apple@gmai.com', '$2b$10$9hl/9aBJuuPqsB5EzZk0OuoF0.EgdKf91gVUHjlJBunVyffzjenyO'),
(51, 'apple@gmai.com', '$2b$10$bjsUlh7GseYKcqiv8hdY3OCmNo/a2HVnXpl2.8iDUDfk6lRIM4h2a'),
(52, 'apple@gmai.com', '$2b$10$NxjTfcoGmT33bUecRFMj4OEEqQzuTlmYno/fr1Xo2eZUQyNhwHrZC'),
(53, 'apple@gmai.com', '$2b$10$1lfouG9gCBBewLgFc5ycbuoT3xwfY3M8cihuvCXk27ErwGHD8B1Re'),
(54, 'apple@gmail.com', '$2b$10$.k3dstU3VeEHTXmPs0t.eOcIMVDZmuZLJH6UOMgwxZ9FOEj/SU4La'),
(55, 'apple@gmail.com', '$2b$10$5xbOvYtF7SPfvwBY9nlSd.8/tK84mLHgXyHK3UxFP5YOgZB/tXzga'),
(56, 'applegood@gmail.com', '$2b$10$yMV/r05BpWLfQxhRPFBxuOav3jBO9/ZQBnxMVbD7CVnScIzBVRVJ2'),
(57, 'appleood@gmail.com', '$2b$10$PDcIsGHjjDYqqsud9be6LucYEZn4rTQoaPU3hCkFsF3o/JpQwBii2'),
(58, 'hinat3a@gmail.com', '$2b$10$GMIid/AexPgMEI23rzEDuePmP7GLpg4xw95LzVA/Q/fMoQt5vUBtO'),
(59, 'arnaa@gmail.com', '$2b$10$EBJ3h6JUOy7BuSqzO7gkBuZLbtsUfr.AX9QiQ.5xs0h4XcbJB3wZ.'),
(60, 'boo@gmail.com', '$2b$10$CB5oj953XUwdzXeIWFsawOjGZ6C4iDmHHMSWs9m/XhQ7a6uy1WDFq'),
(61, 'smallbee@gmail.com', '$2b$10$D2qyoTElgfWQ.fz.0vK1SuIrx2P98XvxRELkg4iXjH3tenY1O2bTC'),
(62, 'dude@gmail.com', '$2b$10$nqEjUG2eGYFMQgyJlqtuFeONMMg5kQ6cAOif6kmw.KcdFeH40xuYu'),
(63, 'boo@gmail.com', '$2b$10$xAA8BpqTV0OnRF42tgBZV.qpfCR1oXeKXZu2vo576EAQ898uNy56m'),
(64, 'poka@gmail.com', '$2b$10$ZPOgZFkTMbF4JxeK6rdEIeJCt0P7xv7zGqHlMO3Ny35g.wHgpt/wa'),
(65, 'borom@gmail.com', '$2b$10$MjBdv.Druazt7MbO16DBDugZJVxC7Tmy1svga1gI60ksYtFdoFtGO'),
(66, 'asasas@gmail.com', '$2b$10$P98Mzlop3Y.nOu8WgrxBPe.R2IR.ffQy//R5qFRz7vOgEkOv11hn2'),
(67, 'asdasdasd@gmail.com', '$2b$10$F5AgT9sgGHKM7CteTrjIC.i1Cl6ZXDgnpbHtuZhnqsi0.kuCq2yjS'),
(68, 'bsbsbs@gmail.com', '$2b$10$uPYomrg4F3eycjulOv0RbufvYTWGZW5XGXtNY3IhUiFHydKzZ5NAS'),
(69, 'john@gmail.com', '$2b$10$guuhvBIAZUJSY3zwBXzHEOzS34OG21zgCzWsib/5ZRAUx/yanIWLG'),
(70, 'asdasdad@gmail.com', '$2b$10$M.SFgNQTzlCYN1Hw3aB87eHjedlD6.QcChiKXCJR.kQh6snlu8ydO'),
(71, 'asaddadadfdgdgdfh@gmail.com', '$2b$10$FFRRGlqOjxoqqcjI8MP1EuIDlvwSZ/ThbYZSjopcK0ndgFM31JKRG'),
(72, 'kkklklklk@gmail.com', '$2b$10$itBiqAJNY1arpu3LN/pwVu2PAn4CjXgOkctpy//NOZCmxpaBrNBP.'),
(73, 'yyyyyyy@gmail.com', '$2b$10$G4TqYQVG8dkfmVbMBw1P0uYbe0Kd3/ccVvT0GqCQHX1svGn89.83a'),
(74, 'asdasdasdas@gmail.com', '$2b$10$4l1K.YpfWg5bBWWxCDTeUefaSKDGRsQo4RdwMDUqtbeGHIe2Nmca2'),
(75, 'asdasdasdasdsad@gmail.com', '$2b$10$2QHUDOwekG31yxt8.goTd.y48rjSm6Viar1lI419JHsJzuv/iEV56'),
(76, 'asdasddd@gmail.com', '$2b$10$3Z7djYFbmNqd8SfOdz/IQO6tf6N6ECplo53GtVCbaY.eEhJFmq4TW'),
(77, 'asdiopiopp@gmail.com', '$2b$10$SHA9TknM796eWEiF4tEKCe268sAHaKik3r7KaWWx.IzgQSR1jO22W'),
(78, 'asdasdasd@gmail.com', '$2b$10$gipZn3wG3rxKxNthn5Y0duFmfQw0RFj9EDKAff9ZcZg1IRlkMB7tK'),
(79, 'krilin@gmail.com', '$2b$10$7./GIrYbruvgONbYTn2v3eGGcxYx5vAbPUlkpkrsZS/e4pIufnkC6'),
(80, 'dude@gmail.com', '$2b$10$br6CrAVvN4IOjNXzjEsPl.Oa1.mtcrckGpVyThlAtOtcV4471zJl2'),
(81, 'nuke@gmail.com', '$2b$10$1rGS8fRg2r95tTQFgPoYq.mxXGnSXCjZ5yITxXe4CX6hFYooVQC.K'),
(82, 'agun@gmail.com', '$2b$10$eGiJmMBZwkTJvTV6aTDGOOL3Q3hneo.uRJaocZXa/JFyXa8/7b6va'),
(83, 'point@gmial.com', '$2b$10$i1O0dCJC5W9Wn3DzkgeTluxPxuU9QQF6XqDzQd4jN.7HWAxL4Duxm'),
(84, 'asdasdads@gmail.com', '$2b$10$5vgi6.prHr1zABVbWv1rxukzqtITUt4YzXK0UPmFeQvwVCR3sPoAm'),
(85, 'tolol@gmail.com', '$2b$10$xb2QRco5gfRgtD8crft5EOffF73FGYuAajut6Lk/brCjtwdXZrDPa'),
(86, 'ragnar@gmail.com', '$2b$10$kuo9zOU2GZu.E3EUNBrnz.uimTUIBRn5scJARn7ageKloYEb3z/.C'),
(87, 'emran@gmail.com', '$2b$10$DchyRkZGDutG6iOxtial6.g39MmwujkOOhlGVkoDoUbjBTgowYMrO'),
(88, 'kurosaki@gmail.com', '$2b$10$u.prFK7lcra6Bqc75XxYSekO2ZeQ1kWxbD.OmkyVDXLLoZ87JzpxS'),
(93, 'arnobsamin95@gmail.com', '$2b$10$IhrvkxJ1GLpOscQSP7FNS.z/DEOU9GXr9NhRb.rXFObi/5x4EtJtu');

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `slno` bigint(20) NOT NULL,
  `user_slno` bigint(20) NOT NULL,
  `user_post` mediumtext NOT NULL,
  `viewed` bigint(20) NOT NULL,
  `total_comments` bigint(20) NOT NULL,
  `like_amount` bigint(20) NOT NULL,
  `creating_time` date NOT NULL DEFAULT current_timestamp(),
  `dislike_amount` bigint(20) NOT NULL,
  `problem_type` text NOT NULL,
  `intro` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`slno`, `user_slno`, `user_post`, `viewed`, `total_comments`, `like_amount`, `creating_time`, `dislike_amount`, `problem_type`, `intro`) VALUES
(453, 39, 'asdasdasdad', 11, 3, 0, '2023-07-18', 0, 'Travel', 'asdasdasdad'),
(454, 39, 'asdadasdadad', 5, 1, 1, '2023-07-18', 0, 'Study Related', 'asdadad'),
(455, 39, 'asdadad', 11, 1, 2, '2023-07-18', 0, 'Medical Issues', 'asdadadadasd'),
(475, 36, 'adadadasd', 2, 0, 0, '2023-07-20', 0, 'Study Related', 'asdadad'),
(476, 36, 'asdadadad', 5, 0, 1, '2023-07-20', 0, 'Travel', 'asdadad'),
(477, 36, 'asdasdadasdasd', 5, 1, 2, '2023-07-20', 0, 'Coding', 'asdad'),
(478, 37, 'asdasdasd', 3, 1, 0, '2023-07-20', 0, 'Study Related', 'asdasdasdasd'),
(479, 37, 'asdadasdada', 9, 1, 1, '2023-07-20', 0, 'Study Related', 'asdadasd'),
(480, 37, 'I cant study 28 hours a day !', 1, 0, 0, '2023-07-20', 0, 'Study Related', 'I am sad and depressed'),
(481, 37, 'asdadad', 2, 0, 0, '2023-07-20', 0, 'Relationship', 'asdasdas'),
(482, 37, 'asdadad', 4, 1, 1, '2023-07-20', 0, 'Study Related', 'adasd'),
(483, 37, 'asdadadasd', 3, 0, 1, '2023-07-20', 0, 'Travel', 'asdadasd'),
(484, 37, 'asdasdad', 1, 1, 0, '2023-07-20', 0, 'Study Related', 'asdasdd'),
(485, 37, 'asdadasdadasd', 1, 0, 0, '2023-07-20', 0, 'Emotional', 'fsfsdfs'),
(486, 37, 'asdadasd', 0, 0, 1, '2023-07-20', 0, 'Coding', 'adadad'),
(487, 37, 'asdadd', 0, 0, 0, '2023-07-20', 0, 'Joblife', 'asdadd'),
(488, 37, 'adadadasd', 3, 1, 0, '2023-07-20', 0, 'Study Related', 'asdadasd'),
(489, 37, 'asdadad', 0, 0, 0, '2023-07-20', 0, 'Emotional', 'adadasd'),
(490, 37, 'dasdasdasdasd', 3, 0, 0, '2023-07-20', 0, 'Emotional', 'asdadasd'),
(491, 37, 'asdadsdasd', 0, 0, 0, '2023-07-20', 0, 'Emotional', 'asdadad'),
(492, 37, 'asdadasd', 1, 0, 0, '2023-07-20', 0, 'Emotional', 'asdasdad'),
(493, 37, 'asdasdasd', 0, 0, 0, '2023-07-20', 0, 'Travel', 'asdadad'),
(494, 37, 'asdadadasd', 7, 2, 1, '2023-07-20', 0, 'Emotional', 'asdadd'),
(495, 37, 'asdadasd', 1, 0, 0, '2023-07-20', 0, 'Study Related', 'asdasdd'),
(496, 37, 'asdadad', 5, 2, 1, '2023-07-20', 0, 'Coding', 'asdasd'),
(497, 37, 'asdadadad', 0, 0, 0, '2023-07-20', 0, 'Study Related', 'asdad'),
(498, 37, 'asdadadad', 4, 0, 0, '2023-07-20', 0, 'Study Related', 'asdadad'),
(499, 37, 'adaddasd', 3, 0, 0, '2023-07-20', 0, 'Study Related', 'asdasdas'),
(500, 37, 'asdasdasd', 0, 0, 0, '2023-07-20', 0, 'Emotional', 'asdasd'),
(501, 37, 'asdasdadasd', 0, 0, 0, '2023-07-20', 0, 'Emotional', 'asdasd'),
(502, 37, 'asddddddddddddd', 6, 1, 0, '2023-07-20', 1, 'Emotional', 'adad'),
(503, 42, 'Full code details...', 9, 2, 0, '2023-07-21', 0, 'Coding', 'I can not solve Js codes'),
(504, 88, 'Where do I get new tickets\n', 2, 3, 1, '2023-07-26', 0, 'Travel', 'Cant get new tickets'),
(506, 88, 'asdasd', 0, 1, 1, '2023-07-27', 0, 'Coding', 'asdasd');

-- --------------------------------------------------------

--
-- Table structure for table `post_dislike`
--

CREATE TABLE `post_dislike` (
  `slno` bigint(20) NOT NULL,
  `user_email` text NOT NULL,
  `post_slno` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `post_dislike`
--

INSERT INTO `post_dislike` (`slno`, `user_email`, `post_slno`) VALUES
(11, 'goku@gmail.com', 474),
(12, 'hinata@gmail.com', 502);

-- --------------------------------------------------------

--
-- Table structure for table `post_like`
--

CREATE TABLE `post_like` (
  `slno` bigint(20) NOT NULL,
  `post_slno` bigint(20) NOT NULL,
  `user_email` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `post_like`
--

INSERT INTO `post_like` (`slno`, `post_slno`, `user_email`) VALUES
(15, 447, 'goku@gmail.com'),
(16, 451, 'hinata@gmail.com'),
(18, 455, 'hinata@gmail.com'),
(19, 454, 'hinata@gmail.com'),
(20, 483, 'goku@gmail.com'),
(21, 496, 'goku@gmail.com'),
(22, 486, 'goku@gmail.com'),
(23, 477, 'goku@gmail.com'),
(25, 476, 'kurosaki@gmail.com'),
(26, 506, 'kurosaki@gmail.com'),
(27, 504, 'kurosaki@gmail.com'),
(28, 455, 'kurosaki@gmail.com'),
(30, 477, 'kurosaki@gmail.com'),
(31, 494, 'kurosaki@gmail.com'),
(32, 482, 'kurosaki@gmail.com'),
(33, 479, 'kurosaki@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `problem_types`
--

CREATE TABLE `problem_types` (
  `slno` int(255) NOT NULL,
  `code_type` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `problem_types`
--

INSERT INTO `problem_types` (`slno`, `code_type`) VALUES
(1, 'Emotional'),
(2, 'Study Related'),
(3, 'Travel'),
(4, 'Coding'),
(5, 'Relationship'),
(6, 'Joblife'),
(7, 'Motivational'),
(8, 'Medical Issues'),
(9, 'Marketing'),
(10, 'Food');

-- --------------------------------------------------------

--
-- Table structure for table `report`
--

CREATE TABLE `report` (
  `slno` bigint(20) NOT NULL,
  `post_slno` bigint(20) NOT NULL,
  `email` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `report`
--

INSERT INTO `report` (`slno`, `post_slno`, `email`) VALUES
(53, 451, 'hinata@gmail.com'),
(54, 452, 'hinata@gmail.com'),
(55, 454, 'hinata@gmail.com'),
(56, 450, 'hinata@gmail.com'),
(57, 453, 'hinata@gmail.com'),
(58, 448, 'hinata@gmail.com'),
(59, 453, 'goku@gmail.com'),
(60, 455, 'hinata@gmail.com'),
(61, 478, 'goku@gmail.com'),
(62, 489, 'goku@gmail.com'),
(63, 483, 'goku@gmail.com'),
(64, 496, 'goku@gmail.com'),
(65, 479, 'hinata@gmail.com'),
(66, 493, 'hinata@gmail.com'),
(67, 484, 'kurosaki@gmail.com'),
(68, 490, 'kurosaki@gmail.com'),
(69, 501, 'kurosaki@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `tokendb`
--

CREATE TABLE `tokendb` (
  `slno` bigint(20) NOT NULL,
  `user_email` text NOT NULL,
  `token` mediumtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tokendb`
--

INSERT INTO `tokendb` (`slno`, `user_email`, `token`) VALUES
(217, 'ragnar@gmail.com', 'c5b5465e-2594-46a6-ae4e-dd585aa0f026'),
(223, 'agun@gmail.com', '31e8e1c1-3273-47bb-a736-f77482e5755d'),
(224, 'tolol@gmail.com', '25223540-973d-4d09-a3e9-247531b8650b'),
(230, 'arnobsamin95@gmail.com', '6de10cb1-2db6-460f-9b1f-d3bed06bd4e4');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `slno` bigint(20) NOT NULL,
  `email` text NOT NULL,
  `pass` text NOT NULL,
  `imglink` text NOT NULL,
  `joined` date NOT NULL DEFAULT current_timestamp(),
  `country` text NOT NULL,
  `age` int(255) NOT NULL,
  `gender` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`slno`, `email`, `pass`, `imglink`, `joined`, `country`, `age`, `gender`) VALUES
(35, 'dolfin@gmail.com', '$2y$10$7UudjjHHyO5I1BHddOPZ0ehVEJHSAN9lywRp4zCNAmPH9Ib4Vzuom', 'http://192.168.0.109:8000/storage/images/64b6b02e6bb39.jpg', '2023-07-18', 'Bangladesh', 16, 'Male'),
(36, 'hinata@gmail.com', '$2y$10$4a3Sdfli8p3a5RWyEuRX.OwJ95MjyxlR8o6RYMZTazXz4GWdCmBni', 'http://192.168.0.109:8000/storage/images/64b6b05224ff4.jpg', '2023-07-18', 'Japan', 18, 'Female'),
(37, 'goku@gmail.com', '$2y$10$at.OWI8xePWNbdn0ZkHG..2czmB1KV4l2YEg/rcdoo/hnxQAF/zWW', 'http://192.168.0.109:8000/storage/images/64b6b0969b08f.jpg', '2023-07-18', 'indo', 16, 'Male'),
(38, 'samin@gmail.com', '$2y$10$CImwNrHlwY2gL7ORkr628Oyq2pn122oobCDbAfRGZDpuFBYOInOEq', 'http://192.168.0.109:8000/storage/images/64b6b0bc416b0.jpg', '2023-07-18', 'Bangladesh', 18, 'Others'),
(39, 'pinata@gmail.com', '$2y$10$OO6FgD4ljVA2hJBf9wm4KumU/QiDjWpJDI/mWLKq6TI7PR4lsjeA2', 'http://192.168.0.109:8000/storage/images/64b6b0f89bbc0.jpg', '2023-07-18', 'Hungary', 19, 'Others'),
(40, 'pikachu@gmail.com', '$2y$10$9iodquwNZ/6Vj6W9UZ9ybe.KkJ9Ndid9lIBU0bBJPCSfudEmiWPka', 'http://192.168.0.109:8000/storage/images/64b9725472083.png', '2023-07-20', 'japan', 17, 'Male'),
(41, 'img@gmail.com', '$2y$10$gGOw9rMwxNMhM0FBOuCviOKJHaW1pQoEkQ1O1h3w7V.dGf1ZM3FHO', 'http://192.168.0.109:8000/storage/images/64b973344cb33.png', '2023-07-20', 'hg', 16, 'Male'),
(42, 'goku95@gmail.com', '$2y$10$0gsEZ8WNSYv1.Gaw5r2dwuSbmj/OQjtOrD779YEwKddi2uaEGsiuO', 'http://192.168.0.109:8000/storage/images/64ba784a48487.jpg', '2023-07-21', 'Japan', 24, 'Male'),
(43, 'vigeta@gmail.com', '$2y$10$u2gTIa4T7qbmlLbCSXPIlO/kFhjsKcER0cFvshlADf0FfNlzP8b1W', 'http://192.168.0.109:8000/storage/images/64ba79404fbeb.jpg', '2023-07-21', 'Japan', 19, 'Male'),
(69, 'john@gmail.com', '$2b$10$guuhvBIAZUJSY3zwBXzHEOzS34OG21zgCzWsib/5ZRAUx/yanIWLG', 'http://localhost:8000/public/images/1690149675449-OIP.jpg', '2023-07-24', 'asdasd', 12, 'Male'),
(70, 'asdasdad@gmail.com', '$2b$10$M.SFgNQTzlCYN1Hw3aB87eHjedlD6.QcChiKXCJR.kQh6snlu8ydO', 'http://localhost:8000/public/images/1690150041169-OIP.jpg', '2023-07-24', 'asdasd', 34, 'Male'),
(71, 'asaddadadfdgdgdfh@gmail.com', '$2b$10$FFRRGlqOjxoqqcjI8MP1EuIDlvwSZ/ThbYZSjopcK0ndgFM31JKRG', 'http://localhost:8000/public/images/1690150883764-OIP.jpg', '2023-07-24', 'Bangladeshi', 12, 'Female'),
(72, 'kkklklklk@gmail.com', '$2b$10$itBiqAJNY1arpu3LN/pwVu2PAn4CjXgOkctpy//NOZCmxpaBrNBP.', 'http://localhost:8000/public/images/1690151112082-OIP.jpg', '2023-07-24', 'asdasdas', 15, 'Male'),
(73, 'yyyyyyy@gmail.com', '$2b$10$G4TqYQVG8dkfmVbMBw1P0uYbe0Kd3/ccVvT0GqCQHX1svGn89.83a', 'http://localhost:8000/public/images/1690151370071-OIP.jpg', '2023-07-24', 'asda', 16, 'Male'),
(74, 'asdasdasdas@gmail.com', '$2b$10$4l1K.YpfWg5bBWWxCDTeUefaSKDGRsQo4RdwMDUqtbeGHIe2Nmca2', 'http://localhost:8000/public/images/1690151640778-OIP.jpg', '2023-07-24', 'Japanas', 17, 'Female'),
(75, 'asdasdasdasdsad@gmail.com', '$2b$10$2QHUDOwekG31yxt8.goTd.y48rjSm6Viar1lI419JHsJzuv/iEV56', 'http://localhost:8000/public/images/1690153390296-OIP.jpg', '2023-07-24', 'asdasd', 12, 'Male'),
(76, 'asdasddd@gmail.com', '$2b$10$3Z7djYFbmNqd8SfOdz/IQO6tf6N6ECplo53GtVCbaY.eEhJFmq4TW', 'http://localhost:8000/public/images/1690153599457-OIP.jpg', '2023-07-24', 'asdasdad', 15, 'Male'),
(77, 'asdiopiopp@gmail.com', '$2b$10$SHA9TknM796eWEiF4tEKCe268sAHaKik3r7KaWWx.IzgQSR1jO22W', 'http://localhost:8000/public/images/1690153768549-OIP.jpg', '2023-07-24', 'asadaf', 14, 'Male'),
(78, 'asdasdasd@gmail.com', '$2b$10$gipZn3wG3rxKxNthn5Y0duFmfQw0RFj9EDKAff9ZcZg1IRlkMB7tK', 'http://localhost:8000/public/images/1690153836191-OIP.jpg', '2023-07-24', 'asdasda', 12, 'Male'),
(79, 'krilin@gmail.com', '$2b$10$7./GIrYbruvgONbYTn2v3eGGcxYx5vAbPUlkpkrsZS/e4pIufnkC6', 'http://localhost:8000/public/images/1690168843267-OIP.jpg', '2023-07-24', 'abcdfe', 17, 'Female'),
(80, 'dude@gmail.com', '$2b$10$br6CrAVvN4IOjNXzjEsPl.Oa1.mtcrckGpVyThlAtOtcV4471zJl2', 'http://localhost:8000/public/images/1690169372878-OIP.jpg', '2023-07-24', 'bf', 18, 'Male'),
(83, 'point@gmial.com', '$2b$10$i1O0dCJC5W9Wn3DzkgeTluxPxuU9QQF6XqDzQd4jN.7HWAxL4Duxm', 'http://localhost:8000/public/images/1690179612266-OIP.jpg', '2023-07-24', 'bd', 21, 'Others'),
(84, 'asdasdads@gmail.com', '$2b$10$5vgi6.prHr1zABVbWv1rxukzqtITUt4YzXK0UPmFeQvwVCR3sPoAm', 'http://localhost:8000/public/images/1690180047827-OIP.jpg', '2023-07-24', 'asdasd', 15, 'Male'),
(86, 'ragnar@gmail.com', '$2b$10$kuo9zOU2GZu.E3EUNBrnz.uimTUIBRn5scJARn7ageKloYEb3z/.C', 'http://localhost:8000/public/images/1690182911893-OIP.jpg', '2023-07-24', 'badaass', 12, 'Male'),
(87, 'emran@gmail.com', '$2b$10$DchyRkZGDutG6iOxtial6.g39MmwujkOOhlGVkoDoUbjBTgowYMrO', 'http://localhost:8000/public/images/1690204433505-OIP.jpg', '2023-07-24', 'bd', 74, 'Male'),
(88, 'kurosaki@gmail.com', '$2b$10$u.prFK7lcra6Bqc75XxYSekO2ZeQ1kWxbD.OmkyVDXLLoZ87JzpxS', 'http://localhost:8000/public/images/1690327469495-OIP.jpg', '2023-07-26', 'BD', 21, 'Male'),
(89, 'arnobsamin95@gmail.com', '$2b$10$auB6nSjHPhrAYvv.rRkcAeQ/ZFI/vf3ws80N9DGu2HNX7V.k6K7dG', 'http://localhost:8000/public/images/1690537467082-OIP.jpg', '2023-07-28', 'Bangladeshy', 27, 'Male');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`slno`);

--
-- Indexes for table `comment_dislike`
--
ALTER TABLE `comment_dislike`
  ADD PRIMARY KEY (`slno`);

--
-- Indexes for table `comment_like`
--
ALTER TABLE `comment_like`
  ADD PRIMARY KEY (`slno`);

--
-- Indexes for table `notification`
--
ALTER TABLE `notification`
  ADD PRIMARY KEY (`slno`);

--
-- Indexes for table `otp_smtp`
--
ALTER TABLE `otp_smtp`
  ADD PRIMARY KEY (`slno`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`slno`);
ALTER TABLE `posts` ADD FULLTEXT KEY `user_post` (`user_post`);
ALTER TABLE `posts` ADD FULLTEXT KEY `intro` (`intro`);
ALTER TABLE `posts` ADD FULLTEXT KEY `user_post_2` (`user_post`,`intro`);

--
-- Indexes for table `post_dislike`
--
ALTER TABLE `post_dislike`
  ADD PRIMARY KEY (`slno`);

--
-- Indexes for table `post_like`
--
ALTER TABLE `post_like`
  ADD PRIMARY KEY (`slno`);

--
-- Indexes for table `problem_types`
--
ALTER TABLE `problem_types`
  ADD PRIMARY KEY (`slno`);

--
-- Indexes for table `report`
--
ALTER TABLE `report`
  ADD PRIMARY KEY (`slno`);

--
-- Indexes for table `tokendb`
--
ALTER TABLE `tokendb`
  ADD PRIMARY KEY (`slno`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`slno`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `slno` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=95;

--
-- AUTO_INCREMENT for table `comment_dislike`
--
ALTER TABLE `comment_dislike`
  MODIFY `slno` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT for table `comment_like`
--
ALTER TABLE `comment_like`
  MODIFY `slno` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- AUTO_INCREMENT for table `notification`
--
ALTER TABLE `notification`
  MODIFY `slno` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT for table `otp_smtp`
--
ALTER TABLE `otp_smtp`
  MODIFY `slno` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=94;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `slno` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=507;

--
-- AUTO_INCREMENT for table `post_dislike`
--
ALTER TABLE `post_dislike`
  MODIFY `slno` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `post_like`
--
ALTER TABLE `post_like`
  MODIFY `slno` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `problem_types`
--
ALTER TABLE `problem_types`
  MODIFY `slno` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `report`
--
ALTER TABLE `report`
  MODIFY `slno` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;

--
-- AUTO_INCREMENT for table `tokendb`
--
ALTER TABLE `tokendb`
  MODIFY `slno` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=231;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `slno` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=90;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
