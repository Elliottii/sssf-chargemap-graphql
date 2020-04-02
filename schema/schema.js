"use strict";

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLList,
    GraphQLSchema,
    GraphQLNonNull,
    GraphQLBoolean,
} = require('graphql');

const connections = require('../models/connections');
const connectionTypes = require('../models/connectionTypes');
const currentType = require('../models/currentType');
const levels = require('../models/levels');
const station = require('../models/station');

const connectionsSchema = new GraphQLObjectType({
    name: 'connections',
    description: 'TODO',
    fields: () => ({
        id: {type: GraphQLID},
        ConnectionTypeID: {
            type: connectionTypesSchema,
            resolve: async (parent, args) => {
                try {
                    return await connectionTypes.findById(parent.ConnectionTypeID);
                } catch (e) {
                    return new Error(e.message);
                }
            },
        },
        LevelID: {
            type: levelsSchema,
            resolve: async (parent, args) => {
                try {
                    return await levels.findById(parent.LevelID);
                } catch (e) {
                    return new Error(e.message);
                }
            },
        },
        CurrentTypeID: {
            type: currentTypeSchema,
            resolve: async (parent, args) => {
                try {
                    return await currentType.findById(parent.CurrentTypeID);
                } catch (e) {
                    return new Error(e.message);
                }
            },
        },
        Quantity: {type: GraphQLID},
    }),
});

const connectionTypesSchema = new GraphQLObjectType({
    name: 'connectionTypes',
    description: 'TODO',
    fields: () => ({
        id: {type: GraphQLID},
        FormalName: {type: GraphQLString},
        Title: {type: GraphQLString},
    }),
});

const currentTypeSchema = new GraphQLObjectType({
    name: 'currentType',
    description: 'TODO',
    fields: () => ({
        id: {type: GraphQLID},
        Description: {type: GraphQLString},
        Title: {type: GraphQLString},
    }),
});

const levelsSchema = new GraphQLObjectType({
    name: 'levels',
    description: 'TODO',
    fields: () => ({
        id: {type: GraphQLID},
        Comments: {type: GraphQLString},
        IsFastChargeCapable: {type: GraphQLBoolean},
        Title: {type: GraphQLString},
    }),
});

const stationSchema = new GraphQLObjectType({
    name: 'station',
    description: 'Connections etc',
    fields: () => ({
        Connections: {
            type: connectionsSchema,
            resolve: async (parent, args) => {
                try {
                    return await connections.findById(parent.Connections);
                } catch (e) {
                    return new Error(e.message);
                }
            },
        },
        id: {type: GraphQLID},
        Title: {type: GraphQLString},
        AddressLine1: {type: GraphQLString},
        Town: {type: GraphQLString},
        StateOrProvince: {type: GraphQLString},
        Postcode: {type: GraphQLString},
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    description: 'Main query',
    fields: {
        stations: {
            type: new GraphQLNonNull(new GraphQLList(stationSchema)),
            resolve: async (parent, args) => {
                try {
                    return await station.find();
                } catch (e) {
                    return new Error(e.message);
                }
            },
        },
        station: {
            type: stationSchema,
            description: 'Get animal by id',
            args: {
                id: {type: new GraphQLNonNull(GraphQLID)},
            },
            resolve: async (parent, args) => {
                try {
                    return await station.findById(args.id);
                } catch (e) {
                    return new Error(e.message);
                }
            },
        },
    },
});

module.exports = new GraphQLSchema({
    query: RootQuery,
});
