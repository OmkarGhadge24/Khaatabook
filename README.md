# Khaatabook

Khaatabook is a small web app for keeping date-wise notes or expense records. It uses Express.js and EJS, and stores entries as text files.

## Features

- View saved entries from the home page.
- Create an entry with the details form.
- Edit an existing entry.
- View a delete confirmation page.

Entries are saved in the `files` folder with a date-based filename, such as `05-10-2026.txt`.

git add README.md
## Requirements

- Node.js and npm

## Getting started

1. Install the dependencies:

   ```bash
   npm install
   ```

2. Start the app:

   ```bash
   node app.js
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project structure

```text
.
├── app.js          # Express routes and server
├── files/          # Saved text entries
└── views/          # EJS page templates
```