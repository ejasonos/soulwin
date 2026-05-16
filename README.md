# SoulWin

Enterprise-grade soul-winning and evangelism management platform for churches, ministries, and outreach organizations.

SoulWin enables churches to coordinate evangelism campaigns, manage outreach teams, track field activities, generate AI-assisted ministry insights, and monitor engagement metrics through a scalable real-time platform.

Repository: https://github.com/ejasonos/soulwin

---

# Table of Contents

- Overview
- Features
- Tech Stack
- Architecture
- Core Modules
- System Workflow
- Folder Structure
- Environment Variables
- Installation
- Development
- Production Build
- Database Design
- Security
- Performance
- Deployment
- Roadmap
- License

---

# Overview

SoulWin is a modern church operations platform focused on structured evangelism management and outreach coordination.

The platform is designed for:

- Churches
- Evangelism departments
- Mission organizations
- Multi-campus ministries
- Outreach coordinators
- Leadership analytics teams

SoulWin provides:

- Real-time field reporting
- Outreach campaign coordination
- AI-generated ministry insights
- Member participation tracking
- Administrative analytics dashboards
- Secure role-based access control

---

# Features

## Evangelism Campaign Management

- Create and manage outreach campaigns
- Assign evangelism zones and territories
- Schedule campaign activities
- Monitor campaign progress

---

## Outreach Reporting

- Record house visits
- Log conversations and engagements
- Track conversions and follow-ups
- Attach contextual field notes

---

## AI Reporting Layer

- AI-generated outreach summaries
- Weekly leadership insights
- Campaign performance analysis
- Automated narrative reporting

---

## Real-Time Analytics

- Participation metrics
- Outreach trends
- Leaderboards and engagement tracking
- Campaign completion analytics

---

## Authentication & Authorization

- Secure authentication via Supabase
- Role-based access control
- Session persistence using SSR
- Protected administrative routes

---

# Tech Stack

## Frontend

- TanStack Start
- React
- Tailwind CSS
- Zustand
- TanStack Query

---

## Backend

- Supabase
- PostgreSQL
- Supabase Auth
- Supabase Realtime
- Supabase Storage

---

## AI Layer

- OpenAI SDK

---

## Infrastructure

- SSR Architecture
- Edge-compatible APIs
- Realtime synchronization
- Multi-tenant capable architecture

---

# Architecture

```text
Client Application
        │
        ▼
TanStack Start SSR Layer
        │
        ▼
Authentication Middleware
        │
        ▼
Supabase Services
 ├── PostgreSQL
 ├── Auth
 ├── Storage
 └── Realtime
        │
        ▼
OpenAI Reporting Services
        │
        ▼
Analytics Dashboard
```

---

# Core Modules

## Authentication Module

Responsible for:

- Login
- Registration
- Session management
- Role authorization
- Route protection

---

## Campaign Module

Responsible for:

- Campaign creation
- Zone assignment
- Outreach scheduling
- Team coordination

---

## Reporting Module

Responsible for:

- Outreach logs
- Field reports
- Conversion tracking
- Follow-up records

---

## Analytics Module

Responsible for:

- Dashboard metrics
- Participation analytics
- Campaign performance reports
- Trend visualization

---

## AI Insight Module

Responsible for:

- Summarization
- Insight generation
- Weekly ministry reports
- Intelligent recommendations

---

# System Workflow

```text
User Authentication
        │
        ▼
Campaign Assignment
        │
        ▼
Field Outreach Activities
        │
        ▼
Report Submission
        │
        ▼
Realtime Synchronization
        │
        ▼
AI Processing & Summaries
        │
        ▼
Leadership Analytics Dashboard
```

---

# Folder Structure

```text
src/
│
├── app/
│   ├── routes/
│   │   ├── index.tsx
│   │   ├── dashboard.tsx
│   │   ├── campaigns.tsx
│   │   └── reports.tsx
│   │
│   └── providers/
│
├── components/
│   ├── ui/
│   ├── dashboard/
│   ├── campaigns/
│   ├── reports/
│   └── analytics/
│
├── lib/
│   ├── supabase/
│   ├── auth/
│   ├── openai/
│   └── validations/
│
├── stores/
│   ├── useAuthStore.ts
│   ├── useCampaignStore.ts
│   └── useReportStore.ts
│
├── server/
│   ├── actions/
│   ├── middleware/
│   ├── services/
│   └── ai/
│
├── types/
│
└── utils/
```

---

# Environment Variables

Create a `.env` file in the project root.

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# OpenAI
OPENAI_API_KEY=

# App
NEXT_PUBLIC_APP_URL=

# Optional
NODE_ENV=development
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/ejasonos/soulwin.git
```

---

## Navigate Into Project

```bash
cd soulwin
```

---

## Install Dependencies

```bash
npm install
```

---

# Development

## Start Development Server

```bash
npm run dev
```

---

## Local Development URL

```text
http://localhost:3000
```

---

# Production Build

## Build Application

```bash
npm run build
```

---

## Start Production Server

```bash
npm run start
```

---

# Database Design

## Users Table

```sql
create table users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  role text not null,
  created_at timestamp default now()
);
```

---

## Campaigns Table

```sql
create table campaigns (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  start_date timestamp,
  end_date timestamp,
  created_at timestamp default now()
);
```

---

## Reports Table

```sql
create table reports (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id),
  campaign_id uuid references campaigns(id),
  content text not null,
  location text,
  created_at timestamp default now()
);
```

---

# Security

## Authentication Security

- Supabase Auth integration
- SSR session validation
- Secure token handling
- Protected route middleware

---

## Authorization Security

- Role-based access control
- Multi-level administrative permissions
- Restricted API access
- Principle of least privilege

---

## Database Security

- Supabase Row Level Security (RLS)
- Secure relational constraints
- Protected administrative operations
- Scoped tenant access

---

## API Security

- Input validation
- Request sanitization
- Secure server-only environment variables
- AI request validation

---

## Infrastructure Security

- HTTPS-only deployment
- Secure environment configuration
- Isolated server-side secrets
- Secure authentication callbacks

---

# Performance

- Edge-compatible SSR rendering
- Optimized Supabase queries
- Indexed database operations
- Lazy-loaded dashboard modules
- Realtime synchronization optimization
- Efficient state management with Zustand

---

# Deployment

## Recommended Platforms

- Vercel
- Cloudflare Pages

---

## Deployment Steps

### 1. Configure Environment Variables

Set all required environment variables in your deployment provider.

---

### 2. Connect Supabase Project

Configure:
- Database
- Authentication
- Realtime
- Storage

---

### 3. Deploy Frontend

```bash
npm run build
```

---

### 4. Verify Production Configuration

- Authentication redirects
- SSR middleware
- Environment variables
- Database access
- AI integrations

---

# Roadmap

- Progressive Web App (PWA)
- Offline field reporting
- WhatsApp integration
- Geospatial analytics
- Multi-language support
- AI sermon insight generation
- Attendance integration
- Mobile-first optimization

---

# License

Proprietary Software

Internal Church and Ministry Use Only.

Unauthorized redistribution or commercial resale is prohibited.
````