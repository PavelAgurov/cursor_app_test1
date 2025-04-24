# TypeScript React Node Application

A full-stack TypeScript application with a React frontend and Node.js backend, featuring user authentication.

## Application Structure

```
├── client/                 # React frontend
│   ├── public/             # Static files
│   └── src/                # Source code
│       ├── components/     # React components
│       ├── hooks/          # Custom React hooks
│       ├── types/          # TypeScript type definitions
│       └── utils/          # Utility functions
├── server/                 # Node.js backend
│   ├── src/                # Source code
│   │   ├── controllers/    # Request handlers
│   │   ├── data/           # Data storage (YAML files)
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   ├── types/          # TypeScript type definitions
│   │   └── utils/          # Utility functions
│   └── package.json        # Server dependencies
└── package.json            # Root package.json for scripts
```

## Features

- TypeScript for both frontend and backend
- React for the frontend UI
- Node.js with Express for the backend
- User authentication with username/password
- Protected Hello button that calls the backend API

## Authentication

The application uses a simple authentication system:
- Users are stored in `server/src/data/users.yaml`
- Login form authenticates against this file
- Successful login stores authentication state in browser localStorage
- Protected routes/features are only available to authenticated users

Default users:
- username: `admin`, password: `admin123`
- username: `user`, password: `user123`
- username: `test`, password: `test123`

## Installation

1. Install dependencies for the root, client, and server:

```bash
npm run install-all
```

## Development

To run both the client and server in development mode:

```bash
npm start
```

To run only the client:

```bash
npm run client
```

To run only the server:

```bash
npm run server
```

## Building for Production

To build both client and server for production:

```bash
npm run build
```

## API Endpoints

- `POST /api/login`: Authenticates user credentials
- `GET /api/hello`: Returns a greeting message from the server (for authenticated users) 