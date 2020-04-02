'use strict';
const levelsModel = require('../models/levels');

const levels_list_get = async (req, res) => {
    try {
        const levels = await levelsModel.find();
        res.json(levels);
    } catch (e) {
        console.error('levels_list_get', e);
        res.status(500).json({message: e.message});
    }
};

const levels_get = async (req, res) => {
    try {
        const levels = await levelsModel.findById(req.params.id);
        res.json(levels);
    } catch (e) {
        console.error('levels_get', e);
        res.status(500).json({message: e.message});
    }
};

const levels_post = (req, res) => {
    res.send('With this endpoint you can add levelss');
};

module.exports = {
    levels_list_get,
    levels_get,
    levels_post,
};