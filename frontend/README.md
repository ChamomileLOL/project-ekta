# 🏛️ PROJECT EKTA

> "A Merit-Based Republic for Skill Verification and Opportunity Matching."

Project Ekta is a Full-Stack Web Application designed to verify citizens (users) and match them with opportunities based on merit and skills. It features a retro-terminal aesthetic and robust error handling for seamless user synchronization.

## 🚀 Live Demo

- **Frontend (Citizen Portal):** [https://project-ekta.vercel.app](https://project-ekta.vercel.app)
- **Backend (Republic API):** [https://project-ekta-api.onrender.com](https://project-ekta-api.onrender.com)

---

## 🛠️ Tech Stack

**The MERN Stack:**
- **MongoDB Atlas:** Cloud Database for citizen records.
- **Express.js:** Backend framework for routing and middleware.
- **React.js:** Frontend library for the "Green Terminal" UI.
- **Node.js:** Runtime environment.

**DevOps & Deployment:**
- **Vercel:** Frontend hosting.
- **Render:** Backend hosting.
- **Git:** Version control with robust `.gitignore` rules.

---

## ✨ Features

- **🛡️ Smart Registration (Upsert Logic):**
  - Users can register as citizens.
  - If a citizen already exists, the system automatically updates their skills instead of throwing an error.
  - Prevents duplicate database entries.
  
- **⚖️ Merit Check System:**
  - Secure routes that verify user tokens.
  - Matches verified citizens with opportunities based on their skill set.

- **🎨 Terminal UI:**
  - Custom dark-mode aesthetic with retro green fonts.
  - Real-time status logs (e.g., `> STATUS: CITIZEN VERIFIED`).

---

## ⚙️ Installation & Setup

Follow these steps to run the Republic locally.

### 1. Clone the Repository
```bash
git clone [https://github.com/YOUR_USERNAME/project-ekta.git](https://github.com/YOUR_USERNAME/project-ekta.git)
cd project-ekta
2. Backend SetupBashcd backend
npm install
Create a .env file in the backend folder:Code snippetPORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
Start the server:Bashnpm start
3. Frontend SetupBashcd ../frontend
npm install
npm start
📡 API EndpointsMethodEndpointDescriptionPOST/api/users/registerRegisters a new citizen or updates skills if they exist.GET/api/users/opportunitiesFetches merit-based jobs (Requires Token).GET/API Health Check.🤝 ContributingFork the repository.Create a new branch (git checkout -b feature/NewMerit).Commit your changes.Push to the branch.Open a Pull Request.