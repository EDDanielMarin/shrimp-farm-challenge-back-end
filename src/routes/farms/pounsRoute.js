const {Router} = require('express');
const {poundController } = require('../../controller');
const router = Router();
router
    .get('/', poundController.get)
    .get('/:id', poundController.find)
    .post('/', poundController.save)
    .patch('/:id', poundController.update)
    .delete('/:id', poundController.remove);
module.exports = router;
