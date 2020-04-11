'use strict';
const connectionModel = require("../models/connections");
const connectionTypesModel = require("../models/connectionTypes");
const currentTypeModel = require("../models/currentType");
const levelsModel = require("../models/levels");
const stationModel = require('../models/station');

const station_list_get = async (req, res) => {
    var start = 0;
    var limit = 10;

    if (req.query.start !== undefined) {
        start = parseInt(req.query.start);
    }
    if (req.query.limit !== undefined) {
        limit = parseInt(req.query.limit);
    }

    if (
        req.query.topRight !== undefined &&
        req.query.bottomLeft !== undefined
    ) {
        const topRight = JSON.parse(req.query.topRight);
        const bottomLeft = JSON.parse(req.query.bottomLeft);

        const polygon = {
            type: "Polygon",
            coordinates: [
                [
                    [bottomLeft.lng, topRight.lat],
                    [topRight.lng, topRight.lat],
                    [topRight.lng, bottomLeft.lat],
                    [bottomLeft.lng, bottomLeft.lat],
                    [bottomLeft.lng, topRight.lat]
                ]
            ]
        };

        const stations = await stationModel
            .find({
                Location: {
                    $geoWithin: {
                        $geometry: polygon
                    }
                }
            })
            .skip(start)
            .limit(limit)
            .populate({
                path: "Connections",
                populate: [
                    {path: "ConnectionTypeID"},
                    {path: "LevelID"},
                    {path: "CurrentTypeID"}
                ]
            });
        res.send(stations);
    } else {
        const stations = await stationModel
            .find()
            .skip(start)
            .limit(limit)
            .populate({
                path: "Connections",
                populate: [
                    {path: "ConnectionTypeID"},
                    {path: "LevelID"},
                    {path: "CurrentTypeID"}
                ]
            });
        res.send(stations);
    }
};

const station_get = async (req, res) => {
    const station = await stationModel.findById(req.params.id).populate({
        path: "Connections",
        populate: [
            { path: "ConnectionTypeID" },
            { path: "LevelID" },
            { path: "CurrentTypeID" }
        ]
    });
    res.send(station);
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

module.exports = {
    station_list_get,
    station_get,
    station_post,
};
