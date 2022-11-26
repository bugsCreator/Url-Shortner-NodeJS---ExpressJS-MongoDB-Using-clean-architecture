module.exports.router = ({
    findUrl,
    updateUrl,
    generateUrl,
    requestDetails,
    geoip,
    isValidUrl,
    urid,
    express,
    client
}) => {
    const router = express.Router();
    const shorten_router = require("./shorten_router")
    router.use("/short", shorten_router.shorten_router({
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
    return router
};