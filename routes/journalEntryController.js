const express = require('express');
const router = express.Router();
const journalEntryController = require('../controller/journalEntryController');

router.get('/getJournalEntries', journalEntryController.getAllJournalEntries);
router.get('/getJournalEntryById/:id', journalEntryController.getJournalEntryById);
router.post('/createJournalEntry', journalEntryController.createJournalEntry);
router.put('/updateJournalEntry/:id', journalEntryController.updateJournalEntry);
router.delete('/deleteJournalEntry/:id', journalEntryController.deleteJournalEntry);

module.exports = router;
