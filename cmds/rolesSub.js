const { handlers } = require('../handlers/');
const config = require('../stores/config');

module.exports.run = async (client, message, args) => {
    if(!message.member.roles.cache.has('426345039191474176')) return;
    if(message.author.id !== config.ownerId) return;
    let subEmbed = await message.channel.send(stores.roleEmbedsubRoles);
    let subEmbedId = subEmbed.id;
    handlers.reactionHandler(subEmbed, {type: 'sub'});
}

module.exports.list = {
    name: 'rolesSub',
    desc: 'Sends a message to get Sub Roles'
}