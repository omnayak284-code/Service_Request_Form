# MERN Full Stack Form Submission - Service Request

A full-stack PERN application to create, validate, and persist service requests into PostgreSQL.

---

## 1. Database Migration Command

```bash
cd backend
npx prisma migrate dev --name init

2. Backend Run Command
Bash
cd backend
npm install
node server.js
Backend runs on: http://localhost:5000

3. Frontend Run Command
Bash
cd frontend
npm install
npm run dev
Frontend runs on: http://localhost:5173

(Optional) To view the PostgreSQL database visually:

Bash
cd backend
npx prisma studio
Prisma Studio runs on: http://localhost:5555

4. API Endpoints Created
POST /api/service-requests
Description: Validates incoming payload and creates a new service request record in PostgreSQL.

Request Body:

JSON
{
  "name": "Alex Doe",
  "email": "alex@example.com",
  "requestType": "Lead Generation",
  "description": "Need assistance targeting enterprise leads."
}
Success Response (201 Created):

JSON
{
  "success": true,
  "message": "Request created successfully",
  "data": {
    "id": 1,
    "name": "Alex Doe",
    "email": "alex@example.com",
    "requestType": "Lead Generation",
    "description": "Need assistance targeting enterprise leads.",
    "createdAt": "2026-09-08T15:21:00.000Z"
  }

Error Response (400 Bad Request):

JSON
{
  "success": false,
  "message": "All fields (name, email, requestType, description) are required."
}
GET /api/service-requests
Description: Retrieves all service requests ordered by createdAt descending (newest first).

Success Response (200 OK):

JSON
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Alex Doe",
      "email": "alex@example.com",
      "requestType": "Lead Generation",
      "description": "Need assistance targeting enterprise leads.",
      "createdAt": "2026-09-08T15:21:00.000Z"
    }
  ]
}
