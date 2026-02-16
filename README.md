# 🚀 PingUp: Real-Time Video Conferencing Reimagined

**PingUp** is a high-performance, full-stack video conferencing application designed for seamless 1-on-1 and group communication. Built with a modern tech stack, it leverages **WebRTC** for peer-to-peer media streaming and **Socket.io** for real-time signaling, providing a smooth, low-latency experience similar to Zoom or Google Meet.

---

## ✨ Key Features

-   **📽️ High-Quality Video Calls**: Crystal clear peer-to-peer video and audio streaming using WebRTC.
-   **🖥️ Screen Sharing**: share your screen instantly with other participants for presentations or collaboration.
-   **💬 Real-Time Chat**: Integrated instant messaging within the meeting room to share links and notes.
-   **🔐 Secure Authentication**: Robust user registration and login system with encrypted password storage.
-   **📅 Meeting History**: Keep track of all your past meetings and easily re-join if needed.
-   **🎨 Premium UI/UX**: A sleek, responsive dashboard built with Material UI (MUI) and modern design principles.
-   **🌓 Responsive Design**: Works seamlessly across desktops, tablets, and mobile devices.

---

## 🛠️ Tech Stack

### Frontend
-   **React.js (Vite)**: Modern UI framework for a fast and reactive user experience.
-   **Material UI (MUI)**: For a premium, professional design system.
-   **Socket.io-Client**: Real-time communication for signaling and chat.
-   **Axios**: For handling API requests to the backend.

### Backend
-   **Node.js & Express**: Scalable server-side logic and RESTful API.
-   **Socket.io**: Acts as the signaling server to coordinate WebRTC connections.
-   **MongoDB & Mongoose**: Secure data persistence for users and meeting records.
-   **Bcrypt**: Industry-standard password hashing.

---

## 🏗️ Architecture Overview

The application follows a **Decentralized Media Architecture**:
1.  **Signaling**: The Node.js server facilitates the initial "handshake" between users via Socket.io.
2.  **Peer-to-Peer (P2P)**: Once the handshake is complete, media data flows directly between users' browsers, minimizing latency and server load.
3.  **STUN/TURN**: Utilizes Google's STUN servers to navigate firewalls and NATs for reliable connections.

---

## 📂 Project Structure

```text
PingUp/
├── frontend/               # React + Vite application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Main application views (Video, Home, Auth)
│   │   ├── contexts/       # Authentication and global state management
│   │   └── utils/          # Helper functions and WebRTC logic
├── backend/                # Node.js + Express server
│   ├── src/
│   │   ├── controllers/    # Business logic and Socket management
│   │   ├── models/         # MongoDB schemas (User, Meeting)
│   │   ├── routes/         # Express API endpoints
│   │   └── app.js          # Server entry point
```

---

## 🚀 Getting Started

### Prerequisites
-   Node.js (v16+)
-   MongoDB instance (Local or Atlas)

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/bhavikcodes/PingUp.git
    cd PingUp
    ```

2.  **Setup Backend**:
    ```bash
    cd backend
    npm install
    # Create a .env file with PORT and MONGODB_URI
    npm start
    ```

3.  **Setup Frontend**:
    ```bash
    cd ../frontend
    npm install
    # Create a .env file with VITE_SERVER_URL
    npm run dev
    ```

---

## 🛡️ License
Distributed under the ISC License. See `LICENSE` for more information.

---

Developed with ❤️ by [Bhavik Jain](https://github.com/bhavikcodes)
