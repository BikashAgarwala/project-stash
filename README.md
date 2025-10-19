# 🚀 Stash - Your Personal Content Vault

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/BikashAgarwala/project-stash)
[![Java](https://img.shields.io/badge/Java-21-blue)](https://www.java.com)
[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)

Stash is a self-hosted, universal inbox designed to capture, organize, and retrieve your digital life. It's the solution to the endless stream of links, notes, images, and documents you send yourself across different apps.

---

## The Problem

Tired of emailing links to yourself or creating a WhatsApp group for one? We often need to save small bits of information—a code snippet, a link to an article, a quick note, or an inspiring image. These items end up scattered across various platforms, making them difficult to find when you need them most. Stash solves this by providing one central, secure, and searchable place for everything.

---

## Core Features

* **✅ Universal Capture:** Save text snippets and links through a clean web interface.
* **✅ Secure Authentication:** Sign in quickly and securely with your Google account using OAuth2.
* **✅ Centralized Dashboard:** A single, clean dashboard to view and manage all your saved items.
* **⏰ Quick-Capture Extension (v1.1):** A browser extension to save content from anywhere on the web with a single click.
* **⏰ Rich Content Support (v1.2):** Upload images, PDFs, and other files directly to your vault.
* **🧠 AI-Powered Search (Phase 2):** Future plans include OCR for text in images and semantic search to find things based on meaning, not just keywords.

---

## Tech Stack & Architecture

Stash is built with a modern, decoupled architecture, using a powerful backend API and a responsive frontend client.

* **Backend:**
    * **Framework:** Spring Boot 3 (Java 21)
    * **Security:** Spring Security (OAuth2 & JWT)
    * **Database:** PostgreSQL
    * **ORM:** Spring Data JPA / Hibernate
* **Frontend:**
    * **Framework:** Next.js (React)
    * **Styling:** Tailwind CSS
* **File Storage:**
    * AWS S3
* **DevOps:**
    * Docker & Docker Compose for containerization.

---

## Getting Started

Follow these instructions to get a local copy up and running for development and testing.

### Prerequisites

* Java 21+
* Node.js 21+
* Docker & Docker Compose
* Git

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/BikashAgarwala/project-stash.git
    cd project-stash
    ```

2.  **Configure Backend:**
    * Navigate to the `backend` directory: `cd backend`
    * Rename `application.yml.example` to `application.yml`.
    * Fill in the required values: PostgreSQL credentials, Google OAuth2 Client ID/Secret, JWT secret, and AWS credentials.
    * Run the backend using Docker:
        ```sh
        docker-compose up --build
        ```
    * The backend will be running at `http://localhost:8080`.

3.  **Configure Frontend:**
    * In a new terminal, navigate to the `frontend` directory: `cd frontend`
    * Install dependencies:
        ```sh
        npm install
        ```
    * Rename `.env.local.example` to `.env.local`.
    * Update the `NEXT_PUBLIC_API_URL` if needed (it should default to `http://localhost:8080`).
    * Run the frontend development server:
        ```sh
        npm run dev
        ```
    * Open your browser and navigate to `http://localhost:3000`.

---

## API Endpoints (v1.0)

| Endpoint | Method | Description | Secured |
| :--- | :--- | :--- | :--- |
| `/oauth2/authorization/google`| `GET` | Initiates the Google login flow. | No |
| `/api/items` | `POST` | Creates a new item (text/link). | Yes (JWT) |
| `/api/items` | `GET` | Fetches all items for the user. | Yes (JWT) |
| `/api/items/{id}` | `DELETE`| Deletes a specific item. | Yes (JWT) |

---

## Project Roadmap

* **[v1.0 - Core Vault]** - A functional web app for saving text and links.
* **[v1.1 - Quick Capture]** - Browser extension for one-click saving.
* **[v1.2 - Rich Content]** - Support for file uploads (images, PDFs).
* **[v2.0 - Intelligence Layer]** - AI features like OCR and semantic search.

---

## License

Distributed under the MIT License. See `LICENSE` for more information.

---

## Contact

Bikash - [@bikashagarwala0](https://twitter.com/bikashagarwala0) - [bikash.agarwala.01@gmail.com](mailto:bikash.agarwala.01@gmail.com)

Project Link: [https://github.com/BikashAgarwala/project-stash](https://github.com/BikashAgarwala/project-stash)