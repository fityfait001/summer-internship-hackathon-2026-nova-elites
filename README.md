# summer-internship-hackathon-2026-nova-elites
Hackathon team repository for Nova Elites - [hackindia-team:summer-internship-hackathon-2026:nova-elites]

---

# LifeLine AI - Emergency Ambulance Response Platform

A modern AI-powered emergency response platform built to reduce ambulance response times, optimize allocation, and provide live tracking.

## Tech Stack
- **Frontend**: React.js, Vite, Tailwind CSS, Framer Motion, Zustand, React Router
- **Backend (Serverless)**: Firebase Authentication, Firestore Database

## Project Structure
- `/frontend` - Contains the Vite React application and Firebase configuration.

## Setup Instructions

### 1. Firebase Setup
1. Create a Firebase project and enable Authentication (Email/Password) and Firestore.
2. Navigate to `frontend/src/config/firebase.js`.
3. Replace the placeholder config with your actual Firebase project config.

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
