module.exports.shorten_router = ({
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
    const shorten_router = express.Router();
    shorten_router.get('/:urlId', async(req, res) => {
        try {
            const geo = await requestDetails({ req }, { geoip })
            const data = await findUrl({ "client": client }, { "urlId": req.params.urlId })
            if (data === null) {
                return res.status(404).end('Not found');
            }
            data.viewer.push(geo)
            data.clickCount = data.clickCount + 1;
            await updateUrl({
                "client": client
            }, {
                "urlId": req.params.urlId,
                "data": data
            })
            if (data.url == null || data.url == undefined) {
                return res.redirect("/");
            }
            // deepcode ignore OR: this has to redirect to any website
            return res.redirect(data.url + "/");

        } catch (err) {
            console.error(err);
            return res.status(500).end('Server Error');
        }
    });


    shorten_router.post('/generate', async(req, res) => {


        try {
            let url = req.body.url
            if (url === undefined) {
                return res.json({ "data": null, error: true, message: "Url is missing" })
            } else if (!isValidUrl(url)) {
                return res.json({ "data": null, error: true, message: "Url is not valid" })
            }
            let id = urid.default(16)
            let shortenUrl = process.env.BASE_URL + ":" + process.env.PORT + "/short/" + id
            await generateUrl({ id, url: url }, { client })
            return res.json({ "data": shortenUrl, error: false, message: "" })

        } catch (err) {
            console.log(err);
            return res.json({ "data": null, error: true, message: "" })
        }
    });
    return shorten_router;
}