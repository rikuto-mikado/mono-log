# mono-log

A simple and clean note-taking application.

## Features

- **Note Management**: Create, edit, and organize notes.
- **Soft Delete (Trash)**: Move notes to trash and restore them if needed.
- **Categorization**: Organize notes into categories like Study, Work, and Ideas.
- **Modern UI**: Clean and responsive design built with React and shadcn/ui.

## Tech Stack

- **Frontend**: React, TypeScript, Vite, Tailwind CSS, shadcn/ui.
- **Backend**: Django, Django REST Framework.
- **Database**: SQLite.

## Getting Started

### Prerequisites

- Python 3.10+
- Node.js 18+ & npm

### Backend Setup

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run migrations:
   ```bash
   python manage.py migrate
   ```
5. Start the server:
   ```bash
   python manage.py runserver 8005
   ```

### Frontend Setup

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
