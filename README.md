# jum-tecno-task

# Daily Mood Tracker API

Welcome to the backend of the **Daily Mood Tracker** web application — built using **Express**, **TypeScript**, **MongoDB**, and **Mongoose**.

This API allows users to:

- Log their mood daily
- View mood history and summaries
- Track emotional patterns
- Visualize weekly trends

## Features

### User Authentication

- Register using phone number & password
- Login & logout with JWT
- Only authenticated users can access their own mood data

### Mood Entry (CRUD)

- Create one mood per day (Happy, Sad, Angry, Excited)
- Add optional note
- Prevent duplicate mood entries for the same day
- Edit mood
- Soft delete & restore

### Mood History

- Chronological list of moods (latest first)
- Filter by date range
- Support for both table & timeline view (frontend)

### Weekly Mood Summary

- Aggregates moods from Monday–Sunday
- Returns count per mood type






## Tech Stack

Layer Technology  
 Backend Express.js, TypeScript
Database MongoDB + Mongoose
Auth JWT + Bcrypt

## API Endpoints
