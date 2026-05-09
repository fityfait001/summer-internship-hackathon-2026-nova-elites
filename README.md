# LifeLine AI - Emergency Ambulance Response Platform

A modern AI-powered emergency response platform built to reduce ambulance response times, optimize allocation, and provide live tracking.

## Tech Stack
- **Frontend**: React.js, Vite, Tailwind CSS, Framer Motion, Zustand, React Router
- **Backend**: Node.js, Express.js, MongoDB, Socket.io, JWT Authentication

## Project Structure
- `/frontend` - Contains the Vite React application.
- `/backend` - Contains the Node.js Express server.

## Setup Instructions

### 1. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Ensure the `.env` file in `/backend` contains your MongoDB URI, JWT Secret, and OpenAI API Key.
4. Run the development server:
   ```bash
   npm run dev
   # (or node index.js)
   ```

### 2. Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

## Deployment Instructions

### Frontend (Vercel)
1. Push the repository to GitHub.
2. Go to Vercel and import the project.
3. Set the Root Directory to `frontend`.
4. Vercel will automatically detect Vite and configure the build settings.
5. Deploy.

### Backend (Render / Railway)
1. Create a new Web Service on Render or Railway.
2. Connect your GitHub repository.
3. Set the Root Directory to `backend`.
4. Set the Build Command to `npm install` and Start Command to `node index.js`.
5. Add the necessary Environment Variables (`MONGO_URI`, `JWT_SECRET`, etc.).
6. Deploy.
