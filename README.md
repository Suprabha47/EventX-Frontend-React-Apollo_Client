# 🎭 EventX Frontend

This is the frontend of **EventX**, a full-featured event management platform. Built using **React**, **Apollo Client**, and **React Bootstrap**, it connects to a GraphQL backend for event creation, registration, and management.

## 🔗 Backend Repo

To run this frontend, clone and configure the backend first:  
[👉 EventX Backend](https://github.com/Suprabha47/EventX-Backend-NodeJs-GraphQL-Apollo_Server)

---

## 🚀 Features

- Event listing, details, and booking
- Admin panel for managing events
- User authentication with JWT
- GraphQL integration via Apollo Client
- Responsive UI with React-Bootstrap

---

## 🛠️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Suprabha47/EventX-Frontend-React-Apollo_Client.git
cd EventX-Frontend
```

2. Install Dependencies
```
npm install
```

4. Configure Environment Variables
Create a .env file in the root directory and add the following:
```
REACT_APP_BACKEND_GRAPHQL_URI=http://localhost:4000
```
⚠️ Replace the URI if your backend is hosted elsewhere (e.g. Render, Railway, etc.)

▶️ Run the App
```
npm start
```

The frontend will launch at:
```
http://localhost:3000
```

🧭 Project Structure
```
├── src/
│   ├── components/       # UI components
│   ├── pages/            # Route-level components
│   ├── graphql/          # GraphQL queries & mutations
│   ├── utils/            # Token management, helpers
│   ├── App.js            # Main component
│   ├── index.js          # Entry point
├── public/
├── .env.example          # Environment config
```

⚙️ Key Technologies
React

Apollo Client

React Router

React Bootstrap

Formik (for forms)

GraphQL

  Thank You!
