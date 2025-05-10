<p align="center">
  <img src="public/login-preview.png" alt="Login Page Preview" width="700"/>
</p>

# Next.js Authentication with Localization

This is a [Next.js](https://nextjs.org) project that implements a robust authentication system with multi-language support. The application provides a secure and user-friendly authentication experience with the following features:

## Features

- 🔐 **Authentication System**
  - User registration and login
  - Password reset functionality
  - JWT-based authentication
  - Protected routes
  - Session management

- 🌐 **Multi-language Support**
  - Dynamic language switching
  - Localized authentication messages
  - Language persistence using cookies

- 🎨 **Modern UI/UX**
  - Responsive design
  - Beautiful authentication pages
  - Form validation
  - Toast notifications for user feedback

- 🔒 **Security**
  - Password hashing with bcrypt
  - JWT token-based authentication
  - Secure session management
  - Protected API routes

## Tech Stack

- **Framework**: Next.js 15.3.2
- **Authentication**: NextAuth.js 5.0.0-beta.27
- **Database**: PostgreSQL with Prisma ORM
- **Styling**: Tailwind CSS
- **Form Handling**: React Hook Form with Zod validation
- **State Management**: React Query
- **UI Components**: Custom components with Radix UI primitives

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database Configuration
DATABASE_URL="postgresql://user:password@localhost:5432/your_database_name"

# Authentication
JWT_SECRET="your-secret-key-for-jwt-tokens"
AUTH_SECRET="your-nextauth-secret-key"
AUTH_TRUST_HOST="true"

# API Configuration
NEXT_PUBLIC_API_URL="http://localhost:3000/api"

# Optional: For Production
# NODE_ENV="production"
# VERCEL_URL="your-vercel-url" # If deploying to Vercel
```

### Environment Variables Description

- `DATABASE_URL`: Your PostgreSQL database connection string
- `JWT_SECRET`: Secret key used for signing JWT tokens
- `AUTH_SECRET`: Secret key used by NextAuth.js for encryption
- `AUTH_TRUST_HOST`: Set to "true" to trust the host header (useful for some deployment scenarios, e.g., behind proxies or on Vercel)
- `NEXT_PUBLIC_API_URL`: The base URL for your API endpoints
- `NODE_ENV`: Set to "production" in production environment
- `VERCEL_URL`: Your Vercel deployment URL (if using Vercel)

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
