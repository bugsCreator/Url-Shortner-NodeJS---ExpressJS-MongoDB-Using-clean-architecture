require("fix-esm").register();
const express = require('express');
const routes = require("./routes")

const cluster = require('node:cluster');
const { cpus } = require('node:os');
const process = require('node:process');
const middlewares = require("./middlewares")
const urid = require('urid');
require('dotenv').config();
const geoip = require('geoip-lite');
const isValidUrl = require("./utils/urlValidater")
const { findUrl } = require("./database/findUrl")
const { updateUrl } = require("./database/updateUrl")
const { generateUrl } = require("./database/generateUrl")
const { requestDetails } = require("./utils/requestDetails")
const { GetClient } = require("./database/GetClient")
const compression = require('compression')
const cookieParser = require("cookie-parser");
const helmet = require('helmet');

const app = express()
app.use(
    helmet({
        contentSecurityPolicy: false,
    })
);



//setting up middlewares
middlewares.set({ app }, { express, compression, cookieParser })

//setting up router
app.use(express.static(__dirname + '/public'));



GetClient().then((client) => {
    app.use(routes.router({
        findUrl,
        updateUrl,
        generateUrl,
        requestDetails,
        geoip,
        isValidUrl,
        urid,
        express,
        client
    }))

}).catch((e) => { throw e; });







const numCPUs = cpus().length;

if (cluster.isPrimary) {
    console.log(`Primary ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    });
} else {
    // Workers can share any TCP connection
    // In this case it is an HTTP server
    app.listen(process.env.PORT, async() => {
        console.log(`Example app listening on port ${process.env.PORT}`)
    })


    console.log(`Worker ${process.pid} started`);
}