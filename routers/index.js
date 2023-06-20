const express = require('express');
const router = express.Router();

router.use('/api/v1',require('./API_ROUTES/index'));



module.exports = router;