# Task Manger 🚧 Under Development 🚧

Task Manager is a web application that allows users to create, manage, and organize their tasks. It consists of a frontend built with React for the user interface and a backend built with Node.js and Express for handling data storage and retrieval.



## Current Status

The application is structured as a monorepo, with the frontend developed using React and the backend utilizing Node.js and Express.js. Socket.io facilitates real-time communication between different tabs of the application, allowing users to see live cursor movements and collaborate seamlessly.

The project is containerized using Docker, with a Docker Compose configuration provided for easy deployment. Husky pre-commit hooks ensure code quality by running linting and formatting checks before each commit.

## Next Steps

-   Implement drag card design enhancements for improved user experience.
-   Resolve socket connectivity issues within Docker containers to enable seamless communication.
-   Integrate CRUD (Create, Read, Update, Delete) operations for tasks and users in the frontend.
-   Incorporate PostgreSQL for robust data storage and management capabilities.
-   Integrate Auth0 for secure authentication and user management.
-   Update TurboRepo configuration for optimized repository management and collaboration.

Stay tuned for updates as we continue to enhance and refine the Task Manager App!



# Running the Application Locally

#### Install Dependencies

 Ensure you have [Node.js](https://nodejs.org/) installed on your machine. Then, navigate to the project root directory in your terminal and run the following command to install project dependencies:
```bash
pnpm install
```

#### Frontend

To run the frontend locally, execute the following command from the root directory of the monorepo:

```bash
pnpm run dev:web
```

>Access the frontend application at [http://localhost:5173](http://localhost:5173).

#### Backend

To run the backend locally, execute the following command from the root directory of the monorepo:

```bash
pnpm run dev:api
```

>Access the backend API at [http://localhost:3000](http://localhost:3000).

#### Run Frontend and Backend in a one command 

To run the frontend and backend locally, execute the following command from the root directory of the monorepo:

```bash
pnpm run start:local
```

#### Using Docker

To run the application using Docker, execute the following command from the root directory of the monorepo:

```bash
pnpm run dev:docker
```

>Access the frontend application at [http://localhost:5000](http://localhost:5000) when running through Docker.

#### Note:

- For local development without Docker, the frontend runs on port 5173, and the backend runs on port 3000.
- When using Docker, the frontend runs on port 5000, and the backend runs on port 3000.
- Make sure all dependencies are installed before running the commands..
