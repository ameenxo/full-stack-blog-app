# Social Blog App 📸✍️

A full-stack social blogging platform where users can create, view, like, and comment on blog posts — styled similar to Instagram.

## 🚀 Features

- 🔐 User Authentication (Login/Register)
- 📝 Create, Edit, and Delete Blog Posts
- 📷 Upload Images with Posts
- ❤️ Like & 💬 Comment on Posts
- 👤 User Profile Page (View own posts)
- 🎨 Instagram-style UI with responsive cards
- 🗑 Delete own comments

## 🧱 Tech Stack

### Frontend

- **Next.js / React**
- **Tailwind CSS** for styling
- **Axios** for API requests
- **React Context API** for user and blog state

### Backend

- **Node.js + Express**
- **MongoDB** for storing data
- **Multer** for image upload
- **Cookie-based Auth** (No JWT)

## ⚙️ Requirements

Make sure you have the following installed on your machine before starting the project:

### 🔵 Backend

- **Node.js** (v20.11.1)
- **npm** (comes with Node.js 10.5.0)
- **MongoDB** (locally or using a cloud service like MongoDB Atlas)

### 🟣 Frontend

- **Node.js** (same as backend)
- **npm** or **yarn**

### 🟠 Optional Tools

- **Postman** – for testing API endpoints
- **VS Code** – recommended IDE
- **MongoDB Compass** – GUI for MongoDB (optional but helpful)

## 📂 Project Structure

```bash
/.
├── client/              # Frontend using Next.js
│   └── src/
│       ├── app/         # All routes and pages
│       ├── components/  # Reusable UI components
│       ├── Context/     # Auth and Blog Context
│       ├── types/       # TypeScript types
│       └── utility/     # Utility functions
│
├── server/              # Backend using Node.js & Express
│   ├── models/          # Mongoose schemas
│   ├── routes/          # API routes for auth, blogs, users
│   ├── middleware/      # Auth, image upload, validations
│   ├── utility/         # Custom utilities & helpers
│   ├── images/          # Stored blog images
│   └── server.js        # Entry point for backend

```

## 🛠️ installation

1. Clone the Repository

```
git clone https://github.com/ameenxo/full-stack-blog-app.git
```

2. Install Dependencies Backend (server)

```
cd server
npm install
```

3. Install Dependencies Frontend (client)

```
cd client
npm install
```

4. Setup Environment Variables
   In the server folder, create a .env file:

```
MONGO_URI=your_mongodb_uri
PORT=5000
```

5. Start Development Servers

```
# Start backend
cd server
npm run dev

# Start frontend (in new terminal)
cd ../client
npm run dev
```

Backend: http://localhost:5000

Frontend: http://localhost:5173

🧪 In Progress / Upcoming
🔄 Real-Time Messaging with Socket.IO

🗨️ Chat History and UI

🔔 Notifications (likes, comments, messages)

🚀 Production Deployment (Render + Vercel)
>>>>>>> README-setup

