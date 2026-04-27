# ResoTrack 🚀  
### Smart Resource & Inventory Management System

![React](https://img.shields.io/badge/Frontend-React-blue)
![Node.js](https://img.shields.io/badge/Backend-Node.js-green)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen)
![License](https://img.shields.io/badge/License-Academic-orange)

> **Current Status:** Stable MVP | Demo Ready | Expandable Architecture

## 1. Project Overview

ResoTrack is a full-stack **Smart Resource & Inventory Management System** designed to simplify warehouse and organizational resource operations. It replaces inefficient manual methods such as spreadsheets, scattered records, and unstructured tracking systems.

The platform centralizes inventory control, request handling, stock monitoring, and role-based operations through a secure web interface. ResoTrack helps organizations improve accuracy, accountability, and operational efficiency.

---

## 2. Key Features

- **Role-Based Authentication**: Secure access control isolating Admin, Manager, and Staff functionalities.
- **Resource Catalog Management**: Comprehensive and organized inventory listing with full CRUD capabilities.
- **Request & Approval Workflow**: Streamlined end-to-end system for requesting, approving, allocating, and tracking resources.
- **Admin User Management**: Centralized control over employee accounts and access levels.
- **Notifications System**: In-app updates to keep users informed on request statuses.
- **Automated Low Stock Email Alerts**: Automatically sends email notifications when inventory reaches critical levels.
- **Dashboard Analytics**: Visual insights into inventory movement, request trends, and system metrics.

---

## 3. Role-Based Access Control

### 👑 Admin
- **System Authority**: Complete oversight of the entire platform.
- **User Management**: Create, update, or remove user accounts and manage roles.
- **Global Monitoring**: Access system-wide analytics, comprehensive reports, and all warehouse activities.

### 💼 Manager
- **Inventory Control**: Oversee stock levels, update resource details, and manage warehouse categories.
- **Approval Workflow**: Review, approve, or reject resource requests submitted by staff members.
- **Stock Monitoring**: Ensure optimal inventory levels and respond to low stock alerts.

### 👥 Staff
- **Resource Browsing**: View the available resource catalog and check stock availability.
- **Request Generation**: Submit forms to request needed inventory or equipment.
- **Status Tracking**: Monitor whether their requests are pending, approved, or rejected in real-time.

---

## 4. Tech Stack

**Frontend:**
- React.js (v18)
- Vite
- Redux Toolkit
- Tailwind CSS (v4)
- Recharts (Analytics)

**Backend:**
- Node.js
- Express.js
- RESTful APIs

**Database & Modeling:**
- MongoDB
- Mongoose ODM

**Authentication & Security:**
- JWT (JSON Web Tokens)
- bcryptjs

---

## 5. Installation & Setup

Follow these steps to run ResoTrack locally on your machine.

### Prerequisites
- Node.js installed
- MongoDB instance (local or Atlas)

### Step-by-Step Guide

1. **Clone the repository**
   ```bash
   git clone https://github.com/AkshitG0914/ResoTrack.git
   cd ResoTrack
   ```

2. **Install Dependencies**
   Open two terminal windows/tabs.
   
   *Terminal 1 (Backend):*
   ```bash
   cd backend
   npm install
   ```
   
   *Terminal 2 (Frontend):*
   ```bash
   cd frontend
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the `backend` directory and add the following keys:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_email_password
   ADMIN_EMAIL=your_email@gmail.com
   ```

4. **Start the Application**
   
   *Terminal 1 (Backend):*
   ```bash
   npm start
   ```
   
   *Terminal 2 (Frontend):*
   ```bash
   npm run dev
   ```

The application will be accessible at `http://localhost:5173`.

---

## 6. Seeder & Demo Data Setup

To easily explore the system, a backend seeder script is provided to populate your database with initial users and sample resources.

**How to run the seeder:**
Ensure your `.env` file is properly configured with your `MONGO_URI`. Then, run:
```bash
cd backend
node seeder.js
```
*Note: Running this command creates demo users and dummy inventory data.*

### Demo Credentials

Use these accounts to test the different role dashboards:

| Role | Email | Password |
| :--- | :--- | :--- |
| **Admin** | `admin@resotrack.com` | `password123` |
| **Manager** | `manager@resotrack.com` | `password123` |
| **Staff** | `employee@resotrack.com` | `password123` |

---

## 7. Screenshots

> *Note: If the `screenshots` folder is missing from your repository, create it in the root directory and add the corresponding images (e.g., `login.png`, `dashboard.png`).*

### Login / Authentication
![Login Screen](./screenshots/login.png)

### Main Dashboard
![Admin Dashboard](./screenshots/dashboard.png)

### Resource Management
![Resource Catalog](./screenshots/resources.png)

### Request Workflow
![Request Approvals](./screenshots/requests.png)

---

## 8. Future Enhancements

- 📧 **Email Onboarding**: Automated welcome and setup emails for new users.
- 📷 **Barcode / QR Scanning**: Quick resource checkout and tracking via mobile devices.
- 📊 **Advanced Analytics**: Deeper insights, predictive tracking, and exportable reports.
- ⚡ **Smart Real-Time Updates using WebSockets**: Live notifications and instant dashboard updates.
- 🏢 **Multi-warehouse Support**: Manage and transfer resources across different physical locations.
- 📋 **Audit Logs**: Immutable history of all critical system actions for compliance.

---

## 9. Team Members

- **Akshit** - [GitHub](https://github.com/AkshitG0914)
- **Lovish Bhateja** - [GitHub](https://github.com/placeholder)

---

## 10. Academic Submission Note

**Developed as a Final Year Major Project at Chitkara University.**  
This project demonstrates practical implementation of full-stack development, database management, authentication systems, and scalable inventory operations.

---

## 11. License

This project is intended for academic learning, evaluation, and demonstration purposes.
