# Gen AI Analytics Tool

![Project Banner](https://via.placeholder.com/1200x400) <!-- Add your banner image here -->

A lightweight backend service that simulates an AI-powered data query system, allowing users to process natural language queries, get explanations, and validate queries against a mock database.

🌐 **Live Demo:** [https://genai-analytics-toolsim.vercel.app](https://genai-analytics-toolsim.vercel.app)

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Setup Instructions](#setup-instructions)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Testing](#testing)
- [Project Structure](#project-structure)
- [Mock Database](#mock-database)
- [Future Enhancements](#future-enhancements)

## Overview
This project simulates a simplified version of an AI-powered analytics tool that can:
- Process natural language queries
- Translate them to SQL
- Return meaningful results

Designed to demonstrate how AI can democratize data insights by allowing non-technical users to ask complex business questions directly.

## Features
- **Natural Language Processing**: Convert business questions to SQL queries
- **Mock Database**: In-memory storage with sample data
- **API Endpoints**:
  - Process queries and return results
  - Explain how queries are processed
  - Validate query feasibility
- **Authentication**: Token-based authentication
- **Web Interface**: Interactive UI for testing

## Setup Instructions

### Prerequisites
- Node.js 18.x or higher
- npm or yarn

### Installation

## 1. Clone the repository
git clone https://github.com/rkd-2004/genAI-analytics-toolsim.git

cd genAI-analytics-toolsim

## 2. Running Locally
npm install

npm run dev

Open http://localhost:3000 in your browser.

### API Documentation
**Authentication**

All endpoints require:

**Authorization:** Bearer demo-api-key-123
**Endpoints**
**Endpoint	Method	Description**
/api/query	POST	Process natural language queries

/api/explain	POST	Get query explanations

/api/validate	POST	Validate query feasibility

### Testing
curl Examples

# Query endpoint
curl -X POST https://genai-analytics-toolsim.vercel.app/api/query \
  -H "Authorization: Bearer demo-api-key-123" \
  
  -d '{"query":"Show sales by region"}'
  
### Mock Database
Tables include:

sales

customers

products

orders

employees

## Future Enhancements
1. Advanced NLP techniques

2. Real database connectivity

3. Query history

4. Data visualization
