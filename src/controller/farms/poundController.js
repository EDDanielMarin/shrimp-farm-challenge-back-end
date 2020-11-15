const {Pound, Farm} = require('../../models');
const { poundValidator } = require('../../validators');
const mongoose = require('mongoose');

const createError = require('http-errors');
const save = async (req, res, next) => {
    const data = new Pound(req.body);
    const {error, value} = poundValidator.validate(req.body);
    if (error) {
        return next(createError(400, error.details.map(x => x.message).toString()));
    }
    const result = await assignFarm(data);
    if(!result) {
        return  next(createError(400, 'Can´t assign given farm \''))
    }
    await data.save();
    return  res.json({
        data,
        message: 'Pound successful saved'
    });
};
const update = async (req, res, next) => {
    const id = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return next(createError(400, 'Invalid id'))
    }
    const {error, value} = poundValidator.validate(req.body);
    if (error) {
        return next(createError(400, error.details.map(x => x.message).toString()));
    }
    const data = await Pound.findById(id);
    if(!data) {
        return  next(createError(404))
    }
    //TODO: update farm composition
    Object.assign(data, req.body);

    const {errorPound, savedPound} = await  Pound.updateOne({_id: id}, data);
    if( errorPound) {
        return next(createError((500)))
    }
    return  res.json({
        data,
        message: 'Pound successful updated'
    });
};
const get = async (req, res, next) => {
    const data = await Pound.find().populate({path: 'farm', select: '_id name active'});
    return  res.json(data);
};
const find = async (req, res, next) => {
    const id = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return next(createError(400, 'Invalid id'))
    }
    const data = await Pound.findById(id);
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
    const data = await Pound.findById(id);
    if(!data) {
        return  next(createError(404))
    }
    await Pound.deleteOne({_id : id});
    return  res.json({message: "Pound successful deleted"});
};
const assignFarm= async (data) => {
    const farm = await Farm.findById(data.farm);
    if (!farm) {
        return null
    }
    farm.pounds.push(data);
    return await farm.save();
};
module.exports = {
    save,
    find,
    get,
    update,
    remove
};


