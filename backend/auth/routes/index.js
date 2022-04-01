const router = require('express').Router();

router.use('/api/rbac', require('./rbac'));
router.use('/api/auth', require('./auth'));
module.exports = router;
