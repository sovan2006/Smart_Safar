# SmartSafar Backend

This directory contains the backend services, APIs, and database configurations for the SmartSafar application.

## Getting Started

This is a basic Node.js Express server to get you started.

### Prerequisites

You need to have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed on your machine. You will also need a MongoDB database and have the connection URI ready.

### Installation

1.  Navigate to the `backend` directory:
    ```sh
    cd backend
    ```
2.  Install the required dependencies:
    ```sh
    npm install
    ```
3.  Create a `.env` file in the `backend` directory and add the following environment variables:
    ```
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_super_secret_jwt_key
    ```

### Running the Server

To start the backend server, run the following command from within the `backend` directory:

```sh
npm start
```

The server will start on `http://localhost:3001`. The frontend application is already configured to proxy API requests to this address.