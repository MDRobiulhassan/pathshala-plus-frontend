# Pathshala Plus Frontend - Complete Project Analysis

**Project Name:** pathshala-plus-frontend  
**Framework:** Next.js 16.2.3 (Non-standard version with breaking changes)  
**Language:** TypeScript  
**Version:** 0.1.0  
**Type:** Educational Platform Frontend

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Architecture & Patterns](#architecture--patterns)
5. [Authentication & Security](#authentication--security)
6. [API Integration](#api-integration)
7. [Data Flow](#data-flow)
8. [Pages & Routing](#pages--routing)
9. [Components](#components)
10. [Custom Hooks](#custom-hooks)
11. [State Management](#state-management)
12. [Styling & UI](#styling--ui)
13. [Configuration](#configuration)
14. [Build & Deployment](#build--deployment)

---

## Project Overview

**Pathshala** is an educational platform designed for learners. The frontend is built as a modern React/Next.js application supporting dual user roles: **Students** and **Teachers**.

### Key Features:
- 🔐 Role-based authentication (Student/Teacher)
- 📚 Question Bank with exam preparation materials
- 🧪 Test/Quiz system with timed exams
- 📊 Performance analytics & dashboards
- 🏆 Leaderboard system
- 👥 Batch management
- ⚔️ Competitive duels
- 🤖 Pathshala AI assistance
- 👤 User profiles with security settings
- 🌐 Multi-language support
- 🔑 OAuth integration (Google, Facebook)

---

## Technology Stack

### Core Framework
| Package | Version | Purpose |
|---------|---------|---------|
| **next** | 16.2.3 | React meta-framework with App Router |
| **react** | 19.2.4 | UI library |
| **react-dom** | 19.2.4 | DOM rendering |
| **typescript** | ^5 | Type safety |

### UI & Styling
| Package | Version | Purpose |
|---------|---------|---------|
| **tailwindcss** | ^4 | Utility-first CSS framework |
| **@tailwindcss/postcss** | ^4 | PostCSS plugin |
| **class-variance-authority** | ^0.7.1 | Component variant system |
| **tailwind-merge** | ^3.5.0 | Merge Tailwind classes intelligently |
| **clsx** | ^2.1.1 | Conditional className utilities |
| **radix-ui** | ^1.4.3 | Unstyled, accessible components |

### Radix UI Components (Comprehensive UI Component Library)
- Accordions, Alert Dialogs, Avatars
- Checkboxes, Collapsibles, Context Menus
- Dropdowns, Dialogs, Drawers
- Form elements (Input, Label, Select, Radio)
- Navigation components
- Popovers, Tooltips, Tabs, Toggles

### Form & Validation
| Package | Version | Purpose |
|---------|---------|---------|
| **react-hook-form** | ^7.72.1 | Form state management |
| **@hookform/resolvers** | ^5.2.2 | Validation resolver integration |
| **zod** | ^4.3.6 | Schema validation & type inference |

### Data Management & Async
| Package | Version | Purpose |
|---------|---------|---------|
| **@tanstack/react-query** | ^5.101.4 | Server state management & caching |
| **axios** | ^1.18.1 | HTTP client with interceptors |

### Utilities & Notifications
| Package | Version | Purpose |
|---------|---------|---------|
| **sonner** | ^2.0.7 | Toast notifications |
| **lucide-react** | ^1.8.0 | Icon library |
| **react-icons** | ^5.6.0 | Additional icons |
| **date-fns** | ^4.4.0 | Date manipulation |
| **js-cookie** | ^3.0.8 | Cookie management |
| **motion** | ^12.40.0 | Animation library |

### Data Visualization
| Package | Version | Purpose |
|---------|---------|---------|
| **recharts** | ^3.10.0 | Chart/graph components |
| **embla-carousel-react** | ^8.6.0 | Carousel/slider component |

### Layout & UI Enhancements
| Package | Version | Purpose |
|---------|---------|---------|
| **react-resizable-panels** | ^4.11.2 | Resizable panel layouts |
| **vaul** | ^1.1.2 | Drawer/modal primitive |
| **react-day-picker** | ^10.0.1 | Calendar date picker |

### Input & OTP
| Package | Version | Purpose |
|---------|---------|---------|
| **input-otp** | ^1.4.2 | OTP input component |
| **cmdk** | ^1.1.1 | Command/command palette component |

### Dev Tools
| Package | Version | Purpose |
|---------|---------|---------|
| **eslint** | ^9 | Code linting |
| **eslint-config-next** | 16.2.3 | Next.js ESLint rules |

---

## Project Structure

```
pathshala-plus-frontend/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout with providers
│   ├── page.tsx                 # Homepage
│   ├── globals.css              # Global styles
│   ├── auth/                    # Authentication routes
│   │   ├── login/               # Login page
│   │   ├── signup/              # Signup page
│   │   ├── forgot-password/     # Password reset
│   │   └── callback/            # OAuth callback handler
│   ├── student/                 # Student dashboard routes
│   │   ├── layout.tsx           # Student layout with sidebar
│   │   ├── page.tsx             # Student dashboard
│   │   ├── question-bank/       # Question bank
│   │   ├── tests/               # Test/exam section
│   │   ├── ai/                  # AI assistance
│   │   ├── batch/               # Batch management
│   │   ├── duel/                # Competitive duels
│   │   ├── leaderboard/         # Rankings
│   │   └── profile/             # Student profile
│   └── teacher/                 # Teacher routes
│       ├── page.tsx             # Teacher dashboard
│       └── profile/             # Teacher profile
│
├── components/                   # Reusable React components
│   ├── auth/                    # Authentication forms
│   │   ├── LoginForm.tsx
│   │   └── SignupForm.tsx
│   ├── common/                  # Shared components
│   │   ├── ComingSoon.tsx
│   │   └── Logo.tsx
│   ├── dashboard/               # Dashboard layout components
│   │   ├── DashboardLayout.tsx  # Main dashboard wrapper
│   │   ├── Sidebar.tsx          # Navigation sidebar
│   │   ├── SidebarHeader.tsx
│   │   ├── SidebarNav.tsx
│   │   ├── SidebarItem.tsx
│   │   ├── cards/               # Dashboard cards
│   │   └── sections/            # Dashboard sections
│   ├── homepage/                # Landing page sections
│   │   ├── hero-section.tsx
│   │   ├── built-for-learners.tsx
│   │   ├── how-it-works.tsx
│   │   ├── pricing.tsx
│   │   ├── quick-actions.tsx
│   │   ├── why-pathshala.tsx
│   │   ├── site-nav.tsx
│   │   ├── site-footer.tsx
│   │   └── reveal.tsx
│   ├── profile/                 # Profile components
│   │   ├── ProfilePageContent.tsx
│   │   ├── ProfileInfoForm.tsx
│   │   ├── ProfilePhotoHeader.tsx
│   │   └── SecurityForm.tsx
│   ├── question-bank/           # Question bank UI
│   │   ├── QuestionBankLanding.tsx
│   │   ├── exam-info/
│   │   ├── exam-question/
│   │   ├── exam-session/
│   │   ├── practice/
│   │   ├── shift/
│   │   ├── subject/
│   │   ├── test/
│   │   ├── unit/
│   │   ├── viewer/
│   │   ├── cards/
│   │   ├── sections/
│   │   └── Shared/
│   ├── topbar/                  # Top navigation bar
│   │   ├── Topbar.tsx
│   │   ├── StreakCounter.tsx
│   │   └── UserDropdown.tsx
│   ├── ui/                      # Shadcn UI components (base components)
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── card.tsx
│   │   ├── form.tsx
│   │   ├── dialog.tsx
│   │   ├── drawer.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── accordion.tsx
│   │   ├── alert.tsx
│   │   ├── avatar.tsx
│   │   ├── badge.tsx
│   │   ├── calendar.tsx
│   │   ├── carousel.tsx
│   │   ├── chart.tsx
│   │   ├── checkbox.tsx
│   │   ├── command.tsx
│   │   ├── field.tsx
│   │   └── ... (30+ UI primitives)
│   └── providers/               # React context providers
│       └── query-provider.tsx   # TanStack Query setup
│
├── hooks/                        # Custom React hooks
│   ├── useAuthSession.ts        # Authentication state
│   ├── useDashboard.tsx         # Dashboard data
│   ├── useUserTestAttempts.ts   # Test attempt tracking
│   ├── useDashboard.tsx         # Dashboard logic
│   ├── userProfile.ts           # User profile data
│   ├── use-mobile.tsx           # Mobile breakpoint detection
│   └── question-bank/           # Question bank specific hooks
│
├── lib/                          # Utility & library files
│   ├── api.ts                   # API export barrel
│   ├── axios.ts                 # Axios instance
│   ├── api/                     # API services
│   │   ├── client.ts            # Axios setup with interceptors
│   │   ├── auth.ts              # Authentication endpoints
│   │   ├── profile.ts           # Profile management
│   │   ├── education.ts         # Education levels & languages
│   │   ├── question-bank.ts     # Question bank endpoints
│   │   └── example.functions.ts
│   ├── auth-constants.ts        # Cookie names, auth constants
│   ├── config.server.ts         # Server-only configuration
│   ├── error-capture.ts         # Error handling utilities
│   ├── error-page.ts            # Error page rendering
│   ├── validation.ts            # Zod schemas for validation
│   ├── utils.ts                 # Helper utilities (cn function)
│   └── lovable-error-reporting.ts
│
├── public/                       # Static assets
│   ├── films/                   # Video assets
│   ├── icons/                   # Icon assets
│   └── ... (other static files)
│
├── middleware.ts                 # Next.js middleware (auth protection)
├── next.config.ts               # Next.js configuration
├── tsconfig.json                # TypeScript configuration
├── tailwind.config.ts           # Tailwind CSS config
├── postcss.config.mjs           # PostCSS configuration
├── eslint.config.mjs            # ESLint configuration
├── components.json              # Component library config
├── package.json                 # Dependencies
├── next-env.d.ts                # Next.js type definitions
├── AGENTS.md                    # Custom agent rules (IMPORTANT!)
├── CLAUDE.md                    # Claude agent instructions
└── README.md                    # Project documentation
```

---

## Architecture & Patterns

### 1. **Next.js App Router Architecture**

The project uses **Next.js 16 App Router** (file-based routing in `/app` directory):

```
/app/
  page.tsx          → /
  auth/
    login/page.tsx  → /auth/login
    signup/page.tsx → /auth/signup
  student/
    page.tsx        → /student
    tests/page.tsx  → /student/tests
  teacher/
    page.tsx        → /teacher
```

### 2. **Role-Based Access Control (RBAC)**

Two distinct user roles with separate dashboards:

```
Roles: STUDENT | TEACHER

User Routes:
  └── /student     (if role includes "STUDENT")
  └── /teacher     (if role includes "TEACHER")
```

Route protection via middleware (`middleware.ts`):
- Validates `access_token` cookie
- Redirects unauthenticated users to `/auth/login`
- Protected routes: `/student`, `/teacher`, `/profile`, `/dashboard`

### 3. **Component Architecture**

**Hierarchical Structure:**
```
RootLayout
├── Providers (QueryProvider, Toaster)
├── Routes
│   ├── Public Routes (/ , /auth/*)
│   └── Protected Routes
│       ├── StudentLayout
│       │   └── DashboardLayout
│       │       ├── Sidebar (Navigation)
│       │       ├── Topbar (Header)
│       │       └── [children]
│       └── TeacherLayout
│           └── Similar structure
```

### 4. **Client vs. Server Components**

- **"use client"** components: Forms, interactive dashboards, modals
- **Server components** (implicit): Layouts, data-fetching wrappers

### 5. **Data Fetching Pattern**

```
API Request Flow:
Client Component
  ↓
Custom Hook (useAuthSession, useDashboard)
  ↓
TanStack Query (useQuery)
  ↓
Axios Interceptor
  ↓
Backend API (localhost:8080/api/v1)
```

### 6. **Form Handling Pattern**

```
React Hook Form + Zod Validation:
1. Form submission
2. Zod schema validation (safeParse)
3. If valid: API call
4. Toast notification (success/error)
5. Router navigation on success
```

---

## Authentication & Security

### Authentication Flow

```
1. User Access
   ↓
2. Middleware Check (middleware.ts)
   - Extract access_token from cookies
   - Validate against protected routes
   ↓
3. If Unauthenticated
   - Redirect to /auth/login
   ↓
4. If Authenticated
   - Allow access
   - Continue with useAuthSession hook
```

### Login/Signup Process

**Email & Password:**
```
LoginForm
  ↓
loginUser() API call
  ↓
Backend returns: { id, role }
  ↓
Sets access_token cookie (httpOnly)
  ↓
Role-based redirect:
  - TEACHER → /teacher
  - STUDENT → /student
```

**OAuth (Google/Facebook):**
```
User clicks "Sign in with Google"
  ↓
Redirects to backend OAuth handler
  ↓
Backend handles OAuth exchange
  ↓
Redirects to /auth/callback
  ↓
AuthCallbackPage checks:
  - OAuth errors
  - User profile
  - Role-based redirect
```

### Token Management

**Axios Interceptor Strategy** (`lib/api/client.ts`):

```typescript
Response Status 401
  ↓
Check if already refreshing
  ↓
If not: Trigger refresh_token endpoint
        Queue failed requests
  ↓
On refresh success:
  - Retry original request
  - Process queued requests
  ↓
On refresh failure:
  - Redirect to /auth/login
  - Reject queued requests
```

### Security Features

| Feature | Implementation |
|---------|-----------------|
| **CSRF Protection** | Via httpOnly cookies |
| **XSS Prevention** | React escaping + CSP |
| **Auth Token Storage** | httpOnly cookies (not localStorage) |
| **Password Requirements** | Min 8 chars, uppercase, lowercase, number, special char |
| **OTP Verification** | 6-digit OTP for password reset |
| **Credentials in API** | `withCredentials: true` in axios |

---

## API Integration

### Base Configuration

```typescript
// lib/api/client.ts
Base URL: process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080/api/v1"
Credentials: true (includes cookies in requests)
```

### API Endpoints

#### Authentication (`lib/api/auth.ts`)

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/auth/signup` | POST | User registration |
| `/auth/login` | POST | User login |
| `/auth/logout` | POST | Logout |
| `/auth/refresh` | POST | Refresh access token |
| `/auth/me` | GET | Get current user profile |
| `/auth/forgot-password` | POST | Request password reset OTP |
| `/auth/verify-otp` | POST | Verify OTP |
| `/auth/reset-password` | POST | Reset password with token |

#### Profile Management (`lib/api/profile.ts`)

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/users/me` | PATCH | Update profile info |
| `/users/me/avatar` | POST | Upload profile avatar (multipart) |

#### Education Levels (`lib/api/education.ts`)

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/education-levels` | GET | Fetch education levels |
| `/languages` | GET | Fetch available languages |

#### Question Bank (`lib/api/question-bank.ts`)

Key Types & Endpoints:

```typescript
Types:
  - Institute (id, name, shortName, logoUrl, hasUnits)
  - Subject (subjectId, subjectName, educationLevelId)
  - Unit (id, name, instituteId)
  - ExamSession (id, sessionLabel, startYear, hasShift)
  - Shift (id, shiftNumber)
  - ExamInfo (id, examType, totalMarks, durationInMinutes)
  - Question (id, text, imageUrl, difficulty, options)
  - Passage (id, text, imageUrl, questions)

Endpoints:
  GET /institutes - List institutes
  GET /subjects - List subjects
  GET /units - List units
  GET /exam-sessions - List exam sessions
  GET /shifts - List shifts
  GET /exam-info/:testId - Get exam details
  GET /subject-questions/:subjectId - Get subject questions
  GET /exam-questions/:examInfoId - Get exam questions
```

### API Response Format

**Success Response:**
```json
{
  "data": { /* payload */ },
  "error": null
}
```

**Error Response:**
```json
{
  "data": null,
  "error": {
    "message": "Error description"
  }
}
```

### Error Handling

```typescript
try {
  const response = await api.post("/endpoint", data);
  return response.data.data;
} catch (error: any) {
  throw new Error(
    getApiErrorMessage(error, "Fallback message")
  );
}
```

---

## Data Flow

### 1. Authentication State Flow

```
App loads
  ↓
Middleware checks auth cookie
  ↓
useAuthSession hook runs
  ↓
TanStack Query calls getProfile()
  ↓
API: GET /auth/me
  ↓
Query stores in cache
  ↓
Components access via: useAuthSession().profile
```

### 2. Dashboard Data Flow

```
/student page loads
  ↓
useDashboard() hook
  ↓
useQuery("dashboard") 
  ↓
API: GET /dashboard
  ↓
Data cached (staleTime: 1 min)
  ↓
Multiple cards read: {
  dashboard,
  userAttempts,
  recentTests
}
  ↓
Render dashboard cards & sections
```

### 3. Form Submission Flow

```
User submits form (e.g., login)
  ↓
React Hook Form captures data
  ↓
Zod validates schema
  ↓
If invalid: Show error toast
  ↓
If valid: Call API function
  ↓
axios sends request
  ↓
Backend responds
  ↓
If 401: Interceptor refreshes token
  ↓
Success: Toast notification + Router.push()
  ↓
Error: Show error toast
```

### 4. Question Bank Navigation Flow

```
User selects Education Level
  ↓
Load available Institutes
  ↓
Select Institute
  ↓
Load Units (if hasUnits)
  ↓
Select Unit
  ↓
Load Exam Sessions
  ↓
Select Session
  ↓
Load Shifts (if hasShift)
  ↓
Select Subject
  ↓
Load Questions/Passages
  ↓
Render Question Viewer
```

---

## Pages & Routing

### Public Routes

| Route | Component | Purpose |
|-------|-----------|---------|
| `/` | `app/page.tsx` | Homepage with hero section |
| `/auth/login` | `LoginForm` | Login page |
| `/auth/signup` | `SignupForm` | Registration page |
| `/auth/forgot-password` | `ForgotPasswordForm` | Password reset |
| `/auth/callback` | `AuthCallbackPage` | OAuth callback |

### Protected Routes (Requires Auth Cookie)

#### Student Routes

| Route | Component | Purpose |
|-------|-----------|---------|
| `/student` | `StudentDashboard` | Main dashboard |
| `/student/question-bank` | `QuestionBankLanding` | Question library |
| `/student/tests` | `TestsPage` | Practice tests |
| `/student/ai` | `AIAssistance` | AI help |
| `/student/batch` | `BatchPage` | Batch management |
| `/student/duel` | `DuelPage` | Competitive mode |
| `/student/leaderboard` | `LeaderboardPage` | Rankings |
| `/student/profile` | `ProfilePage` | User profile |

#### Teacher Routes

| Route | Component | Purpose |
|-------|-----------|---------|
| `/teacher` | `TeacherDashboard` | Teacher dashboard |
| `/teacher/profile` | `TeacherProfile` | Profile settings |

### Route Protection

```typescript
// middleware.ts
Protected Routes: ["/dashboard", "/profile", "/student", "/teacher"]

If: No auth token
Then: Redirect to /auth/login

If: Auth token expired
Then: Interceptor refreshes
Then: If refresh fails → /auth/login
```

---

## Components

### 1. Layout Components

#### `RootLayout` (`app/layout.tsx`)
- Global font setup (Geist, Geist Mono, Baloo)
- QueryProvider wrapper (TanStack Query)
- Toaster notification system
- Metadata configuration

#### `DashboardLayout` (`components/dashboard/DashboardLayout.tsx`)
- **Features:**
  - Responsive layout (desktop sidebar + mobile drawer)
  - Page title derivation from route
  - Sidebar + Topbar + Content area
  - Sidebar collapse functionality
  - Mobile menu toggle
  - Dynamic page title display

#### `StudentLayout` / `TeacherLayout`
- Wraps `DashboardLayout`
- Role-specific content

### 2. Navigation Components

#### `Sidebar` (`components/dashboard/Sidebar.tsx`)
- **Features:**
  - Collapsible navigation (280px → 72px)
  - Smooth transitions
  - Logo section
  - Navigation items
  - Expand/collapse button with indicator

#### `SidebarNav` (`components/dashboard/SidebarNav.tsx`)
- Navigation menu with role-based items
- Active route highlighting
- Icon + label display

#### `SidebarHeader` (`components/dashboard/SidebarHeader.tsx`)
- Logo display
- Collapse toggle button
- Close button (mobile)

#### `Topbar` (`components/topbar/Topbar.tsx`)
- **Features:**
  - Page title display
  - Mobile menu button
  - User dropdown
  - Streak counter
  - Responsive layout

### 3. Authentication Components

#### `LoginForm` (`components/auth/LoginForm.tsx`)
- **Features:**
  - Email + password inputs
  - Password visibility toggle
  - Validation with Zod schema
  - Loading state
  - Error toast notifications
  - OAuth buttons (Google, Facebook)
  - Links to signup & forgot password
  - Role-based redirect on success

#### `SignupForm` (`components/auth/SignupForm.tsx`)
- **Features:**
  - Name, email, password, role selection
  - Password confirmation
  - Language selection
  - Education level selection
  - Validation with custom rules
  - OAuth integration
  - Success notification + redirect

### 4. Profile Components

#### `ProfilePageContent`
- Display user information
- Edit profile section
- Password security section
- Avatar upload

#### `ProfileInfoForm`
- Name and phone editing
- Form submission with validation

#### `SecurityForm`
- Current password verification
- New password with strength requirements
- Password confirmation

### 5. Dashboard Components

#### `DashboardCards` (`components/dashboard/cards/`)
- Quick stats display
- Learning metrics

#### `ContinueLearningCard`
- Resume from saved progress
- Active test tracking

#### `LearningProgressCard`
- Progress visualization
- Learning trends

#### `PerformanceCard`
- Score analysis
- Accuracy metrics

#### `AccuracyCard`
- Correct/incorrect ratio
- Performance indicators

#### `RecentTestsCard`
- List recent test attempts
- Quick links to review

### 6. Question Bank Components

#### `QuestionBankLanding`
- Entry point for question bank
- Navigation to subcategories

#### Nested Components
- `exam-info/` - Exam details
- `exam-question/` - Question display
- `exam-session/` - Session info
- `practice/` - Practice mode
- `subject/` - Subject selection
- `test/` - Test mode
- `unit/` - Unit selection
- `viewer/` - Question viewer
- `shift/` - Shift selection
- `cards/` - Card components
- `sections/` - Section wrappers
- `Shared/` - Shared utilities

### 7. Homepage Components

#### `SiteNav` (`components/homepage/site-nav.tsx`)
- Navigation bar

#### `HeroSection`
- Main value proposition
- CTA buttons

#### `BuiltForLearners`
- Feature highlights

#### `HowItWorks`
- Platform walkthrough

#### `QuickActions`
- Fast access features

#### `WhyPathshala`
- Unique value propositions

#### `Pricing` 
- Subscription plans

#### `SiteFooter`
- Footer links & info

### 8. UI Component Library (`components/ui/`)

**Shadcn/Radix UI primitives:**
- `button.tsx` - Button with variants
- `input.tsx` - Text input
- `label.tsx` - Form label
- `card.tsx` - Card container
- `form.tsx` - Form wrapper
- `dialog.tsx` - Modal dialog
- `drawer.tsx` - Side drawer
- `dropdown-menu.tsx` - Dropdown menu
- `accordion.tsx` - Accordion/collapsible
- `alert.tsx` - Alert message
- `avatar.tsx` - User avatar
- `badge.tsx` - Badge/tag
- `calendar.tsx` - Date picker
- `carousel.tsx` - Image carousel
- `chart.tsx` - Chart container
- `checkbox.tsx` - Checkbox
- `command.tsx` - Command palette
- `context-menu.tsx` - Right-click menu
- `field.tsx` - Form field
- `hover-card.tsx` - Hover tooltip
- `input-otp.tsx` - OTP input
- `menubar.tsx` - Menu bar
- `navigation-menu.tsx` - Navigation
- `pagination.tsx` - Page navigation
- `popover.tsx` - Popover tooltip
- `progress.tsx` - Progress bar
- `radio-group.tsx` - Radio buttons
- `scroll-area.tsx` - Scrollable area
- `select.tsx` - Select dropdown
- `separator.tsx` - Visual divider
- `sheet.tsx` - Sheet/drawer
- `slider.tsx` - Slider control
- `switch.tsx` - Toggle switch
- `tabs.tsx` - Tab navigation
- `toggle.tsx` - Toggle button
- `toggle-group.tsx` - Toggle group
- `tooltip.tsx` - Tooltip
- `Loader.tsx` - Loading spinner
- `BackButton.tsx` - Back navigation

---

## Custom Hooks

### `useAuthSession` (`hooks/useAuthSession.ts`)

```typescript
export function useAuthSession() {
  return {
    profile: UserProfileResponse | null,
    isLoading: boolean,
    isAuthenticated: boolean,
    userRole: "STUDENT" | "TEACHER" | null,
    error: Error | null,
    refetch: () => void
  };
}
```

**Query Strategy:**
- Query Key: `["auth", "session"]`
- Stale Time: 1 minute
- Retry: false (no automatic retries)

### `useDashboard` (`hooks/useDashboard.tsx`)

```typescript
export function useDashboard() {
  return {
    dashboard: DashboardData | null,
    loading: boolean,
    error: Error | null
  };
}
```

Fetches personalized dashboard metrics.

### `useUserTestAttempts` (`hooks/useUserTestAttempts.ts`)

```typescript
export function useUserTestAttempts() {
  return {
    attempts: TestAttempt[] | null,
    loading: boolean
  };
}
```

Tracks user's test/exam attempts.

### `useMobile` (`hooks/use-mobile.tsx`)

```typescript
export function useMobile() {
  return isMobile: boolean;
}
```

Detects if viewport is mobile (<768px).

### `useUserProfile` (`hooks/userProfile.ts`)

```typescript
export function useUserProfile() {
  return {
    profile: UserProfile | null,
    loading: boolean,
    updateProfile: (data) => Promise<UserProfile>
  };
}
```

Profile management with update capability.

---

## State Management

### 1. **TanStack Query (Server State)**

**Usage:** Caching remote API data

```typescript
// Example: useAuthSession
useQuery<UserProfileResponse, Error>({
  queryKey: ["auth", "session"],
  queryFn: getProfile,
  retry: false,
  staleTime: 1000 * 60  // 1 minute
});
```

**Query Cache Keys:**
```
["auth", "session"]           → User profile
["dashboard"]                 → Dashboard data
["user_test_attempts"]        → Test attempts
["user_profile"]              → User profile data
```

### 2. **React Hook Form (Form State)**

**Usage:** Managing form inputs and validation

```typescript
const { register, handleSubmit, formState } = useForm({
  resolver: zodResolver(loginSchema)
});
```

### 3. **React Context (Client State)**

**QueryProvider** (`components/providers/query-provider.tsx`):
- Wraps entire app
- Provides TanStack Query client

### 4. **Cookies (Persistent Auth)**

**Storage Location:** httpOnly cookies
**Key:** `access_token`
**Management:** Browser-handled (not JS-accessible)

---

## Styling & UI

### CSS Framework: Tailwind CSS v4

**Configuration:** `tailwind.config.ts`

**Color Scheme:**
```
Primary backgrounds: #060910 (dark), #0A0F1E (sidebar)
Text colors: White/white with opacity (white/70, white/60)
Accent colors: #14B8A6 (teal/cyan - expand button)
Borders: white/5, white/10
```

**Typography:**
- **Sans:** Geist, DM Sans
- **Mono:** Geist Mono
- **Display:** Baloo 2 (700, 800 weight)

### Component Styling Patterns

**1. CVA (Class Variance Authority)**
```typescript
// Define component variants
const button = cva("...", {
  variants: { size: { sm: "...", lg: "..." } }
});
```

**2. Class Merging**
```typescript
// Merge Tailwind classes intelligently
import { cn } from "@/lib/utils";
cn("px-4", "px-6")  // → "px-6" (later wins)
```

**3. Responsive Classes**
```typescript
className="hidden md:block"  // Hidden on mobile
className="w-[280px] md:w-full"  // Responsive width
```

**4. Dark Mode**
- All colors designed for dark theme
- Background: #060910
- Text: white with opacity
- Accents: cyan/teal

### UI Component System

**Source:** Shadcn/Radix UI
- Unstyled accessibility-first primitives
- Tailwind-styled
- Composable and extendable

---

## Configuration

### TypeScript (`tsconfig.json`)

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "strict": true,
    "moduleResolution": "bundler",
    "paths": {
      "@/*": ["./*"]  // Import aliases
    }
  }
}
```

### Next.js (`next.config.ts`)

```typescript
{
  images: {
    remotePatterns: [
      // Google images
      { hostname: "lh3.googleusercontent.com" },
      { hostname: "*.googleusercontent.com" },
      // Facebook images
      { hostname: "platform-lookaside.fbsbx.com" },
      // Local development
      { hostname: "localhost" }
    ]
  }
}
```

**Purpose:** Allow external image optimization from OAuth providers.

### Environment Variables

**Public Variables** (client-accessible):
```env
VITE_NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api/v1
```

**Private Variables** (server-only):
Accessed only in `lib/config.server.ts`

### Validation Schemas (`lib/validation.ts`)

**Zod Schemas:**
- `loginSchema` - Email + password
- `signupSchema` - Full registration
- `profileInfoSchema` - Name + phone
- `passwordSchema` - Current + new password
- `forgotPasswordSchema` - Email only
- `verifyOtpSchema` - Email + 6-digit OTP
- `resetPasswordSchema` - Token + password

---

## Build & Deployment

### Development

```bash
npm run dev      # Start dev server (http://localhost:3000)
```

**Features:**
- Hot module reloading
- TypeScript checking
- Next.js Fast Refresh

### Production Build

```bash
npm run build    # Compile & optimize
npm start        # Start server
```

**Build Process:**
1. TypeScript compilation
2. Webpack/Turbopack bundling
3. Image optimization
4. CSS minification
5. Code splitting

### Deployment Options

- **Vercel** (recommended)
- **Docker**
- **Node.js Server** (npm start)

### Environment Setup

**For Local Development:**
```bash
# Create .env.local
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api/v1
```

**For Production:**
```bash
# Set in deployment platform
NEXT_PUBLIC_API_BASE_URL=https://api.pathshala.com/api/v1
```

---

## Key Architectural Patterns & Best Practices

### 1. **Separation of Concerns**
- API logic in `lib/api/`
- Components in `components/`
- Pages in `app/`
- Utilities in `lib/`

### 2. **Reusable Hooks**
- Custom hooks abstract API calls
- Standardized data access pattern

### 3. **Type Safety**
- Full TypeScript implementation
- Zod runtime validation
- Response type definitions

### 4. **Error Handling**
- Centralized in API client interceptor
- User feedback via toast notifications
- Graceful degradation

### 5. **Performance**
- Code splitting via Next.js
- Image optimization
- Query caching with TanStack
- Stale-while-revalidate pattern

### 6. **Accessibility**
- Radix UI primitives (WCAG compliant)
- Semantic HTML
- ARIA labels

### 7. **Responsive Design**
- Mobile-first approach
- Tailwind breakpoints (md: 768px)
- Collapsible sidebar on mobile

### 8. **Code Organization**
- Feature-based folder structure
- Clear separation of concerns
- Barrel exports (`lib/api.ts`)

---

## Important Notes

⚠️ **FROM AGENTS.md:**
> "This is NOT the standard Next.js you know. This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code."

### Breaking Changes in Next.js 16.2.3:
- Refer to `node_modules/next/dist/docs/` for API differences
- Check deprecation notices carefully
- Test thoroughly before deploying

---

## Summary

**Pathshala Plus Frontend** is a comprehensive, well-architected educational platform frontend built with:

✅ **Modern Stack:** Next.js 16, React 19, TypeScript  
✅ **Strong Architecture:** App Router, RBAC, middleware protection  
✅ **Robust Data Management:** TanStack Query + Axios with interceptors  
✅ **Form Excellence:** React Hook Form + Zod validation  
✅ **Beautiful UI:** Tailwind + Shadcn/Radix UI components  
✅ **Type Safety:** Full TypeScript implementation  
✅ **Scalable:** Modular component structure, reusable hooks  
✅ **Security:** httpOnly cookies, token refresh logic, CSRF protection  

The project follows modern React and Next.js best practices with a clear separation of concerns, making it maintainable and scalable for future growth.

