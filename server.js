const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// Connect to the MongoDB database with an explicitly specified database name
mongoose.connect(
  "Your mongoDB connection string here",
);

// Define the schema for the 'usersData' collection
const userSchema = new mongoose.Schema(
  {
    id: Number,
    first_name: String,
    last_name: String,
    email: String,
    job_title: String,
    gender: String,
  },
  { collection: "usersData" }
); // Specify the collection name here

const listSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
  },
  { collection: "lists" }
);

// Create Mongoose models based on the schemas
const User = mongoose.model("User", userSchema);
const List = mongoose.model("List", listSchema);

// Configure middleware for parsing form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the HTML form
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Handle form submission
app.post("/submit", async (req, res) => {
  try {
    // Create a new user document using form data
    const newUser = new User({
      id: req.body.id, // Assuming you have an "id" field in the form
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      job_title: req.body.job_title,
      gender: req.body.gender,
    });

    // Save the new user document to the 'usersData' collection
    await newUser.save();

    // Respond with a success message
    res.send("User data has been saved.");
  } catch (err) {
    // Handle errors and provide an error response
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// Serve the HTML form for adding items to lists
app.get("/items", (req, res) => {
  res.sendFile(__dirname + "/items.html");
});

// Handle form submission for adding items to lists
app.post("/items/submit", async (req, res) => {
  try {
    // Create a new list item document using form data
    const newList = new List({
      name: req.body.name,
      description: req.body.description,
      // Add more fields as needed for your lists
    });

    // Save the new list item document to the 'lists' collection
    await newList.save();

    // Respond with a success message
    res.send("List item has been saved.");
  } catch (err) {
    // Handle errors and provide an error response
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
