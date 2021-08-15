const express = require('express');
const path = require('path');
const app = express();
const webRouter = require('./routes/web');
const apiRouter = require('./routes/api');


const PORT = process.env.PORT || 3001;

// Adding middleware
app.use(express.static('public'));
app.use(express.json());

//Set up routes in seperate files
app.use (webRouter);
app.use (apiRouter);

//wildcard route set up after all other routes
app.get('*', (req, res)=> {
    res.sendFile(path.join(__dirname, 'public', '404.html'));
});

app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`));