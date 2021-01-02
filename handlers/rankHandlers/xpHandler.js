const Discord = require('discord.js');

const MULTIPLIER = 5;
const GUARANTEE = 1/MULTIPLIER;
const LEVEL_LIMIT = 20;

const sendLevelUpEmbed = (message, level) => {
    let levelEmbed = new Discord.MessageEmbed()
        .setColor('#d18e71')
        .setTitle(`Level Up!`)
        .setDescription(`<@${message.author.id}> just advanced to Level ${level}!`)
        .setFooter(`Cookie Bot`)
        .setTimestamp();

    message.channel.send(levelEmbed);
}


module.exports = async (message, db) => {
    const uid = message.author.id;
    const ranks = db.collection('ranks');
    const user = await ranks.doc(uid).get();

    if(!user.exists) {
        // Create a document for the user
        ranks.doc(uid).set({
            xp: Math.floor((Math.random() + GUARANTEE) * MULTIPLIER),
            level: 0
        })
    } else {
        let uLevel = user.data().level;
        let uXp = Math.floor((Math.random() + GUARANTEE) * MULTIPLIER) + user.data().xp;

        // Level Up
        if(uXp >= (uLevel + 1) * LEVEL_LIMIT) {
            uXp -= (uLevel + 1) * LEVEL_LIMIT;
            uLevel++;
            sendLevelUpEmbed(message, uLevel);
        }
        ranks.doc(uid).set({
            xp: uXp,
            level: uLevel
        })
    }
}