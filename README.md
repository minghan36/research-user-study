# SOFTENG700 User Study Project - Project #30

Welcome to the SOFTENG700 user study project repository for Project #30!

This project is a user study web application intended to test the effectiveness of our [main project application](https://github.com/vniu740/700-App) as a mental recovery tool.

## Project Overview - User Study

This web application is designed to assess the effectiveness of a mental recovery tools within a short time frame. This is achieved by using the common psychology experiment of [Lexical Decision Tasks](https://www.psytoolkit.org/experiment-library/ldt.html). Specifically, this project will be used to analyse the presence of task-set inertia and it's severity after a variety of intervention methods.

### Project Experiment Procedure

1. **Pre-Experiment Page**
The web application opens up onto a page that provides a brief overview of Lexical Decision Tasks and how to complete them. From here, users can also select the participant trial group that is reflected in the database.
  - Group 0: Control Group
  - Group 1: Intervention Group

2. **Block One Page**
This page continuously displays Lexical Decision Task questions for a duration of 7 minutes. Special conditions for this page include:
  - Non words always appear BLUE
  - Words always appear ORANGE

3. **Intervention Page**
This page acts as an intermediary page where participants can complete their assigned intervention. The page includes:
  - Start/Stop intervention button that saves the timestamp when pressed
  - Continue to Block Two button that begins the second block of Lexical Decision Tasks

4. **Block Two Page**
This page continuously displays Lexical Decision Task questions for a duration of 7 minutes. Special conditions for this page include:
  - Non words have equal chance to appear ORANGE OR BLUE
  - Words have equal chance to appear ORANGE OR BLUE

5. **End Page**
This page signifies the end of the experiement and thanks them for their participation. The page also display their unique participant id that user's can note down if they ever want to withdraw their data in the future. This helps to maintain participant privacy.

## Technologies Used

- **Next.js**
- **React**
- **JavaScript**
- **JSPysch**
- **Tailwind CSS**
- **SQLite**

## File Structure

### lib
Utility functions and data

- **init-db.js**: Database initialization and schema setup for SQLite  
- **words.js**: Word lists for lexical decision tasks (`realWords1`, `realWords2`, `nonWords1`, `nonWords2`)

### public
Static assets

### src
Next.js app directory containing pages and API routes

- **api/**: Backend API endpoints for database interactions  
  - **participant/**: Participant management endpoints 
  - **response/**: Response data collection endpoints for trial results  
- **block-one/**: First block of lexical decision tasks (orange words, blue non-words)  
- **block-two/**: Second block of lexical decision tasks (randomized colors)  
- **break/**: Intervention page between blocks with start/stop intervention controls  
- **end/**: Study completion page with participant ID display

## Getting Started

Follow these steps to set up and run the project locally:

### Prerequisites

Ensure you have the following installed on your system:

- Node.js (v16 or later)
- npm

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/minghan36/research-user-study.git
   cd research-user-study
   ```

2. Install dependencies for both the client and server:

   ```bash
   npm install
   ```

### Running the Application Locally

1. Start the server:

   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser to use the application.


