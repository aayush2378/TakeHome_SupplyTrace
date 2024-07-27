# Full-Stack Developer Take-Home Assessment

## Overview

Create a web application that displays a list of companies and their details, including multiple possible locations. The application should have a Python backend API, a React frontend with a two-page structure and map integration, and be containerized using Docker.

## Requirements

### Data Structure

The application will use two CSV files:

1. companies.csv:
   - Columns: company_id, name, address, latitude, longitude

2. locations.csv:
   - Columns: location_id, company_id, name, address, latitude, longitude

### Backend (Python)

1. Create a Flask/FastAPI/Django(any python framework only) application that serves as the backend API.
2. Implement the following endpoints:
   
   a. Get all companies (read from companies.csv)
   
   b. Get company details by ID (from companies.csv)
   
   c. Get all locations for a specific company ID (from locations.csv)
   
4. Implement basic error handling and logging.
5. Provide API Documentation

### Frontend (React)

1. Create a React application with routing (e.g., using React Router) for two pages:
   a. Company List Page
   b. Company Details Page

2. Company List Page:
   - Display a list or grid of companies fetched from the backend API.
   - Each company item should show basic information (name, address).
   - Implement a search or filter functionality to find companies by name.
   - Clicking on a company should navigate to the Company Details Page.

3. Company Details Page:
   - Display detailed information about the selected company (name, address).
   - Integrate a map component (using Leaflet or Google Maps React) to show the company's main location.
   - Fetch and display a list of possible locations for the company.
   - Display the locations list, including name, address, latitude, and longitude for each location.
   - Implement a creative and user-friendly way to visualize or interact with the locations data. Candidates have the freedom to choose how they want to show this information (e.g., interactive list, map with multiple markers, tabbed interface, etc.).
   - Show a "Back to List" button to return to the Company List Page.

4. Implement responsive design for both desktop and mobile views.

### Docker and Docker Compose

1. Create a Dockerfile for the backend application.
2. Create a Dockerfile for the frontend application.
3. Create a docker-compose.yml file that orchestrates both the backend and frontend services.

## Deliverables

1. Source code for both backend and frontend applications.
2. Dockerfile for each application.
3. docker-compose.yml file.
4. README.md with instructions on how to run the application and any additional notes.
5. Sample CSV files: companies.csv and locations.csv (at least 10 companies and 30 locations).

## Evaluation Criteria

- Code quality and organization
- Proper use of Python, React, and Docker best practices
- Implementation of routing and state management in React
- Efficient handling of data from multiple CSV files
- Creativity and user experience in displaying company locations
- Error handling and edge cases
- Documentation and code comments

## Bonus Points

- Implement unit tests for backend and frontend
- Add possible data visualizations (e.g., charts) on the Company Details Page
- Implement an innovative way to compare or analyze multiple locations
- Swagger UI Doccumentation

## Time Limit

Candidates will have 4 days to complete this assessment. The deadline for submission is Saturday at 4:00 PM EST. Please ensure that you manage your time effectively to showcase your best work within this timeframe.
We understand that you may have other commitments, so please allocate your time wisely across the various components of the assessment. It's okay if not all features are fully implemented; we're interested in seeing your approach, code quality, and how you prioritize tasks given the time constraint.

## Submission

Please provide a link to a public GitHub repository.

Good luck!

