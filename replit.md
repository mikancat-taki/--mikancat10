# Study Cat - Multi-language Learning Application

## Overview

This is a full-stack educational application called "Study Cat" (勉強ねこ) built with React, TypeScript, Express, and PostgreSQL. It provides various learning modules including translation tools, quizzes, memo-taking, drawing, and real-time chat functionality. The application supports multiple languages (Japanese, Chinese, English) and is designed for educational purposes.

## Recent Changes (July 2025)

✓ Updated footer copyright year from 2024 to 2025
✓ Added GitHub repository link to footer (https://github.com/mikancat-taki/--mikancat10)
✓ Implemented answer randomization for all quiz systems (Math, English, SDGs)
✓ Fixed clock functionality with real-time display and world time zones
✓ Added shuffle functionality to randomize quiz answer options for better learning experience

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Framework**: Tailwind CSS for styling with custom cat-themed color palette
- **Component Library**: Radix UI primitives via shadcn/ui components
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state management
- **Styling**: CSS variables for theming, responsive design principles

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ESM modules
- **Development**: tsx for TypeScript execution in development
- **WebSocket**: Built-in WebSocket server for real-time chat functionality
- **API**: RESTful API endpoints for data operations

### Database Layer
- **ORM**: Drizzle ORM with Drizzle Kit for migrations
- **Database**: PostgreSQL (configured for Neon serverless)
- **Schema**: Shared schema definitions between client and server
- **Validation**: Zod for runtime type validation

## Key Components

### Core Modules
1. **Translation Tool** - Multi-language translation between Japanese, Chinese, and English
2. **Calculator** - Basic arithmetic calculator with clean UI
3. **Memo System** - Note-taking functionality with CRUD operations
4. **Drawing Canvas** - Interactive drawing tool with multiple tools and colors
5. **Real-time Chat** - WebSocket-based chat system
6. **Quiz Systems** - Multiple quiz types (Math, English, Geography, SDGs)
7. **Clock/Time Display** - Current time display functionality

### UI Components
- Custom module cards with hover effects and category colors
- Language selector with flag icons
- Responsive header with back navigation
- Footer with deployment information
- Toast notifications for user feedback
- Progress bars for quiz completion
- Modal dialogs for various interactions

### WebSocket Integration
- Real-time messaging system
- Automatic reconnection handling
- Message broadcasting to all connected clients
- Custom WebSocket hook for easy integration

## Data Flow

### Client-Server Communication
1. **REST API**: Standard HTTP requests for CRUD operations
2. **WebSocket**: Real-time bidirectional communication for chat
3. **State Management**: TanStack Query handles caching, loading states, and optimistic updates
4. **Error Handling**: Centralized error handling with toast notifications

### Database Operations
1. **Users**: User management with username/password authentication
2. **Memos**: Personal note storage with user association
3. **Chat Messages**: Real-time message persistence
4. **Quiz Scores**: Score tracking with leaderboards
5. **Migrations**: Drizzle Kit manages database schema changes

## External Dependencies

### Frontend Dependencies
- React ecosystem (React, React-DOM, React Hook Form)
- UI libraries (Radix UI, Tailwind CSS, Lucide React icons)
- Utilities (class-variance-authority, clsx, date-fns)
- Development tools (Vite, TypeScript, PostCSS)

### Backend Dependencies
- Express.js with middleware for JSON parsing and session handling
- WebSocket server implementation
- Database connectivity via Neon serverless driver
- Development utilities (tsx, esbuild for production builds)

### Database
- PostgreSQL with Neon serverless driver
- Connection pooling and session management
- Environment-based configuration

## Deployment Strategy

### Development Environment
- Vite dev server with HMR for frontend
- tsx for TypeScript execution in development
- Concurrent development of client and server
- Replit-specific plugins for development experience

### Production Build
- Vite builds optimized frontend bundle to `dist/public`
- esbuild bundles server code to `dist/index.js`
- Static file serving from Express
- Environment variable configuration for database

### Deployment Targets
- Replit-ready with specific configuration
- Glitch and Render compatibility mentioned in footer
- PostgreSQL database can be provisioned separately
- Environment variables for database connection string

### Database Setup
- Drizzle Kit for schema management
- `db:push` command for schema deployment
- Migration files stored in `./migrations` directory
- PostgreSQL dialect configuration

The application follows modern full-stack practices with TypeScript throughout, proper separation of concerns, and a focus on educational content delivery with engaging UI/UX design.