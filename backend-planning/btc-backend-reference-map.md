# BTC Backend Reference Map

## Purpose

This file documents what the existing BTC backend already does.

The BTC backend should remain separate and protected.

This document is only a reference map for building the future AtlasBlake Technologies platform backend.

---

## Current BTC Backend Role

The BTC backend is the working proof-of-concept system.

It already supports important real-world operations:

- Driver tablet workflow
- Truck GPS tracking
- Truck status updates
- Digital eTickets
- Public customer ticket links
- Customer signature capture
- Customer photo capture
- Ticket acceptance/rejection
- Water added tracking
- PDF generation
- Admin dashboard support
- Email delivery
- QR code links
- Driver PIN login
- Device/tablet tracking

---

## Future AtlasBlake Backend Role

The future AtlasBlake backend should take the BTC ideas and rebuild them as a scalable platform.

The future backend should support:

- Multiple companies
- Company-specific users
- Role-based permissions
- Company-specific modules
- Company-specific trucks
- Company-specific drivers
- Company-specific devices
- Company-specific eTickets
- Company-specific dispatch boards
- Company-specific reports
- Company-specific AI insights

---

## Mapping Overview

| BTC Backend Area | Future AtlasBlake Area | Notes |
|---|---|---|
| Driver PIN login | Fleet / Auth | Should become company-aware and role-aware |
| Truck GPS posting | Fleet GPS Events | Should store every GPS event with company_id |
| Truck status updates | Fleet Status | Should connect to dispatch loads and eTickets |
| eTicket creation | eTickets | Should support company_id, module access, audit history |
| Public ticket link | Public eTicket | Should remain token-based but more secure |
| Customer signature | eTicket Signature Events | Should become an event record, not just a field |
| Customer photo | eTicket Attachments | Should store metadata and file path |
| PDF generation | Reports / eTicket PDFs | Should support signed ticket PDF and QC PDF |
| Email sending | Notifications | Should become a reusable notification service |
| Admin users | Platform Users | Should support roles and company workspaces |
| Driver records | Fleet Drivers | Should support assignment history |
| Device UUIDs | Fleet Devices | Should support tablet lifecycle and last seen |
| QR codes | Public Links / Documents | Should become reusable link/document service |

---

## Current BTC Concepts To Preserve

These concepts are valuable and should be preserved:

### 1. Public eTicket Token

BTC already uses public ticket links.

Future version should keep this idea, but improve it with:

- token expiration options
- token audit logs
- signed access events
- company ownership
- PDF access tracking

---

### 2. Driver Tablet Identity

BTC already tracks device UUID and driver sessions.

Future version should improve this with:

- device registration
- assigned company
- assigned truck
- assigned driver
- device active/inactive status
- last seen timestamp
- app version
- operating system version
- battery/status telemetry later

---

### 3. GPS Tracking

BTC already posts GPS records.

Future version should improve this with:

- company_id
- truck_id
- driver_id
- device_id
- dispatch_load_id
- ticket_id
- event type
- speed
- heading
- accuracy
- timestamp
- source system

This makes the data more useful for AI, reports, and future automation.

---

### 4. eTicket Signing Workflow

BTC already supports customer signing.

Future version should improve this with:

- signature event table
- acceptance/rejection event table
- water added event table
- photo attachment table
- GPS capture event
- customer device/browser metadata
- signed PDF version history
- audit log trail

---

### 5. PDF Generation

BTC already generates PDFs.

Future version should support:

- signed delivery ticket PDF
- QC/batch weights PDF
- report PDFs
- customer delivery history PDFs
- automatic email attachments
- stored document history
- document versioning

---

## Future Data Model Direction

The future backend should not store everything directly on one large ticket record.

Instead, it should separate important events.

Recommended future structure:

```txt
companies
users
company_users
modules
company_modules

trucks
drivers
devices
driver_sessions
gps_events
truck_status_events

dispatch_loads
dispatch_assignments
dispatch_events

etickets
eticket_events
eticket_signatures
eticket_photos
eticket_water_events
eticket_documents

reports
report_runs
notifications
ai_insights
audit_logs