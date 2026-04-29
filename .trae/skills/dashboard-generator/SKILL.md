---
name: "dashboard-generator"
description: "Simplifies adding new visual dashboards with automated setup. Invoke when user wants to create or add a new dashboard/style page."
---

# Dashboard Generator

This skill helps you add new visual dashboards to the project easily and consistently.

## Features
- Generates a new dashboard component with template structure
- Automatically updates style configurations
- Adds proper lazy loading setup
- Maintains keyword indexing

## How to Use

### 1. Create a New Dashboard
Call this skill and provide:
- **Dashboard ID** (kebab-case, e.g., `my-awesome-style`)
- **Label** (human-readable name, e.g., `My Awesome Style`)
- **Group** (e.g., `Modern`, `SaaS`, `Niche`, `Scientific`, etc.)
- **Colors** (primary, secondary, accent, highlight)
- **Description** (brief style description)
- **Use cases** (list of applicable use cases)

### 2. Template Structure
The generated dashboard includes:
- Sidebar navigation
- Header with controls
- Stats cards
- Visualization sections
- Example data

## Architecture Improvements

This skill supports the project's refactored architecture:
- Centralized configuration in `dashboard-config.js`
- Auto-registration of dashboards
- Consistent style management
