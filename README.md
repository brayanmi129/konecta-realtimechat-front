# Konecta ChatApp - Backend

Backend for a real-time chat application developed in **Node.js** using **Socket.IO**.  
Provides user connection management, private and group messaging, and file attachments.

---

## 📋 Client Requirement

The client requires a chat application that enables instant communication between employees,  
facilitating collaboration and problem-solving in real time. The application must be intuitive and easy to use.

---

## ✅ Implemented Features

### 1. User Management
- Requests a **nickname** when logging in (no password required).
- Adds the user to the list of connected users.
- Updates the list in real time using WebSockets.

### 2. Messaging
- Send and receive messages between two connected users.
- Differentiate between sent and received messages.
- Include date and time in each message.
- Support for sending files (e.g., images, PDFs).

### 3. Groups
- Create and display chat groups.
- Send and receive group messages in real time.

---

## 🛠️ Technologies Used

- **Backend:** Node.js + Express
- **Real-time communication:** Socket.IO
- **File handling:** Custom upload service
- **Containerization:** Docker
- **Environment management:** dotenv

---

## 🚀 Installation and Run

### 1. Clone the repository
```bash
git clone https://github.com/your-username/konecta-realtimechat-back.git
cd konecta-realtimechat-back
