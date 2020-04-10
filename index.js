const Discord = require('discord.js');
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });

const { config } = require('./config');
const embeds = require('./embeds');
const { reactionHandler, roleReactionHandler } = require('./handlers');
const { roleDefs } = require('./roleConfig');

client.on('ready', () => {
    console.log('Ready! Logged in as Cookie Bot.');
})

client.on('message', async (message) => {
    if(!message.content.startsWith(config.prefix)) return;
    if(message.author.id !== process.env.OWNER_ID) return;
    let msg = message.content.slice(config.prefix.length);
    switch(msg) {
        case 'ping': 
            let ping = Date.now() - message.createdTimestamp;
            message.channel.send(`Pong! Network Latency: \`${ping}ms\``);
            break;
        case 'rolesMain':
            let mainEmbed = await message.channel.send(embeds.mainRolesEmbed);
            reactionHandler(mainEmbed, {type: 'main'});
            break;
        case 'rolesSub':
            let subEmbed = await message.channel.send(embeds.subRolesEmbed);
            reactionHandler(subEmbed, {type: 'sub'});
            break;
    }
})

client.on('messageReactionAdd', async (reaction, user) => {
    if(user.bot) return;
    let currUser = (await roleReactionHandler(reaction, user)).currUser;
    let desiredRole = (await roleReactionHandler(reaction, user)).desiredRole;

    if(desiredRole) currUser.roles.add(desiredRole);

    let resp = await reaction.message.channel.send(`<@${user.id}> Role Added: \`${roleDefs[desiredRole]}\``);
    setTimeout(() => {
        resp.delete();
    }, 5000);
})

client.on('messageReactionRemove', async (reaction, user) => {
    if(user.bot) return;
    let currUser = (await roleReactionHandler(reaction, user)).currUser;
    let desiredRole = (await roleReactionHandler(reaction, user)).desiredRole;

    if(desiredRole) currUser.roles.remove(desiredRole);

    let resp = await reaction.message.channel.send(`<@${user.id}> Role Removed: \`${roleDefs[desiredRole]}\``);
    setTimeout(() => {
        resp.delete();
    }, 5000);
})

client.on('guildMemberAdd', async (member) => {
    member.roles.add('426340714893410304');
})

client.login(process.env.TOKEN);