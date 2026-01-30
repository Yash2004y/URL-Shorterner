# 🔗 URL Shortener

A **fast, clean, and simple URL Shortener** built as a learning project using **Node.js**, **HTML**, and **Tailwind CSS**.  
This project uses a **JSON file for data storage** instead of a database, making it ideal for understanding backend fundamentals.

---

## 📸 Screenshots
![URL Shortener UI](screenshots/url_shortener_screenshot.png)

---

## ✨ Features

- 🔹 Shorten long URLs instantly
- 🔹 Custom short keys (e.g. `/my-link`)
- 🔹 Redirect short URL → original URL
- 🔹 JSON file based storage (no database)
- 🔹 View all created URLs
- 🔹 Search URLs by key or original URL
- 🔹 Responsive & clean UI using Tailwind CSS

---

## 🛠️ Tech Stack

- **Backend:** Node.js (Core HTTP module)
- **Frontend:** HTML, Tailwind CSS
- **Language:** JavaScript
- **Storage:** JSON file

---
## 📂 Project Structure

```text
url-shortener/
│
├── db/
│   ├── db.js                     # Handles JSON data operations
│   └── URL_HELPER_DB.json        # Stores short & original URLs
│
├── public/
│   └── index.html                # Frontend UI
│
├── screenshots/
│   └── url_shortener_screenshot.png  # Project UI screenshot
│
├── Utils/
│   └── FileHelper.js             # Utility/helper functions
│
├── .env                          # Environment variables
├── .gitignore                    # Git ignored files
├── .node-version                 # Node.js version config
│
├── server.js                     # Node.js server & routing logic
├── package.json                  # Project scripts & metadata
├── package-lock.json
└── README.md                     # Documentation
