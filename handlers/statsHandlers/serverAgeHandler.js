const { stores } = require('../../stores');
const statChannels = stores.statChannels;

module.exports = async (m) => {
    let tempAgeMs = Date.now() - m.guild.createdTimestamp;
    let tempAge = Math.floor(tempAgeMs/86400000);
    m.guild.channels.cache.get(statChannels.ageChannel).setName(`🗓 Server Age: ${tempAge} days`);
}