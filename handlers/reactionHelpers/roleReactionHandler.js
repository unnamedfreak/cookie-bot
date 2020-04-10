const { stores } = require('../../stores');

const config = stores.config;
const roleList = stores.roleList;

module.exports = async (reaction, user) => {
    if(reaction.partial) {
        try {
            await reaction.fetch();
        } catch (err) {
            console.log('[Error while fetching message]: ', error);
            return;
        }
    }
    if(![config.mainEmbedId, config.subEmbedId].includes(reaction.message.id)) return;

    let currUser = await reaction.message.guild.members.fetch(user);
    let roleType = reaction.message.id;
    let roleEmote = reaction.emoji.name;
    let desiredRole = roleList[roleType][roleEmote];

    return { currUser, desiredRole };
}