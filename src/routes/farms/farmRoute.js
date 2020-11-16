const {Router} = require('express');
const {farmController } = require('../../controller');
const router = Router();
router
    .get('/', farmController.get)
    .get('/:id', farmController.find)
    .get('/:id/size', farmController.getSize)
    .post('/', farmController.save)
    .patch('/:id', farmController.update)
    .delete('/:id', farmController.remove);
module.exports = router;
