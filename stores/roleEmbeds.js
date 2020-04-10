const Discord = require('discord.js');

const mainRoles = new Discord.MessageEmbed()
    .setColor("#d8affa")
    .setImage("https://cdn.discordapp.com/attachments/691005081159598230/691336166561284106/mainroles.png");

const subRoles = new Discord.MessageEmbed()
    .setColor("#d8affa")
    .setImage("https://cdn.discordapp.com/attachments/691005081159598230/691337021385605220/subroles.png")

module.exports.mainRoles = mainRoles;
module.exports.subRoles = subRoles;