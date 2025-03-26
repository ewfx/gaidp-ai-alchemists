# 🚀 Project Name : AuditHelp

## 📌 Table of Contents
- [Introduction](#introduction)
- [Demo](#demo)
- [Inspiration](#inspiration)
- [What It Does](#what-it-does)
- [How We Built It](#how-we-built-it)
- [Challenges We Faced](#challenges-we-faced)
- [How to Run](#how-to-run)
- [Tech Stack](#tech-stack)
- [Team](#team)

---

## 🎯 Introduction
In the modern data-driven landscape, ensuring data quality and detecting anomalies are critical tasks for organizations. This project leverages Generative AI to automate the creation of data profiling rules, simplifying data governance and enhancing anomaly detection. By integrating AI-powered rule generation, anomaly detection, and intelligent transaction flagging, we aim to streamline data management processes.

## 🎥 Demo
🔗 [Live Demo](#) (if applicable)  
📹 [Video Demo](#) (if applicable)  
🖼️ Screenshots:

![Screenshot 1](link-to-image)

## 💡 Inspiration
The inspiration behind this project stems from the increasing complexity of data ecosystems. Traditional data profiling methods often require extensive manual effort and domain expertise, leading to inconsistencies and inefficiencies. Our goal is to empower users with an intuitive, AI-assisted platform that automates rule creation, identifies anomalies, and provides actionable insights — all without deep technical expertise.

## ⚙️ What It Does
- **Generates Data Profiling Rules:** Uses Gen AI to create tailored data profiling rules based on provided datasets.
- **Chatbot for Rule Updates:** Enables users to modify rules effortlessly through a conversational chatbot interface.
- **Anomaly Detection:** Implements an Isolation Forest model to detect unusual patterns, exporting the results into an Excel report.
- **Transaction Flagging:** Identifies suspicious transactions, explains the reasons for the violation, and offers remediation suggestions.
- **Downloadable Reports:** Supports downloading flagged transactions and anomaly reports for further analysis.

## 🛠️ How We Built It
- **Backend:** Built with FastAPI (Python) for a lightweight, high-performance API.
- **Frontend:** ReactJS for an interactive, user-friendly interface.
- **AI Engine:** Gemini-2.0-Flash-Lite model for rule generation and violation explanations.
- **Anomaly Detection:** Implemented Isolation Forest for identifying data anomalies.

## 🚧 Challenges We Faced
- **Parsing LLM Output:** Ensuring the model's responses were parsed into a usable, structured format was a significant hurdle.
- **Output Formatting:** Limiting and structuring the LLM's output to match the desired format required continuous adjustments.
- **High Response Time:** The AI model's response time was high, making it challenging to maintain a smooth user experience.

## 🏃 How to Run
This repository contains both the frontend and backend components of the project. Follow the instructions below to set up and run the project locally.

---

## Prerequisites

Ensure you have the following installed on your system:
- Python 3.8 or higher
- Node.js (for the frontend)
- npm or yarn (for managing frontend dependencies)
- pip (Python package manager)
- Git (for cloning the repository)

---

## Backend Setup

1. **Navigate to the Backend Directory**:
   ```bash
   cd code/src/backend
   ```

2. **Set Up a Virtual Environment** (optional but recommended):
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
   ```

3. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Set Up Environment Variables**:
   - Create a `.env` file in the `backend` directory if it doesn't already exist.
   - Add the required environment variables. For example:
     ```
     GOOGLE_API_KEY=your_google_api_key_here
     ```

5. **Run the Backend**:
   ```bash
   python home.py
   ```

   The backend should now be running on `http://localhost:8000` (or the port specified in your code).

---

## Frontend Setup

1. **Navigate to the Frontend Directory**:
   ```bash
   cd code/src/frontend/aidp
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run the Frontend**:
   ```bash
   npm start
   ```

   The frontend should now be running on `http://localhost:3000` (or the port specified in your frontend configuration).

---

## Running the Full Application

1. Start the backend by following the steps in the "Backend Setup" section.
2. Start the frontend by following the steps in the "Frontend Setup" section.
3. Open your browser and navigate to `http://localhost:3000` to access the application.

---

## 🏗️ Tech Stack
- 🔹 Frontend: React 
- 🔹 Backend: Node.js / FastAPI 
- 🔹 Other: Gemini API 

## 👥 Team
- **Nikitha** - [GitHub](#) | [LinkedIn](#)
- **Mahendar** - [GitHub](#) | [LinkedIn](#)
- **Maruthi** - [GitHub](#) | [LinkedIn](#)
- **Prabakaran** - [GitHub](#) | [LinkedIn](#)
