# Music Playlist

A simple web application to manage and play music playlists. Built with **Next.js**, **Supabase**, and **TypeScript**.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup](#setup)  
- [Running the App](#running-the-app)  
- [Demo Account](#demo-account)

---

## Features

- Search songs from iTunes API  
- Create playlists  
- Add and remove songs from playlists  
- Play songs directly in the browser  
- Authentication with Supabase  

---

## Tech Stack

- **Frontend**: Next.js 13, React, Tailwind CSS
- **Backend**: Next.js API routes
- **Database/Auth**: Supabase

---

## Setup

1. **Clone the repository**

```
git clone https://github.com/ChawankornT/musicplaylist.git
cd musicplaylist
```

2. **Install dependencies**

```
npm install
```

3. **Setup environment variables**

- Copy the example file:  
```
cp .env.local.example .env.local
```

- Open `.env.local` and set the values:  
```
NEXT_PUBLIC_SUPABASE_URL=https://bfepfltqebtktpyxcvlm.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJmZXBmbHRxZWJ0a3RweXhjdmxtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgyMTAyNzQsImV4cCI6MjA3Mzc4NjI3NH0.oD4qznvR0Y5cHiVdMVQMjbB2JUpazJicmuoLFV0hNQ8
```

---

## Running the App

1. **Start the development server**

```
npm run dev
```

2. **Open [http://localhost:3000](http://localhost:3000) in your browser.**

---

## Demo Account

You can log in using the demo account:
- **Email**: demo@demo.com
- **Password**: demo
> This account is for testing purposes only.
