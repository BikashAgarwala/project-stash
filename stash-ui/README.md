# Stash - The Intelligent Content Hub (Frontend)

This is the official frontend for **Stash**, a modern web application designed to help you save, organize, and find your digital content effortlessly. It acts as your second brain, allowing you to stash links, text snippets, and files into organized "buckets" with a sleek, intuitive interface.

## Features

  * **Secure Authentication:** Fast and secure sign-in using your Google account (OAuth2).
  * **Content Stashing:** Save links, text snippets, and other content with a single click.
  * **Bucket Organization:** Create custom categories called "Buckets" to organize your items.
  * **Drag & Drop:** Intuitively move items between buckets with a smooth drag-and-drop interface.
  * **Modern UI:** A sleek, responsive, and dark-mode-first design built for productivity.
  * **Quick Access:** A browser extension (planned) for capturing content from anywhere on the web.

## Tech Stack

  * **Framework:** [Next.js](https://nextjs.org/) (React)
  * **Styling:** [Tailwind CSS](https://tailwindcss.com/)
  * **Icons:** [Lucide Icons](https://lucide.dev/)
  * **API Communication:** Fetch
  * **State Management:** Zustand

-----

## Getting Started

Follow these instructions to get the project up and running on your local machine for development and testing.

### Prerequisites

  * Node.js (v18.x or later)
  * npm, yarn, or pnpm
  * A running instance of the [Stash Backend API](https://github.com/BikashAgarwala/project-stash/stash-api).

### Installation & Setup

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/BikashAgarwala/project-stash.git
    cd stash-ui
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    # yarn install
    # or
    # pnpm install
    ```

3.  **Set up environment variables:**
    Create a file named `.env.local` in the root of your project and add the following line. This tells the frontend where to find the backend API.

    ```env
    NEXT_PUBLIC_API_URI=http://localhost:8080/api
    ```

4.  **Run the development server:**

    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

-----

## Environment Variables

The frontend application requires the following environment variable to function correctly:

  * `NEXT_PUBLIC_API_URI`: The base URL of the Stash backend API. For local development, this is the address of your running Spring Boot application. The `NEXT_PUBLIC_` prefix is required by Next.js to expose the variable to the browser.