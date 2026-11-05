# BookNook – A Small Online Library
**Live Site:** https://your-booknook.vercel.app  (replace after deploying)

## Features
- Add a book, borrow a book, return a book – simple online library
- Swiper.js hero slider and a live "New Arrivals" section (latest 6 books)
- BetterAuth + MongoDB: email/password and Google login, with redirect-back on private routes
- Full CRUD: add, edit and delete your books, with a confirm modal
- Borrow system with available copies ($inc), no double borrowing, and a 7-day return date
- JWT-protected Express API, dark/light theme, Framer Motion animation, fully responsive

## Run
`cp .env.example .env.local && npm i && npm run dev`   (server: `cd server && npm i && npm start`)
