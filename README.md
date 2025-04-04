# Job Portal for Vue.js Developers

## Overview
This is a web application designed for job seekers and employers, specifically targeting Vue.js developers. The platform allows guests to browse job listings, developers to sign up and save job postings, and employers to register a company, add, update, and delete job postings.

## Features
- **Guest Users:** Can browse job listings.
- **Developers:** Can create an account, browse job postings, and save jobs for later.
- **Employers:** Can register a company, post job listings, and manage job postings (edit, delete, etc.).
- **Authentication:** Managed using Appwrite Auth.
- **Data Storage:** Jobs and companies are stored in Appwrite collections.

## Tech Stack
- **Frontend:** Vue.js
- **Backend:** Appwrite (Auth & Database)

## Getting Started

### Project Setup
Install dependencies:
```sh
npm install
```

### Compile and Hot-Reload for Development
```sh
npm run dev
```

### Compile and Minify for Production
```sh
npm run build
```

## Backend Configuration (Appwrite)
The backend is managed using Appwrite, including user authentication and data storage in "jobs" and "companies" collections. If you are forking or cloning this repository, follow these steps:

1. **Create an Appwrite Project:**
   - Sign up at [Appwrite](https://appwrite.io/).
   - Create a new project and note the project ID.

2. **Set Up Collections:**
   - Create a database for job postings.
   - Add two collections: `jobs` and `companies`.

3. **Configure Environment Variables:**
   - Create a `.env.local` file in the root directory and set up the following variables:

```env
VITE_APPWRITE_ENDPOINT=<your-endpoint>
VITE_APPWRITE_PROJECT=<project-id>
VITE_APPWRITE_DATABASE_JOBS=<database-id>
VITE_APPWRITE_COLLECTION_JOBS=<jobs-collection-id>
VITE_APPWRITE_COLLECTION_COMPANIES=<companies-collection-id>
VITE_APPWRITE_API_KEY=<api-key>
```

> **Note:** The API key should have the necessary permissions to interact with the `jobs` and `companies` collections.

## Contributing
If you'd like to contribute, please submit a pull request with a clear description of the changes.

## License
This project is open-source under the MIT License.

---
Happy Coding! 🚀

