const express = require('express');
const path = require('path');
const app = express();
const webRouter = require('./routes/web');
const apiRouter = require('./routes/api');


const PORT = process.env.PORT || 3001;

app.use(express.static('public'));
app.use (webRouter);
app.use (apiRouter);


app.get('*', (req, res)=> {
    res.sendFile(path.join(__dirname, 'public', '404.html'));
});

// app.get('/api/notes', (req, res) => {

// });

// GET * should return the index.html file.

// The following API routes should be created:
// GET /api/notes should read the db.json file and return all saved notes as JSON.

// POST /api/notes should receive a new note to save on the request body, add it to the db.json file, 
//and then return the new note to the client. You'll need to find a way to give each note a unique id 
//when it's saved (look into npm packages that could do this for you).




app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`));