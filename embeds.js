const Discord = require('discord.js');

const mainRoles = new Discord.MessageEmbed()
    // .setAuthor("React with the emote for the **Main Role**")
    // .setColor("#602d8c")
    .setColor("#d8affa")
    // .addFields(
    //     { "name": ":cookie:", "value": "Yuqi", "inline": true },
    //     { "name": ":skull_crossbones:", "value": "Soyeon", "inline": true },
    //     { "name": ":books:", "value": "Shu Hua", "inline": true },

    //     { "name": ":pancakes:", "value": "Soojin", "inline": true },
    //     { "name": ":musical_keyboard:", "value": "Minnie", "inline": true },
    //     { "name": ":ramen:", "value": "Miyeon", "inline": true },
        
    //     { "name": "<:idleblob:691006062446379080>", "value": "OT6" }
    // )
    .setImage("https://cdn.discordapp.com/attachments/691005081159598230/691336166561284106/mainroles.png");

const subRoles = new Discord.MessageEmbed()
    // .setAuthor("React with the emote for the **Sub Role**")
    // .setColor("#602d8c")
    .setColor("#d8affa")
    // .addFields(
    //     { "name": ":cookie:", "value": "Yuqi", "inline": true },
    //     { "name": ":skull_crossbones:", "value": "Soyeon", "inline": true },
    //     { "name": ":books:", "value": "Shu Hua", "inline": true },

    //     { "name": ":pancakes:", "value": "Soojin", "inline": true },
    //     { "name": ":musical_keyboard:", "value": "Minnie", "inline": true },
    //     { "name": ":ramen:", "value": "Miyeon", "inline": true },
    // );
    .setImage("https://cdn.discordapp.com/attachments/691005081159598230/691337021385605220/subroles.png")

exports.mainRolesEmbed = mainRoles;
exports.subRolesEmbed = subRoles;