# AtlasBlake Future Backend Schema Plan

## Purpose

This file defines the first planned database structure for the future AtlasBlake Technologies backend.

The current BTC backend stays separate.

This schema is for the future multi-company AtlasBlake platform.

---

## Core Design Rules

Every major table should include:

```txt
id
company_id
created_at
updated_at