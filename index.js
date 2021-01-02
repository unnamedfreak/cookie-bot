const Discord = require('discord.js');
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });

const admin = require("firebase-admin");
const serviceAccount = require("./cookie-yuqicord-firebase-adminsdk-7v8yo-921f6b9665.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

const config = require('./stores/config');
const handlers = require('./handlers/');

const { cmds } = require('./cmds');
let cmdKeys = Object.keys(cmds);

client.on('ready', () => {
    console.log('\nReady! Logged in as Cookie Bot.');
})

client.on('message', async (message) => {
    handlers.serverAgeHandler(message);
    if(message.author.bot) return;
    handlers.xpHandler(message, db);
    if(!message.content.startsWith(config.prefix)) return;
    let msg = message.content.slice(config.prefix.length);
    let cmd = msg.split(" ").shift();
    let args = msg.split(" ").slice(1);
    if(cmdKeys.includes(cmd)) {
        cmds[cmd].run(client, message, args);
    }
})

client.on('messageReactionAdd', async (reaction, user) => {
    if(user.bot) return;
    handlers.starHandler(reaction, user);
    handlers.roleReactionToggle(reaction, user, "addRole");
})

client.on('messageReactionRemove', async (reaction, user) => {
    if(user.bot) return;
    handlers.roleReactionToggle(reaction, user, "removeRole");
})

client.on('guildMemberAdd', async (member) => {
    handlers.greetingHandler(member);
    member.roles.add('426340714893410304');
    handlers.memberCountHandler(member);
    handlers.serverAgeHandler(member);
})

client.on('guildMemberRemove', async (member) => {
    handlers.memberCountHandler(member);
    handlers.serverAgeHandler(member);
})

try {
    const { personal } = require("./ignoredFiles/personal");
    client.login(personal.token2);
} catch {
    client.login(process.env.TOKEN);
}