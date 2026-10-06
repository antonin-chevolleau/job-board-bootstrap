INSERT INTO companies (name) VALUES ('Acme'), ('Globex');
INSERT INTO categories (name) VALUES ('IT'), ('Bank');

INSERT INTO ads (title, description, company_id, category_id) VALUES
('Fullstack Developer', 'Join our team to build and maintain web applications, from the database to the user interface.', 1, 1),
('SOC Analyst', 'Monitor security alerts, investigate incidents and help protect our systems around the clock.', 2, 1),
('Product Manager', 'Define the roadmap of our banking products and coordinate the work between teams and customers.', 1, 2);

INSERT INTO people (name) VALUES ('John'), ('Jane'), ('Harry');

INSERT INTO applications (person_id, ad_id, message) VALUES
(1, 1, 'Hello, I have three years of experience with JavaScript and Node.js, and I would love to join your team as a Fullstack Developer.'),
(2, 1, 'Hi, I am a web developer who enjoys working on both frontend and backend. Please find my application for the Fullstack Developer position.'),
(1, 3, 'Hello, I am interested in the Product Manager role. I like turning customer needs into clear priorities for a team.');
