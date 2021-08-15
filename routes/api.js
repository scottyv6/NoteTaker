const express = require('express');
const fs = require('fs');
const path = require ('path');
const uuid = require('uuid')

const router = express.Router();

router.use(express.json());

const dbPath = path.join(__dirname, '..', 'db', 'db.json');
console.log('dbPath is ',dbPath);

function getNotesFromDb() {

    return JSON.parse(fs.readFileSync(dbPath, 'utf-8')) || [];
}

function writeNotesToDb(content) {
    fs.writeFileSync(dbPath, JSON.stringify(content));
}

router.get('/api/notes', (req, res) => {

    const notes = getNotesFromDb();

    res.json(notes);
});

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

router.delete('/api/notes/:id', (req, res) => {
    const notes = getNotesFromDb();

    const filtered = notes.filter((note) => {
        console.log ('req.params.id ', req.params.id);
        return note.id !== req.params.id;
    });

    console.log('filtered ',filtered);
    console.log('before');
    writeNotesToDb(filtered);
    console.log('after');
    res.json({ 
        data: 'deleted'
    });
})

module.exports = router;