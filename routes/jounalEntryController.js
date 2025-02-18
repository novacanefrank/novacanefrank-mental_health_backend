const express = require('express');
const router = express.Router();
const journalEntryController = require('../controller/journalEntryController');

router.get('/', journalEntryController.getAllJournalEntries);
router.get('/:id', journalEntryController.getJournalEntryById);
router.post('/', journalEntryController.createJournalEntry);
router.put('/:id', journalEntryController.updateJournalEntry);
router.delete('/:id', journalEntryController.deleteJournalEntry);

module.exports = router;
