module.exports.updateUrl = async({
    client
}, {
    urlId,
    data
}) => {
    await client.collection("shortUrls").updateOne(

        {
            _id: urlId,
        }, {
            $set: {...data }
        });

}