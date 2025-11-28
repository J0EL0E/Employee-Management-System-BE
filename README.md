# Backend Development Setup and Documentation

This document provides instructions for setting up the local development environment, including backend setup and containerized database configuration.

---

## 1. Quick Start Installation Guide

Follow these steps to get the backend running on your local machine.

### 1.1 Clone the Repository

Clone the project from the repository:


git clone <Your_Repository_Link_Here>
cd <your-repo-folder-name>
1.2 Install Dependencies
Install all required Node.js packages using npm or yarn:


Copy code
npm install
# OR
# yarn install
1.3 Configure Environment Variables
Create a file named .env in the root directory of the project and populate it with the following:

env
Copy code
PORT=4000
FRONTEND_URL=http://localhost:5173
DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=localhost
DATABASE=mydatabase
DB_PORT=5432

JWT_SECRET_KEY=df03ad9a-7faf-47fa-9dd1-4db185faf977
REFRESH_TOKEN_SECRET=207bc01e-119e-4d90-b283-df9511b15a62

1.4 Start the Server
Run the development server:

bash
Copy code
npm run dev
# OR
# yarn dev
The backend server should now be accessible at http://localhost:5000.

2. Database Setup
This project uses PostgreSQL running in a Docker container, managed through the pgAdmin 4 Docker Desktop Extension.

2.1 Start PostgreSQL Container
Ensure Docker Desktop is installed and running. Start the PostgreSQL container using the following command, mapping host port 5433 to container port 5432:

bash
Copy code
docker run --name my-postgres-db \
    -e POSTGRES_USER=postgres \
    -e POSTGRES_PASSWORD=postgres \
    -e POSTGRES_DB=mydatabase \
    -p 5433:5432 \
    -d postgres
2.2 Connect via pgAdmin 4 Docker Extension
The Docker Desktop Extension manages the pgAdmin container.

Access the Extension
In Docker Desktop, click the Extensions tab and select pgAdmin 4.

Initial Setup
On first launch, set a Master Password for the pgAdmin web interface.

Add a New Server
Once the dashboard loads, click Add New Server.

Connection Details
Use the following to connect to the running container:

Name: Local Project DB (or any descriptive name)

Host name/address: host.docker.internal

Port: 5433

Username: postgres

Password: postgres (value of POSTGRES_PASSWORD)

Note: host.docker.internal is required so the pgAdmin container can resolve and connect to a port mapped to your host machine.

3. Technology Stack and Core Libraries
The backend is built on Node.js and Express.js, providing a fast, scalable, non-blocking service.

Component	Technology / Package	Purpose
Framework	Node.js / Express.js	Core web application server
Database	PostgreSQL	Primary data storage
Authentication	jsonwebtoken (JWT)	Creation and verification of Access and Refresh Tokens
Security	cors / cookieParser	Handling cross-origin requests and managing HTTP-only cookies for tokens

4. Architecture and Folder Structure
The application uses a modified MVC pattern and Separation of Concerns, ensuring maintainability and clear logic separation.

Folder Responsibilities
src/controllers: Handles business logic for endpoints. Receives requests from routes, interacts with models, and returns responses.

src/models: Defines data structures and database interactions. Manages storage and retrieval from PostgreSQL.

src/routes: Maps HTTP methods and URLs to controller functions; defines application endpoints.

src/middlewares: Contains functions executed before or after controllers, e.g., authentication and error handling.

src/configs: Holds configuration files for services and packages, including database connections and CORS.

5. Authentication Flow (JWT)
The backend uses JSON Web Tokens (JWT) for stateless authentication, utilizing jsonwebtoken and cookieParser.

Token Strategy
Token Type	Purpose	Storage / Usage
Access Token	Authorizes API requests	Sent in the Authorization header; short expiration
Refresh Token	Requests a new Access Token	Stored in an HTTP-only cookie; long expiration

Core Libraries Role
jsonwebtoken (jwt): Creates (sign) and verifies (verify) Access and Refresh tokens.

cookieParser: Parses cookies, enabling reading of HTTP-only Refresh Tokens.

cors: Configured to manage cross-origin requests, specifying which frontend origins can communicate with the backend.