# SkillStack - Personal Skill Building Tracker

A full-stack web application to track and manage personal skills, learning resources, and professional certifications.

## Features

- **Dashboard**: Overview of your skill development progress with charts and statistics
- **Skills Management**: Add, edit, and track skills with current and target levels
- **Certifications**: Manage professional certifications
- **Learning Resources**: Track learning materials for each skill
- **Progress Visualization**: Charts showing skill progress and category distribution
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

### Backend
- **Django 4.2.7** - Python web framework
- **Django REST Framework** - API development
- **SQLite** - Database (development)
- **django-cors-headers** - Cross-origin resource sharing
- **python-decouple** - Environment variable management

### Frontend
- **React 18.2.0** - JavaScript library for building user interfaces
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API requests
- **Recharts** - Chart library for data visualization
- **Lucide React** - Icon library
- **CSS3** - Styling with modern CSS features

## Setup Instructions

### Backend Setup (Django)

1. **Clone the repository:**
   ```bash
   git clone https://github.com/praveenajude/SkillStack.git
   cd SkillStack
   ```

2. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

3. **Create a virtual environment:**
   ```bash
   python -m venv venv
   ```

4. **Activate the virtual environment:**
   - **Windows:**
     ```bash
     venv\Scripts\activate
     ```
   - **macOS/Linux:**
     ```bash
     source venv/bin/activate
     ```
5. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

6. **Create and apply database migrations:**
   ```bash
   # Create migrations
   python manage.py makemigrations
   
   # Apply migrations to database
   python manage.py migrate
   ```

7. **Create a superuser (optional but recommended):**
   ```bash
   python manage.py createsuperuser
   ```
   Follow the prompts to create an admin account.

8. **Start the Django development server:**
   ```bash
   python manage.py runserver
   ```
   The backend API will be available at `http://localhost:8000`
   - Admin panel: `http://localhost:8000/admin`
   - API endpoints: `http://localhost:8000/api/`

### Frontend Setup (React)

1. **Open a new terminal and navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install Node.js dependencies:**
   ```bash
   npm install
   ```

3. **Start the React development server:**
   ```bash
   npm start
   ```

   The frontend will be available at `http://localhost:3000`
