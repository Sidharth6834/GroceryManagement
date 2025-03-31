const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

app.post('/add-to-cart', (req, res) => {
    const { product, price } = req.body;
    db.run('INSERT INTO cart (product, price) VALUES (?, ?)', [product, price], function (err) {
        if (err) {
            return res.status(500).send('DB Error');
        }
        res.send('Item added to cart');
    });
});

app.get('/cart-data', (req, res) => {
    db.all('SELECT * FROM cart ORDER BY addedAt DESC', [], (err, rows) => {
        if (err) {
            return res.status(500).send('DB Error');
        }
        res.json(rows);
    });
});

app.delete('/reset-cart', (req, res) => {
    db.run('DELETE FROM cart', function (err) {
        if (err) {
            return res.status(500).send('DB Error');
        }
        res.send('Cart has been reset!');
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
