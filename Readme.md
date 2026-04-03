# Finance Dashboard Backend

## 📌 Overview

This project is a backend system for managing financial records with role-based access control.

It supports:

* User management
* Financial record tracking
* Dashboard summaries
* Secure API access

---

## 🏗 Architecture

The project follows a modular architecture:

* **Routes** → Handle API endpoints
* **Models** → Database operations
* **Middleware** → Authentication & authorization
* **Database** → SQLite for persistence

This separation improves:

* Maintainability
* Scalability
* Code readability

---

## 🔐 Authentication

* JWT-based authentication
* Token required for protected routes

---

## 👥 Roles

| Role    | Permissions    |
| ------- | -------------- |
| Viewer  | View records   |
| Analyst | View + summary |
| Admin   | Full access    |

---

## 💰 Financial Records

Each record contains:

* Amount
* Type (income/expense)
* Category
* Date

Supported operations:

* Create
* Read
* Filter by date/category/type

---

## 📊 Dashboard APIs

* Total income
* Total expenses
* Net balance

---

## 🔍 Filtering

Example:
GET /records?type=income&category=salary

---

## ⚠️ Validation & Error Handling

* Missing fields handled
* Invalid login handled
* Proper HTTP status codes used

---

## 🗄 Database

* SQLite used for simplicity
* Persistent storage via `better-sqlite3`

---

## 🚀 How to Run

1. Install dependencies

```
npm install
```

2. Start server

```
node server.js
```

3. Use Postman or frontend to test APIs

---

## 🎯 Why this Architecture?

* Separation of concerns
* Easy debugging
* Scalable for future features
* Industry standard backend design

---

## ✅ Features Completed

✔ User & Role Management
✔ Financial Records CRUD
✔ Filtering
✔ Dashboard Summary APIs
✔ Role-Based Access Control
✔ Validation & Error Handling
✔ Data Persistence

---

## 📌 Future Improvements

* Password hashing (bcrypt)
* Pagination
* Charts in frontend
* Advanced analytics
