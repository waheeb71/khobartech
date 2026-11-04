CREATE TABLE `audit_logs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`actor_id` int,
	`action` varchar(100) NOT NULL,
	`entity_type` varchar(100) NOT NULL,
	`entity_id` varchar(100),
	`details` json,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `audit_logs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `contact_inquiries` (
	`id` int AUTO_INCREMENT NOT NULL,
	`full_name` varchar(191) NOT NULL,
	`company` varchar(191),
	`email` varchar(191) NOT NULL,
	`phone` varchar(50),
	`service` varchar(191) NOT NULL,
	`budget` varchar(100),
	`description` text NOT NULL,
	`locale` varchar(5) NOT NULL DEFAULT 'ar',
	`status` enum('new','in_progress','closed') NOT NULL DEFAULT 'new',
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `contact_inquiries_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `content_items` (
	`id` int AUTO_INCREMENT NOT NULL,
	`type` enum('service','product','page','post','testimonial','portfolio') NOT NULL,
	`category` varchar(100),
	`slug` varchar(191) NOT NULL,
	`title_ar` varchar(255) NOT NULL,
	`title_en` varchar(255) NOT NULL,
	`excerpt_ar` text,
	`excerpt_en` text,
	`body_ar` text,
	`body_en` text,
	`image_key` varchar(500),
	`seo_title_ar` varchar(255),
	`seo_title_en` varchar(255),
	`seo_description_ar` text,
	`seo_description_en` text,
	`status` enum('draft','published','archived') NOT NULL DEFAULT 'draft',
	`display_order` int NOT NULL DEFAULT 0,
	`metadata` json,
	`published_at` timestamp,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `content_items_id` PRIMARY KEY(`id`),
	CONSTRAINT `content_items_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `media_assets` (
	`id` int AUTO_INCREMENT NOT NULL,
	`key` varchar(500) NOT NULL,
	`alt_ar` varchar(255),
	`alt_en` varchar(255),
	`mime_type` varchar(100) NOT NULL,
	`width` int,
	`height` int,
	`created_by` int,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `media_assets_id` PRIMARY KEY(`id`),
	CONSTRAINT `media_assets_key_unique` UNIQUE(`key`)
);
--> statement-breakpoint
CREATE TABLE `site_settings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`key` varchar(191) NOT NULL,
	`value` json NOT NULL,
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `site_settings_id` PRIMARY KEY(`id`),
	CONSTRAINT `site_settings_key_unique` UNIQUE(`key`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`open_id` varchar(191) NOT NULL,
	`email` varchar(191) NOT NULL,
	`name` varchar(191),
	`role` enum('owner','editor','viewer') NOT NULL DEFAULT 'viewer',
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_open_id_unique` UNIQUE(`open_id`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`)
);
