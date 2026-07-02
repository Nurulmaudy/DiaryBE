CREATE TABLE `diaries` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(150) NOT NULL,
	`content` text NOT NULL,
	`mahasiswa_id` int NOT NULL,
	`mood_id` int NOT NULL,
	CONSTRAINT `diaries_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `moods` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(50) NOT NULL,
	`emoji` varchar(20) NOT NULL,
	CONSTRAINT `moods_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `mahasiswa` (
	`id` int AUTO_INCREMENT NOT NULL,
	`nim` varchar(20) NOT NULL,
	`nama` varchar(100) NOT NULL,
	`jurusan` varchar(100) NOT NULL,
	`semester` int NOT NULL,
	`pin_hash` varchar(255) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `mahasiswa_id` PRIMARY KEY(`id`),
	CONSTRAINT `mahasiswa_nim_unique` UNIQUE(`nim`)
);
--> statement-breakpoint
ALTER TABLE `diaries` ADD CONSTRAINT `diaries_mahasiswa_id_mahasiswa_id_fk` FOREIGN KEY (`mahasiswa_id`) REFERENCES `mahasiswa`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `diaries` ADD CONSTRAINT `diaries_mood_id_moods_id_fk` FOREIGN KEY (`mood_id`) REFERENCES `moods`(`id`) ON DELETE no action ON UPDATE no action;