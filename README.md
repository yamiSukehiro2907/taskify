# Taskify - Personal Task Management API

A comprehensive REST API for managing personal tasks with user authentication, built with Express.js and MongoDB. This API provides secure user registration, authentication, and full CRUD operations for task management with categorization support.

---

## 🚀 Live API

**Base URL:** `https://taskify-production-d019.up.railway.app`

---

## 📋 Features

- **User Authentication:** Secure registration and login with JWT tokens.
- **Task Management:** Create, read, update, and delete tasks.
- **Task Categorization:** Organize tasks by categories (e.g., work, personal, school).
- **User-Specific Data:** Each user can only access their own tasks.
- **RESTful Design:** Clean and intuitive API endpoints.
- **MongoDB Integration:** Scalable NoSQL database storage.

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas
- **Authentication:** JWT (JSON Web Tokens)
- **Hosting:** Railway
- **Environment:** dotenv for configuration

---

## 📊 Data Models

### User Model

```javascript
{
  _id: ObjectId,
  name: string,
  email: string (unique),
  passwordHash: string,
  createdAt: Date
}
````

### Task Model

```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref User),
  title: string,
  description?: string,
  category: string,
  isDone: boolean (default: false),
  createdAt: Date,
  updatedAt: Date
}
```

-----

## 🔗 API Endpoints

### Authentication

  - `POST /api/auth/register` - Register a new user
  - `POST /api/auth/login` - User login
  - `POST /api/auth/logout` - User logout
  - `GET /api/user/profile` - Get user profile (requires authentication)

### Task Management

  - `GET /api/tasks/my-tasks` - Get all tasks for the authenticated user
  - `POST /api/tasks/create` - Create a new task
  - `PATCH /api/tasks/tasks/:id` - Update a task's status
  - `DELETE /api/tasks/tasks/:id` - Delete a task

-----

## 📱 Testing with Postman

### Import Collection

Access the complete Postman collection with all endpoints, examples, and documentation:
📥 [Import Taskify Postman Collection](https://vimalkumaryadav-9830010.postman.co/workspace/Vimal-Kumar-Yadav's-Workspace~449c202d-8c75-4dfb-8309-a6abf7015660/collection/45089730-912e78b5-ae64-4184-a9dd-0ddecb67f5e0?action=share&creator=45089730&active-environment=45089730-e8bb50d0-ad9f-461c-94af-4060020a2ee4)

### Cookie Configuration in Postman

  - **Enable Cookie Handling:** Postman automatically manages cookies.
  - **Login First:** Cookies are set after a successful login.
  - **Automatic Authentication:** Subsequent requests use stored cookies.
  - **No Manual Headers:** Authentication is handled automatically.

### Environment Setup

The collection includes:

  - Pre-configured base URL
  - Automatic cookie management
  - Complete request/response examples
  - Detailed documentation for each endpoint

-----

## 🚀 Quick Start

### 1\. Register a User

`POST https://taskify-production-d019.up.railway.app/api/auth/register`
**Headers:** `Content-Type: application/json`

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

### 2\. Login (Receives Cookies)

`POST https://taskify-production-d019.up.railway.app/api/auth/login`
**Headers:** `Content-Type: application/json`

```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response includes:**

```
Set-Cookie: accessToken=...; HttpOnly; Secure; SameSite=Strict; Max-Age=900
Set-Cookie: refreshToken=...; HttpOnly; Secure; SameSite=Strict; Max-Age=604800
```

### 3\. Create a Task (Cookies Auto-Sent)

`POST https://taskify-production-d019.up.railway.app/api/tasks/create`
**Headers:** `Content-Type: application/json`

```json
{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "category": "personal"
}
```

### 4\. Get Your Tasks (Authenticated via Cookies)

`GET https://taskify-production-d019.up.railway.app/api/tasks/my-tasks`
**Note:** No manual Authorization header is needed; cookies handle authentication.

-----

