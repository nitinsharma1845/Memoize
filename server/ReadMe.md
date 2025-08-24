# Memoize Backend

Memoize backend is a RESTful API built with Node.js and Express, providing authentication, note management, and label organization for the Memoize note-taking app.

## Features

- User authentication (signup, login, JWT-based auth)
- CRUD operations for notes
- Label management
- Pin, search, and organize notes
- File upload (user avatars, note attachments)
- Error handling and validation

## Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- Multer (file uploads)
- Cloudinary (image storage)
- JWT (authentication)
- CORS

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB instance (local or cloud)

### Installation

```sh
npm install
```

### Environment Variables

Create a `.env` file in the `server/` directory with the following variables:

```
PORT=8000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Running the Server

```sh
npm start
```

The API will be available at `http://localhost:8000`.

## Project Structure

```
server/
  ├── public/           # Static assets/uploads
  ├── src/
  │   ├── controller/   # Route controllers (user, note, label)
  │   ├── database/     # DB connection and models
  │   ├── middleware/   # Auth, error, multer
  │   ├── router/       # API routes
  │   ├── utils/        # Helpers (API error/response, async handler, cloudinary)
  │   ├── app.js        # Express app setup
  │   └── index.js      # Entry point
  ├── package.json
  └── ReadMe.md
```

## API Endpoints

- `/api/user` - User registration, login, profile
- `/api/note` - Create, update, delete, get notes
- `/api/label` - Create, update, delete, get labels

See route files in `src/router/` and controller files in `src/controller/` for details.

## License

MIT

---

For frontend setup, see [client/README.md](../client/README.md).
