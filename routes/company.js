const express = require('express');
const router = express.Router();

const companyController = require('../controller/company_controller');

router.get('/home', companyController.companyPage);
router.get('/allocate', companyController.allocateInterview);

router.post('/schedule-interview', companyController.scheduleInterview);
router.post('/update-status/:id', companyController.updateStatus);

module.exports = router;
