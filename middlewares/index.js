setAppMiddleWare = ({ app }, { express, compression, cookieParser }) => {

    app.use(compression({ filter: shouldCompress(compression) }))
    app.use(express.urlencoded({ extended: false }))
    app.use(express.json())
    app.use(cookieParser());

}
shouldCompress = (compression) => (req, res) => {
    if (req.headers['x-no-compression']) {
        // don't compress responses with this request header
        return false
    }

    // fallback to standard filter function
    return compression.filter(req, res)
}

module.exports.set = setAppMiddleWare