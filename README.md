# library-management
* **Set Database**

  const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'library',
  });

* **Create Table in database**

  CREATE DATABASE library;
  
  USE library;
  
  CREATE TABLE books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    copies INT NOT NULL
  );
  
  CREATE TABLE loans (
    id INT AUTO_INCREMENT PRIMARY KEY,
    book_id INT NOT NULL,
    user_id INT NOT NULL,
    borrowed_date DATETIME NOT NULL,
    returned_date DATETIME DEFAULT NULL,
    FOREIGN KEY (book_id) REFERENCES books(id)
  );

* **Run project**

  node app.js

* **Test API**

  ใช้ Postman เพื่อทดสอบ API:
  
    ดูรายชื่อหนังสือ: GET http://localhost:3000/api/books
    
    เพิ่มหนังสือ: POST http://localhost:3000/api/books (ส่ง JSON body)
    
    ค้นหาหนังสือ: GET http://localhost:3000/api/books/search?q=ชื่อหนังสือ
    
    ยืมหนังสือ: POST http://localhost:3000/api/loans/borrow (ส่ง JSON body)
    
    คืนหนังสือ: POST http://localhost:3000/api/loans/return (ส่ง JSON body)
    
    รายการหนังสือที่ยืมมากที่สุด: GET http://localhost:3000/api/loans/most-borrowed
