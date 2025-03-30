Mini Data Query Simulation Engine
A lightweight backend service that simulates an AI-powered data query system, allowing users to process natural language queries, get explanations, and validate queries against a mock database.

Gen AI Analytics Tool

Table of Contents
Overview
Features
Setup Instructions
API Documentation

Authentication
Query Endpoint
Explain Endpoint
Validate Endpoint
Sample Queries
Testing with cURL
Postman Collection
Project Structure
Mock Database
Future Enhancements
Overview
This project simulates a simplified version of an AI-powered analytics tool that can process natural language queries, translate them to SQL, and return meaningful results. It's designed as a demonstration of how AI can democratize data insights across business units by allowing non-technical users to ask complex business questions directly.

Features
Natural Language Processing: Convert business questions to SQL queries
Mock Database: In-memory storage with sample data for testing
API Endpoints:

Process queries and return results
Explain how queries are processed
Validate query feasibility
Authentication: Simple token-based authentication
Web Interface: Interactive UI for testing all functionality
Setup Instructions
Prerequisites
Node.js 18.x or higher
npm or yarn
Installation
Clone the repository:

git clone https://github.com/yourusername/mini-data-query-engine.git
cd mini-data-query-engine
Install dependencies:

npm install
# or
yarn install
Start the development server:

npm run dev
# or
yarn dev
Open your browser and navigate to http://localhost:3000
Deployment
To deploy to production:

Build the application:

npm run build
# or
yarn build
Start the production server:

npm start
# or
yarn start
API Documentation
Authentication
All API endpoints require authentication using a Bearer token in the Authorization header.

For demo purposes, use the token: demo-api-key-123

Example:

Authorization: Bearer demo-api-key-123
Query Endpoint
Process natural language queries and return results.

URL: /api/query
Method: POST
Auth Required: Yes
Content-Type: application/json
Request Body:

{
  "query": "Show me sales by region for last quarter"
}
Success Response:

Code: 200 OK
Content:
{
  "result": {
    "originalQuery": "Show me sales by region for last quarter",
    "sqlQuery": "SELECT region, SUM(sales_amount) FROM sales GROUP BY region ORDER BY SUM(sales_amount) DESC",
    "results": [
      { "region": "North America", "sales": 1245000 },
      { "region": "Europe", "sales": 1042000 },
      { "region": "Asia", "sales": 897000 },
      { "region": "South America", "sales": 645000 },
      { "region": "Africa", "sales": 392000 },
      { "region": "Oceania", "sales": 287000 }
    ],
    "executionTime": "120ms"
  }
}
Error Response:

Code: 401 Unauthorized
Content: { "error": "Authentication failed" }
OR

Code: 400 Bad Request
Content: { "error": "Query is required and must be a string" }
OR

Code: 500 Internal Server Error
Content: { "error": "Failed to process query" }
Explain Endpoint
Get detailed explanation of how a query would be processed.

URL: /api/explain
Method: POST
Auth Required: Yes
Content-Type: application/json
Request Body:

{
  "query": "Show me sales by region for last quarter"
}
Success Response:

Code: 200 OK
Content:
{
  "explanation": {
    "originalQuery": "Show me sales by region for last quarter",
    "sqlQuery": "SELECT region, SUM(sales_amount) FROM sales GROUP BY region ORDER BY SUM(sales_amount) DESC",
    "explanation": {
      "intent": "Comparison Analysis",
      "dataSourcesUsed": ["sales"],
      "fieldsAnalyzed": ["region", "sales_amount"],
      "filtersApplied": { "time_period": "last quarter" },
      "processingSteps": [
        "Parse natural language query",
        "Identify query intent and required data sources",
        "Convert to structured query language",
        "Execute query against relevant data sources",
        "Format and return results"
      ]
    }
  }
}
Error Responses: Same as Query Endpoint

Validate Endpoint
Check if a query can be processed and get suggestions.

URL: /api/validate
Method: POST
Auth Required: Yes
Content-Type: application/json
Request Body:

