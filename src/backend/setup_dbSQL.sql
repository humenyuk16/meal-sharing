CREATE TABLE Meal (
    id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255), description TEXT, location VARCHAR(255), price DECIMAL(10, 2), when_datetime DATETIME, max_reservations INT, created_date DATETIME
);

CREATE TABLE Reservation (
    id INT AUTO_INCREMENT PRIMARY KEY, number_of_guests INT, meal_id INT, created_date DATETIME, contact_phonenumber VARCHAR(255), contact_name VARCHAR(255), contact_email VARCHAR(255), FOREIGN KEY (meal_id) REFERENCES Meal (id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE Review (
    id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255), description TEXT, meal_id INT, stars INT, created_date DATETIME, FOREIGN KEY (meal_id) REFERENCES Meal (id) ON UPDATE CASCADE ON DELETE CASCADE
);

INSERT INTO
    Meal (
        title, description, location, price, when_datetime, max_reservations, created_date
    )
VALUES (
        'Title', 'Description', 'location', 10.99, '2024-04-08 08:00:00', 20, '2024-04-07 10:00:00'
    );

INSERT INTO
    Reservation (
        number_of_guests, meal_id, created_date, contact_phonenumber, contact_name, contact_email
    )
VALUES (
        2, 1, '2024-04-07 12:00:00', '123456789', 'Person Full Name', 'kS5yT@example.com'
    );

-- Вставка даних в таблицю Review
INSERT INTO
    Review (
        title, description, meal_id, stars, created_date
    )
VALUES (
        'Review', 'Description', 1, 5, '2024-04-07 14:00:00'
    );