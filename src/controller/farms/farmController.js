const {Farm: FarmController} = require('../../models');
const { farmValidator } = require('../../validators');
const mongoose = require('mongoose');

const createError = require('http-errors');
const save = async (req, res, next) => {
    const data = new FarmController(req.body);
    const {error, value} = farmValidator.validate(req.body);
    if (error) {
        return next(createError(400, error.details.map(x => x.message).toString()));
    }
    const {errorFarm, savedFarm} = await  data.save();
    if( errorFarm) {
        return next(createError((500)))
    }
    return  res.json({
        data,
        message: 'FarmController successful saved'
    });
};
const update = async (req, res, next) => {
    const id = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return next(createError(400, 'Invalid id'))
    }
    const {error, value} = farmValidator.validate(req.body);
    if (error) {
        return next(createError(400, error.details.map(x => x.message).toString()));
    }
    const data = await FarmController.findById(id);
    if(!data) {
        return  next(createError(404))
    }
    Object.assign(data, req.body);
    const {errorFarm, savedFarm} = await  FarmController.updateOne({_id: id}, data);
    if( errorFarm) {
        return next(createError((500)))
    }
    return  res.json({
        data,
        message: 'FarmController successful updated'
    });
};
const get = async (req, res, next) => {
    const data = await FarmController.find().populate('pounds');
    return  res.json(data);
};
const find = async (req, res, next) => {
    const id = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return next(createError(400, 'Invalid id'))
    }
    const data = await FarmController.findById(id).populate('pounds');
    if(!data) {
        return  next(createError(404))
    }
    return  res.json({
        data,
        message: 'Success'
    });
};
const remove = async (req, res, next) => {
    const id = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return next(createError(400, 'Invalid id'))
    }
    const data = await FarmController.findById(id);
    if(!data) {
        return  next(createError(404))
    }
    await FarmController.deleteOne({_id : id});
    return  res.json({message: "FarmController successful deleted"});
};
module.exports = {
    save,
    find,
    get,
    update,
    remove
};


