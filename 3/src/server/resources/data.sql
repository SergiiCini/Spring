INSERT INTO customers (created_date, c_name, c_email, c_age) VALUES
(NOW(), 'Petro Kovalsky', 'petro87@gmail.com', 33),
(NOW(), 'Anna Ivanova', 'ann_lucky@gmail.com', 32),
(NOW(), 'Anton Ozirsky', 'toxa_15@gmail.com', 30),
(NOW(), 'Serhii Kozerovsky', 'kozer@gmail.com', 42),
(NOW(), 'Andrii Kozeletsky', 'hudzon@gmail.com', 36),
(NOW(), 'Tanya Kolomiets', 'tanya@gmail.com', 50),
(NOW(), 'Ivan Podduiev', 'johhny@gmail.com', 45),
(NOW(), 'Alex Romanenko', 'psixeya@gmail.com', 33);

INSERT INTO accounts (a_number, a_currency, a_balance) VALUES
('64c692de-5d03-4764-b152-4d22fee68e4f', 2, 15000),
('64c693de-5d03-4764-b152-4d22fee68e4f', 0, 800),
('64c694de-5d03-4764-b152-4d22fee68e4f', 1, 700),
('64c695de-5d03-4764-b152-4d22fee68e4f', 2, 0),
('64c696de-5d03-4764-b152-4d22fee68e4f', 0, 300),
('64c697de-5d03-4764-b152-4d22fee68e4f', 2, 12000),
('64c698de-5d03-4764-b152-4d22fee68e4f', 1, 1100),
('64c699de-5d03-4764-b152-4d22fee68e4f', 2, 8500),
('64c610de-5d03-4764-b152-4d22fee68e4f', 0, 550),
('64c612de-5d03-4764-b152-4d22fee68e4f', 0, 320),
('64c613de-5d03-4764-b152-4d22fee68e4f', 2, 43251),
('64c614de-5d03-4764-b152-4d22fee68e4f', 1, 16000),
('64c615de-5d03-4764-b152-4d22fee68e4f', 2, 24000),
('64c616de-5d03-4764-b152-4d22fee68e4f', 1, 800),
('64c617de-5d03-4764-b152-4d22fee68e4f', 0, 650),
('64c618de-5d03-4764-b152-4d22fee68e4f', 0, 1200),
('64c619de-5d03-4764-b152-4d22fee68e4f', 0, 850),
('64c620de-5d03-4764-b152-4d22fee68e4f', 2, 98000);

INSERT INTO acc_owners (customer_id, acc_id) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(6, 6),
(7, 7),
(8, 8),
(1, 9),
(2, 10),
(3, 11),
(3, 12),
(4, 13),
(6, 14),
(6, 15),
(7, 16),
(8, 17),
(1, 18);

INSERT INTO employer (e_address, e_name) VALUES
('Kyiv', 'P&G'),
('Kyiv', 'JSC Raiffeisen Bank'),
('Lviv', 'Epam'),
('Kyiv', 'Zeo Alliance'),
('Odessa', 'UKRGASBANK'),
('Dnipro', 'KFC'),
('Kyiv', 'McDonalds'),
('Kyiv', 'DAN.IT'),
('Kyiv', 'FOZZY-GROUP'),
('Kyiv', 'OTP Bank');

INSERT INTO employers_customers (employer_id, customer_id) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(6, 6),
(7, 7),
(8, 8),
(9, 1),
(10, 4);