const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'mysql',
    database: 'calculator_db'
});

app.get('/api/calculate', (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);
    const operation = req.query.operation;

    if (isNaN(num1) || isNaN(num2)) {
        return res.status(400).send('Both num1 and num2 should be valid numbers.');
    }

    let result;
    switch (operation) {
        case 'add':
            result = num1 + num2;
            break;
        case 'subtract':
            result = num1 - num2;
            break;
        case 'multiply':
            result = num1 * num2;
            break;
        case 'divide':
            if (num2 === 0) {
                return res.status(400).send('Cannot divide by zero.');
            }
            result = num1 / num2;
            break;
        default:
            return res.status(400).send('Invalid operation. Please use add, subtract, multiply, or divide.');
    }

    // Insert the calculation into the history table
    const query = 'INSERT INTO history (num1, num2, operation, result) VALUES (?, ?, ?, ?)';
    pool.query(query, [num1, num2, operation, result], (error, results) => {
        if (error) {
            return res.status(500).send('Error logging calculation to database.');
        }
    });

    res.send(`${result}`);
});

app.listen(port, () => {
    console.log(`Calculator API is running on http://localhost:${port}`);
});