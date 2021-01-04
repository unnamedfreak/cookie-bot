const Discord = require('discord.js');

const HALF_DAY_IN_MS = 43200000;
const HOUR_IN_MS = 3600000;
const MINUTE_IN_MS = 60000;
const MULTIPLIER = 1.5;
const GUARANTEE = 1;

const sendCooldownEmbed = (message, timeDiff, uCookies) => {
    let hr = Math.floor(timeDiff / HOUR_IN_MS);
    let min = Math.floor((timeDiff % HOUR_IN_MS) / MINUTE_IN_MS);

    let cooldownEmbed = new Discord.MessageEmbed()
        .setColor('#d18e71')
        .setTitle(`Bakery - Oven Needs to Cool Down!`)
        .setDescription(`<@${message.author.id}>. You can bake more 🍪 in ${hr} hr ${min} min.`)
        .setFooter(`Cookies: ${uCookies}`)
        .setTimestamp();

    message.channel.send(cooldownEmbed);
}

const sendBakedEmbed = (message, freshCookies, uCookies) => {
    let bakedEmbed = new Discord.MessageEmbed()
        .setColor('#d18e71')
        .setTitle(`Bakery - Cookies Baked!`)
        .setDescription(`<@${message.author.id}>. You baked ${freshCookies} 🍪.`)
        .setFooter(`Cookies: ${uCookies}`)
        .setTimestamp();

    message.channel.send(bakedEmbed);
}

module.exports.run = async (client, message, args, db) => {
    const uid = message.author.id;
    const ranks = db.collection('ranks');
    const user = await ranks.doc(uid).get();
    const inventory = db.collection('inventory');
    const uInv = await inventory.doc(uid).get();

    const currTime = Date.now();

    if(!uInv.exists) {
        let freshCookies = Math.floor((Math.random() + GUARANTEE) * MULTIPLIER);

        inventory.doc(uid).set({
            cookies: freshCookies,
            lastBaked: currTime
        })

        sendBakedEmbed(message, freshCookies, freshCookies);
    } else {
        let lastBaked = uInv.data().lastBaked;
        let timeDiff = (lastBaked + HALF_DAY_IN_MS) - currTime;

        if(timeDiff > 0) {
            let uCookies = uInv.data().cookies;
            sendCooldownEmbed(message, timeDiff, uCookies);
        } else {
            let uLevel = user.data().level;
            let freshCookies = Math.floor(((Math.random() * uLevel) + GUARANTEE) * MULTIPLIER)
            let uCookies = freshCookies + uInv.data().cookies;

            inventory.doc(uid).set({
                cookies: uCookies,
                lastBaked: currTime
            })

            sendBakedEmbed(message, freshCookies, uCookies);
        }
    }
}

module.exports.list = {
    name: 'bake',
    desc: "Bake Cookies. 🍪"
}