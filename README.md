<h1 align="center">Scoutrix</h1>

<p align="center">
<b>Talent Has No Address.</b><br>
AI Infrastructure for Grassroots Sports Discovery
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Frontend-React-blue" />
  <img src="https://img.shields.io/badge/Backend-Express-green" />
  <img src="https://img.shields.io/badge/AI%20Pipeline-Python-yellow" />
  <img src="https://img.shields.io/badge/Database-MongoDB-darkgreen" />
  <img src="https://img.shields.io/badge/Maps-Mapbox-black" />
</p>

---

## **Overview**

Scoutrix is a standardized AI-powered athlete verification and recruitment infrastructure built for rural India.

It replaces geography-dependent physical trials with AI-based digital performance evaluation, allowing athletes to be discovered purely based on measurable performance.

---

## **The Problem**

India has over 50 crore rural citizens. Athletic talent exists everywhere. Structured discovery does not.

**Current ecosystem limitations:**

- Trials are geography-dependent  
- No standardized performance documentation  
- Manual filtering by recruiters  
- Rural athletes lack visibility  
- Inconsistent benchmarking across districts  

**Result:** Talent loss before development.

---

## **Our Solution**

Two roles. One performance-driven ecosystem.

### **Athlete Flow**

1. Record performance on any Android device  
2. Upload video  
3. AI extracts sport-specific metrics  
4. SPI (Standardized Performance Index) generated  
5. Athlete appears on verified leaderboard  

### **Recruiter Flow**

1. Input requirements  
2. Filter verified athletes  
3. Automated Recruitment Engine ranks profiles  
4. Download shortlist report instantly  

---

## **Core Features**

### **AI Video Analysis**
MediaPipe and OpenCV extract biomechanical and sport-specific metrics from raw phone footage. Performance metrics are rendered directly onto video frames.

### **Standardized Performance Index (SPI)**
Age, gender, and sport-normalized scoring engine enabling fair comparison across regions.

### **Pivoting Stickman Biomechanics**
Frame-by-frame movement comparison with professional reference models to highlight deviations.

### **Automated Recruitment Engine**
Requirement-based athlete ranking system generating downloadable reports.

### **Sport-wise Leaderboard**
Filter by sport, age group, gender, state, and district.

### **Talent Heatmap**
District-level athlete density visualization powered by Mapbox GL.

### **Explore Narrative Engine**
Live performance narratives generated using Google Gemini.

### **Offline-First Design**
Local capture. Sync on connectivity restoration.

---

## **Sports Supported (Phase 1)**

### **Cricket**
- Bowling speed  
- Batting reaction time  
- Throw distance  

### **Football**
- Sprint speed  
- Kick distance  
- Agility run time  

### **Badminton**
- Smash speed  
- Reaction time  
- Rally endurance  

---

## **Technology Stack**

| **Layer** | **Technology** |
|-----------|----------------|
| Frontend | React + Vite |
| Backend | Express.js |
| AI / CV Pipeline | Python, MediaPipe, OpenCV, FFmpeg |
| Database | MongoDB, Redis |
| Authentication | Firebase Auth |
| Video Storage | Cloudinary |
| Narrative Engine | Google Gemini API |
| Maps | Mapbox GL |

---

## **System Architecture**

### **Video Processing Pipeline**

Athlete Device  
→ React Frontend  
→ Express Backend  
→ Multer Upload Middleware  
→ FFmpeg Preprocessing  
→ MediaPipe + OpenCV Analysis  
→ SPI Engine  
→ MongoDB  
→ Cloudinary CDN  

### **Recruitment Engine Pipeline**

Recruiter Input  
→ Criteria Parser  
→ MongoDB Retrieval  
→ SPI Ranking Algorithm  
→ Report Generator  
→ Downloadable Shortlist  

---

## **Business Model**

### **Revenue Streams**

1. **Recruiter Subscription Model**  
   Monthly/Annual access to verified athlete database  

2. **Pay-Per-Shortlist Reports**  
   Premium ranked recruitment exports  

3. **Federation & Government Partnerships**  
   Integration with state sports boards  

4. **Analytics & Performance Intelligence Layer**  
   Aggregated anonymized data insights  

### **Future Monetization**

- Academy licensing  
- AI analytics API  
- Corporate scouting tools  
- Athlete benchmarking dashboards  

---

## **Project Structure**

```
Scoutrix/
│
├── frontend/
│   ├── src/
│   │   └── pages/
│   │
│   └── public/
│
├── backend/
│   ├── index.js
│   ├── routes/
│   ├── scripts/
│   │   └── analyze.py
│   └── uploads/
│
└── README.md
```
## **Getting Started**

### **Prerequisites**

- Node.js v18+  
- Python 3.8 – 3.11  
- MongoDB  
- FFmpeg  

### **Backend Setup**

```bash
cd backend
npm install
python -m venv venv
venv\Scripts\activate
pip install mediapipe opencv-python ffmpeg-python
node index.js
Frontend Setup
cd frontend
npm install
npm run dev
Environment Variables
MONGODB_URI=
FIREBASE_API_KEY=
CLOUDINARY_URL=
GEMINI_API_KEY=
MAPBOX_TOKEN=
JWT_SECRET=
Roadmap

Phase 1
Cricket, Football, Badminton across 3 states

Phase 2
10 sports across 28 states
Federation partnerships

Phase 3
National athlete registry
Khelo India integration
SAI academy pipeline

Vision

Scoutrix is not a sports app.

It is a digital infrastructure layer for India’s grassroots sports ecosystem.

Discovery should depend on performance — not postcode.

Talent has no address.
