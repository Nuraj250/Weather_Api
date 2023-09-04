# Weather_Api


To run your Node.js API locally, follow these steps:

**Step 1: Set Up MongoDB Locally**

1. Install MongoDB on your computer if you haven't already. You can download it from the official MongoDB website: https://www.mongodb.com/try/download/community

2. Start the MongoDB server by running the following command in your terminal:

```
mongod
```

**Step 2: Set Environment Variables**

Create a `.env` file in your project directory (where your `app.js` file is) and set the `MONGODB_URI` variable with your local MongoDB connection string:

```
MONGODB_URI=mongodb://localhost:27017/your-database-name
```

**Step 3: Start Your Node.js Application**

In your project directory, run the following command to start your Node.js application:

```
node app.js
```

You should see a message indicating that your server is running, and it's connected to MongoDB.

**Step 4: Test Your API**

You can now use Postman or any API testing tool to test your API locally. Your API endpoints should be accessible at `http://localhost:3000`, assuming you haven't specified a different port.

Here are some example requests:

- To create a user (assuming you've implemented the `/register` route):
  - Method: POST
  - URL: `http://localhost:3000/api/users/register`
  - Request Body (in JSON format):
    ```json
    {
      "email": "user@example.com",
      "location": "New York"
    }
    ```

- To update a user's location (assuming you've implemented the `/:id/location` route):
  - Method: PUT
  - URL: `http://localhost:3000/api/users/{user_id}/location`
  - Request Body (in JSON format):
    ```json
    {
      "location": "Los Angeles"
    }
    ```

- To get a user's weather data for a given day (assuming you've implemented the `/:id/weather/:date` route):
  - Method: GET
  - URL: `http://localhost:3000/api/users/{user_id}/weather/{date}`
  - Replace `{user_id}` with the user's actual ID, and `{date}` with the desired date.

Make sure to adjust the route paths and logic in your code based on the actual implementation of your API.
