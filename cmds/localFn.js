module.exports.run = async (client, message, args) => {
    message.channel.send("Local!");
}

module.exports.list = {
    name: 'local',
    desc: 'Determines if the instance is local.'
}