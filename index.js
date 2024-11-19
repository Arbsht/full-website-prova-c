const express = require('express');
const path = require('path');
const http = require('http');
const app= express();
const fs = require('fs');

var cors = require('cors'); //HTTP access control (CORS) for cross origin requests

app.use(cors()); //Setup cors

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Set our api response
app.get('/api', (req, res) => {
  res.send('api works');
});

app.get('/api/products', (req, res) => {
    fs.readFile('./products/products.json', 'utf8', (err, data) => {
    if (err) {
    console.error('Errore durante la lettura del file JSON:', err);
    return res.status(500).send('Errore interno del server');
    }
    
    const productsData = JSON.parse(data);
    console.log(typeof productsData);
    res.setHeader('Content-Type', 'application/json');
    res.json(productsData);
    });
    });
// Catch all other routes and return the index file
app.get('*', (req, res) => {
   res.send('app works!');  
   //res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Listen on provided port, on all network interfaces.
 */
app.listen(port,  () => {console.log('Example app listening on port 3000!');});