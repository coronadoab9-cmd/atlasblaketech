# AtlasBlake Technologies Backend Roadmap

## Purpose

This backend will become the future AtlasBlake platform backend.

The existing BTC backend will remain separate and protected as the working reference system.

BTC proves the core workflow:
- Driver tablet GPS tracking
- Truck status updates
- Digital eTickets
- Public customer ticket links
- Customer signatures
- Photo capture
- PDF generation
- Admin dashboard
- Driver/device tracking

The new AtlasBlake backend should take those ideas and rebuild them into a scalable multi-company platform.

---

## Core Rule

Do not modify the existing BTC backend directly while building the future platform backend.

Use BTC as a reference only.

---

## Platform Direction

AtlasBlake should support:

- Multiple companies
- Multiple workspaces
- Company-specific users
- Role-based access
- Purchased modules
- Trucks
- Drivers
- Devices/tablets
- Dispatch loads
- eTickets
- GPS events
- Customer signatures
- Photos
- PDFs
- Reports
- AI insights
- Audit history
- Future integrations

---

## First Company Workspace

The first real company workspace will be:

Company: Big Town Concrete  
Company ID: btc  
Slug: big-town-concrete  

BTC will eventually be migrated into the new AtlasBlake backend as the first customer/workspace.

---

## Required Backend Areas

### 1. Platform

Responsible for:

- companies
- users
- roles
- module access
- alerts
- recent activity
- workspace settings

Current frontend expects:

- GET /api/platform/company
- GET /api/platform/modules
- GET /api/platform/users
- GET /api/platform/alerts
- GET /api/platform/recent-activity

---

### 2. Fleet

Responsible for:

- trucks
- drivers
- devices
- GPS locations
- truck status
- active jobs
- live fleet visibility

Current frontend expects:

- GET /api/fleet/stats
- GET /api/fleet/trucks
- GET /api/fleet/drivers
- GET /api/fleet/devices

Future endpoints should include:

- POST /api/fleet/gps
- POST /api/fleet/status
- POST /api/fleet/device-check-in
- POST /api/fleet/driver-login
- POST /api/fleet/driver-logout

---

### 3. eTickets

Responsible for:

- ticket creation
- public ticket links
- signature workflow
- customer acceptance/rejection
- water added tracking
- GPS capture
- photo capture
- PDF generation
- archive/history

Current frontend expects:

- GET /api/etickets
- GET /api/etickets/:token

Future endpoints should include:

- POST /api/etickets
- PATCH /api/etickets/:id
- POST /api/etickets/:token/sign
- POST /api/etickets/:token/reject
- GET /api/etickets/:token/pdf
- GET /api/etickets/:token/qc-pdf

---

### 4. Dispatch

Responsible for:

- orders
- loads
- plant assignments
- truck assignments
- driver assignments
- delivery movement
- dispatch board

Current frontend expects:

- GET /api/dispatch/stats
- GET /api/dispatch/loads

Future endpoints should include:

- POST /api/dispatch/loads
- PATCH /api/dispatch/loads/:id
- POST /api/dispatch/loads/:id/assign-truck
- POST /api/dispatch/loads/:id/assign-driver

---

### 5. Reports

Responsible for:

- daily dispatch summaries
- signed eTicket exports
- rejected delivery reports
- fleet activity reports
- customer delivery history
- accounting/export records

Current frontend expects:

- GET /api/reports/stats
- GET /api/reports

Future endpoints should include:

- POST /api/reports/generate
- GET /api/reports/:id/download
- GET /api/reports/customer/:customerId
- GET /api/reports/job/:jobNumber

---

### 6. AI Operations

Responsible for:

- missing signatures
- delayed trucks
- rejected deliveries
- unusual water added
- missing GPS/photo data
- daily summaries
- plain-English operational questions

Current frontend expects:

- GET /api/ai/insights

Future endpoints should include:

- POST /api/ai/ask
- POST /api/ai/summarize-day
- POST /api/ai/find-exceptions
- POST /api/ai/generate-report-summary

---

## Future-Thinking Requirements

The backend should be designed for technology changes over the next several years.

It should be ready for:

- AI agents
- automated dispatch recommendations
- predictive delivery delays
- real-time GPS streaming
- tablet/mobile apps
- customer portals
- voice commands
- sensor and IoT integrations
- camera/photo verification
- batch plant integrations
- accounting integrations
- API integrations with outside systems
- digital audit trails
- role-based permissions
- multi-company scaling

---

## Data Design Principles

Every operational table should include:

- id
- company_id
- created_at
- updated_at

Important records should also include:

- created_by
- updated_by
- source_system
- external_id
- audit_status

Examples:

- companies
- users
- modules
- trucks
- drivers
- devices
- gps_events
- dispatch_loads
- etickets
- eticket_events
- signatures
- photos
- reports
- ai_insights
- audit_logs

---

## Migration Strategy

Step 1:
Keep BTC system separate.

Step 2:
Document what BTC backend already does.

Step 3:
Build new AtlasBlake backend contract.

Step 4:
Create new database schema with company_id everywhere.

Step 5:
Build endpoints one group at a time.

Step 6:
Connect Next.js dashboard to new backend in mock/live mode.

Step 7:
Import BTC data as the first workspace.

Step 8:
Keep improving for future customers.

---

## Important Rule

BTC should not become the final architecture by accident.

BTC is the working prototype.

AtlasBlake is the future platform.