{
  "query": "Show me sales by region for last quarter"
}
Success Response:

Code: 200 OK
Content:
{
  "isValid": true,
  "confidence": 85,
  "missingData": [],
  "suggestedReformulation": null
}
Error Responses: Same as Query Endpoint

Sample Queries
Here are some example queries you can try:

Sales by Region:

Show me sales by region for last quarter
Customer Distribution:

How many customers do we have in each country?
Revenue Trends:

What is our monthly revenue trend this year?
Top Products:

What are our top 10 selling products?
Invalid Query (for testing validation):

Show me the xyz metrics for abc
Testing with curl
Query Endpoint
curl -X POST http://localhost:3000/api/query \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer demo-api-key-123" \
  -d '{"query": "Show me sales by region for last quarter"}'
Explain Endpoint
curl -X POST http://localhost:3000/api/explain \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer demo-api-key-123" \
  -d '{"query": "Show me sales by region for last quarter"}'
Validate Endpoint
curl -X POST http://localhost:3000/api/validate \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer demo-api-key-123" \
  -d '{"query": "Show me sales by region for last quarter"}'
Postman Collection
You can import the following Postman collection to test the API:

{
  "info": {
    "_postman_id": "a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6",
    "name": "Mini Data Query Engine",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Query - Sales by Region",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          },
          {
            "key": "Authorization",
            "value": "Bearer demo-api-key-123"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"query\": \"Show me sales by region for last quarter\"\n}"
        },
        "url": {
          "raw": "http://localhost:3000/api/query",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["api", "query"]
        }
      }
    },
    {
      "name": "Explain - Sales by Region",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          },
          {
            "key": "Authorization",
            "value": "Bearer demo-api-key-123"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"query\": \"Show me sales by region for last quarter\"\n}"
        },
        "url": {
          "raw": "http://localhost:3000/api/explain",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["api", "explain"]
        }
      }
    },
    {
      "name": "Validate - Sales by Region",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          },
          {
            "key": "Authorization",
            "value": "Bearer demo-api-key-123"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"query\": \"Show me sales by region for last quarter\"\n}"
        },
        "url": {
          "raw": "http://localhost:3000/api/validate",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["api", "validate"]
        }
      }
    },
    {
      "name": "Query - Customers by Country",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          },
          {
            "key": "Authorization",
            "value": "Bearer demo-api-key-123"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"query\": \"How many customers do we have in each country?\"\n}"
        },
        "url": {
          "raw": "http://localhost:3000/api/query",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["api", "query"]
        }
      }
    },
    {
      "name": "Query - Monthly Revenue",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          },
          {
            "key": "Authorization",
            "value": "Bearer demo-api-key-123"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"query\": \"What is our monthly revenue trend this year?\"\n}"
        },
        "url": {
          "raw": "http://localhost:3000/api/query",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["api", "query"]
        }
      }
    },
    {
      "name": "Query - Top Products",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          },
          {
            "key": "Authorization",
            "value": "Bearer demo-api-key-123"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"query\": \"What are our top 10 selling products?\"\n}"
        },
        "url": {
          "raw": "http://localhost:3000/api/query",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["api", "query"]
        }
      }
    }
  ]
}
To use this collection:

Copy the JSON above
Open Postman
Click "Import" > "Raw text" and paste the JSON
Click "Import"

Mock Database
The system uses an in-memory mock database with the following tables:

sales: Sales transactions with product, customer, amount, region, and date
customers: Customer information with name, country, email, and join date
products: Product information with name, category, price, and stock status
orders: Order information with customer, date, total, and status
employees: Employee information with name, department, hire date, and salary
The mock database generates random data for demonstration purposes.

Future Enhancements
Implement more sophisticated NL to SQL conversion using NLP techniques
Add support for more complex queries and data visualizations
Implement a proper authentication system with user management
Add support for connecting to real databases
Implement query history and saved queries
Add data export functionality
Implement more advanced error handling and query suggestions
Chat Input
Ask a follow up…
