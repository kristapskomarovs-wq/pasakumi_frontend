# Event Registration Platform — Frontend

Angular frontend for an event registration platform.

## Features

- User registration and login flow
- Email availability check
- List all events
- Create events
- Join events
- Leave events
- View user registrations
- Route guard for protected pages
- Session-based login state with `sessionStorage`
- Angular Signals Forms validation

## Tech Stack

- Angular
- TypeScript
- Angular Signals Forms
- RxJS
- HTML
- CSS
- REST API

## Backend

This frontend connects to the Spring Boot backend:

[pasakumu_serveris](https://github.com/kristapskomarovs-wq/pasakumu_serveris)

## API examples

```http
GET /api/v1/events
POST /api/v1/events
POST /api/v1/events/{eventId}/join
DELETE /api/v1/events/{eventId}/leave
GET /api/v1/events/my
```

## What I learned

- Building Angular components and services
- Connecting frontend to backend with `HttpClient`
- Handling async data with Observables
- Using Angular router and route guards
- Creating reusable validation components
- Structuring frontend models and services

## Live Demo

- `https://komarovs.lv/`

## Screenshots

### Login / Register

<img width="1917" height="908" alt="login_page" src="https://github.com/user-attachments/assets/66954308-e40f-4ee0-87ba-115de13c387b" />

### Main page

<img width="1915" height="901" alt="main_page" src="https://github.com/user-attachments/assets/bcd8c456-b51a-4b81-ad55-0b8b52ca777c" />

### Create event

<img width="1916" height="898" alt="create_event" src="https://github.com/user-attachments/assets/8878eda6-af93-47f3-863c-ae01acfc6a4e" />
