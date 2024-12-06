# Movie Recommendation System

## Project Overview

### Business Perspective

The **Movie Recommendation System** is designed to enhance the experience of cinema services and their audience. It addresses the challenge faced by clients who book tickets without sufficient knowledge of which movies are being recommended or currently showing. By integrating this system, cinemas can:

- Promote new and trending movies effectively.
- Provide personalized recommendations to users.
- Increase audience engagement and ticket sales.

### Technical Perspective

This system is built using **Spring Boot** as the backend framework and **React** as the frontend framework. It leverages features like role-based access control and CRUD operations. It includes:

- **User Authentication and Authorization**: Secure signup and login functionality with role-based access for users (e.g., Admins, General Users).
- **Movie Management**: CRUD operations for movies, including the ability to add, update, delete, and search movies by name or description.
- **Recommendations**: Personalized movie recommendations based on cinema-defined criteria.
- **Audit Logging**: Tracks user actions, such as viewing their personal page.

## Features

- **Simple Signup**: Users can easily register by providing their name, email, role, and a numeric password.
- **Search and Filtering**: Allows users to search for movies and filter them by specific criteria.
- **Recommendations**: Highlights trending and recommended movies for better client decision-making.
- **Secure and Scalable**: Built using modern backend practices with security and scalability in mind.
- **React Frontend**: A responsive and user-friendly interface for seamless interaction.

## Getting Started

### Prerequisites

- **Java Development Kit (JDK)** version 11 or higher.
- **Maven** for dependency management.
- **Node.js** and **npm** for React development.
- A database management system like MySQL.

### Installation

1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd movie-recommendation-system
   ```
2. Configure the database:
   - Update the `application.properties` file with your database credentials:
     ```properties
     spring.datasource.url=jdbc:mysql://localhost:3306/moviedb
     spring.datasource.username=<your_username>
     spring.datasource.password=<your_password>
     ```
3. Build and run the backend:
   ```bash
   mvn spring-boot:run
   ```
4. Navigate to the `frontend` directory and install dependencies:
   ```bash
   cd frontend
   npm install
   ```
5. Start the React frontend:
   ```bash
   npm start
   ```

### Signing Up

1. Navigate to the signup page (e.g., `http://localhost:3000/signup`).
2. Provide the following details:
   - **Name**: Your full name.
   - **Email**: A valid email address.
   - **Role**: Select your role (e.g., Admin, General User).
   - **Password**: A numeric password for simplicity.
3. Click the **Sign Up** button to complete the registration.

### Signing In

1. Navigate to the login page (e.g., `http://localhost:3000/login`).
2. Enter your registered email and password.
3. Click the **Login** button to access your personalized dashboard.

## Project Architecture

- **Controllers**: Manage endpoints for user and movie-related operations.
- **Services**: Contain business logic for handling user authentication, movie recommendations, and CRUD operations.
- **Repositories**: Interface with the database using JPA.
- **React Frontend**: Provides a dynamic and interactive user interface.
- **Audit Logging**: Monitors user actions for tracking and analysis.

## Future Enhancements

- Integration with machine learning algorithms for personalized recommendations.
- Advanced filtering options, including genres and ratings.
- Mobile-friendly UI for better accessibility.

## Contact

For any inquiries or suggestions, please contact us at [your_email@example.com].













































# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
