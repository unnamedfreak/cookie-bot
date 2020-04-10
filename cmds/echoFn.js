module.exports.run = async (client, message, args) => {
    if(!message.member.roles.cache.has('426345039191474176')) return;
    if(message.member.roles.cache.has('698176436036698134')) return;
    let channelId = args.shift();
    if(!message.guild.channels.cache.has(channelId)) {
        message.reply("The channel ID provided is invalid. Please provide a valid channel ID.");
        return;
    }
    let echo = args.join(" ");
    let echoToChannel = message.guild.channels.resolve(channelId);
    echoToChannel.send(echo);
}

module.exports.list = {
    name: 'echo',
    desc: "Echoes the message provided to a specified channel but does not specify the author of the message."
}