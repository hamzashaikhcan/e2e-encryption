const router = require('express').Router();

router.use('/todos', require('./todo'));
router.use('/subtasks', require('./subtasks'));

module.exports = router;
