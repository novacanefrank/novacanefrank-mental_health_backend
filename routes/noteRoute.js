const express = require('express');
const router = express.Router();
const noteController = require('../controller/noteController');

router.get('/getAllNotes', noteController.getAllNotes);
router.get('/getNoteById/:id', noteController.getNoteById);
router.post('/createNote', noteController.createNote);
router.put('/updateNote/:id', noteController.updateNote);
router.delete('/deleteNote/:id', noteController.deleteNote);

module.exports = router;
