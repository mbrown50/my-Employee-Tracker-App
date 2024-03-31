INSERT INTO Department (name)
VALUES  ("IT"),
  ("Properties"),
  ("Strategy"),
  ("Operations");

INSERT INTO Role (title, salary, department_id)
VALUES ("Developer", 101.99, 1),
  ("Engineer", 102.99, 2),
  ("Coder", 103.99, 3),
  ("Tester", 104.99, 4);

INSERT INTO Employee (first_name, last_name, role_id, manager_id)
VALUES ("Melissa", "Brown", 1, NULL),
  ("Adam", "Barrett", 2 , 1), 
  ("Chad", "Daniels", 3 , 2), 
  ("Erin", "Frank", 4, 3);
