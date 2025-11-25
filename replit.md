# PT IJA Landing Website

## Overview

This is a landing website for PT IJA (PT Inovasi Jaya Akselera), a company that provides digital systems and operational technology solutions for street food businesses. The application is built as a full-stack TypeScript web application with a React frontend and Express backend, designed to showcase PT IJA's services, allow potential customers to contact the company, and provide information about their street food business transformation solutions.

The site features a clean, modern design inspired by premium food industry websites, with sections for hero messaging, services, mission/values, market advantages, locations, ordering information, and contact forms.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Full-Stack Architecture Pattern

The application follows a monorepo full-stack architecture with clear separation between client and server code:

- **Client-side rendering (CSR)**: React-based SPA for the frontend
- **Server-side API**: Express.js REST API backend
- **Build system**: Vite for frontend bundling, esbuild for backend compilation
- **Development approach**: Hot module replacement in development, optimized static builds for production

This architecture was chosen to enable rapid development with modern tooling while maintaining a simple deployment model where the Express server serves both the API and static frontend assets.

### Frontend Architecture

**Framework Choice: React with TypeScript**
- React provides component-based UI development with excellent developer experience
- TypeScript adds type safety across the entire frontend codebase
- Chosen for wide ecosystem support and team familiarity

**UI Component Library: shadcn/ui**
- Built on Radix UI primitives for accessibility and customization
- Tailwind CSS for styling with a custom design system
- "New York" style variant selected for clean, modern aesthetic
- Full suite of 40+ pre-built components (buttons, cards, forms, dialogs, navigation, etc.)

**Design System**
- Warm color palette (yellows, browns, neutrals) for street food aesthetic
- Large typography hierarchy for impact
- Generous whitespace and full-width sections
- Mobile-first responsive approach
- Design inspired by Boga Group's layout patterns

**State Management**
- TanStack Query (React Query) for server state management
- Local component state with React hooks
- No global state management needed due to simple data flow

**Routing**
- Wouter for lightweight client-side routing
- Single-page application with smooth scroll navigation
- Currently supports home page and 404 fallback

### Backend Architecture

**Framework: Express.js**
- Lightweight, unopinionated web framework
- RESTful API design pattern
- Middleware-based request processing

**Server Modes**
- Development mode: `index-dev.ts` with Vite middleware for HMR
- Production mode: `index-prod.ts` serving pre-built static assets
- Separate entry points allow optimized builds for each environment

**API Structure**
- `/api/contact` endpoint for form submissions (POST)
- `/api/contact` endpoint for retrieving submissions (GET)
- JSON request/response format
- Error handling with appropriate HTTP status codes

**Request Processing**
- Custom logging middleware for API request tracking
- JSON body parsing with raw body capture
- CORS and security headers handled by middleware chain

### Data Storage

**Database: PostgreSQL (via Neon)**
- Serverless Postgres chosen for scalability and ease of deployment
- Neon serverless driver (`@neondatabase/serverless`) for connection pooling
- All contact form submissions persist to database

**ORM: Drizzle ORM**
- Type-safe database queries with TypeScript
- Schema-first approach with direct schema push (no manual migrations)
- Zod integration for runtime validation via `drizzle-zod`

**Storage Implementation**
- `IStorage` interface defines data operations
- `DatabaseStorage` implementation using Drizzle ORM with PostgreSQL
- Environment validation ensures DATABASE_URL is configured
- Error handling for failed insert operations
- Results ordered by most recent first (descending submittedAt)

**Database Schema**
- `users` table: Basic user authentication structure (id, username, password)
- `contact_submissions` table: Contact form data (id, name, email, message, timestamp)
- UUID primary keys with PostgreSQL's `gen_random_uuid()`
- Automatic timestamp tracking with `defaultNow()`

### Form Validation & Data Flow

**Validation Strategy**
- Zod schemas derived from Drizzle table definitions
- Shared validation between client and server via `/shared` directory
- `insertContactSubmissionSchema` excludes auto-generated fields (id, timestamp)
- Runtime validation on API endpoints with structured error responses

**Contact Form Flow**
1. User fills form in React component
2. Client-side validation (could be added via react-hook-form)
3. POST to `/api/contact` with TanStack Query mutation
4. Server validates with Zod schema
5. Storage layer persists to database
6. Success/error response returned
7. Toast notification shows user feedback

## Recent Changes (November 25, 2025)

### Database Migration
- Migrated contact form submissions from in-memory storage to PostgreSQL
- Updated `DatabaseStorage` class to replace `MemStorage`
- Added DATABASE_URL validation and error handling
- Contact submissions now persist across restarts

### Pending Email Integration
- Email notifications for contact form submissions deferred
- User dismissed Resend integration setup
- Can be implemented later with email service credentials
- Note: Contact form currently stores submissions in database without email notifications

## External Dependencies

### Third-Party UI Libraries

- **Radix UI**: Comprehensive set of accessible, unstyled UI primitives (@radix-ui/react-*)
- **Lucide React**: Icon library for consistent iconography
- **Tailwind CSS**: Utility-first CSS framework with custom configuration
- **class-variance-authority**: Type-safe component variants
- **cmdk**: Command menu component
- **embla-carousel-react**: Carousel/slider functionality
- **vaul**: Drawer component primitive

### Data & State Management

- **TanStack Query v5**: Server state synchronization and caching
- **React Hook Form**: Form state management with validation
- **@hookform/resolvers**: Zod schema resolver for react-hook-form
- **Zod**: Schema validation library

### Database & Backend

- **PostgreSQL**: Primary database (configured for Neon serverless)
- **Drizzle ORM**: Database ORM with TypeScript support
- **Drizzle Kit**: Migration and schema management tool
- **@neondatabase/serverless**: Serverless Postgres driver
- **connect-pg-simple**: PostgreSQL session store (configured but not currently used)

### Development Tools

- **Vite**: Frontend build tool and dev server
- **esbuild**: Backend bundler for production builds
- **tsx**: TypeScript execution for development
- **TypeScript**: Type checking across entire codebase
- **@replit/vite-plugin-***: Replit-specific development plugins (cartographer, dev banner, runtime error modal)

### Utility Libraries

- **clsx & tailwind-merge**: Conditional className utilities
- **date-fns**: Date manipulation and formatting
- **nanoid**: Unique ID generation
- **wouter**: Lightweight routing library

### Build & Configuration

- **PostCSS**: CSS processing with Tailwind
- **Autoprefixer**: CSS vendor prefixing
- Path aliases configured for clean imports (@/, @shared/, @assets/)
- TypeScript path mapping for module resolution