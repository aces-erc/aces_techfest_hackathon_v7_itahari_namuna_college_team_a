# AroHealth: Revolutionizing Healthcare Management in Nepal

AroHealth is an innovative SaaS platform designed to modernize healthcare and insurance management in Nepal. The platform offers specialized dashboards for users, doctors/hospitals, and insurance companies, ensuring a streamlined, secure, and efficient way to manage medical records, insurance plans, and patient care.

---

## Features

### Core Features

1. **AI Health Companion: Arogen**  
   - A personalized AI assistant fine-tuned on medical datasets.  
   - Provides answers based on the user's medical history.  
   - Integrated with WebSockets for real-time interactions.  

2. **Unified Dashboard System**  
   - **User Dashboard**:  
     - View and manage insurance plans.  
     - Access complete medical records and health logs.  
     - Chat with Arogen and schedule doctor consultations.  
   - **Doctor/Hospital Dashboard**:  
     - Access patient history with consent via QR scanning.  
     - Add diagnoses, lab results, and notes securely.  
   - **Insurance Company Dashboard**:  
     - Manage user profiles, hospital tie-ups, and payment plans.  
     - Track patient visits and generate analytics.  

3. **Medical Record Management**  
   - Stores all health-related data securely in a centralized database.  
   - Immutable previous records ensure no tampering of medical history.  

4. **Communication System**  
   - Integrated WebSockets for real-time doctor-patient chats and AI interactions.  

---

## Optimistic Features (Future Enhancements)

- **Video Consultation**: Direct video calls between users and doctors.  
- **OCR-Driven AI Analysis**: Use AI to digitize and analyze handwritten medical reports.  
- **Blockchain for Records**: Secure immutable records using blockchain technology.  
- **Appointment Booking**: Simplify scheduling through the platform.  
- **Insurance Renewal**: Online insurance renewal directly via the app.  
- **SMS Reminders**: Notify users of expiring plans or upcoming appointments.  

---

## Tech Stack

- **Frontend**: React with Vite for a modern and responsive UI.  
- **Backend**: Node.js with Express for APIs and WebSocket support.  
- **Database**: MySQL with Prisma ORM for relational data management.  
- **Styling**: Tailwind CSS for clean and user-friendly designs.  
- **AI Model**: Fine-tuned GPT-based model powering Arogen.

---

## Getting Started

### Prerequisites  
- Node.js installed.  
- MySQL database running.

### Installation Steps

1. Clone the repository:  
   ```bash
   git clone https://github.com/your-repo/arohealth.git
   cd arohealth

2.Install dependencies:
   ```bash
   cd frontend
   npm install
   cd ../backend
   npm install

3. Configure .env in the backedn folder
   ```bash
   DATABASE_URL=mysql://username:password@localhost:3306/arohealth

4.Setup the database

```bash
cd backend
npx prisma migrate dev

5. start the frontend
```bash
cd frontend
npm run dev

6.start the backend 
```bash
cd backend
npm run start
