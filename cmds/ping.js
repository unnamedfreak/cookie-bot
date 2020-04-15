module.exports.run = async (client, message, args) => {
            let ping = Date.now() - message.createdTimestamp;
            message.channel.send(`Pong! Network Latency: \`${ping}ms\``);
}

module.exports.list = {
    name: 'ping',
    desc: '🏓'
}