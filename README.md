# Simple TODO App

## Project Description

This is a simple TODO application built with a modern technology stack. Users can create, manage, and mark tasks as complete. The application prioritizes a clean and intuitive user experience combined with robust backend security.

**Key Features:**

*   **Task Management:** Users can add new tasks, edit existing tasks, and delete tasks.
*   **Completion Status:**  Tasks can be marked as completed or incomplete.
*   **Authentication and Authorization:**
    *   Uses **Passport.js** for authentication and authorization, ensuring secure access to the API and user data.
*   **Modern UI:**
    *   A clean and responsive user interface built using **Shadcn UI** component library, styled with **Tailwind CSS** for rapid development and customization.

## Running the Project

1.  **Clone the repository:**

    ```bash
    git clone git@github.com:tripathi789308/simple-todo.git
    cd simple-todo
    ```

2.  **Configure Environment Variables:**

    *   Create `.env` file in the root directory of the project:

        ```
        POSTGRES_USER=superuser
        POSTGRES_PASSWORD=test123
        POSTGRES_DB=todo_database
        DATABASE_PORT=5432
        BACKEND_PORT=3001
        FRONTEND_PORT=3000
        ```

    *   Create `.env` file in the `backend` directory:

        ```bash
        cd backend
        ```

        ```
        POSTGRES_USER=superuser
        POSTGRES_PASSWORD=test123
        POSTGRES_DB=todo_database
        DATABASE_PORT=5432
        BACKEND_PORT=3001
        FRONTEND_PORT=3000
        DATABASE_URL= "postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@localhost:${DATABASE_PORT}/${POSTGRES_DB}?schema=public"
        JWT_SECRET=superuser
        ```

        ```bash
        cd ..
        ```

3.  **Start the services using Docker Compose:**

    ```bash
    docker compose -f 'docker-compose.yml' up -d --build 'db'
    ```

    Note: You can check and stop the current PostgreSQL instance running locally if any conflicts arise:

    ```bash
    sudo systemctl status postgresql
    sudo systemctl stop postgresql
    ```

    Open a new terminal and run:

    ```bash
    docker compose -f 'docker-compose.yml' up -d --build 'pgadmin'
    ```

    Open a new terminal and run:

    ```bash
    docker compose -f 'docker-compose.yml' up -d --build 'backend'
    ```

4.  **Setup Prisma:**

    ```bash
    cd backend
    ```

    ```bash
    npm install -g prisma
    ```

    ```bash
    npx prisma generate
    ```

    ```bash
    npx prisma migrate dev --name init
    ```

    ```bash
    npm run prisma:seed
    ```

    ```bash
    cd ..
    ```

5.  **Start Frontend:**

    ```bash
    cd front-end
    yarn
    yarn dev
    ```

6.  **Access the application:**

    Open your web browser and go to `http://localhost:3000` (or the port that your frontend is running on).

## Technologies Used

*   [React](https://reactjs.org/): Frontend framework
*   [Express.js](https://expressjs.com/): Backend framework
*   [Node.js](https://nodejs.org/): JavaScript runtime environment
*   [Prisma](https://www.prisma.io/): ORM
*   [PostgreSQL](https://www.postgresql.org/): Database
*   [Docker](https://www.docker.com/): Containerization
*   [Tailwind CSS](https://tailwindcss.com/): CSS Framework
*   [Shadcn UI](https://ui.shadcn.com/): Component Library
*   [Passport](http://www.passportjs.org/): Authentication and Authorization
