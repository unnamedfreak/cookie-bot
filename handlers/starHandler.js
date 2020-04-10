const Discord = require('discord.js');
const config = require('../stores/config');

module.exports = async (reaction, user) => {
    if(reaction.emoji.name !== '⭐') return;
    if(reaction.partial) {
        try {
            await reaction.fetch();
        } catch (err) {
            console.log('[Error while fetching message]: ', error);
            return;
        }
    }

    let limit = 2;

    let newlyStarredMsg = reaction.message;
    if(newlyStarredMsg.author.id === user.id) {
        let callout = await newlyStarredMsg.channel.send(`<@${user.id}> Did you really just star your own message to get on <#426341406320099328> <:yuqireally:697371883343183922>? No cookies for you!`);
        setTimeout(() => callout.delete(), 5000);
        return;
    }
    let starboard = newlyStarredMsg.guild.channels.resolve(config.starboardId);
    
    let starEmbed = new Discord.MessageEmbed()
        .setColor('#ffac33')
        .setAuthor(newlyStarredMsg.author.tag, newlyStarredMsg.author.avatarURL())
        .setDescription(`${newlyStarredMsg.content}\n\n⭐ ${reaction.count} <#${newlyStarredMsg.channel.id}>`)
        .setFooter(`ID ${newlyStarredMsg.id}`)
        .setTimestamp(newlyStarredMsg.createdTimestamp)
    
    let starredMsgs = await starboard.messages.fetch();
    let prevEmbed = starredMsgs.filter(m => m.content.includes(newlyStarredMsg.id));
    if(prevEmbed.array().length === 0) {
        if(reaction.count < limit) return;
        starboard.send(newlyStarredMsg.url, starEmbed);
    } else {
        prevEmbed.first().edit(newlyStarredMsg.url, starEmbed);
    }


}