const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files from 'public' directory
app.use(express.static('public'));

// Read the JSON file
const menuData = JSON.parse(fs.readFileSync('menu.json', 'utf8'));

// Function to get today's meal
function getTodaysMeal() {
    const today = new Date();
    const start = new Date('2024-01-01'); // Replace with your start date
    const diffTime = Math.abs(today - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    const cycleDay = (diffDays % 35) || 35; // 35-day cycle

    const mealType = today.getHours() < 12 ? 'lunch' : 'dinner';
    return menuData.find(m => m.day === cycleDay).meals[mealType];
}

// API endpoint for the meal data
app.get('/meal', (req, res) => {
    res.json(getTodaysMeal());
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});