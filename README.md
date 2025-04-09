# Prep4Code Documentation

## Overview

Prep4Code is a web application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) that fetches and displays upcoming contests from various competitive programming platforms, including Codeforces, CodeChef, and LeetCode. Users can filter contests by platform, bookmark contests, and access solution links from a dedicated YouTube channel.

## Features

- Fetches upcoming contests from Codeforces, CodeChef, and LeetCode.
- Displays the date and time remaining before each contest starts.
- Shows past contests with links to their solutions.
- Allows users to filter contests by one or more platforms.
- Users can bookmark contests for easy access.
- Automatically populates solution links from a YouTube channel for past contests.
- Mobile and tablet responsive UI.
- Light and dark mode toggle (not yet implemented).
- Well-documented code.

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone <your-github-repo-url>
   cd contest-tracker

2. **For the Server:**
   ```bash
   cd tle_backend
   npm install
   npm run dev

3. **For the Client:**
   ```bash
   cd tle_frontend
   npm install
   npm run dev
