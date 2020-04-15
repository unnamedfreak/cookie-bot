const { stores } = require('../../stores');
const statChannels = stores.statChannels

module.exports.run = async (client, message, args) => {
    if(!message.member.roles.cache.has('426345039191474176')) return;

    let memChannel = message.guild.channels.cache.get(statChannels.memChannel);
    let botChannel = message.guild.channels.cache.get(statChannels.botChannel);
    let ageChannel = message.guild.channels.cache.get(statChannels.ageChannel);

    await message.guild.members.fetch();
    memChannel.setName(`👤 Member Count: ${message.guild.members.cache.filter(member => !member.user.bot).size}`);
    botChannel.setName(`🤖 Bot Count: ${message.guild.members.cache.filter(member => member.user.bot).size}`)
    
    let tempAgeMs = Date.now() - message.guild.createdTimestamp;
    let tempAge = Math.floor(tempAgeMs/86400000);
    ageChannel.setName(`🗓 Server Age: ${tempAge} days`);
    
    message.channel.send('Updated Stats!');
}

module.exports.list = {
    name: 'setInvite',
    desc: "Sets a new invite on the Server Stats Display."
}