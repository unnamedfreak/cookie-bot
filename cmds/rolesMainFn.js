const { handlers } = require('../handlers/');
const config = require('../stores/config');

module.exports.run = async (client, message, args) => {
    if(!message.member.roles.cache.has('426345039191474176')) return;
    if(message.author.id !== config.ownerId) return;
    let mainEmbed = await message.channel.send(stores.roleEmbedsmainRoles);
    let mainEmbedId = mainEmbed.id;
    handlers.reactionHandler(mainEmbed, {type: 'main'});
}

module.exports.list = {
    name: 'rolesMain',
    desc: 'Sends a message to get Main Roles'
}