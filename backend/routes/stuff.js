const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const multer = require('../middleware/multer-config');

const stuffCtrl = require('../controllers/stuff');

router.get('/', stuffCtrl.getAllThings);
router.get('/:id', stuffCtrl.getOneThing);
router.post('/', auth, multer, stuffCtrl.createThing);
router.put('/:id', auth, multer, stuffCtrl.modifyThing);
router.delete('/:id', auth, stuffCtrl.deleteThing);

module.exports = router;