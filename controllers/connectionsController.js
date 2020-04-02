'use strict';
const connectionsModel = require('../models/connections');

const connections_list_get = async (req, res) => {
    try {
        const connections = await connectionsModel.find().populate();
        res.json(connections);
    } catch (e) {
        console.error('connections_list_get', e);
        res.status(500).json({message: e.message});
    }
};

const connections_get = async (req, res) => {
    try {
        const connections = await connectionsModel.findById(req.params.id);
        res.json(connections);
    } catch (e) {
        console.error('connections_get', e);
        res.status(500).json({message: e.message});
    }
};

const connections_post = (req, res) => {
    res.send('With this endpoint you can add connections');
};

module.exports = {
    connections_list_get,
    connections_get,
    connections_post,
};