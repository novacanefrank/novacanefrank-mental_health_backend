const express=require('express');
const router=express.Router();
const testController=require('../controller/testController')
router.post('/create_test',testController.createTest);
router.get('/view_test',testController.getTest);
