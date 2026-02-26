# 🚀 Deployment Guide - TikTok Insight Analyzer Pro

This guide helps you deploy the fullstack application using Docker.

## Prerequisites

*   **Docker Desktop** (must be running)
*   **Git** (optional, to clone repo)

## 📦 Quick Start (Production Mode)

1.  **Open Terminal** in the project root folder.
2.  **Run Docker Compose**:
    ```bash
    docker-compose up --build -d
    ```
    *   `--build`: Forces a rebuild of the images (important for code updates).
    *   `-d`: Detached mode (runs in background).

3.  **Wait for Startup**:
    *   The frontend build process might take ~1-2 minutes initially.
    *   Check logs with: `docker-compose logs -f`

4.  **Access the App**:
    *   **Frontend**: [http://localhost:3000](http://localhost:3000)
    *   **Backend API**: [http://localhost:5000](http://localhost:5000)

## 🔑 Default Credentials

The system automatically seeds an Admin account on startup:

*   **Email**: `admin@tiktokpro.com`
*   **Password**: `admin123`

## 🛠 Troubleshooting

### Database Issues
If you encounter login errors or role issues, run the specific cleanup command:
```bash
docker-compose down -v
docker-compose up --build -d
```
(Warning: This deletes all data!)

### Rebuilding Frontend
If you explicitly change frontend code and it doesn't reflect:
```bash
docker-compose build frontend
docker-compose up -d frontend
```
