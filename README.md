# Agrofix - Online Vegetable Bulk Order Application

A web application for ordering fresh vegetables and fruits in bulk. Built with Next.js, React, and Tailwind CSS.

## Features

- Browse a catalog of fresh vegetables and fruits
- User authentication (login/register)
- Shopping cart functionality
- Place bulk orders
- Track order status
- Mobile-responsive design

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **State Management**: React Context API
- **Forms**: React Hook Form
- **HTTP Requests**: Axios
- **Backend**: Express.js (located in the server directory)
- **Database**: SQLite with better-sqlite3

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
   ```
   git clone <repository-url>
   cd Online-vegetables
   ```

2. Set up the backend server
   ```
   cd server
   npm install
   npm start
   ```

3. Set up the frontend client
   ```
   cd client
   npm install
   npm run dev
   ```

4. Create a `.env` file in the client directory with the following variables:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:8080
   ```

### Development

- Run the development server:
  ```
  npm run dev
  ```

- Build for production:
  ```
  npm run build
  ```

- Start production server:
  ```
  npm start
  ```

## Project Structure

```
client/
├── public/              # Static files
├── src/
│   ├── app/             # Next.js app router pages
│   ├── components/      # Reusable components
│   └── lib/             # Utilities, contexts, and API
├── package.json
└── README.md
```

## API Endpoints

The frontend communicates with the backend API which provides the following endpoints:

- `GET /products` - Get all products
- `POST /users` - Register a new user
- `POST /login` - Authenticate a user
- `POST /orders` - Place a new order
- `GET /orders` - Get the user's orders

## Deployment

The frontend is designed to be deployed on Vercel, and the backend is currently hosted on Render.

## License

This project is licensed under the MIT License.
