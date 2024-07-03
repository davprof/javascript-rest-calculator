const express = require('express');
const app = express();
const port = 3000;

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

    res.send(`${result}`);
});

app.listen(port, () => {
    console.log(`Calculator API is running on http://localhost:${port}`);
});