const config = require('./../stores/config');

module.exports.run = async (client, message, args) => {
    if(message.member.id != config.ownerId) return;
    if(args.length == 0) {
        message.channel.send(`Correct Usage:\n\`${config.prefix}setPresence <Parameters>\`.\nParameters: \`Online, Idle, DND, Invisible\``);
    }
    switch(args[0]) {
        case "online":
            client.user.setPresence({status: 'online' });
            break;
        case "idle":
            client.user.setPresence({status: 'idle' });
            break;
        case "dnd":
            client.user.setPresence({status: 'dnd' });
            break;
        case "invisible":
            client.user.setPresence({status: 'invisible' });
            break;
    }
    message.channel.send(`Bot Presence updated to: ${(args[0]).toLowerCase()}`);
}

module.exports.list = {
    name: 'setPresence',
    desc: "Updates Cookie Bot Presence."
}