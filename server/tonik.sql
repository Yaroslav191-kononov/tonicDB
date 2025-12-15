-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Хост: MySQL-8.0
-- Время создания: Дек 15 2025 г., 17:34
-- Версия сервера: 8.0.35
-- Версия PHP: 8.1.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `tonik`
--

-- --------------------------------------------------------

--
-- Структура таблицы `about_section`
--

CREATE TABLE `about_section` (
  `id` int NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` text,
  `philosophy_title` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `about_section`
--

INSERT INTO `about_section` (`id`, `title`, `description`, `philosophy_title`) VALUES
(2, 'КТО МЫ И ЗАЧЕМ ВСЁ ЭТО', 'Мы — команда исследователей, которым небезразлично качество собственной жизни, наших детей и семей, людей вокруг и планеты. Наши продукты помогают организму жить в ресурсе — на уровне клетки, гормона, ощущения. Создавая Тоники, мы основываемся на человечности по отношению к самим себе, другим людям и природе.', 'Наша философия:');

-- --------------------------------------------------------

--
-- Структура таблицы `articles`
--

CREATE TABLE `articles` (
  `id` int NOT NULL,
  `title` varchar(512) DEFAULT NULL,
  `tag` varchar(255) DEFAULT NULL,
  `image` varchar(512) DEFAULT NULL,
  `link` varchar(512) DEFAULT NULL,
  `blog_id` int NOT NULL,
  `type` enum('large','medium','small') DEFAULT NULL,
  `date_published` date DEFAULT NULL,
  `excerpt` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `articles`
--

INSERT INTO `articles` (`id`, `title`, `tag`, `image`, `link`, `blog_id`, `type`, `date_published`, `excerpt`) VALUES
(1, 'Название статьи название статьи название статьи название статьи название статьи название статьи', '#Текст', 'blog-1.svg', '#', 1, 'large', '2025-07-10', 'Текст статьи текст статьи текст статьи текст статьи текст статьи текст статьи текст статьи текст статьи текст статьи текст статьи текст статьи текст текст статьи текст статьи'),
(2, 'Название статьи название статьи название статьи', '#Текст текст', 'blog-2.svg', '#', 1, 'medium', '2025-07-10', 'Текст статьи текст статьи текст статьи текст статьи текст статьи текст статьи текст статьи текст статьи текст статьи текст статьи текст статьи текст текст статьи текст статьи'),
(3, 'Название статьи название статьи название статьи', '#Текст текст', 'blog-3.svg', '#', 1, 'medium', '2025-07-10', 'Текст статьи текст статьи текст статьи текст статьи текст статьи текст статьи текст статьи текст статьи текст статьи текст статьи текст статьи текст текст статьи текст статьи'),
(4, 'Название статьи название статьи название статьи', '#Текст текст', 'blog-4.svg', '#', 1, 'medium', '2025-07-10', 'Текст статьи текст статьи текст статьи текст статьи текст статьи текст статьи текст статьи текст статьи текст статьи текст статьи текст статьи текст текст статьи текст статьи'),
(5, 'Название статьи название статьи название статьи', '#Текст текст', 'blog-5.svg', '#', 1, 'medium', '2025-07-10', 'Текст статьи текст статьи текст статьи текст статьи текст статьи текст статьи текст статьи текст статьи текст статьи текст статьи текст статьи текст текст статьи текст статьи'),
(6, 'Название статьи название статьи', '#Текст текст', 'photo-1.jpg', '#', 2, 'large', '2025-07-10', 'Текст статьи текст статьи текст статьи текст статьи текст статьи текст статьи текст статьи текст статьи текст статьи текст статьи текст статьи текст текст статьи текст статьи'),
(7, 'Название статьи название статьи', '#Текст текст', 'photo-2.jpg', '#', 2, 'medium', '2025-07-15', 'Текст статьи текст статьи текст статьи текст статьи текст статьи текст статьи текст статьи текст статьи текст статьи текст статьи текст статьи текст текст статьи текст статьи'),
(8, 'Название статьи название статьи', '#Текст текст', 'photo-3.jpg', '#', 2, 'medium', '2025-07-16', 'Текст статьи текст статьи текст статьи текст статьи текст статьи текст статьи текст статьи текст статьи текст статьи текст статьи текст статьи текст текст статьи текст статьи');

-- --------------------------------------------------------

--
-- Структура таблицы `blog_articles`
--

CREATE TABLE `blog_articles` (
  `id` int NOT NULL,
  `title` varchar(512) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `blog_articles`
--

INSERT INTO `blog_articles` (`id`, `title`) VALUES
(1, 'БЛОГ'),
(2, 'Читать подробнее');

-- --------------------------------------------------------

--
-- Структура таблицы `cms_pages`
--

CREATE TABLE `cms_pages` (
  `id` bigint NOT NULL,
  `slug` varchar(255) NOT NULL,
  `title` text,
  `description` text,
  `placeholder_name` varchar(255) DEFAULT NULL,
  `placeholder_email` varchar(255) DEFAULT NULL,
  `placeholder_message` varchar(255) DEFAULT NULL,
  `checkbox_label` varchar(255) DEFAULT NULL,
  `button_text` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `status` enum('draft','published','archived') NOT NULL DEFAULT 'published'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `cms_pages`
--

INSERT INTO `cms_pages` (`id`, `slug`, `title`, `description`, `placeholder_name`, `placeholder_email`, `placeholder_message`, `checkbox_label`, `button_text`, `created_at`, `updated_at`, `status`) VALUES
(1, 'contact_form', 'ПРИСОЕДИНЯЙТЕСЬ К НАШЕМУ\r\nДВИЖЕНИЮ ЗА ЗДОРОВЫЙ\r\nИ ОСОЗНАННЫЙ ОБРАЗ ЖИЗНИ.', 'Если вы являетесь представителями отрасли сельского хозяйства (земледелие, животноводство, птицеводство, рыбоводство) и разделяете наши ценности, мы приглашаем вас к сотрудничеству с командой Тоников Жизни.', 'Имя', 'Электронная почта', 'Сообщение', 'Подтверждаю согласие обработки персональных данных', 'Отправить сообщение', '2025-12-11 11:29:53', '2025-12-11 11:29:53', 'published');

-- --------------------------------------------------------

--
-- Структура таблицы `contact_form_submissions`
--

CREATE TABLE `contact_form_submissions` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(320) COLLATE utf8mb4_general_ci NOT NULL,
  `message` text COLLATE utf8mb4_general_ci NOT NULL,
  `consent_given` tinyint(1) NOT NULL DEFAULT '0',
  `ip_address` varchar(45) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `user_agent` varchar(512) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `status` enum('new','seen','in_progress','sent','closed') COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'new'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `hero_section`
--

CREATE TABLE `hero_section` (
  `id` int NOT NULL,
  `title_left` varchar(255) DEFAULT NULL,
  `title_right` varchar(255) DEFAULT NULL,
  `subtitle` text,
  `image_alt` varchar(255) DEFAULT NULL,
  `button1_text` varchar(100) DEFAULT NULL,
  `button1_primary` tinyint(1) DEFAULT NULL,
  `button2_text` varchar(100) DEFAULT NULL,
  `button2_primary` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `hero_section`
--

INSERT INTO `hero_section` (`id`, `title_left`, `title_right`, `subtitle`, `image_alt`, `button1_text`, `button1_primary`, `button2_text`, `button2_primary`) VALUES
(1, 'ТОНИК', 'ЖИЗНИ', 'Это и есть суть Природы', 'HeroImage.svg', 'Открыть каталог', 1, 'Узнать больше о продукте', 0);

-- --------------------------------------------------------

--
-- Структура таблицы `industries`
--

CREATE TABLE `industries` (
  `id` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `image` varchar(512) DEFAULT NULL,
  `description` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `industries`
--

INSERT INTO `industries` (`id`, `name`, `image`, `description`) VALUES
(1, 'ПРОМЫШЛЕННОСТЬ', 'industry.svg', 'Текст описания Текст описания Текст описания Текст описания Текст описания Текст описания'),
(2, 'СЕЛЬСКОЕ ХОЗЯЙСТВО', 'industry.svg', 'Текст описания…'),
(3, 'МЕДИЦИНА', 'industry.svg', 'Текст описания…'),
(4, 'КОСМЕТИКА', 'industry.svg', 'Текст описания…'),
(5, 'МЕДИЦИНА', 'industry.svg', 'Текст описания…'),
(6, 'БОТАНИКА', 'industry.svg', 'Текст описания…');

-- --------------------------------------------------------

--
-- Структура таблицы `ingredient_items`
--

CREATE TABLE `ingredient_items` (
  `id` int NOT NULL,
  `set_id` int NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `pos_x` varchar(10) DEFAULT NULL,
  `pos_y` varchar(10) DEFAULT NULL,
  `is_main` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `ingredient_items`
--

INSERT INTO `ingredient_items` (`id`, `set_id`, `name`, `pos_x`, `pos_y`, `is_main`) VALUES
(1, 1, 'ФУКУС', '10%', '20%', 0),
(2, 1, 'КОРБИКУЛА', '70%', '15%', 0),
(3, 1, 'АНФЕЛЬЦИЯ', '50%', '50%', 1),
(4, 1, 'ЛАМИНАРИЯ', '15%', '60%', 0),
(5, 1, 'ЗОСТЕРА', '80%', '55%', 0);

-- --------------------------------------------------------

--
-- Структура таблицы `ingredient_sets`
--

CREATE TABLE `ingredient_sets` (
  `id` int NOT NULL,
  `title` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `ingredient_sets`
--

INSERT INTO `ingredient_sets` (`id`, `title`) VALUES
(1, 'НАШИ ТОНИКИ');

-- --------------------------------------------------------

--
-- Структура таблицы `overlay_words`
--

CREATE TABLE `overlay_words` (
  `id` int NOT NULL,
  `text` varchar(100) DEFAULT NULL,
  `size` enum('small','medium','medium_small','main') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `placement_desktop` json DEFAULT NULL,
  `placement_tablet` json DEFAULT NULL,
  `placement_mobile` json DEFAULT NULL,
  `set_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `overlay_words`
--

INSERT INTO `overlay_words` (`id`, `text`, `size`, `placement_desktop`, `placement_tablet`, `placement_mobile`, `set_id`) VALUES
(1, 'ФУКУС', 'small', '{\"top\": \"15%\", \"left\": \"15%\"}', '{\"top\": \"11%\", \"left\": \"2%\"}', '{\"top\": \"0%\", \"left\": \"0%\"}', 1),
(2, 'КОРБИКУЛА', 'medium', '{\"top\": \"20%\", \"right\": \"10%\"}', '{\"top\": \"12%\", \"right\": \"0%\"}', '{\"top\": \"10%\", \"right\": \"0%\"}', 1),
(3, 'ЛАМИНАРИЯ', 'medium', '{\"left\": \"8%\", \"bottom\": \"25%\"}', '{\"left\": \"0%\", \"bottom\": \"12%\"}', '{\"left\": \"0%\", \"bottom\": \"0%\"}', 1),
(4, 'ЗОСТЕРА', 'medium_small', '{\"right\": \"15%\", \"bottom\": \"20%\"}', '{\"right\": \"0%\", \"bottom\": \"6%\"}', '{\"right\": \"0%\", \"bottom\": \"-5%\"}', 1),
(5, 'АНФЕЛЬЦИЯ', 'main', '{\"top\": \"50%\", \"left\": \"50%\", \"transform\": \"translate(-50%, -50%)\"}', '{\"top\": \"50%\", \"left\": \"50%\", \"transform\": \"translate(-50%, -50%)\"}', '{\"top\": \"50%\", \"left\": \"50%\", \"transform\": \"translate(-50%, -50%)\"}', 1);

-- --------------------------------------------------------

--
-- Структура таблицы `partners`
--

CREATE TABLE `partners` (
  `id` int NOT NULL,
  `title` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `partners`
--

INSERT INTO `partners` (`id`, `title`) VALUES
(1, 'НАШИ ПАРТНЕРЫ');

-- --------------------------------------------------------

--
-- Структура таблицы `partner_items`
--

CREATE TABLE `partner_items` (
  `id` int NOT NULL,
  `partner_id` int NOT NULL,
  `logo` varchar(512) DEFAULT NULL,
  `link` varchar(512) DEFAULT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `partner_items`
--

INSERT INTO `partner_items` (`id`, `partner_id`, `logo`, `link`, `name`) VALUES
(1, 1, 'partner-logo.svg', '#', 'Суверенный курс'),
(2, 1, 'partner-logo.svg', '#', 'Суверенный курс'),
(3, 1, 'partner-logo.svg', '#', 'Суверенный курс'),
(4, 1, 'partner-logo.svg', '#', 'Суверенный курс'),
(5, 1, 'partner-logo.svg', '#', 'Суверенный курс'),
(6, 1, 'partner-logo.svg', '#', 'Суверенный курс'),
(7, 1, 'partner-logo.svg', '#', 'Суверенный курс'),
(8, 1, 'partner-logo.svg', '#', 'Суверенный курс');

-- --------------------------------------------------------

--
-- Структура таблицы `philosophy_item`
--

CREATE TABLE `philosophy_item` (
  `id` int NOT NULL,
  `about_id` int NOT NULL,
  `term` varchar(100) DEFAULT NULL,
  `desc` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `philosophy_item`
--

INSERT INTO `philosophy_item` (`id`, `about_id`, `term`, `desc`) VALUES
(1, 2, 'Осознанность', 'Здоровье как образ жизни'),
(5, 2, 'Чистота', 'Никаких компромиссов в составе'),
(7, 2, 'Гармония', 'Восстановление на всех уровнях'),
(8, 2, 'Ответственность', 'К человеку, к природе, к знаниям');

-- --------------------------------------------------------

--
-- Структура таблицы `products`
--

CREATE TABLE `products` (
  `id` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `price` varchar(50) DEFAULT NULL,
  `image` varchar(512) DEFAULT NULL,
  `size` varchar(50) DEFAULT NULL,
  `category_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `image`, `size`, `category_id`) VALUES
(1, 'НАЗВАНИЕ', '1234', 'card2.svg', 'small', 1),
(2, 'НАЗВАНИЕ', '1234', 'card1.svg', 'big', 1),
(3, 'НАЗВАНИЕ', '1234', 'card1.svg', 'big', 1),
(4, 'НАЗВАНИЕ', '1234', 'card3.svg', 'small', 1),
(5, 'НАЗВАНИЕ', '1234', 'card4.svg', 'small', 1),
(6, 'название', '12432', 'ProductPhoto.jpg', 'small', 2),
(7, 'название', '12432', 'ProductPhoto.jpg', 'small', 2);

-- --------------------------------------------------------

--
-- Структура таблицы `product_categories`
--

CREATE TABLE `product_categories` (
  `id` int NOT NULL,
  `name` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `product_categories`
--

INSERT INTO `product_categories` (`id`, `name`) VALUES
(1, 'КАТАЛОГ'),
(2, 'Выберите подходящий Тоник для себя');

-- --------------------------------------------------------

--
-- Структура таблицы `product_info_cards`
--

CREATE TABLE `product_info_cards` (
  `id` int NOT NULL,
  `page_slug` varchar(100) NOT NULL,
  `card_order` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` json NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `product_info_cards`
--

INSERT INTO `product_info_cards` (`id`, `page_slug`, `card_order`, `title`, `content`) VALUES
(1, 'product-info', 1, 'Что такое Анфельция?', '[\"Анфельция Тобучинская — это красная водоросль, которая появилась на Планете задолго до того, как человек научился лечить. Она вобрала в себя силу стихий, минералов и первозданного солнца. Ее клеточная структура несёт в себе память о жизни в чистом виде.\", \"И когда эта структура входит в контакт с организмом — он настраивается. Без насилия, без побочных эффектов. Просто возвращается то, что было заложено природой.\"]'),
(2, 'product-info', 2, 'Как она действует?', '[{\"text\": \"Мы не говорим «лечит». Мы говорим: \", \"highlights\": [{\"text\": \"организм вспоминает\", \"highlighted\": true}]}, {\"text\": \". Организм — сложная система. И в нем есть всё, чтобы быть здоровым. Иногда нужно просто напомнить.\"}]'),
(3, 'product-info', 3, 'Анфельция:', '[{\"parts\": [{\"text\": \"помогает организму \"}, {\"text\": \"очищаться\", \"highlighted\": true}, {\"text\": \" от \"}, {\"text\": \"токсинов\"}, {\"text\": \", тяжёлых металлов и всего «лишнего»\"}]}, {\"parts\": [{\"text\": \"насыщает клетки \"}, {\"text\": \"энергией и минералами\", \"highlighted\": true}, {\"text\": \", ускоряя \"}, {\"text\": \"метаболизм\"}]}, {\"parts\": [{\"text\": \"поддерживает \"}, {\"text\": \"иммунитет\", \"highlighted\": true}, {\"text\": \", помогая телу быстрее восстанавливаться\"}]}, {\"parts\": [{\"text\": \"нормализует \"}, {\"text\": \"гормональный фон и работу нервной системы\", \"highlighted\": true}]}, {\"parts\": [{\"text\": \"улучшает усвоение пищи, \"}, {\"text\": \"баланс микрофлоры\", \"highlighted\": true}, {\"text\": \", процессы пищеварения\"}]}, {\"parts\": [{\"text\": \"возвращает \"}, {\"text\": \"психоэмоциональную устойчивость\", \"highlighted\": true}]}, {\"parts\": [{\"text\": \"помогает справиться с \"}, {\"text\": \"аллергией, усталостью, скачками давления, воспалениями, нарушениями сна и цикла\", \"highlighted\": true}]}]');

-- --------------------------------------------------------

--
-- Структура таблицы `seo_text`
--

CREATE TABLE `seo_text` (
  `id` int NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `text1` text,
  `text2` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `seo_text`
--

INSERT INTO `seo_text` (`id`, `title`, `text1`, `text2`) VALUES
(1, 'СЕО ТЕКСТ', 'Значимость этих проблем настолько очевидна, что новая модель организационной деятельности влечет за собой процесс внедрения и модернизации соответствующих условий активизации. Значимость этих проблем настолько очевидна, что высококачественный прототип будущего проекта предполагает независимые способы реализации приоретизации разума над эмоциями. Как принято считать, явные признаки победы институционализации призывают нас к новым свершениям, которые, в свою очередь, должны быть подвергнуты целой серии независимых исследований! С другой стороны, глубокий уровень погружения требует от нас анализа направлений прогрессивного развития! Лишь предприниматели в сети интернет, которые представляют собой яркий пример континентально-европейского типа политической культуры, будут объединены в целые кластеры себе подобных. Наше дело не так однозначно, как может показаться: синтетическое тестирование, в своём классическом представлении, допускает внедрение системы массового участия. Разнообразный и богатый опыт говорит нам, что сплочённость команды профессионалов играет важную роль в формировании форм воздействия. Вот вам яркий пример современных тенденций — дальнейшее развитие различных.', 'Вот вам яркий пример современных тенденций — дальнейшее развитие различных форм деятельности напрямую зависит от приоретизации разума над эмоциями. В своём стремлении повысить качество жизни, они забывают, что внедрение современных методик однозначно определяет каждого участника как способного принимать собственные решения касаемо как самодостаточных, так и внешне зависимых концептуальных решений. В целом, конечно, консультация с широким активом напрямую зависит от соответствующих условий активизации! Сложно сказать, почему тщательные исследования конкурентов могут быть объективно рассмотрены соответствующими инстанциями. Являясь всего лишь частью общей картины, диаграммы связей, превозмогая сложившуюся непростую экономическую ситуацию, ограничены исключительно образом мышления. Лишь сторонники тоталитаризма в науке объективно рассмотрены соответствующими инстанциями! С учётом сложившейся международной обстановки, постоянное информационно-пропагандистское обеспечение нашей деятельности предполагает независимые способы реализации кластеризации усилий. Кстати, активно развивающиеся страны третьего мира, инициированные исключительно синтетически, объединены в целые кластеры себе подобных.');

-- --------------------------------------------------------

--
-- Структура таблицы `site_navigation`
--

CREATE TABLE `site_navigation` (
  `id` bigint UNSIGNED NOT NULL,
  `label` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `url` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `sort_order` int NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `locale` varchar(6) COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'ru',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `site_navigation`
--

INSERT INTO `site_navigation` (`id`, `label`, `url`, `sort_order`, `is_active`, `locale`, `created_at`, `updated_at`) VALUES
(1, 'Каталог', '/catalog', 1, 1, 'ru', '2025-12-11 11:04:39', '2025-12-11 11:04:39'),
(2, 'Наши тоники', '/tonics', 2, 1, 'ru', '2025-12-11 11:04:39', '2025-12-11 11:04:39'),
(3, 'О компании', '/about', 3, 1, 'ru', '2025-12-11 11:04:39', '2025-12-11 11:04:39'),
(4, 'Сотрудничество', '/partners', 4, 1, 'ru', '2025-12-11 11:04:39', '2025-12-13 07:14:57'),
(5, 'Контакты', '/contacts', 5, 1, 'ru', '2025-12-11 11:04:39', '2025-12-11 11:04:39'),
(11, 'О продукте', '/product', 6, 1, 'ru', '2025-12-13 07:13:53', '2025-12-13 07:23:21'),
(12, 'Корзина', '/garbage', 6, 1, 'ru', '2025-12-13 07:13:53', '2025-12-13 07:13:53');

-- --------------------------------------------------------

--
-- Структура таблицы `tonics_hero`
--

CREATE TABLE `tonics_hero` (
  `id` int NOT NULL,
  `title_line1` varchar(128) COLLATE utf8mb4_general_ci NOT NULL,
  `title_line2` varchar(128) COLLATE utf8mb4_general_ci NOT NULL,
  `description` text COLLATE utf8mb4_general_ci NOT NULL,
  `image_url` varchar(256) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '/assets/Image/Earth.svg',
  `cta_text` varchar(100) COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'ОТКРЫТЬ КАТАЛОГ',
  `cta_link` varchar(256) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '/catalog',
  `is_active` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `tonics_hero`
--

INSERT INTO `tonics_hero` (`id`, `title_line1`, `title_line2`, `description`, `image_url`, `cta_text`, `cta_link`, `is_active`) VALUES
(1, 'Тоники', 'жизни', 'ТОНИКИ ЖИЗНИ — ЭТО РЕЛИКТОВЫЕ ТВОРЕНИЯ НАШЕЙ ПЛАНЕТЫ, СОЗДАННЫЕ И СОХРАНЕННЫЕ ПРИРОДОЙ ДЛЯ ВОССТАНОВЛЕНИЯ ЕСТЕСТВЕННЫХ НАСТРОЕК ЖИВЫХ ОРГАНИЗМОВ.', 'Earth.svg', 'ОТКРЫТЬ КАТАЛОГ', '/catalog', 1),
(2, 'АНФЕЛЬЦИЯ', 'Тоник жизни', 'Иногда, чтобы услышать себя, нужно просто замолчать. Иногда, чтобы восстановиться, нужно просто прикоснуться к тому, что живет миллионы лет в согласии с природой. Анфельция — это не про \"таблетки\" \"от чего-то\". Это про возвращение к себе. Про ту самую чистую версию организма, которая знает, как жить, как восстанавливаться, как быть в балансе.', 'Tonic.svg', 'Подробнее', '/tonics/anfell', 1);

-- --------------------------------------------------------

--
-- Структура таблицы `tonics_links`
--

CREATE TABLE `tonics_links` (
  `id` int NOT NULL,
  `tonics_section_id` int NOT NULL,
  `text` varchar(100) DEFAULT NULL,
  `href` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `tonics_links`
--

INSERT INTO `tonics_links` (`id`, `tonics_section_id`, `text`, `href`) VALUES
(1, 1, 'Фукус', '#'),
(2, 1, 'Корбикула', '#'),
(3, 1, 'Ламинария', '#'),
(4, 1, 'Зостера', '#'),
(5, 1, 'Андара', '#'),
(6, 1, 'Анфельция', '#'),
(7, 2, 'Все товары', '#'),
(8, 2, 'Акции', '#'),
(9, 2, 'Категория 1', '#'),
(10, 2, 'Категория 2', '#'),
(11, 2, 'Категория 3', '#'),
(12, 2, 'Категория 4', '#'),
(13, 3, 'Философия', '#'),
(14, 3, 'Производство', '#'),
(15, 3, 'Научные материалы', '#'),
(16, 3, 'Контакты', '#'),
(17, 3, 'FAQ', '#');

-- --------------------------------------------------------

--
-- Структура таблицы `tonics_section`
--

CREATE TABLE `tonics_section` (
  `id` int NOT NULL,
  `title` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `tonics_section`
--

INSERT INTO `tonics_section` (`id`, `title`) VALUES
(1, 'Наши тоники'),
(2, 'Каталог'),
(3, 'О компании');

-- --------------------------------------------------------

--
-- Структура таблицы `tonics_seo_text`
--

CREATE TABLE `tonics_seo_text` (
  `id` int NOT NULL,
  `page_slug` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `title` varchar(256) COLLATE utf8mb4_general_ci NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `locale` varchar(10) COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'ru',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `tonics_seo_text`
--

INSERT INTO `tonics_seo_text` (`id`, `page_slug`, `title`, `is_active`, `locale`, `created_at`, `updated_at`) VALUES
(1, 'tonics-seo-text', 'ОПИСАНИЕ ТОНИКОВ КАК ЯВЛЕНИЯ', 1, 'ru', '2025-12-11 10:48:01', '2025-12-11 10:48:01'),
(2, 'tonics-for-whom', 'Для кого Tonics?', 1, 'ru', '2025-12-13 07:46:03', '2025-12-13 07:46:03'),
(3, 'anfell-tonics', 'Анфельция — Тоник жизни', 1, 'ru', '2025-12-13 08:40:37', '2025-12-13 08:40:37');

-- --------------------------------------------------------

--
-- Структура таблицы `tonics_seo_text_block`
--

CREATE TABLE `tonics_seo_text_block` (
  `id` int NOT NULL,
  `tonics_seo_text_id` int NOT NULL,
  `block_order` int NOT NULL,
  `subtitle` varchar(256) COLLATE utf8mb4_general_ci NOT NULL,
  `text` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `highlight` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `tonics_seo_text_block`
--

INSERT INTO `tonics_seo_text_block` (`id`, `tonics_seo_text_id`, `block_order`, `subtitle`, `text`, `highlight`) VALUES
(5, 1, 1, 'Что такое Тоники Жизни?', 'Тоники Жизни — это не просто БАД или природный концентрат. Это реликтовые творения самой Земли — древние, живые субстанции, в которых сохранилась первозданная память о том, как устроена жизнь. Они действуют тонко, но глубоко: на клеточном, энергетическом и структурном уровнях.', NULL),
(6, 1, 2, 'Почему мы называем их реликтовыми?', 'Потому что это вещества, происхождение которых уходит корнями в глубины геологического времени. Они несут в себе информацию о первозданных настройках клетки — о том, какой она должна быть в идеале: здоровой, сильной, способной к саморегуляции и восстановлению. Именно к этим настройкам и стремится тело, получая «инструкцию» от Тоников.', NULL),
(7, 2, 1, '', 'Родители и дети', NULL),
(8, 2, 2, '', 'Беременные и восстанавливающиеся после рождения детей женщины', NULL),
(9, 2, 3, '', 'Люди с перегрузками: ментальными, физическими, гормональными', NULL),
(10, 2, 4, '', 'Мужчины, которые хотят быть на пике возможностей', NULL),
(11, 2, 5, '', 'Спортсмены, творцы, предприниматели', NULL),
(12, 2, 6, '', 'Те, кто просто чувствует: пора вернуть себя', 'вернуться к себе'),
(13, 2, 1, 'Для тех, кто чувствует, что организм требует поддержки.', NULL, NULL),
(14, 2, 2, 'Для тех, кто выбирает осознанный путь.', NULL, NULL),
(15, 2, 3, 'Для тех, кто хочет быть в контакте с собой, а не в поиске временных решений.', NULL, NULL),
(16, 3, 1, 'Подзаголовок блока', 'Здесь можно дополнить описание и ключевые преимущества Анфелия…', NULL);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `about_section`
--
ALTER TABLE `about_section`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `articles`
--
ALTER TABLE `articles`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `blog_articles`
--
ALTER TABLE `blog_articles`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `cms_pages`
--
ALTER TABLE `cms_pages`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Индексы таблицы `contact_form_submissions`
--
ALTER TABLE `contact_form_submissions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_created_at` (`created_at`),
  ADD KEY `idx_email` (`email`);

--
-- Индексы таблицы `hero_section`
--
ALTER TABLE `hero_section`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `industries`
--
ALTER TABLE `industries`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `ingredient_items`
--
ALTER TABLE `ingredient_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `set_id` (`set_id`);

--
-- Индексы таблицы `ingredient_sets`
--
ALTER TABLE `ingredient_sets`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `overlay_words`
--
ALTER TABLE `overlay_words`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `partners`
--
ALTER TABLE `partners`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `partner_items`
--
ALTER TABLE `partner_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `partner_id` (`partner_id`);

--
-- Индексы таблицы `philosophy_item`
--
ALTER TABLE `philosophy_item`
  ADD PRIMARY KEY (`id`),
  ADD KEY `about_id` (`about_id`);

--
-- Индексы таблицы `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`);

--
-- Индексы таблицы `product_categories`
--
ALTER TABLE `product_categories`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `product_info_cards`
--
ALTER TABLE `product_info_cards`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `seo_text`
--
ALTER TABLE `seo_text`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `site_navigation`
--
ALTER TABLE `site_navigation`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `tonics_hero`
--
ALTER TABLE `tonics_hero`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `tonics_links`
--
ALTER TABLE `tonics_links`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tonics_section_id` (`tonics_section_id`);

--
-- Индексы таблицы `tonics_section`
--
ALTER TABLE `tonics_section`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `tonics_seo_text`
--
ALTER TABLE `tonics_seo_text`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `page_slug` (`page_slug`);

--
-- Индексы таблицы `tonics_seo_text_block`
--
ALTER TABLE `tonics_seo_text_block`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tonics_seo_text_id` (`tonics_seo_text_id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `about_section`
--
ALTER TABLE `about_section`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT для таблицы `articles`
--
ALTER TABLE `articles`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT для таблицы `blog_articles`
--
ALTER TABLE `blog_articles`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `cms_pages`
--
ALTER TABLE `cms_pages`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `contact_form_submissions`
--
ALTER TABLE `contact_form_submissions`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `hero_section`
--
ALTER TABLE `hero_section`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `industries`
--
ALTER TABLE `industries`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT для таблицы `ingredient_items`
--
ALTER TABLE `ingredient_items`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT для таблицы `ingredient_sets`
--
ALTER TABLE `ingredient_sets`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `overlay_words`
--
ALTER TABLE `overlay_words`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT для таблицы `partners`
--
ALTER TABLE `partners`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT для таблицы `partner_items`
--
ALTER TABLE `partner_items`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT для таблицы `philosophy_item`
--
ALTER TABLE `philosophy_item`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT для таблицы `products`
--
ALTER TABLE `products`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT для таблицы `product_categories`
--
ALTER TABLE `product_categories`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `product_info_cards`
--
ALTER TABLE `product_info_cards`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `seo_text`
--
ALTER TABLE `seo_text`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `site_navigation`
--
ALTER TABLE `site_navigation`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT для таблицы `tonics_hero`
--
ALTER TABLE `tonics_hero`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `tonics_links`
--
ALTER TABLE `tonics_links`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT для таблицы `tonics_section`
--
ALTER TABLE `tonics_section`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `tonics_seo_text`
--
ALTER TABLE `tonics_seo_text`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `tonics_seo_text_block`
--
ALTER TABLE `tonics_seo_text_block`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `ingredient_items`
--
ALTER TABLE `ingredient_items`
  ADD CONSTRAINT `ingredient_items_ibfk_1` FOREIGN KEY (`set_id`) REFERENCES `ingredient_sets` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `partner_items`
--
ALTER TABLE `partner_items`
  ADD CONSTRAINT `partner_items_ibfk_1` FOREIGN KEY (`partner_id`) REFERENCES `partners` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `philosophy_item`
--
ALTER TABLE `philosophy_item`
  ADD CONSTRAINT `philosophy_item_ibfk_1` FOREIGN KEY (`about_id`) REFERENCES `about_section` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `product_categories` (`id`);

--
-- Ограничения внешнего ключа таблицы `tonics_links`
--
ALTER TABLE `tonics_links`
  ADD CONSTRAINT `tonics_links_ibfk_1` FOREIGN KEY (`tonics_section_id`) REFERENCES `tonics_section` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `tonics_seo_text_block`
--
ALTER TABLE `tonics_seo_text_block`
  ADD CONSTRAINT `tonics_seo_text_block_ibfk_1` FOREIGN KEY (`tonics_seo_text_id`) REFERENCES `tonics_seo_text` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
