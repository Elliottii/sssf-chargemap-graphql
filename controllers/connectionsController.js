'use strict';
const connectionsModel = require('../models/connections');

const connections_list_get = async (req, res) => {
    var start = 0;
    var limit = 10;

    if (req.query.start !== undefined) {
        start = parseInt(req.query.start);
    }
    if (req.query.limit !== undefined) {
        limit = parseInt(req.query.limit);
    }

    const connections = await connectionsModel
        .find()
        .skip(start)
        .limit(limit)
        .populate([
            { path: "ConnectionTypeID" },
            { path: "LevelID" },
            { path: "CurrentTypeID" }
        ]);
    res.send(connections);
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
