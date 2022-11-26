//generateUrl.js

module.exports.generateUrl = async({
    id,
    url
}, {
    client
}) => {
    let obj = {
        _id: id,
        url: url,
        createdAt: new Date(),
        clickCount: 0,
        viewer: []
    }
    await client.collection("shortUrls").insertOne(obj);
}