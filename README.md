# AI Job Assistant

AI Job Assistant is a full-stack web application that analyzes a CV against a job description using AI and provides structured feedback to help evaluate the match between a candidate's profile and a job opportunity.

## Features

- Upload and analyze CV documents
- Compare CV content with job descriptions
- AI-powered CV analysis using Google Gemini
- PDF text extraction and processing
- REST API communication between frontend and backend
- Modern web interface built with Next.js

## Tech Stack

### Backend
- Java
- Spring Boot
- Spring AI
- Google Gemini API
- REST APIs
- Maven

### Frontend
- Next.js
- React
- TypeScript
- HTML
- CSS

## Project Structure

```text
ai-job-assistant/
├── frontend/        # Next.js frontend
├── src/             # Spring Boot backend
├── pom.xml
└── README.md
```

## Getting Started

### Backend

1. Clone the repository:

```bash
git clone https://github.com/banna2030/ai-job-assistant.git
cd ai-job-assistant
```

2. Set your Gemini API key as an environment variable:

```bash
GEMINI_API_KEY=your_api_key
```

3. Start the Spring Boot application:

```bash
./mvnw spring-boot:run
```

### Frontend

Open the frontend directory:

```bash
cd frontend
```

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will be available at:

```text
http://localhost:3000
```

## Architecture

The application follows a separated frontend/backend architecture:

```text
Next.js Frontend
       ↓
    REST API
       ↓
Spring Boot Backend
       ↓
   Spring AI
       ↓
 Google Gemini
```

## Future Improvements

- User authentication
- Analysis history
- Improved AI-generated recommendations
- Job-specific CV improvement suggestions
- Deployment using cloud services

## Author

**Ahmed Elbanna**

B.Sc. Computer Science  
M.Sc. Applied Computer Science – Ruhr University Bochum (ongoing)
