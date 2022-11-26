module.exports.requestDetails = async({
    req
}, {
    geoip
}) => {
    console.log('Headers: ' + JSON.stringify(req.headers));
    console.log('IP: ' + JSON.stringify(req.ip));
    let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    ip = ip.toString().replace('::ffff:', '');
    let geo = geoip.lookup(ip);
    if (geo === null) {
        geo = {}
    }
    geo["browser"] = req.headers["user-agent"]
    geo["language"] = req.headers["accept-language"]
    geo["date"] = new Date()
    return geo

}