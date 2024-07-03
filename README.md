# javascript-rest-calculator

To create a RESTful calculator API in JavaScript, we'll use Node.js and Express. This API will take two numbers (`num1` and `num2`) and an operation (`add`, `subtract`, `divide`, `multiply`) as query parameters, and return the result of the calculation.

# Install nodejs

## Optional: Install asdf tool-version manager

Run `chmod +x deps.sh; ./deps.sh`
This will manage your nodejs versions

# Guide to setup a calculator RESTful API:

1. **Initialize a Node.js project:**

   Open your terminal and run the following commands:

   ```bash
   mkdir javascript-rest-calculator
   cd javascript-rest-calculator
   npm init -y
   ```

2. **Install Express:**

   ```bash
        npm install express
        npm install mysql2
        echo node_modules > .gitignore
   ```

3. **Create the API:**

   Create a file named `index.js` and add the following code:

   ```javascript
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
   ```

4. **Create the Database:**

   In your database shell create the table:
   
   ```sql
   CREATE DATABASE IF NOT EXISTS calculator_db;

    CREATE TABLE IF NOT EXISTS calculator_db.history (
        id INT AUTO_INCREMENT PRIMARY KEY,
        num1 FLOAT NOT NULL,
        num2 FLOAT NOT NULL,
        operation VARCHAR(10) NOT NULL,
        result FLOAT NOT NULL,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    TRUNCATE TABLE calculator_db.history;

    SELECT * from calculator_db.history;
   ```

5. **Run the API:**

   In your terminal, start the server by running:

   ```bash
   npm install
   node index.js
   ```

Your RESTful calculator API is now running on `http://localhost:3000`. You can test it using your browser or tools like Postman or curl.

For example, to add 5 and 3, you can visit:

```
http://localhost:3000/api/calculate?num1=5&num2=3&operation=add

http://localhost:3000/api/calculate?num1=5&num2=3&operation=subtract

http://localhost:3000/api/calculate?num1=5&num2=3&operation=multiply

http://localhost:3000/api/calculate?num1=5&num2=3&operation=divide
```

This will return:

```
8
```

Similarly, you can change the `operation` query parameter to `subtract`, `multiply`, or `divide` to perform different calculations.