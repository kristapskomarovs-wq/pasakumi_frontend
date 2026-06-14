# Event Registration Platform — Frontend

Angular frontend for an event registration platform.

## Features

- User login and registration flow
- Email availability check through backend API
- Event list page
- Create event form
- Join and leave events
- My events page
- Route guard for protected pages
- Session-based frontend login state using sessionStorage
- Angular Signals Forms validation

## Tech Stack

- Angular
- TypeScript
- Angular Signals Forms
- RxJS
- HTML/CSS
- REST API integration

## Backend

This frontend connects to the Spring Boot backend:

https://github.com/kristapskomarovs-wq/pasakumu_serveris

## Main API flows

- `GET /api/v1/events` — load all events
- `POST /api/v1/events` — create event
- `POST /api/v1/events/{eventId}/join` — join event
- `DELETE /api/v1/events/{eventId}/leave` — leave event
- `GET /api/v1/events/my` — load user registrations

## What I learned

- Building Angular components and services
- Connecting frontend to backend with HttpClient
- Handling async data with Observables
- Using Angular router and route guards
- Creating reusable validation components
- Structuring frontend models and services

## Run locally

```bash
npm install
ng serve

Frontend runs on:

http://localhost:4200

---

#### README priekš `pasakumu_serveris`

```md
# Event Registration Platform — Backend

Spring Boot backend for an event registration platform.

## Features

- User registration
- User login
- Email existence check
- Create events
- List all events
- Join events
- Leave events
- View user registrations
- Count event participants
- Delete events by creator
- PostgreSQL database integration

## Tech Stack

- Java
- Spring Boot
- Spring Web
- Spring Data JPA
- Hibernate
- PostgreSQL
- Maven
- REST API

## Database model

Main entities:

- `UserModel`
- `EventModel`
- `RegistrationModel`

Relationships:

- One user can create many events
- One user can register for many events
- One event can have many registrations
- `RegistrationModel` connects users and events

## API examples

```http
POST /api/v1/register
POST /api/v1/login
GET /api/v1/checkemail/{email}

GET /api/v1/events
POST /api/v1/events?creatorId={creatorId}
POST /api/v1/events/{eventId}/join?userId={userId}
DELETE /api/v1/events/{eventId}/leave?userId={userId}
GET /api/v1/events/my?userId={userId}
GET /api/v1/events/{eventId}/count
GET /api/v1/events/{eventId}/joined?userId={userId}
DELETE /api/v1/events/{eventId}?creatorId={creatorId}gular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
