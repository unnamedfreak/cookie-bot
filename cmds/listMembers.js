module.exports.run = async (client, message, args) => {
    if(!message.member.roles.cache.has('426345039191474176')) return;
    await message.guild.members.fetch();
    message.channel.send(`
        Total Members(+Bots): \`${message.guild.memberCount}\`
        Total Members: \`${message.guild.members.cache.filter(member => !member.user.bot).size}\`
        Total Bots: \`${message.guild.members.cache.filter(member => member.user.bot).size}\`
    `);
}

module.exports.list = {
    name: 'listMembers',
    desc: "Lists all members or bots."
}