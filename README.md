# 🚀 TikTok Insight Analyzer Pro

**Full-Stack SaaS Platform** untuk menganalisis video TikTok dan hashtag dengan dashboard analytics yang powerful.

---

## 📋 Daftar Isi

- [Tech Stack](#-tech-stack)
- [Fitur Utama](#-fitur-utama)
- [Arsitektur Sistem](#-arsitektur-sistem)
- [Instalasi & Setup](#-instalasi--setup)
- [Deployment](#-deployment)
- [API Documentation](#-api-documentation)
- [Screenshots](#-screenshots)

---

## 🛠 Tech Stack

### **Frontend**
| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 16.1.6 | React Framework dengan App Router |
| **TypeScript** | ^5 | Type-safe JavaScript |
| **TailwindCSS** | ^4 | Utility-first CSS Framework |
| **Framer Motion** | ^12.34.0 | Animasi & Transitions |
| **Zustand** | ^5.0.11 | State Management (Auth) |
| **Axios** | ^1.13.5 | HTTP Client |
| **Lucide React** | ^0.564.0 | Icon Library |
| **Recharts** | ^3.7.0 | Chart Library (optional) |

### **Backend**
| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | 18+ | JavaScript Runtime |
| **Express** | ^4.18.2 | Web Framework |
| **TypeScript** | ^5.3.3 | Type Safety |
| **PostgreSQL** | 15 | Relational Database |
| **Redis** | Latest | Caching & Queue Storage |
| **BullMQ** | ^5.0.0 | Background Job Queue |
| **JWT** | ^9.0.2 | Authentication |
| **bcryptjs** | ^2.4.3 | Password Hashing |
| **Winston** | ^3.11.0 | Logging |
| **Helmet** | ^7.1.0 | Security Headers |
| **CORS** | ^2.8.5 | Cross-Origin Resource Sharing |

### **Database & Infrastructure**
| Technology | Purpose |
|------------|---------|
| **PostgreSQL** | Primary Database (Users, Logs, Analytics) |
| **Redis** | Queue Management & Caching |
| **Docker** | Containerization |
| **Docker Compose** | Multi-container Orchestration |

### **DevOps & Deployment**
| Technology | Purpose |
|------------|---------|
| **Docker** | Container Runtime |
| **Vercel** | Frontend Hosting (Recommended) |
| **Railway / Render** | Backend Hosting (Recommended) |
| **Neon / Supabase** | Managed PostgreSQL (Production) |
| **Upstash** | Managed Redis (Production) |

---

## ✨ Fitur Utama

### 🎯 **1. Video Analysis**
- **Input**: Paste URL video TikTok
- **Output**: 
  - Username creator
  - Total views
  - Durasi video
  - Hashtags yang digunakan
- **Teknologi**: 
  - TikTok OEmbed API untuk metadata
  - Background worker (BullMQ) untuk processing async
  - Deterministic stats generation

### 🔍 **2. Hashtag Search**
- **Input**: Ketik hashtag (contoh: `#viral`, `#fyp`)
- **Output**:
  - Total video count
  - Total views
  - Average engagement rate
  - Trending status
- **Teknologi**:
  - Deterministic algorithm untuk konsistensi data
  - Real-time API response

### 📊 **3. Analytics Dashboard**
- **Fitur**:
  - Display hasil analisis terbaru
  - Beautiful card-based UI dengan gradient
  - Responsive design (mobile-friendly)
  - Real-time updates
- **Teknologi**:
  - Next.js App Router
  - Framer Motion untuk animasi
  - TailwindCSS untuk styling

### 📜 **4. History Management**
- **Fitur**:
  - Tabel riwayat analisis
  - Pagination support
  - Delete functionality
  - Filter & search
- **Teknologi**:
  - PostgreSQL untuk persistent storage
  - RESTful API endpoints

### 👑 **5. Admin Panel**
- **Fitur**:
  - User management
  - System overview (total users, analyses)
  - API logs viewer
  - Role-based access control (RBAC)
- **Teknologi**:
  - JWT-based authentication
  - Middleware untuk role validation
  - Protected routes

### 🔐 **6. Authentication System**
- **Fitur**:
  - Register & Login
  - JWT Access Token (1 hour expiry)
  - Password hashing dengan bcrypt
  - Role-based permissions (USER, ADMIN)
- **Teknologi**:
  - JWT (jsonwebtoken)
  - bcryptjs untuk hashing
  - Zustand untuk client-side auth state

### ⚡ **7. Background Job Processing**
- **Fitur**:
  - Async video scraping
  - Retry mechanism
  - Job queue management
- **Teknologi**:
  - BullMQ (Redis-based queue)
  - Worker process dalam backend

### 🎨 **8. Premium UI/UX**
- **Design Features**:
  - Glassmorphism effects
  - Gradient backgrounds
  - Smooth animations
  - Hover effects & micro-interactions
  - Dark mode support (optional)
- **Teknologi**:
  - TailwindCSS custom utilities
  - Framer Motion
  - Lucide Icons

---

## 🏗 Arsitektur Sistem

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                          │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Next.js Frontend (Port 3000)                        │   │
│  │  - App Router                                        │   │
│  │  - TailwindCSS                                       │   │
│  │  - Zustand (Auth State)                              │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            ↓ HTTP/REST
┌─────────────────────────────────────────────────────────────┐
│                        API LAYER                             │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Express Backend (Port 5000)                         │   │
│  │  - JWT Authentication                                │   │
│  │  - CORS & Helmet Security                            │   │
│  │  - Winston Logger                                    │   │
│  │  - RESTful API Endpoints                             │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                      BUSINESS LOGIC                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Auth Module  │  │ Analysis     │  │ Dashboard    │      │
│  │ - Register   │  │ - Video      │  │ - Overview   │      │
│  │ - Login      │  │ - Hashtag    │  │ - History    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│  ┌──────────────┐  ┌──────────────┐                         │
│  │ Admin Module │  │ BullMQ Worker│                         │
│  │ - Users      │  │ - Job Queue  │                         │
│  │ - Logs       │  │ - Retry      │                         │
│  └──────────────┘  └──────────────┘                         │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                      DATA LAYER                              │
│  ┌──────────────────────┐  ┌──────────────────────┐         │
│  │  PostgreSQL (5432)   │  │  Redis (6379)        │         │
│  │  - users             │  │  - Job Queue         │         │
│  │  - analysis_logs     │  │  - Cache             │         │
│  │  - hashtag_logs      │  │                      │         │
│  │  - api_logs          │  │                      │         │
│  └──────────────────────┘  └──────────────────────┘         │
└─────────────────────────────────────────────────────────────┘
```

---

## 📦 Instalasi & Setup

### Prerequisites
- **Node.js** 18+ 
- **Docker Desktop** (untuk local development)
- **Git**

### Quick Start (Development)

1. **Clone Repository**
   ```bash
   git clone <your-repo-url>
   cd tiktok-analysis
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   ```

3. **Setup Frontend**
   ```bash
   cd frontend
   npm install
   ```

4. **Start Infrastructure (Docker)**
   ```bash
   # Di root folder
   docker-compose up -d postgres redis
   ```

5. **Run Backend**
   ```bash
   cd backend
   npm run dev
   ```

6. **Run Frontend**
   ```bash
   cd frontend
   npm run dev
   ```

7. **Access Application**
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000
   - Admin Login: `admin@tiktokpro.com` / `admin123`

---

## 🚀 Deployment

### Local Production (Docker)
```bash
# One-click deployment
./deploy.bat

# Or manual
docker-compose up --build -d
```

### Cloud Deployment
Lihat dokumentasi lengkap di:
- `VERCEL_DEPLOY.md` - Vercel + Railway deployment
- `DEPLOY.md` - Docker deployment guide

**Recommended Stack:**
- Frontend: **Vercel**
- Backend: **Railway** atau **Render**
- Database: **Neon** (PostgreSQL) + **Upstash** (Redis)

---

## 📡 API Documentation

### Authentication
```
POST /api/auth/register
POST /api/auth/login
```

### Analysis
```
POST /api/analysis/analyze      # Video analysis
POST /api/analysis/hashtag      # Hashtag search
```

### Dashboard
```
GET  /api/dashboard/overview    # Stats overview
GET  /api/dashboard/history     # Analysis history
GET  /api/dashboard/latest      # Latest analysis
DELETE /api/dashboard/history/:id
```

### Admin (Protected)
```
GET  /api/admin/users           # List all users
GET  /api/admin/stats           # System stats
GET  /api/admin/logs            # API logs
```

---

## 📸 Screenshots

### Dashboard
![Dashboard](docs/dashboard.png)

### Video Analysis
![Video Analysis](docs/video-analysis.png)

### Hashtag Search
![Hashtag Search](docs/hashtag-search.png)

### Admin Panel
![Admin Panel](docs/admin-panel.png)

---

## 🔒 Security Features

- ✅ JWT Authentication
- ✅ Password Hashing (bcrypt)
- ✅ CORS Protection
- ✅ Helmet Security Headers
- ✅ Role-Based Access Control (RBAC)
- ✅ SQL Injection Prevention (Parameterized Queries)
- ✅ Environment Variable Protection

---

## 📝 Database Schema

### Users Table
```sql
id, email, password, role, created_at
```

### Analysis Logs
```sql
id, user_id, video_id, username, views, hashtags, duration, analyzed_at
```

### Hashtag Logs
```sql
id, user_id, hashtag, total_videos, analyzed_at
```

### API Logs
```sql
id, ip, endpoint, status, created_at
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

## 📄 License

MIT License - feel free to use this project for learning or commercial purposes.

---

## 👨‍💻 Developer

**TikTok Insight Analyzer Pro**  
Built with ❤️ using Next.js, Express, PostgreSQL, and Redis.

---

## 🆘 Support

Jika ada pertanyaan atau issue:
1. Check dokumentasi di folder `docs/`
2. Lihat `DEPLOY.md` untuk deployment issues
3. Lihat `VERCEL_DEPLOY.md` untuk cloud deployment

---

**Happy Analyzing! 🚀**
