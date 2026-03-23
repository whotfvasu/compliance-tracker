# Compliance Tracker

A full-stack web application for managing compliance tasks, tracking client deadlines, and monitoring task status across multiple compliance categories.

## Project Overview

Compliance Tracker helps organizations manage regulatory compliance tasks by providing a centralized platform to track clients, assign compliance tasks, set priorities, and monitor completion status. Built with a modern tech stack for scalability and ease of use.

## Tech Stack

- **Frontend:** React 19, Vite, Tailwind CSS
- **Backend:** Node.js, Express
- **Database:** PostgreSQL (Supabase)
- **ORM:** Prisma
- **API:** REST

## Project Structure

```
complianceTracker/
├── frontend/              # React + Vite application
│   ├── src/
│   │   ├── components/   # React components (Navbar, ClientList, TaskForm, TaskList, StatsOverview)
│   │   ├── services/     # API service layer
│   │   ├── utils/        # Helper functions (date formatting, color mapping)
│   │   ├── App.jsx       # Root component
│   │   └── index.css     # Global styles
│   ├── tailwind.config.js # Tailwind configuration with custom color palette
│   └── package.json
│
├── backend/               # Express server
│   ├── src/
│   │   ├── routes/       # API routes (clients.js, tasks.js)
│   │   └── index.js      # Express server entry point
│   ├── prisma/
│   │   └── schema.prisma # Database schema
│   ├── .env              # Environment variables (DATABASE_URL, PORT)
│   └── package.json
│
└── README.md
```

## Features

- Client Management: Add and manage multiple clients with entity information
- Task Tracking: Create, update, and delete compliance tasks
- Status Management: Update task status (Pending, In Progress, Completed)
- Priority Levels: Set task priority (Low, Medium, High) with visual indicators
- Task Filtering: Filter by status and category
- Overdue Detection: Automatic highlighting of overdue tasks in red
- Dashboard: Overview cards showing total, pending, in-progress, and completed tasks
- Responsive Design: Works on desktop, tablet, and mobile devices
- Dark Theme: Modern dark UI with #333 primary color and sage/greenish-grey accents
- CORS Enabled: Cross-origin requests supported

## Color Scheme

- **Primary:** #333 (Dark)
- **Accents:** Sage/greenish-grey palette
- **Risk/Alert:** Red colors for high priority and overdue items

## Database Schema

### Client Model

- **id** (Integer, Primary Key)
- **name** (String)
- **country** (String)
- **entityType** (String)
- **tasks** (One-to-many relationship with Task)

### Task Model

- **id** (Integer, Primary Key)
- **title** (String)
- **description** (String, optional)
- **category** (String)
- **dueDate** (DateTime)
- **status** (String: Pending, In Progress, Completed)
- **priority** (String: Low, Medium, High)
- **clientId** (Integer, Foreign Key)

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- PostgreSQL database (Supabase)

### Backend Setup

1. Navigate to backend directory

```bash
cd backend
npm install
```

2. Configure environment variables in `.env`

```
DATABASE_URL="postgresql://user:password@host:5432/database"
PORT=3001
NODE_ENV=development
```

3. Run Prisma migrations

```bash
npx prisma migrate dev
```

4. Start development server

```bash
npm run dev
```

Backend runs on `http://localhost:3001`

### Frontend Setup

1. Navigate to frontend directory

```bash
cd frontend
npm install
```

2. Start development server

```bash
npm run dev
```

Frontend runs on `http://localhost:5173`

## API Endpoints

### Clients

```
GET    /api/clients              - Get all clients
GET    /api/clients/:id          - Get single client
POST   /api/clients              - Create new client
PATCH  /api/clients/:id          - Update client
DELETE /api/clients/:id          - Delete client
```

### Tasks

```
GET    /api/tasks                - Get all tasks with filters
GET    /api/tasks?status=value   - Filter by status
GET    /api/tasks?clientId=value - Filter by client
POST   /api/tasks                - Create new task
PATCH  /api/tasks/:id            - Update task status/priority
DELETE /api/tasks/:id            - Delete task
```

### Health Check

```
GET    /api/health               - Server status
GET    /api/db-health            - Database connection status
```

## Request/Response Examples

### Create Task

```json
POST /api/tasks
{
  "title": "Annual Compliance Review",
  "description": "Complete annual compliance audit",
  "category": "Compliance",
  "dueDate": "2024-12-31",
  "priority": "High",
  "clientId": 1
}

Response:
{
  "id": 1,
  "title": "Annual Compliance Review",
  "status": "Pending",
  "priority": "High",
  "dueDate": "2024-12-31T00:00:00.000Z",
  "clientId": 1
}
```

### Update Task Status

```json
PATCH /api/tasks/1
{
  "status": "In Progress"
}
```

## Development Notes

- CORS must be applied before routes in Express
- Prisma client is initialized once and reused to avoid connection leaks
- Tailwind color palette uses custom `dark`, `sage`, and `risk` colors
- Components use Nohemi font family across all weights (100-900)
- API service layer abstracts HTTP calls in `frontend/src/services/api.js`
- Color helper functions handle priority and status color mapping

## Troubleshooting

**Database Connection Error**

- Verify DATABASE_URL in .env matches Supabase connection string
- Check Supabase project is not paused
- Ensure network access is allowed

**Colors Not Displaying**

- Restart dev server after tailwind.config.js changes
- Verify tailwind.config.js content paths include .jsx files
- Check @layer directives in index.css

**CORS Error**

- Ensure cors() middleware is applied before route handlers
- Check frontend URL matches CORS origin

## Future Enhancements

- User authentication and role-based access
- Task templates and batch operations
- Compliance document upload and storage
- Email notifications for upcoming deadlines
- Advanced reporting and analytics
- Audit trail for compliance tracking
- Integration with external compliance tools

## Git Workflow

```bash
# Create feature branch
git checkout -b feature/feature-name

# Commit changes
git add -A
git commit -m "type: description"

# Push and create pull request
git push origin feature/feature-name
```

## Support

For issues or questions, check the troubleshooting section or review the project structure to understand component responsibilities.
