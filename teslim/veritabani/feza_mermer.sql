-- =============================================================================
--  FEZA MERMER — VERİTABANI ŞEMASI VE BAŞLANGIÇ VERİSİ
--
--  MySQL 8 · Prisma ORM ile üretilmiştir
--  Üretim tarihi: 24.08.2026 22:50:58
--
--  KULLANIM:
--    mysql -u root -p < feza_mermer.sql
--  veya phpMyAdmin > İçe Aktar > bu dosyayı seçin
-- =============================================================================

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

CREATE DATABASE IF NOT EXISTS `feza_mermer`
  DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `feza_mermer`;

-- Tablolar varsa temizle (dosya yeniden çalıştırılabilir olsun diye)
DROP TABLE IF EXISTS `service_stone`;
DROP TABLE IF EXISTS `service_include`;
DROP TABLE IF EXISTS `contact_request`;
DROP TABLE IF EXISTS `project`;
DROP TABLE IF EXISTS `service`;
DROP TABLE IF EXISTS `stone`;
DROP TABLE IF EXISTS `category`;

-- =============================================================================
--  1) TABLO YAPILARI
-- =============================================================================

-- CreateTable
CREATE TABLE `category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `slug` VARCHAR(32) NOT NULL,
    `label` VARCHAR(64) NOT NULL,
    `sortOrder` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `category_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `stone` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(80) NOT NULL,
    `origin` VARCHAR(120) NULL,
    `description` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `stone_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `project` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `slug` VARCHAR(64) NOT NULL,
    `title` VARCHAR(160) NOT NULL,
    `image` VARCHAR(255) NOT NULL,
    `alt` TEXT NOT NULL,
    `location` VARCHAR(120) NULL,
    `featured` BOOLEAN NOT NULL DEFAULT false,
    `categoryId` INTEGER NOT NULL,
    `stoneId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `project_slug_key`(`slug`),
    INDEX `project_categoryId_idx`(`categoryId`),
    INDEX `project_stoneId_idx`(`stoneId`),
    INDEX `project_featured_idx`(`featured`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `service` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(160) NOT NULL,
    `summary` TEXT NOT NULL,
    `body` TEXT NOT NULL,
    `image` VARCHAR(255) NOT NULL,
    `alt` TEXT NOT NULL,
    `categoryId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `service_categoryId_key`(`categoryId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `service_include` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `text` VARCHAR(255) NOT NULL,
    `sortOrder` INTEGER NOT NULL DEFAULT 0,
    `serviceId` INTEGER NOT NULL,

    INDEX `service_include_serviceId_idx`(`serviceId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `service_stone` (
    `serviceId` INTEGER NOT NULL,
    `stoneId` INTEGER NOT NULL,

    INDEX `service_stone_stoneId_idx`(`stoneId`),
    PRIMARY KEY (`serviceId`, `stoneId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `contact_request` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(80) NOT NULL,
    `phone` VARCHAR(20) NOT NULL,
    `email` VARCHAR(120) NULL,
    `message` TEXT NOT NULL,
    `categoryId` INTEGER NULL,
    `status` ENUM('NEW', 'CONTACTED', 'QUOTED', 'WON', 'LOST') NOT NULL DEFAULT 'NEW',
    `emailSent` BOOLEAN NOT NULL DEFAULT false,
    `emailError` TEXT NULL,
    `note` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `contact_request_status_idx`(`status`),
    INDEX `contact_request_createdAt_idx`(`createdAt`),
    INDEX `contact_request_categoryId_idx`(`categoryId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `project` ADD CONSTRAINT `project_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `project` ADD CONSTRAINT `project_stoneId_fkey` FOREIGN KEY (`stoneId`) REFERENCES `stone`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `service` ADD CONSTRAINT `service_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `service_include` ADD CONSTRAINT `service_include_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `service`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `service_stone` ADD CONSTRAINT `service_stone_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `service`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `service_stone` ADD CONSTRAINT `service_stone_stoneId_fkey` FOREIGN KEY (`stoneId`) REFERENCES `stone`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `contact_request` ADD CONSTRAINT `contact_request_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `category`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

SET FOREIGN_KEY_CHECKS = 1;

-- =============================================================================
--  2) BAŞLANGIÇ VERİSİ
--  Kaynak: src/data/projects.ts ve src/data/services.ts
-- =============================================================================

-- Galeri kategorileri
INSERT INTO `category` (`id`, `slug`, `label`, `sortOrder`) VALUES
  (1, 'mutfak', 'Mutfak Tezgahı', 0),
  (2, 'banyo', 'Banyo & Lavabo', 1),
  (3, 'merdiven', 'Merdiven & Zemin', 2),
  (4, 'duvar', 'Duvar Kaplama', 3);

-- Çalışılan taş çeşitleri
INSERT INTO `stone` (`id`, `name`) VALUES
  (1, 'Emperador'),
  (2, 'Carrara'),
  (3, 'Silver Travertine'),
  (4, 'Granit Absolute Black'),
  (5, 'Beige Travertine'),
  (6, 'Calacatta'),
  (7, 'Toros Siyahı'),
  (8, 'Marmara Beyazı'),
  (9, 'Muğla Beyazı'),
  (10, 'Limra'),
  (11, 'Granit');

-- Galeri işleri (43 kayıt)
INSERT INTO `project` (`id`, `slug`, `title`, `image`, `alt`, `location`, `featured`, `categoryId`, `stoneId`, `updatedAt`) VALUES
  (1, 'mutfak-01', 'Ada tezgahlı geniş mutfak', '/images/projects/mutfak-01.jpg', 'Beyaz damarlı mermer ada tezgah, aynı taştan tezgah arası panel ve U şeklinde mutfak tezgahı', NULL, 1, 1, NULL, NOW(3)),
  (2, 'mutfak-02', 'Yandan inen bar tezgah', '/images/projects/mutfak-02.jpg', 'Altın damarlı beyaz mermerden bar tezgah, yan yüzü yere kadar inen tek parça kaplama', NULL, 0, 1, NULL, NOW(3)),
  (3, 'mutfak-03', 'L tezgah ve tezgah altı evye', '/images/projects/mutfak-03.jpg', 'Beyaz mermer L mutfak tezgahı, pencere önünde tezgah altı paslanmaz evye', NULL, 0, 1, NULL, NOW(3)),
  (4, 'mutfak-04', 'Tezgah ve tam boy arkalık', '/images/projects/mutfak-04.jpg', 'Mermer mutfak tezgahı ve dolap altına kadar uzanan tam boy tezgah arası panel', NULL, 0, 1, NULL, NOW(3)),
  (5, 'mutfak-05', 'Damar eşleştirmeli tezgah arası', '/images/projects/mutfak-05.jpg', 'Tezgahla arkalığın damarları eşleştirilmiş beyaz mermer mutfak uygulaması', NULL, 0, 1, NULL, NOW(3)),
  (6, 'mutfak-06', 'Uzun açıklıklı düz tezgah', '/images/projects/mutfak-06.jpg', 'Tek parça uzun mermer mutfak tezgahı ve gömme evye montajı', NULL, 0, 1, NULL, NOW(3)),
  (7, 'mutfak-07', 'Klasik mutfakta altın damarlı tezgah', '/images/projects/mutfak-07.jpg', 'Beyaz klasik mutfak dolaplarıyla altın damarlı mermer tezgah ve arkalık', NULL, 0, 1, NULL, NOW(3)),
  (8, 'mutfak-08', 'Pencere önü peninsula tezgah', '/images/projects/mutfak-08.jpg', 'Pencere önünden devam eden mermer peninsula tezgah ve yan kaplaması', NULL, 0, 1, NULL, NOW(3)),
  (9, 'mutfak-09', 'Köşe dönüşlü mutfak tezgahı', '/images/projects/mutfak-09.jpg', 'Köşe dönüşü eksiz çalışılmış mermer mutfak tezgahı ve evye boşluğu', NULL, 0, 1, NULL, NOW(3)),
  (10, 'mutfak-10', 'Ocak ve evye boşluklu tezgah', '/images/projects/mutfak-10.jpg', 'Ankastre ocak ve evye boşlukları açılmış beyaz mermer mutfak tezgahı', NULL, 0, 1, NULL, NOW(3)),
  (11, 'mutfak-11', 'Damlalıklı evye ve tezgah', '/images/projects/mutfak-11.jpg', 'Damlalık kanalı açılmış mermer mutfak tezgahı ve tezgah altı evye', NULL, 0, 1, NULL, NOW(3)),
  (12, 'mutfak-12', 'Ahşap dolapla beyaz tezgah', '/images/projects/mutfak-12.jpg', 'Ahşap desenli mutfak dolaplarıyla beyaz mermer tezgah ve uzatma raf', NULL, 0, 1, NULL, NOW(3)),
  (13, 'mutfak-13', 'Siyah granit tezgah', '/images/projects/mutfak-13.jpg', 'Beyaz klasik mutfak dolaplarıyla siyah granit tezgah ve tezgah altı lavabo', NULL, 0, 1, NULL, NOW(3)),
  (14, 'mutfak-14', 'Gömme evyeli beyaz tezgah', '/images/projects/mutfak-14.jpg', 'Beyaz mermer mutfak tezgahına açılmış dikdörtgen evye boşluğu ve aynı taştan tam boy tezgah arası panel', NULL, 0, 1, NULL, NOW(3)),
  (15, 'mutfak-15', 'Tam boy mermer arkalık', '/images/projects/mutfak-15.jpg', 'Gri damarlı beyaz mermer tezgah ve dolap altına kadar uzanan tam boy tezgah arası panel', NULL, 0, 1, NULL, NOW(3)),
  (16, 'mutfak-16', 'Ankastre ocaklı düz tezgah', '/images/projects/mutfak-16.jpg', 'Krem mutfak dolaplarıyla beyaz mermer tezgah, ankastre ocak boşluğu ve mermer arkalık', NULL, 0, 1, NULL, NOW(3)),
  (17, 'mutfak-17', 'Zeytin yeşili dolapla mermer tezgah', '/images/projects/mutfak-17.jpg', 'Parlak zeytin yeşili alt dolaplarla beyaz damarlı mermer mutfak tezgahı ve tezgah arası panel', NULL, 0, 1, NULL, NOW(3)),
  (18, 'mutfak-18', 'Yandan inen ada tezgah', '/images/projects/mutfak-18.jpg', 'Pencere önünde beyaz mermer ada tezgah, yan yüzü yere kadar inen tek parça kaplama', NULL, 0, 1, NULL, NOW(3)),
  (19, 'mutfak-19', 'Altın damarlı L tezgah', '/images/projects/mutfak-19.jpg', 'Beyaz klasik kapaklı mutfakta altın damarlı mermer L tezgah, ocak ve evye boşlukları açılmış', NULL, 1, 1, NULL, NOW(3)),
  (20, 'mutfak-20', 'Pencere önü evye tezgahı', '/images/projects/mutfak-20.jpg', 'Pencere önüne yerleştirilmiş evyeli beyaz mermer mutfak tezgahı ve gri üst dolaplar', NULL, 0, 1, NULL, NOW(3)),
  (21, 'mutfak-21', 'Ocak ve evye boşluklu tezgah', '/images/projects/mutfak-21.jpg', 'Beyaz mutfak dolaplarıyla açık renk mermer tezgah, ankastre ocak ve gömme evye boşlukları', NULL, 0, 1, NULL, NOW(3)),
  (22, 'mutfak-22', 'Uzun düz mutfak tezgahı', '/images/projects/mutfak-22.jpg', 'Beyaz klasik mutfak dolapları üzerinde tek parça uzun mermer tezgah ve gömme evye', NULL, 0, 1, NULL, NOW(3)),
  (23, 'mutfak-23', 'Yuvarlak evye boşluklu tezgah', '/images/projects/mutfak-23.jpg', 'Beyaz mermer mutfak tezgahına açılmış yuvarlak evye boşluğu, mermer arkalık ve davlumbaz', NULL, 0, 1, NULL, NOW(3)),
  (24, 'mutfak-24', 'Damlalıklı tek parça evye', '/images/projects/mutfak-24.jpg', 'Beyaz mermerden oyulmuş tek parça mutfak evyesi ve tezgaha açılmış damlalık kanalları, yakın çekim', NULL, 0, 1, NULL, NOW(3)),
  (25, 'mutfak-25', 'Pencere önü ada tezgah', '/images/projects/mutfak-25.jpg', 'Geniş pencereli mutfakta beyaz mermer ada tezgah ve yan yüzü yere inen kaplama', NULL, 0, 1, NULL, NOW(3)),
  (26, 'mutfak-26', 'Ahşap dolapla beyaz tezgah', '/images/projects/mutfak-26.jpg', 'Ahşap desenli alt dolaplarla beyaz mermer L mutfak tezgahı ve mermer zemin', NULL, 0, 1, NULL, NOW(3)),
  (27, 'mutfak-27', 'Siyah tezgah, beyaz dolap', '/images/projects/mutfak-27.jpg', 'Beyaz klasik mutfak dolaplarıyla siyah taş tezgah ve oval lavabo boşluğu', NULL, 0, 1, NULL, NOW(3)),
  (28, 'mutfak-28', 'Çift evyeli uzun tezgah', '/images/projects/mutfak-28.jpg', 'Gri mutfak dolapları üzerinde iki evye boşluğu açılmış uzun beyaz mermer tezgah ve arkalık', NULL, 0, 1, NULL, NOW(3)),
  (29, 'mutfak-29', 'Damar eşleştirmeli mutfak', '/images/projects/mutfak-29.jpg', 'Tezgahla arkalığın damarları eşleştirilmiş beyaz mermer mutfak, ankastre ocak montajlı', NULL, 0, 1, NULL, NOW(3)),
  (30, 'mutfak-30', 'Calacatta ada tezgahlı mutfak', '/images/projects/mutfak-30.jpg', 'Zeytin yeşili dolaplı geniş mutfakta calacatta mermer ada tezgah, U şeklinde tezgah ve tam boy arkalık', NULL, 1, 1, NULL, NOW(3)),
  (31, 'mutfak-31', 'Çay ocağı tezgahı', '/images/projects/mutfak-31.jpg', 'Beyaz dolaplar üzerinde gri granit çay ocağı tezgahı ve yuvarlak evye boşluğu', NULL, 0, 1, NULL, NOW(3)),
  (32, 'mutfak-32', 'Siyah mermer tezgah ve arkalık', '/images/projects/mutfak-32.jpg', 'Atölyede hazırlanmış beyaz damarlı siyah mermer mutfak tezgahı, gömme evye ve tek parça arkalık', NULL, 0, 1, NULL, NOW(3)),
  (33, 'mutfak-33', 'Uzun siyah tezgah', '/images/projects/mutfak-33.jpg', 'Tek parça uzun siyah mermer mutfak tezgahı, gömme evye ve aynı taştan arkalık', NULL, 0, 1, NULL, NOW(3)),
  (34, 'banyo-01', 'Tezgahtan oyma banyo lavabosu', '/images/projects/banyo-01.jpg', 'Mermer banyo tezgahına oyulmuş köşeli lavabo, aynı taştan arkalık ve yan bordür', NULL, 1, 2, NULL, NOW(3)),
  (35, 'banyo-02', 'Banyo tezgahı ve gömme lavabo', '/images/projects/banyo-02.jpg', 'Uzun mermer banyo tezgahı, tezgah altı oval lavabo ve arkalık kaplaması', NULL, 0, 2, NULL, NOW(3)),
  (36, 'banyo-03', 'Taştan oyma eğimli lavabo', '/images/projects/banyo-03.jpg', 'Gri mermerden tek parça oyulmuş eğimli banyo lavabosu, duvardan çıkan krom batarya ve aynı taştan tezgah', NULL, 0, 2, NULL, NOW(3)),
  (37, 'banyo-04', 'Sıra lavabo tezgahı', '/images/projects/banyo-04.jpg', 'Toplu kullanım alanında L şeklinde uzanan traverten tezgah ve arka arkaya yerleştirilmiş yedi gömme lavabo', NULL, 0, 2, NULL, NOW(3)),
  (38, 'merdiven-01', 'Siyah damarlı mermer merdiven', '/images/projects/merdiven-01.jpg', 'Siyah damarlı beyaz mermerden tek parça basamak ve rıhtlarla döşenmiş iç mekan merdiveni', NULL, 1, 3, NULL, NOW(3)),
  (39, 'merdiven-02', 'Tek parça basamak ve rıht', '/images/projects/merdiven-02.jpg', 'Montajı süren beyaz mermer merdiven, tek parça basamaklar ve küpeşte boşluğu', NULL, 0, 3, NULL, NOW(3)),
  (40, 'merdiven-03', 'Dış mekan taş merdiven', '/images/projects/merdiven-03.jpg', 'Bahçe girişinde gri doğal taştan dış mekan merdiveni ve yan süpürgelik', NULL, 0, 3, NULL, NOW(3)),
  (41, 'merdiven-04', 'Damar eşleştirmeli zemin', '/images/projects/merdiven-04.jpg', 'Gri mermer zemin plakalarının damar yönü eşleştirilerek dizilmesi', NULL, 0, 3, NULL, NOW(3)),
  (42, 'merdiven-05', 'Bahçe yolu taş kaplama', '/images/projects/merdiven-05.jpg', 'Bina kenarında traverten plakalarla döşenmiş dış mekan yürüme yolu', NULL, 0, 3, NULL, NOW(3)),
  (43, 'duvar-01', 'Salon televizyon duvarı', '/images/projects/duvar-01.jpg', 'Salonda damar eşleştirmeli mermer plakalarla kaplanmış televizyon duvarı ve gömme televizyon nişi', NULL, 1, 4, NULL, NOW(3));

-- Hizmetler
INSERT INTO `service` (`id`, `title`, `summary`, `body`, `image`, `alt`, `categoryId`, `updatedAt`) VALUES
  (1, 'Mutfak Tezgahı', 'Ada tezgah, tezgah arası panel ve damlalıklı evye montajı dahil, milimetrik ölçüyle hazırlanan mutfak tezgahları.', 'Mutfak tezgahı, evin en çok yıpranan yüzeyidir. Bu yüzden hem taşın cinsi hem de işçiliği fark yaratır. Yerinde lazer ölçüyle başlıyor, CNC tezgahta kesip pahını elde perdahlıyor ve montajı kendi ekibimizle yapıyoruz. Evye ve ocak boşlukları fabrikada açılır, mutfağınızda toz çıkmaz.', '/images/services/mutfak.jpg', 'Mermer mutfak tezgahı ve tezgah arası panel uygulaması', 1, NOW(3)),
  (2, 'Banyo & Lavabo', 'Banyo tezgahı, taştan oyma lavabo, duş alanı kaplaması ve gömme niş çözümleri.', 'Banyoda taş, sürekli suyla temas ettiği için doğru cinsi seçmek ve doğru emprenye etmek işin yarısıdır. Tezgah, lavabo, duş teknesi ve niş detaylarını aynı taştan çalışarak bütünlüklü bir görünüm elde ediyoruz. Tüm yüzeyler leke tutmaya karşı koruyucu ile kapatılarak teslim edilir.', '/images/services/banyo.jpg', 'Mermer banyo tezgahı ve taştan oyma lavabo', 2, NOW(3)),
  (3, 'Merdiven & Zemin', 'Basamak, rıht, süpürgelik, salon zemini, pencere denizliği ve kapı sövesi uygulamaları.', 'Merdiven ve zemin, bir mekânın ilk izlenimini belirler. Basamakları tek parça çalışıyor, ön kenarına kaymayı önleyen ince kanallar açıyoruz. Geniş zeminlerde damar yönünü baştan planlayarak plakaları eşleştiriyoruz — böylece ek yerleri belli olmaz, zemin tek parça gibi görünür.', '/images/services/merdiven.jpg', 'Mermer merdiven basamağı ve zemin kaplaması', 3, NOW(3));

-- Hizmet kapsam maddeleri
INSERT INTO `service_include` (`id`, `text`, `sortOrder`, `serviceId`) VALUES
  (1, 'Yerinde lazer ölçü ve şablon', 0, 1),
  (2, 'Ada tezgah ve uzun açıklıklı tezgahlar', 1, 1),
  (3, 'Tezgah arası panel (arkalık)', 2, 1),
  (4, 'Damlalıklı ve tezgah altı evye montajı', 3, 1),
  (5, 'Ocak, batarya ve priz boşluklarının açılması', 4, 1),
  (6, 'Kenar profili seçenekleri: düz, pah kırma, yarım daire', 5, 1),
  (7, 'Banyo tezgahı ve etajer', 0, 2),
  (8, 'Taştan oyma (tek parça) lavabo', 1, 2),
  (9, 'Duş alanı zemin ve duvar kaplaması', 2, 2),
  (10, 'Gömme şampuanlık nişi', 3, 2),
  (11, 'Küvet kenarı ve denizlik', 4, 2),
  (12, 'Su itici koruyucu uygulaması', 5, 2),
  (13, 'Tek parça basamak ve rıht', 0, 3),
  (14, 'Kaymaz kanal açma', 1, 3),
  (15, 'Salon ve hol zemin kaplaması', 2, 3),
  (16, 'Damar eşleştirmeli plaka dizilimi', 3, 3),
  (17, 'Süpürgelik ve küpeşte', 4, 3),
  (18, 'Pencere denizliği ve kapı sövesi', 5, 3);

-- Hizmet ↔ taş bağları (çoka-çok)
INSERT INTO `service_stone` (`serviceId`, `stoneId`) VALUES
  (1, 1),
  (1, 2),
  (1, 3),
  (1, 4),
  (2, 5),
  (2, 2),
  (2, 6),
  (2, 7),
  (3, 8),
  (3, 9),
  (3, 10),
  (3, 11);

-- contact_request tablosu bilerek boş bırakıldı:
-- teklif talepleri çalışma anında iletişim formundan yazılır.

-- =============================================================================
--  ÖZET
--    kategori        : 4
--    taş çeşidi      : 11
--    galeri işi      : 43
--    hizmet          : 3
--    kapsam maddesi  : 18
--    hizmet-taş bağı : 12
-- =============================================================================