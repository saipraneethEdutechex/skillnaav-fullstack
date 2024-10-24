# SkillNaav

*SkillNaav* is a Canada-based platform tailored for students in Canada who are seeking internships in fields they are passionate about. The platform connects students with internships that align with their skills and career interests, helping them gain practical experience in their desired industry. By focusing on personalized recommendations, SkillNaav ensures that students find internships they are truly passionate about, helping them build a meaningful career path.

## Key Features

- *Personalized Internship Recommendations*: Matches students with internships that suit their skills and areas of interest.
- *User-Friendly Interface*: A simple and intuitive platform designed for students to easily browse and apply for internships.
- *Secure Login*: Authentication via JWT tokens to ensure user data is protected.
- *Integration with MongoDB*: All data, including users, internships, and applications, is securely stored in a MongoDB database.

## Project Structure

The SkillNaav platform consists of two main components:

1. *Frontend*
   - Developed using *React.js*.
   - Provides the user interface for students to explore and apply for internships.
2. *Backend*
   - Built using *Node.js* and *Express.js*.
   - Handles API requests, authentication, and data storage via *MongoDB*.

## Prerequisites

Before you can run the project, ensure you have the following installed:

- *Node.js* (v12 or above)
- *npm* (Node package manager)
- *MongoDB* (Ensure you have a MongoDB connection string)

## Getting Started

Follow these steps to set up and run the project:

### 1. Clone the Repository

bash
git clone https://github.com/sivasai3949/skillnaav-fullstack.git
cd skillnaav


### 2. Environment Setup

In the root of the project, create a .env file with the following contents:

env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development


### 3. Running the Frontend

Navigate to the frontend directory and install the necessary dependencies:


cd frontend
npm install

To start the frontend development server:
npm start



By default, the frontend will run on http://localhost:3000.

### 3. Running the Backend

Navigate to the backend directory and install the necessary dependencies:


cd backend
npm install

[Dont forget to add .env and init MongoUrl needs to be setup for the Backend DB interaction]
To start the backend development server:
npm start



By default, the frontend will run on http://localhost:5000.
# skillnaav-main
