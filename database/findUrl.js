module.exports.findUrl = async({
    client
}, {
    urlId
}) => {
    return await client.collection("shortUrls").findOne({ _id: urlId });
}