# SKI Frontend Setup

This is the **Frontend (PHP Native**) for SKI Project.  
It is a simple **PHP + HTML + Bootstrap + DataTables** app -- no frameworks, no Node.js required.

You can run it using **Docker** or directly with *PHP* installed on your machine.


---

## Run with Docker

### Setup

```bash
# 1. Clone repository
git clone https://github.com/anasark/SKI-FE.git
cd SKI-FE

# 2. Make sure the network exists
docker network create ski

# 3. Start containers
docker-compose up -d --build
```

### Access
- Frontend → http://localhost:81  
- Backend API (must be running separately) → http://localhost  


---


## 🚋 Option 2: Run with PHP (without Docker)

### Requirement
- PHP 8.2+   
- Web server (Apache/Niginx) or built-in PHP server 

### Setup
```bash
git clone https://github.com/anasark/SKI-FE.git
cd SKI-FE
```

Run with built-in PHP server:
```bash
php -S localhost:8081 -t .
```

### Access
+ Frontend → http://localhost:8081  
+ Backend API → must be accessible separately  


---


## Notes (IMPORTANT)
- Dont forget to Edit API URL in `assets/js/helper.js`
```bash
var apiUrl = '/api'; // Update with API URL
```
