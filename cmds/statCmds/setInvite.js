const { stores } = require('../../stores');
const config = stores.config;
const statChannels = stores.statChannels

module.exports.run = async (client, message, args) => {
    if(message.member.id != config.ownerId) return;
    if(args.length == 0) {
        message.channel.set('Supply a valid Invite');
    }
    let invChannel = message.guild.channels.cache.get(statChannels.inviteChannel);
    invChannel.setName(`🎫 Invite: ${args[0]}`);
    message.channel.send(`Invite Link set to: ${args[0]}`);
}

module.exports.list = {
    name: 'setInvite',
    desc: "Sets a new invite on the Server Stats Display."
}