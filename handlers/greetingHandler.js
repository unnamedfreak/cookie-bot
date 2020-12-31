const Discord = require('discord.js');
const { config } = require('../stores').stores;

module.exports = async (member) => {
    let generalChannel = member.guild.channels.resolve(config.generalChannelId);

    let greetingEmbed = new Discord.MessageEmbed()
        .setColor('#d18e71')
        .setTitle(`Welcome ${member.user.username} to the Discord server for Yuqi!`)
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
        .setDescription(`Don't forget to read <#426341048646762496> for server information, check out <#691273648664739910> to pick a bias, and ask staff if you need anything!`)
        .setFooter(`Member ${member.guild.memberCount}`)
        .setTimestamp(member.user.joinedTimestamp)

    generalChannel.send(greetingEmbed);
}