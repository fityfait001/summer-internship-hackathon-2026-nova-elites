# 🚑 LifeLine AI - Emergency Ambulance Response Platform

[![Hackathon](https://img.shields.io/badge/Hackathon-HackIndia_2026-blue)](https://hackindia.xyz)
[![Team](https://img.shields.io/badge/Team-Nova_Elites-orange)](#team-nova-elites)

## 📌 Problem Statement
During critical emergencies, every second matters. Traditional ambulance dispatch systems often struggle with inefficient routing, lack of real-time tracking for patients, and manual severity assessment. This leads to delayed response times and potentially loss of life.

## 💡 Our Solution
LifeLine AI is a modern, AI-powered emergency response platform built to reduce ambulance response times, optimize allocation, and provide live tracking. It seamlessly connects patients in need with the nearest available drivers and alerts hospitals instantly.

## ✨ Features
- **Instant SOS**: One-tap emergency alert that notifies nearby drivers and hospitals.
- **Smart Routing**: (Future Scope) AI calculates the fastest route avoiding traffic.
- **Real-Time Live Tracking**: Drivers can accept emergencies and patients can track their status.
- **Hospital Dashboard**: Live feed for hospitals to monitor incoming patients and prepare beds.
- **Premium UI/UX**: Built with modern glassmorphism and smooth framer-motion animations.

## 🛠 Tech Stack
- **Frontend**: React.js, Vite, Tailwind CSS, Framer Motion, Zustand, React Router, Lucide React
- **Backend (Serverless)**: Firebase Authentication, Firestore Database
- **Deployment**: GitHub (Source Code), Vercel (Frontend)

## 🚀 Installation Steps

### 1. Firebase Setup
1. Create a Firebase project and enable **Authentication (Email/Password)** and **Firestore**.
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

## 📖 Usage Instructions
1. **Patient**: Register/Login as a patient. Click the **SOS** button on the dashboard to request an ambulance.
2. **Driver**: Register/Login as a driver. Wait for requests on the "Live Requests Queue" and click **Accept Mission** to head to the patient.
3. **Hospital Admin**: Register/Login as a hospital admin. Watch the real-time emergency feed to monitor patients en route.

## 👥 Team Details (Nova Elites)
- **Member 1**: [Name / GitHub Profile]
- **Member 2**: [Name / GitHub Profile]
- **Member 3**: [Name / GitHub Profile]
- **Member 4**: [Name / GitHub Profile]

## 🎥 Demo Video
[Insert Link to YouTube/Loom Demo Video Here]

---
*Built with ❤️ for HackIndia 2026*
