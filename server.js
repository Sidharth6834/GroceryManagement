// Required modules
const express = require('express');
const path = require('path');
// const SerialPort = require('serialport'); // <-- Arduino disabled
const fs = require('fs');
const db = require('./db');  // import your SQLite connection

const app = express();
const port = 3000;

// Middleware
app.use(express.static(__dirname));
app.use(express.json());

// Serial Port setup (disabled)
// const arduino = new SerialPort.SerialPort({ path: 'COM3', baudRate: 9600 });

// Add to cart API
app.post('/add-to-cart', (req, res) => {
    const { product, price } = req.body;

    // Insert into SQLite database
    db.run(
        'INSERT INTO cart (product, price) VALUES (?, ?)',
        [product, price],
        function (err) {
            if (err) {
                console.error('DB Error:', err);
                return res.status(500).send('DB Error');
            }

            // Skip sending to Arduino
            // const message = `Added: ${product} - ₹${price}`;
            // arduino.write(message + '\n', err => {
            //     if (err) {
            //         console.error('Arduino Error:', err);
            //         return res.status(500).send('Arduino Error');
            //     }
            //     res.send('Item added to cart and sent to Arduino');
            // });

            // Response when Arduino is not used
            res.send('Item added to cart (Arduino not connected)');
        }
    );
});

// Get cart data (for admin.html/cart page)
app.get('/cart-data', (req, res) => {
    db.all('SELECT * FROM cart ORDER BY addedAt DESC', [], (err, rows) => {
        if (err) {
            console.error('DB Error:', err);
            return res.status(500).send('DB Error');
        }
        res.json(rows);
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
