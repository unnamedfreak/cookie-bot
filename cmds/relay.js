module.exports.run = async (client, message, args) => {
    if(message.member.roles.cache.has('698176436036698134')) return;
    let channelId = args.shift();
    if(!message.guild.channels.cache.has(channelId)) {
        message.reply("The channel ID provided is invalid. Please provide a valid channel ID.");
        return;
    }
    let relay = args.join(" ");
    let relayToChannel = message.guild.channels.resolve(channelId);
    relayToChannel.send(`**${message.author.tag}** said: ${relay}`);
}

module.exports.list = {
    name: 'relay',
    desc: "Relays the message provided to a specified channel and specifies the author of the message."
}