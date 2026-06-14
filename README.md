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

## Screenshots

### Login / Register

<img width="1917" height="908" alt="login_page" src="https://github.com/user-attachments/assets/66954308-e40f-4ee0-87ba-115de13c387b" />


### Main page

<img width="1915" height="901" alt="main_page" src="https://github.com/user-attachments/assets/bcd8c456-b51a-4b81-ad55-0b8b52ca777c" />



### Create event

<img width="1916" height="898" alt="create_event" src="https://github.com/user-attachments/assets/8878eda6-af93-47f3-863c-ae01acfc6a4e" />
