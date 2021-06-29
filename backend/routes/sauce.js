const express = require('express');
const router = express.Router();
const sauceCtrl = require('../controllers/Sauce');

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const idCheck = require('../middleware/user-check');

router.post('/', auth, multer, sauceCtrl.createSauce);
router.put('/:id', idCheck, auth, multer, sauceCtrl.modifySauce);
router.delete('/:id', idCheck, auth, sauceCtrl.deleteSauce);
router.post('/:id/like', auth, sauceCtrl.likeSauces);
router.get('/', auth, sauceCtrl.getAllSauces);
router.get('/:id', auth, sauceCtrl.getOneSauce);

module.exports = router;
