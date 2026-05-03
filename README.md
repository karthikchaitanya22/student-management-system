# 🚀 Student Management System

A modern, stunning Flask web app for managing students with SQLite database. Features glassmorphism UI, dark mode, animations, and full CRUD operations.

![Screenshot](screenshot.png) <!-- Add screenshot here -->

## ✨ Features

- **Full CRUD Operations**: Add, Edit, Delete, List students (name, email, grade)
- **Stunning Visuals**: Glassmorphism design, gradient animations, hover effects, responsive layout
- **Dark/Light Theme**: Auto-save preference
- **Real-time Search**: Instant filtering
- **Smooth Interactions**: Modals, notifications, stagger animations
- **Mobile Responsive**: Works perfectly on all devices
- **SQLite Database**: No setup required

## 🛠 Tech Stack

- **Backend**: Flask (Python)
- **Database**: SQLite
- **Frontend**: HTML5, CSS3 (glassmorphism, animations), Vanilla JavaScript (AJAX)
- **Fonts**: Google Poppins
- **No external deps** beyond Flask

## 📦 Quick Setup

1. **Clone/Navigate** to project:
   ```
   cd student-management-system
   ```

2. **Virtual Environment**:
   ```
   python3 -m venv venv
   source venv/bin/activate  # macOS/Linux
   # venv\Scripts\activate  # Windows
   ```

3. **Install Dependencies**:
   ```
   pip install flask
   ```

4. **Run Server**:
   ```
   python app.py
   ```

5. **Open Browser**:
   ```
   http://127.0.0.1:5001
   ```

**Note**: Port 5001 used to avoid macOS AirPlay conflict.

## 📱 Usage

1. **Add Student**: Fill form → Add Student
2. **View List**: Auto-updates with animations
3. **Search**: Type to filter instantly
4. **Edit**: Click Edit → Update modal
5. **Delete**: Confirm deletion
6. **Theme**: Toggle sun/moon icon

## 🗄 Database

- `database.db`: Auto-created with `students` table (id, name, email, grade)
- Persistent data between restarts

## 🔍 API Endpoints (for devs)

```
GET  /get_students     → JSON list
POST /add_student      → {name, email, grade}
PUT  /update_student/<id> → {name, email, grade}
DELETE /delete_student/<id>
```

## 🎨 UI Highlights

- **Glassmorphism**: Backdrop blur, translucent cards
- **Gradients**: Animated backgrounds
- **Animations**: Stagger entry, hover scale, modal transitions
- **Responsive**: Mobile-first grid
- **Notifications**: Floating success/error

## 🚀 Production

For production:
```
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5001 app:app
```

## 📄 License

MIT - Feel free to use/modify!

---

**Built with ❤️ using Flask + Modern Web Tech**