## 🔒 Authentication

This API uses **JWT (JSON Web Tokens)** for authentication with secure, HTTP-only cookies for token storage.

### Authentication Flow

1.  **Register/Login:** Receive access and refresh tokens as secure cookies.
2.  **Automatic Token Handling:** Cookies are automatically sent with subsequent requests.
3.  **Token Refresh:** Refresh tokens automatically rotate access tokens.
4.  **Secure Storage:** Tokens are stored in HTTP-only cookies, protecting against XSS attacks.

### Cookie-Based Authentication

  - `accessToken`: A short-lived token (15 minutes) for API access.
  - `refreshToken`: A long-lived token (7 days) for token rotation.
  - **Automatic handling:** No manual token management is required on the client side.
  - **Secure flags:** `HTTP-only`, `Secure`, and `SameSite` protection are enabled.

-----

## 🔧 Cookie Security Features

### HTTP-Only Cookies

  - **XSS Protection:** Cookies are inaccessible via JavaScript.
  - **Secure Flag:** Only sent over HTTPS connections.
  - **SameSite Policy:** Prevents **CSRF (Cross-Site Request Forgery)** attacks.
  - **Automatic Expiry:** Access tokens expire in 15 minutes.

### Token Rotation

When an `accessToken` expires, the `refreshToken` is used to automatically issue a new `accessToken` without requiring the user to log in again. The `refreshToken` itself is also rotated for enhanced security.

-----

## 📝 Usage Examples

### Filter Tasks by Category

`GET /api/tasks/my-tasks?category=work`

### Update Task Status

`PATCH /api/tasks/tasks/:id`
**Headers:** `Content-Type: application/json`

```json
{
  "isDone": true
}
```

### Delete a Task

`DELETE /api/tasks/tasks/:id`

-----

## 🏗️ Local Development

### Prerequisites

  - Node.js (v14 or higher)
  - MongoDB Atlas account
  - Git

### Setup

1.  **Clone the repository:**
    `git clone https://github.com/yamiSukehiro2907/taskify`
    `cd taskify_backend`

2.  **Install dependencies:**
    `npm install`

3.  **Create environment variables:**
    `cp .env.example .env`
    Add your MongoDB URI and JWT secret to the `.env` file.

4.  **Start the development server:**
    `npm run dev`

### Environment Variables

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/taskify
JWT_SECRET=your-super-secret-jwt-key
PORT=8000
NODE_ENV=development
```

-----

## 🚦 API Response Codes

  - `200` - Success
  - `201` - Created successfully
  - `400` - Bad request
  - `401` - Unauthorized
  - `404` - Not found
  - `500` - Server error

-----

## 🔧 Error Handling

All endpoints return consistent error responses in the following format:

```json
{
  "error": "Error message",
  "details": "Additional error details"
}
```

-----

## 📈 Future Enhancements

  - Task due dates and reminders
  - Task priority levels
  - Collaborative tasks (sharing)
  - File attachments
  - Advanced filtering and search
  - Task analytics and reports

-----

## 🤝 Contributing

  - Fork the repository
  - Create a feature branch (`git checkout -b feature/amazing-feature`)
  - Commit your changes (`git commit -m 'Add some amazing feature'`)
  - Push to the branch (`git push origin feature/amazing-feature`)
  - Open a Pull Request

-----

## 📄 License

This project is licensed under the MIT License - see the `LICENSE` file for details.

-----

## 👤 Author

**Vimal Kumar Yadav**

  - **GitHub:** [@yamiSukehiro2907](https://github.com/yamiSukehiro2907)
  - **Email:** `vimalyadavkr001@gmail.com`

-----

## 🙏 Acknowledgments

  - Express.js team for the amazing framework
  - MongoDB for the robust database solution
  - Railway for seamless deployment
  - Postman for excellent API testing tools

-----

⭐ Star this repository if you find it helpful\!
📧 Questions? Feel free to open an issue or contact me directly.

```
