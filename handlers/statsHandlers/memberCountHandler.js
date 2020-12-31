const { stores } = require('../../stores');
const statChannels = stores.statChannels;

module.exports = async (member) => {
    member.guild.channels.cache.get(statChannels.memChannel).setName(`👤 Member Count: ${member.guild.members.cache.filter(member => !member.user.bot).size}`);
    member.guild.channels.cache.get(statChannels.botChannel).setName(`🤖 Bot Count: ${member.guild.members.cache.filter(member => member.user.bot).size}`);
}