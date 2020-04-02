'use strict';

require('dotenv').config();
const express = require('express');
const graphqlHTTP = require('express-graphql');
const MyGraphQLSchema = require('./schema/schema');
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const db = require("./database/db");
const connectionsRoute = require('./routes/connectionsRoute');
const connectionTypesRoute = require('./routes/connectionTypesRoute');
const currentTypeRoute = require('./routes/currentTypeRoute');
const levelsRoute = require('./routes/levelsRoute');
const stationRoute = require('./routes/stationRoute');
const authRoute = require("./routes/authRoute");

app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded

app.use('/connections', connectionsRoute);
app.use('/connectionTypes', connectionTypesRoute);
app.use('/currenttype', currentTypeRoute);
app.use('/levels', levelsRoute);
app.use('/station', stationRoute);
app.use("/auth", authRoute);

app.use('/graphql', (req, res) => {
        graphqlHTTP(async () => ({
            schema: MyGraphQLSchema,
            graphiql: true,
        }))(req, res)
    },
);

db.on('connected', () => {
    app.listen(3000);
});
