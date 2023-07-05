# easEcom

![Screenshot (177)](https://github.com/IamOm775/easecom/assets/95044230/3b985b8a-dbac-4d49-880d-6fb3c15f1558)


Ecommerce Admin Dashboard is built using Next.js and TypeScript. The website provides an intuitive admin dashboard interface for creating and managing ecommerce websites. It includes features such as product listing, updating, sales tracking, and Stripe integration for secure checkout.

## Technologies Used

- Framework: Next.js
- Language: TypeScript 
- Database: MySQL
- ORM: Prisma
- MySQL Hosting: PlanetScale
- Authentication: Clerk

## Installation

To run the Ecommerce Admin Dashboard locally, follow these steps:

1. Clone the repository:

   ```bash
   https://github.com/IamOm775/easecom.git
   
2. ```bash
   cd easecom
   ```
   ```bash
   npm install
   ```
   
3. ## Set up the environment variables:

   Create a .env.local file in the root directory.

   Add the following environment variables:

## Database configuration
   - DB_HOST=your-mysql-host
   - DB_PORT=your-mysql-port
   - DB_USER=your-mysql-username
   - DB_PASSWORD=your-mysql-password
   - DB_NAME=your-mysql-database-name

## Clerk configuration
CLERK_FRONTEND_API_KEY=your-clerk-frontend-api-key

4. ## Start the development server:
   ```bash
   npm run dev
5.  Open your browser and navigate to http://localhost:3000 to access the website.

6. ## Contributions
   Contributions to this project are welcome! If you encounter any issues or have suggestions for improvement, please open an issue or submit a pull request.

Please make sure to follow the Contributing Guidelines when contributing to this project.

## License
This project is licensed under the MIT License.

