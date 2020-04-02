'use strict';
const stationModel = require('../models/station');

const station_list_get = async (req, res) => {
    try {
        const stations = await stationModel.find().populate({
            path: "Connections",
            populate: [
                {path: "ConnectionTypeID"},
                {path: "LevelID"},
                {path: "CurrentTypeID"}
            ]
        });
        res.json(stations);
    } catch (e) {
        console.error('station_list_get', e);
        res.status(500).json({message: e.message});
    }
};

const station_get = async (req, res) => {
    try {
        const station = await stationModel.findById(req.params.id).populate({
            path: "Connections",
            populate: [
                {path: "ConnectionTypeID"},
                {path: "LevelID"},
                {path: "CurrentTypeID"}
            ]
        });
        res.json(station);
    } catch (e) {
        console.error('station_get', e);
        res.status(500).json({message: e.message});
    }
};

const station_post = async (req, res) => {
    console.log('station_post', req.body);
    const connections = req.body.Connections;
    const newConnections = await Promise.all(connections.map(async conn => {
        let newConnection = new connectionModel(conn);
        const result = await newConnection.save();
        return result._id;
    }));

    const station = req.body.Station;
    station.Connections = newConnections;

    let newStation = new stationModel(station);
    const rslt = await newStation.save();
    res.json(rslt);
};

const station_put = async (req, res) => {
    const put = await stationModel.updateOne(req.body);
    res.status(200).send(`Station ${req.body._id} updated`);
};

module.exports = {
    station_list_get,
    station_get,
    station_post,
    station_put,
};
