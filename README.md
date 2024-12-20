name:Dushime Beni Egide
id: 25285

# Beniflix

Beniflix is a movie website designed to enhance your movie experience. It features both an Admin Dashboard and a User Dashboard to cater to different user roles and functionalities.

## Features

### Admin Dashboard

- **Add Movies and Posters:** Admins can upload movie posters and details about movies showing in cinemas.
- **Recommend Movies:** Admins can recommend movies directly to users.
- **Monitor User Activity:** An audit log feature allows the admin to track users who entered the system.
- **Admin Credentials:**
  - Username: `Beni`
  - Password: `12345678`

### User Dashboard

- **View Movies:** Users can browse movies added by the admin.
- **Receive Recommendations:** Users can see the movies recommended by the admin.

### Additional Pages

- **Login Page:** Users and admins can log in to access their respective dashboards.
- **Sign-Up Page:** New users can create an account.
- **Movie Small Page:** View details about individual movies.

## Deployment Notes

Due to the limitations of the free hosting platform (e.g., Render), the website may experience slow loading times. Please be patient while testing its features.

## How to Use

   use this link : [https://beniflix.netlify.app/](https://beniflix.netlify.app/)

      OR IF THE LAGGIING ISSUES CONTINUES YOU CAN USE THESE STEPS LOCALLY:

1. Clone or download the repository both frontend and backend.
2. Navigate to the project directory.
3. start both projects (frontend(npm run dev) and backend (just start springboot)).
4. Log in with the provided admin credentials to access the Admin Dashboard.
5. Sign up or log in as a user to explore the User Dashboard.



 Business Context

Beniflix is designed to solve a major challenge in Rwanda's cinema services. Traditionally, to find out which movies will be shown in cinemas during a particular week, people must visit the cinema headquarters in person. This is both time-consuming and inconvenient.

With Beniflix:

Users can easily check the movies scheduled for the week online.

Admins can recommend movies with the highest likelihood of being shown multiple times, offering users an optimized recommendation system.

This makes Beniflix not just a movie website but a crucial tool for improving access to cinema services and enhancing the movie-going experience in Rwanda.  




System Features

Sort Functionality: On the users' page, movies can be sorted by name or description, enabling easier navigation and discovery.

Pagination: Users can control the number of items displayed per page on the users' page, improving usability.

Language Translation: The system supports both English and French, catering to a diverse audience.

Audit Log: Allows the admin to monitor user activities and track system access.



## Known Issues

- **Performance:** Slow response times on free hosting platforms.

## License

This project is licensed under DB7.

