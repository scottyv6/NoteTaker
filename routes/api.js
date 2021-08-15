const express = require('express');
const fs = require('fs');
const path = require ('path');
const uuid = require('uuid')

const router = express.Router();

router.use(express.json());

//set up a variable for the path to our data file (db.json)
const dbPath = path.join(__dirname, '..', 'db', 'db.json');
console.log('dbPath is ',dbPath);

// A function get our data from the db.json file
function getNotesFromDb() {
    return JSON.parse(fs.readFileSync(dbPath, 'utf-8')) || [];
}

// A function write our data to the db.json file
function writeNotesToDb(content) {
    fs.writeFileSync(dbPath, JSON.stringify(content));
}

//route to get notes
router.get('/api/notes', (req, res) => {

    const notes = getNotesFromDb();

    res.json(notes);
});

//route to add notes
router.post('/api/notes', (req, res) => {

    const notes = getNotesFromDb();
    const title = req.body.title;
    const text = req.body.text;
    
    const id = uuid.v4();

    notes.push({
        id:id,
        title: title,
        text: text,
    });
    writeNotesToDb(notes);

    res.json({ 
        data: 'success'
    });
});


//route to delete notes
router.delete('/api/notes/:id', (req, res) => {
    const notes = getNotesFromDb();

    const filtered = notes.filter((note) => {
        return note.id !== req.params.id;
    });

    writeNotesToDb(filtered);
    
    res.json({ 
        data: 'deleted'
    });
})

module.exports = router;