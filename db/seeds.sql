INSERT INTO department (depName)
VALUES
("IT"),
("Management"),
("Developers"),
("Accounting"),
("HR"),
("Marketing");

INSERT INTO role (title, salary, department_id)
VALUES
("System Administrator", 75000.00, 1),
("Developer", 120000, 3),
("Senior Developer", 150000, 3),
("Junior Accoutant", 50000, 4),
("Accountant", 75000, 4),
("Senior executive", 200000, 2),
("CEO", 300000, 2),
("Service engineer", 85000.00, 1),
("Assistent", 50000, 5),
("Socila Media Coordinator", 90000, 6),
("Copywriter", 45000, 6);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUES
  ("Ronald", "Firbank", NULL, 1),
  ("Virginia", "Woolf", NULL, 1),
  ("Piers", "Gaveston", NULL, 2),
  ("Charles", "LeRoi", 1, 2),
  ("Katherine", "Mansfield", 2, 3),
  ("Dora", "Carrington", NULL, 4),
  ("Edward", "Bellamy", NULL, 5),
  ("Virginia", "Sam", 4, 6),
  ("John", "Jonson", NULL, 5),
  ("Montague", "Cobe", NULL, 5),
  ("Octavia", "Fox", NULL, 6),
  ("Veronica", "Brennson", NULL, 1),
  ("Piers", "Jonson", NULL, 7),
  ("Charles", "Boomer", 1, 8),
  ("Octavia", "Monaco", 2, 4),
  ("Dora", "Chelton", NULL, 4),
  ("Ronald", "Blake", NULL, 10),
  ("Katherine", "Monakko", 4, 9),
  ("Virginia", "McCoy", NULL, 5),
  ("Montague", "Summers", NULL, 10),
  ("Octavia", "Butler", NULL, 11),
  ("Unica", "Zurn", NULL, 11);