
//import required packages
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const xlsx = require("xlsx"); //library to work with Excel files

// //import required packages
// import express from "express";
// import { json } from "body-parser";
// import cors from "cors";
// import { utils, writeFile } from "xlsx"; //library to work with Excel files

const app = express();
const PORT = 3000;

//Middleware
app.use(cors());
app.use(bodyParser.json()); //parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // This is for handling form-encoded data


// Define a POST endpoint to handle form submissions
app.post('/submit-form', (req, res) => {
    const { firstName, lastName, email, mobileNumber } = req.body;

    console.log(req.body);
    
    // Log the received data
    console.log('Received data:', { firstName, lastName, email, mobileNumber });

    // Create a new workbook and worksheet
    const workbook = xlsx.utils.book_new();
    const worksheetData = [
        ['First Name', 'Last Name', 'Email', 'Mobile Number'], // Header
        [firstName, lastName, email, mobileNumber] // Data row
    ];
    const worksheet = xlsx.utils.aoa_to_sheet(worksheetData);

    // Append the worksheet to the workbook
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Form Responses');

    // Write the workbook to a file
    const filePath = 'form_responses.xlsx'; // File name
    xlsx.writeFile(workbook, filePath);

    // Send a response back to the client
    res.json({ message: 'Form submitted successfully!' });
});


//server starting
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});